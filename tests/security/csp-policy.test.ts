import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { HEADER_CSP, META_CSP, assertHtmlCompatibleWithCsp, injectCspMeta, parseCsp } from "../../security/csp";
import { BRAND_INFO, GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, ORDER_ONLINE_URL } from "../../src/constants";

const root = new URL("../../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

test("script execution is limited to same-origin files", () => {
  const policy = parseCsp(META_CSP);
  for (const directive of ["default-src", "script-src"]) {
    for (const forbidden of ["'unsafe-inline'", "'unsafe-eval'", "'unsafe-hashes'", "'wasm-unsafe-eval'", "*", "https:", "http:", "data:", "blob:"]) {
      assert.ok(!policy.get(directive)?.includes(forbidden), `${directive} must not contain ${forbidden}`);
    }
  }
  assert.deepEqual(policy.get("default-src"), ["'none'"]);
  assert.deepEqual(policy.get("script-src"), ["'self'"]);
  assert.deepEqual(policy.get("script-src-attr"), ["'none'"]);
  assert.deepEqual(policy.get("object-src"), ["'none'"]);
  assert.deepEqual(policy.get("base-uri"), ["'none'"]);
  assert.deepEqual(policy.get("form-action"), ["'none'"]);
  assert.deepEqual(policy.get("require-trusted-types-for"), ["'script'"]);
  assert.deepEqual(policy.get("trusted-types"), ["'none'"], "no Trusted Types policy may be creatable");
});

test("data can only be sent to the site's own origin", () => {
  const policy = parseCsp(META_CSP);
  for (const directive of ["img-src", "font-src", "connect-src"]) {
    assert.deepEqual(policy.get(directive), ["'self'"], `${directive} must not allow other origins`);
  }
});

test("frame-ancestors is header-only (browsers ignore it in <meta>)", () => {
  assert.ok(!parseCsp(META_CSP).has("frame-ancestors"));
  assert.deepEqual(parseCsp(HEADER_CSP).get("frame-ancestors"), ["'none'"]);
});

test("a directive appended by a proxy or antivirus cannot corrupt the last directive", () => {
  for (const policy of [META_CSP, HEADER_CSP]) {
    assert.ok(policy.endsWith(";"), "policy must end with ';'");
    // Exactly what Kaspersky Web Anti-Virus was observed appending to the meta tag.
    const tampered = parseCsp(`${policy} child-src http://gc.kis.v2.scr.kaspersky-labs.com ws://gc.kis.v2.scr.kaspersky-labs.com;`);
    assert.deepEqual(tampered.get("trusted-types"), ["'none'"]);
    assert.deepEqual(tampered.get("require-trusted-types-for"), ["'script'"]);
  }
});

test("vercel.json and public/_headers carry exactly the header policy", () => {
  const vercel = JSON.parse(read("vercel.json"));
  const vercelCsp = vercel.headers
    .flatMap((rule: { headers: { key: string; value: string }[] }) => rule.headers)
    .filter((header: { key: string }) => header.key.toLowerCase() === "content-security-policy")
    .map((header: { value: string }) => header.value);
  assert.deepEqual(vercelCsp, [HEADER_CSP]);

  const netlifyCsp = [...read("public/_headers").matchAll(/^\s*Content-Security-Policy:\s*(.+?)\s*$/gim)].map((m) => m[1]);
  assert.deepEqual(netlifyCsp, [HEADER_CSP]);
});

test("the contact map iframe is allowed by frame-src", () => {
  const embed = new URL(GOOGLE_MAPS_EMBED_URL);
  const allowed = parseCsp(META_CSP).get("frame-src") ?? [];
  // CSP host-source with a path and no trailing slash matches that exact path (query ignored).
  const match = allowed.some((source) => {
    const s = new URL(source);
    return s.origin === embed.origin && (s.pathname.endsWith("/") ? embed.pathname.startsWith(s.pathname) : embed.pathname === s.pathname);
  });
  assert.ok(match, `${embed.origin}${embed.pathname} not covered by frame-src ${allowed.join(" ")}`);
});

test("hard-coded outbound links use safe schemes and expected hosts", () => {
  const links = [GOOGLE_MAPS_URL, GOOGLE_MAPS_EMBED_URL, BRAND_INFO.social.facebook, BRAND_INFO.social.instagram];
  if (ORDER_ONLINE_URL) links.push(ORDER_ONLINE_URL);
  for (const link of links) {
    assert.equal(new URL(link).protocol, "https:", `${link} must be https`);
  }
  assert.match(BRAND_INFO.phoneTel, /^\+[1-9]\d{7,14}$/, "phoneTel must be E.164 so tel: links stay inert");
  for (const host of [new URL(GOOGLE_MAPS_URL).host, new URL(GOOGLE_MAPS_EMBED_URL).host]) {
    assert.equal(host, "www.google.com");
  }
});

test("source index.html passes the CSP lint (JSON-LD and commented placeholders are not executable)", () => {
  assert.doesNotThrow(() => assertHtmlCompatibleWithCsp(read("index.html")));
});

test("CSP lint rejects markup the policy would block or that would bypass review", () => {
  const page = (body: string) => `<!doctype html><html><head><meta charset="UTF-8"></head><body>${body}</body></html>`;
  const cases: [string, RegExp][] = [
    ["<script>window.__t = 1</script>", /unapproved inline script/],
    ["<img src=x onerror=\"window.__t = 1\">", /inline event handler/],
    ["<a href=\"javascript:window.__t=1\">x</a>", /javascript: URL/],
    ["<script src=\"https://cdn.example.com/x.js\"></script>", /cross-origin/],
    ["<script src=\"//cdn.example.com/x.js\"></script>", /cross-origin/],
    ["<script type=\"application/ld+json\">{not json</script>", /not valid JSON/],
    ["<meta http-equiv=\"Content-Security-Policy\" content=\"default-src *\">", /already declares a CSP/],
  ];
  for (const [markup, expected] of cases) {
    assert.throws(() => assertHtmlCompatibleWithCsp(page(markup)), expected, markup);
  }
  assert.doesNotThrow(() => assertHtmlCompatibleWithCsp(page("<!-- <script>window.__t = 1</script> -->")));
});

test("CSP meta is injected right after <meta charset>, ahead of every resource", () => {
  const html = injectCspMeta(read("index.html"));
  const charset = html.search(/<meta charset/i);
  const csp = html.indexOf('<meta http-equiv="Content-Security-Policy"');
  assert.ok(charset >= 0 && csp > charset, "CSP meta must follow the charset declaration");
  assert.ok(csp < 1024, "keep the CSP meta (and charset) inside the first 1024 bytes");
  for (const tag of ["<script", "<link", "<style", "<img"]) {
    const at = html.indexOf(tag);
    assert.ok(at === -1 || at > csp, `${tag} appears before the CSP meta`);
  }
});

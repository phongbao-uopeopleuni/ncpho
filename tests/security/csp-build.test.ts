import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { build, type Plugin, type Rollup } from "vite";
import { META_CSP, assertHtmlCompatibleWithCsp } from "../../security/csp";

const root = fileURLToPath(new URL("../../", import.meta.url));

// In-memory production build: nothing is written to dist/ or anywhere else.
async function buildInMemory(extraPlugins: Plugin[] = []) {
  const result = await build({
    root,
    configFile: `${root}vite.config.ts`,
    logLevel: "silent",
    plugins: extraPlugins,
    build: { write: false },
  });
  return (Array.isArray(result) ? result : [result as Rollup.RollupOutput]).flatMap((r) => r.output);
}

const sourceOf = (file: Rollup.OutputChunk | Rollup.OutputAsset) =>
  file.type === "chunk" ? file.code : typeof file.source === "string" ? file.source : Buffer.from(file.source).toString("utf8");

test("production build ships the CSP meta, no inline JS, no source maps and no server secrets", async () => {
  const canaries = {
    GEMINI_API_KEY: `AIza${randomUUID().replace(/-/g, "").padEnd(35, "x").slice(0, 35)}`,
    VERCEL_OIDC_TOKEN: `canary-oidc-${randomUUID()}`,
    SECURITY_ALERT_WEBHOOK_URL: `https://hooks.example.invalid/${randomUUID()}`,
  };
  const previous = Object.fromEntries(Object.keys(canaries).map((k) => [k, process.env[k]]));
  Object.assign(process.env, canaries);
  try {
    const output = await buildInMemory();
    const html = sourceOf(output.find((o) => o.fileName === "index.html")!);

    assert.ok(html.includes(`<meta http-equiv="Content-Security-Policy" content="${META_CSP}">`), "CSP meta missing or altered");
    const csp = html.indexOf('http-equiv="Content-Security-Policy"');
    for (const tag of ["<script", "<link", "<style"]) {
      const at = html.indexOf(tag);
      assert.ok(at === -1 || at > csp, `${tag} precedes the CSP meta`);
    }
    // Same lint as the plugin, on the final HTML (minus the meta we injected ourselves).
    assert.doesNotThrow(() => assertHtmlCompatibleWithCsp(html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, "")));
    for (const path of ["menu.html", "vi/menu.html"]) {
      const menu = sourceOf(output.find(o => o.fileName === path)!);
      assert.equal((menu.match(/http-equiv="Content-Security-Policy"/g) || []).length, 1, path);
      assert.ok(menu.includes(META_CSP), `${path}: strict CSP missing`);
      assert.doesNotThrow(() => assertHtmlCompatibleWithCsp(menu.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, "")));
      assert.equal((menu.match(/data-menu-item=/g) || []).length, 151, `${path}: incomplete built menu`);
    }

    assert.deepEqual(output.filter((o) => o.fileName.endsWith(".map")).map((o) => o.fileName), [], "no source maps");
    for (const file of output) {
      const text = sourceOf(file);
      for (const [name, value] of Object.entries(canaries)) {
        assert.ok(!text.includes(value), `${name} leaked into ${file.fileName}`);
      }
    }
  } finally {
    for (const [k, v] of Object.entries(previous)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
});

test("build fails if anything injects an unapproved inline script into index.html", async () => {
  const injector: Plugin = {
    name: "test:inject-inline-script",
    transformIndexHtml: (html) => html.replace("</body>", "<script>window.__csp_canary = 1</script></body>"),
  };
  await assert.rejects(buildInMemory([injector]), /unapproved inline script/);
});

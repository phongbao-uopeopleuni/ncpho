import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MenuCatalog from "../../src/components/MenuCatalog";
import { menuCategories, menuDishes, menuStructuredData, safeJsonLd } from "../../src/data/menu";
import { menuPath, siteUrl } from "../../src/site";
import { renderMenuDocument } from "../../scripts/menu-pages";
import { migrateLegacyUrl } from "../../src/routing";

const source = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" })[c]!);

test("both languages retain all 151 entries, 147 options and 11 categories with identical prices", () => {
  const en = menuCategories("en");
  const vi = menuCategories("vi");
  assert.equal(en.length, 11);
  assert.deepEqual(en.map(c => c.id), vi.map(c => c.id));
  for (const lang of ["en", "vi"] as const) {
    assert.equal(menuDishes(lang).length, 151);
    assert.equal(menuDishes(lang).reduce((n, item) => n + Object.keys(item.variations || {}).length, 0), 147);
    assert.equal(new Set(menuDishes(lang).map(item => item.id)).size, 151);
  }
  assert.deepEqual(menuDishes("en").map(i => [i.id, i.menuCode, i.price, Object.values(i.variations || {})]),
    menuDishes("vi").map(i => [i.id, i.menuCode, i.price, Object.values(i.variations || {})]));
});

for (const lang of ["en", "vi"] as const) {
  test(`${lang}: initial HTML includes every dish, code, description, option and price without JavaScript`, () => {
    const html = renderToStaticMarkup(createElement(MenuCatalog, { lang }));
    assert.equal((html.match(/data-menu-item=/g) || []).length, 151);
    assert.ok(!html.includes('hidden=""'));
    for (const item of menuDishes(lang)) {
      const block = new RegExp(`<article[^>]*data-menu-item="${item.id}"[^>]*>([\\s\\S]*?)<\\/article>`).exec(html)?.[1];
      assert.ok(block, `${item.id} is missing`);
      for (const value of [item.name, item.menuCode, item.price, item.description].filter(Boolean) as string[]) {
        assert.ok(block.includes(escape(value)), `${item.id}: ${value} is missing`);
      }
      for (const [label, price] of Object.entries(item.variations || {})) {
        assert.ok(block.includes(escape(label)), `${item.id}: ${label}`);
        assert.ok(block.includes(price), `${item.id}: ${price}`);
      }
    }
    for (const category of menuCategories(lang)) for (const item of category.items) {
      if ("sectionLabel" in item) assert.ok(html.includes(escape(item.sectionLabel)));
    }
  });
  test(`${lang}: menu document has its own metadata, canonical and complete structured menu`, () => {
    const html = renderMenuDocument(source, lang);
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${siteUrl(menuPath(lang))}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/data-menu-item=/g) || []).length, 151);
    assert.ok(!html.includes("https://ncpho.com"));
    const schema = JSON.parse(/data-menu-schema-fallback[^>]*>([\s\S]*?)<\/script>/.exec(html)![1]);
    const sections = schema["@graph"][0].hasMenuSection;
    assert.equal(sections.length, 11);
    assert.equal(sections.flatMap(s => s.hasMenuItem).length, 151);
    for (const offer of sections.flatMap(s => s.hasMenuItem).flatMap(i => i.offers || [])) {
      assert.equal(offer.priceCurrency, "USD");
      assert.match(offer.price, /^\d+\.\d{2}$/);
    }
    assert.deepEqual(schema, menuStructuredData(lang));
    assert.equal((html.match(/<script type="application\/ld\+json"/g) || []).length, 1);
  });
}

test("category filtering keeps all source entries available and only exposes the chosen section", () => {
  const html = renderToStaticMarkup(createElement(MenuCatalog, { lang: "en", selectedCategory: "pho" }));
  assert.equal((html.match(/data-menu-item=/g) || []).length, 151);
  assert.equal((html.match(/ hidden=""/g) || []).length, 10);
  assert.match(html, /data-category="pho" aria-current="true"/);
});

test("old menu/gallery links migrate to clean routes and retain campaign parameters", () => {
  assert.equal(migrateLegacyUrl({ pathname: "/", search: "?utm_source=ads", hash: "#/#menu" }), "/menu?utm_source=ads");
  assert.equal(migrateLegacyUrl({ pathname: "/", search: "", hash: "#menu" }), "/menu");
  assert.equal(migrateLegacyUrl({ pathname: "/ncpho/", search: "", hash: "#/gallery" }, "/ncpho/"), "/ncpho/gallery");
  assert.equal(migrateLegacyUrl({ pathname: "/", search: "", hash: "#/#about" }), "/#about");
  assert.equal(migrateLegacyUrl({ pathname: "/menu", search: "", hash: "#menu-pho" }), null);
  assert.equal(migrateLegacyUrl({ pathname: "/", search: "", hash: "#//attacker.invalid/menu" }), null);
  assert.equal(migrateLegacyUrl({ pathname: "/", search: "", hash: "#//[invalid" }), null);
});

test("Vercel clean URLs serve static menu documents before the SPA fallback", () => {
  const config = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));
  assert.equal(config.cleanUrls, true);
  for (const rule of config.rewrites) {
    assert.ok(!rule.destination.endsWith('.html'), "cleanUrls rewrites must use extensionless destinations");
    const match = new RegExp(`^${rule.source}$`);
    for (const path of ["/menu", "/vi/menu", "/api/health", "/assets/app.js", "/Logo.png"]) {
      assert.ok(!match.test(path), `SPA fallback must not intercept ${path}`);
    }
    for (const path of ["/gallery", "/privacy", "/terms"]) assert.ok(match.test(path), path);
  }
});

test("structured data cannot break out into executable script markup", () => {
  assert.ok(!safeJsonLd({ name: '</script><script>alert(1)</script>\u2028' }).includes("<"));
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { BRAND_INFO, GOOGLE_MAPS_URL } from "../../src/constants";

const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const fallback = /<main\b[^>]*\bdata-app-fallback\b[^>]*>([\s\S]*?)<\/main>/.exec(html);

test("index.html ships a static fallback inside #root", () => {
  assert.ok(fallback, "missing <main data-app-fallback> block");
  assert.ok(html.indexOf('<div id="root">') < (fallback.index ?? -1), "fallback must live inside #root so React replaces it");
  assert.match(fallback[0], /class="app-fallback\b/, "fallback needs the delayed-reveal class");
  assert.match(fallback[1], /<noscript>/);
});

test("fallback contact details match BRAND_INFO", () => {
  const block = fallback?.[1] ?? "";
  assert.ok(block.includes(BRAND_INFO.name), "name");
  assert.ok(block.includes(BRAND_INFO.address), "address");
  assert.ok(block.includes(BRAND_INFO.phone), "phone");
  assert.ok(block.includes(`href="tel:${BRAND_INFO.phoneTel}"`), "tel link");
  assert.ok(block.includes(`href="${GOOGLE_MAPS_URL.replace(/&/g, "&amp;")}"`), "directions link");
  for (const { day, time } of BRAND_INFO.hours.en) {
    assert.ok(block.includes(`${day}: ${time}`), `hours "${day}: ${time}"`);
  }
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { checkLiveSite } from "../../scripts/check-live-site.mjs";

const origin = "https://restaurant.example/";
const js = '<script src="/assets/site.js"></script>';
const css = '<link rel="stylesheet" href="/assets/site.css">';
const page = assets => `<meta http-equiv="Content-Security-Policy" content="default-src 'none'">${assets}<main data-app-fallback>(252) 833-0239</main>`;
const requestFor = (html, stylesheet = {}) => async url => {
  if (url === origin) return new Response(html, { headers: { "Content-Type": "text/html" } });
  if (url.endsWith(".js")) return new Response('const restaurant = "NC PHO";', { headers: { "Content-Type": "text/javascript" } });
  return new Response("body {}", { status: stylesheet.status || 200, headers: { "Content-Type": stylesheet.type || "text/css" } });
};

test("live-site monitor accepts a page whose JavaScript and stylesheet both load", async () => {
  assert.deepEqual(await checkLiveSite(origin, requestFor(page(js + css))), []);
});
test("live-site monitor rejects an entirely missing stylesheet reference", async () => {
  const problems = await checkLiveSite(origin, requestFor(page(js)));
  assert.ok(problems.includes("no CSS stylesheet referenced"));
});
test("live-site monitor rejects an entirely missing JavaScript reference", async () => {
  const problems = await checkLiveSite(origin, requestFor(page(css)));
  assert.ok(problems.includes("no JS bundle referenced"));
});
test("live-site monitor rejects broken or incorrectly served stylesheets", async () => {
  const missing = await checkLiveSite(origin, requestFor(page(js + css), { status: 404 }));
  assert.ok(missing.some(problem => problem.includes("site.css returned HTTP 404")));
  const wrongType = await checkLiveSite(origin, requestFor(page(js + css), { type: "text/html" }));
  assert.ok(wrongType.some(problem => problem.includes('site.css served as "text/html"')));
});

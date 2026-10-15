import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ErrorBoundary from "../../src/components/ErrorBoundary";
import { BRAND_INFO } from "../../src/constants";

test("renders its children while nothing has failed", () => {
  assert.equal(renderToStaticMarkup(<ErrorBoundary><p>menu</p></ErrorBoundary>), "<p>menu</p>");
});

test("after a render error it shows a reload button and the restaurant's contact details", () => {
  const boundary = new ErrorBoundary({ children: <p>menu</p> });
  boundary.state = ErrorBoundary.getDerivedStateFromError();
  const html = renderToStaticMarkup(<>{boundary.render()}</>);

  assert.match(html, /role="alert"/);
  assert.match(html, /Reload/);
  assert.ok(html.includes(`href="tel:${BRAND_INFO.phoneTel}"`));
  assert.ok(html.includes(BRAND_INFO.address));
  assert.doesNotMatch(html, /<p>menu<\/p>/);
});

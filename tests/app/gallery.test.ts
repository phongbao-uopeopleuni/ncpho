import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { GALLERY_ITEMS, gallerySrcSet } from "../../src/data/gallery";

test("every gallery srcset candidate exists in public/", () => {
  for (const item of GALLERY_ITEMS) {
    const candidates = gallerySrcSet(item).split(", ").map((candidate) => candidate.split(" "));
    assert.deepEqual(candidates.map(([, width]) => width), ["360w", "720w", "1200w"], item.id);
    for (const [url] of candidates) {
      // Missing files mean scripts/optimize-special-meals.py was not re-run after adding a photo.
      assert.ok(existsSync(new URL(`../../public/${url.replace(/^\/+/, "")}`, import.meta.url)), `${item.id}: ${url}`);
    }
  }
});

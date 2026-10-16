import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import BlogJournal from "../../src/components/BlogJournal";
import {
  BLOG_POSTS, blogCopy, blogDish, blogGuides, blogImage, blogStories, relatedPosts, type BlogPost,
} from "../../src/data/blog";
import { menuDishes } from "../../src/data/menu";
import { blogPath, pathLanguage, siteUrl, translatedPath } from "../../src/site";
import { renderBlogDocument } from "../../scripts/blog-pages";

const source = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" })[c]!);
const allText = (post: BlogPost, lang: "en" | "vi") => {
  const { title, description, imageAlt, intro, sections } = post[lang];
  return [title, description, imageAlt, intro, ...sections.flatMap(s => [s.heading, ...s.body])].join("\n");
};

test("the journal has five numbered stories and ten menu guides with unique slugs", () => {
  assert.equal(BLOG_POSTS.length, 15);
  assert.deepEqual(blogStories().map(s => s.part), [1, 2, 3, 4, 5]);
  assert.equal(blogGuides().length, 10);
  assert.equal(new Set(BLOG_POSTS.map(p => p.slug)).size, 15);
  for (const post of BLOG_POSTS) {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(post.published, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(blogImage(post), `${post.slug}: photo`);
  }
});

test("every post is complete in English and Vietnamese, with matching structure", () => {
  for (const post of BLOG_POSTS) {
    for (const lang of ["en", "vi"] as const) {
      const copy = post[lang];
      for (const field of ["title", "description", "imageAlt", "intro"] as const) assert.ok(copy[field].trim(), `${post.slug} ${lang} ${field}`);
      assert.ok(copy.sections.length >= 3, `${post.slug} ${lang}: sections`);
      for (const section of copy.sections) assert.ok(section.heading && section.body.every(Boolean), `${post.slug} ${lang}: empty section`);
      assert.ok(copy.description.length <= 200, `${post.slug} ${lang}: description too long for search snippets`);
    }
    assert.equal(post.en.sections.length, post.vi.sections.length, `${post.slug}: section count differs`);
    assert.notEqual(post.en.title, post.vi.title, `${post.slug}: Vietnamese title not translated`);
  }
});

test("posts speak for NC Phở only: no other restaurant's name or city", () => {
  const banned = /\bEC\s*Ph|ecpho|Greenville/i;
  for (const post of BLOG_POSTS) {
    for (const lang of ["en", "vi"] as const) {
      const text = allText(post, lang);
      assert.ok(!banned.test(text), `${post.slug} ${lang}: ${banned.exec(text)?.[0]}`);
      assert.ok(text.includes("NC Phở"), `${post.slug} ${lang}: brand missing`);
    }
  }
  assert.ok(!banned.test(JSON.stringify(blogCopy, (_k, v) => typeof v === "function" ? v("x", 1) : v)));
});

test("every menu number quoted in a post exists on the menu, and each post cites its own dish", () => {
  const codes = new Set(menuDishes("en").map(item => item.menuCode));
  for (const post of BLOG_POSTS) {
    const code = blogDish(post, "en").item.menuCode!;
    assert.equal(blogDish(post, "vi").item.menuCode, code);
    const en = allText(post, "en");
    const vi = allText(post, "vi");
    assert.ok(en.includes(`No. ${code}`), `${post.slug}: en never names No. ${code}`);
    assert.ok(vi.includes(`số ${code}`), `${post.slug}: vi never names số ${code}`);
    const cited = [
      ...[...en.matchAll(/\bNos?\. (\d+(?:\.\d+)?)(?: (?:to|and) (?:No\. )?(\d+))?/g)].flatMap(m => [m[1], m[2]]),
      ...[...vi.matchAll(/số (\d+(?:\.\d+)?)(?: (?:đến|và) (\d+))?/g)].flatMap(m => [m[1], m[2]]),
      ...[...`${en}\n${vi}`.matchAll(/\b((?:S|TS|M)\d+(?:\.\d+)?)\b/g)].map(m => m[1]),
    ].filter(Boolean);
    for (const value of cited) assert.ok(codes.has(value), `${post.slug}: menu number ${value} does not exist`);
  }
});

test("related posts never repeat the current post and prefer the same kind", () => {
  for (const post of BLOG_POSTS) {
    const related = relatedPosts(post);
    assert.equal(related.length, 3);
    assert.ok(related.every(other => other.slug !== post.slug));
    assert.equal(related[0].kind, post.kind);
  }
});

for (const lang of ["en", "vi"] as const) {
  test(`${lang}: pre-rendered journal index links every post and carries its own metadata`, () => {
    const html = renderBlogDocument(source, lang);
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${siteUrl(blogPath(lang))}"`));
    assert.equal((html.match(/rel="alternate" hreflang=/g) || []).length, 3);
    for (const post of BLOG_POSTS) assert.ok(html.includes(`href="${blogPath(lang, post.slug)}"`), `${post.slug} not linked`);
    const schema = JSON.parse(/data-blog-schema-fallback[^>]*>([\s\S]*?)<\/script>/.exec(html)![1]);
    assert.equal(schema["@type"], "Blog");
    assert.equal(schema.blogPost.length, 15);
    assert.ok(!html.includes("data-home-schema"));
    assert.ok(!html.includes("https://ncpho.com"));
  });

  test(`${lang}: every pre-rendered post contains its full text, dish card and article schema`, () => {
    for (const post of BLOG_POSTS) {
      const html = renderBlogDocument(source, lang, post.slug);
      const { item } = blogDish(post, lang);
      assert.equal((html.match(/<h1\b/g) || []).length, 1, post.slug);
      assert.ok(html.includes(`rel="canonical" href="${siteUrl(blogPath(lang, post.slug))}"`), post.slug);
      assert.ok(html.includes('property="og:type" content="article"'), post.slug);
      for (const paragraph of [post[lang].intro, ...post[lang].sections.flatMap(s => s.body)]) {
        assert.ok(html.includes(escape(paragraph)), `${post.slug}: paragraph missing`);
      }
      assert.ok(html.includes(escape(item.name)), `${post.slug}: dish name missing`);
      const schema = JSON.parse(/data-blog-schema-fallback[^>]*>([\s\S]*?)<\/script>/.exec(html)![1]);
      const [article, breadcrumbs] = schema["@graph"];
      assert.equal(article["@type"], "BlogPosting");
      assert.equal(article.headline, post[lang].title);
      assert.equal(article.inLanguage, lang);
      assert.equal(breadcrumbs.itemListElement.length, 3);
      assert.equal((html.match(/<script type="application\/ld\+json"/g) || []).length, 1);
    }
  });
}

test("filter buttons render only in the browser; the static page lists every guide", () => {
  const render = (props: object) => renderToStaticMarkup(createElement(StaticRouter, { location: "/blog" },
    createElement(BlogJournal, { lang: "en", ...props })));
  const staticHtml = render({});
  assert.ok(!staticHtml.includes("aria-pressed"));
  const filtered = render({ topic: "vegetarian", onTopic: () => {} });
  assert.equal((filtered.match(/aria-pressed="true"/g) || []).length, 1);
  for (const guide of blogGuides()) {
    assert.ok(staticHtml.includes(`href="/blog/${guide.slug}"`));
    assert.equal(filtered.includes(`href="/blog/${guide.slug}"`), guide.topic === "vegetarian", guide.slug);
  }
});

test("blog and menu URLs carry their language; other pages do not", () => {
  assert.equal(pathLanguage("/blog"), "en");
  assert.equal(pathLanguage("/blog/vegetarian-pho-washington-nc"), "en");
  assert.equal(pathLanguage("/vi/blog/vegetarian-pho-washington-nc"), "vi");
  assert.equal(pathLanguage("/vi/menu"), "vi");
  assert.equal(pathLanguage("/gallery"), null);
  assert.equal(pathLanguage("/blog/a/b"), null);
  assert.equal(translatedPath("/blog/bo-kho-beef-stew-washington-nc", "vi"), "/vi/blog/bo-kho-beef-stew-washington-nc");
  assert.equal(translatedPath("/vi/blog", "en"), "/blog");
  assert.equal(translatedPath("/vi/menu", "en"), "/menu");
});

test("Vercel serves pre-rendered blog documents instead of the SPA fallback", () => {
  const config = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));
  for (const rule of config.rewrites) {
    const match = new RegExp(`^${rule.source}$`);
    for (const path of ["/blog", "/vi/blog", ...BLOG_POSTS.flatMap(p => [blogPath("en", p.slug), blogPath("vi", p.slug)])]) {
      assert.ok(!match.test(path), `SPA fallback must not intercept ${path}`);
    }
    for (const path of ["/gallery", "/privacy", "/blogger"]) assert.ok(match.test(path), path);
  }
});

test("sitemap.xml lists every journal page in both languages", () => {
  const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
  for (const lang of ["en", "vi"] as const) {
    assert.ok(sitemap.includes(`<loc>${siteUrl(blogPath(lang))}</loc>`), `${lang} index`);
    for (const post of BLOG_POSTS) assert.ok(sitemap.includes(`<loc>${siteUrl(blogPath(lang, post.slug))}</loc>`), `${lang} ${post.slug}`);
  }
});

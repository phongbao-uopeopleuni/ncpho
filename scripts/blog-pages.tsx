import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import type { Plugin } from "vite";
import BlogArticle from "../src/components/BlogArticle";
import BlogJournal from "../src/components/BlogJournal";
import { BLOG_POSTS, blogCopy, blogImageUrl, blogIndexStructuredData, blogPostStructuredData, findBlogPost } from "../src/data/blog";
import { safeJsonLd } from "../src/data/menu";
import { blogPath, siteUrl } from "../src/site";
import type { Language } from "../src/constants";
import { assertHtmlCompatibleWithCsp } from "../security/csp";

const escape = (text: string) => text.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Every journal page is emitted as complete HTML at build time, like the menu: readable without JavaScript. */
export function renderBlogDocument(template: string, lang: Language, slug?: string, base = "/"): string {
  const post = slug === undefined ? undefined : findBlogPost(slug);
  if (slug !== undefined && !post) throw new Error(`Unknown blog post: ${slug}`);
  const path = blogPath(lang, slug);
  const copy = post ? post[lang] : blogCopy[lang];
  const title = `${copy.title} | NC Phở`;
  const url = siteUrl(path);
  const image = post ? blogImageUrl(post) : siteUrl("/Logo.png");
  const schema = post ? blogPostStructuredData(post, lang) : blogIndexStructuredData(lang);
  const page = post ? createElement(BlogArticle, { lang, post }) : createElement(BlogJournal, { lang });
  const markup = renderToStaticMarkup(createElement(StaticRouter, { location: path, basename: base.replace(/\/$/, "") || "/" }, page));
  const link = (target: string) => `${base}${target.slice(1)}`;
  const nav = `<nav class="menu-static-nav" aria-label="${lang === "en" ? "Site navigation" : "Điều hướng"}"><a href="${base}">${lang === "en" ? "Home" : "Trang chủ"}</a><a href="${link(blogPath(lang))}">${escape(blogCopy[lang].journal)}</a><a href="${link(blogPath("en", slug))}">EN</a><a href="${link(blogPath("vi", slug))}">VN</a></nav>`;
  const root = `<div id="root">${nav}<main>${markup}</main></div>`;
  if (!template.includes("<!--app-shell:start-->") || !template.includes("<!--app-shell:end-->")) throw new Error("Missing app shell markers for blog pre-rendering");
  let html = template
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<!--app-shell:start-->[\s\S]*?<!--app-shell:end-->/, () => `<!--app-shell:start-->${root}<!--app-shell:end-->`)
    .replace(/<script\b[^>]*\bdata-home-schema[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<(title|meta|link)\b[^>]*\bdata-seo-fallback[^>]*>(?:[^<]*<\/title>)?/gi, "");
  const fallback = 'data-seo-fallback="true"';
  const alternates = (["en", "vi", "x-default"] as const)
    .map(language => `<link ${fallback} rel="alternate" hreflang="${language}" href="${siteUrl(blogPath(language === "vi" ? "vi" : "en", slug))}">`).join("\n    ");
  const head = `<title ${fallback}>${escape(title)}</title>
    <meta ${fallback} name="description" content="${escape(copy.description)}">
    <link ${fallback} rel="canonical" href="${url}">
    ${alternates}
    <meta ${fallback} property="og:type" content="${post ? "article" : "website"}">
    <meta ${fallback} property="og:site_name" content="NC Phở">
    <meta ${fallback} property="og:title" content="${escape(title)}">
    <meta ${fallback} property="og:description" content="${escape(copy.description)}">
    <meta ${fallback} property="og:url" content="${url}">
    <meta ${fallback} property="og:image" content="${image}">
    <meta ${fallback} name="twitter:card" content="summary_large_image">
    <meta ${fallback} name="twitter:title" content="${escape(title)}">
    <meta ${fallback} name="twitter:description" content="${escape(copy.description)}">
    <meta ${fallback} name="twitter:image" content="${image}">
    <script type="application/ld+json" data-blog-schema-fallback data-blog-path="${path}">${safeJsonLd(schema)}</script>`;
  html = html.replace("</head>", () => `${head}\n</head>`);
  // Keep the strict existing policy; the only inline script is inert JSON-LD.
  assertHtmlCompatibleWithCsp(html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, ""));
  return html;
}

export function blogPagesPlugin(): Plugin {
  let base = "/";
  return {
    name: "ncpho:blog-pages", apply: "build", enforce: "post",
    configResolved(config) { base = config.base; },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset") throw new Error("Missing built index.html");
        const template = String(index.source);
        for (const lang of ["en", "vi"] as const) {
          for (const slug of [undefined, ...BLOG_POSTS.map(post => post.slug)]) {
            this.emitFile({ type: "asset", fileName: `${blogPath(lang, slug).slice(1)}.html`, source: renderBlogDocument(template, lang, slug, base) });
          }
        }
      },
    },
  };
}

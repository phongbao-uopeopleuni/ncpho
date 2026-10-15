import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Plugin } from "vite";
import MenuCatalog from "../src/components/MenuCatalog";
import { menuCopy, menuStructuredData, safeJsonLd } from "../src/data/menu";
import { menuPath, siteUrl } from "../src/site";
import type { Language } from "../src/constants";
import { assertHtmlCompatibleWithCsp } from "../security/csp";

const escape = (text: string) => text.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Full, readable menu HTML is emitted at build time, with no runtime SSR service. */
export function renderMenuDocument(template: string, lang: Language, base = "/"): string {
  const copy = menuCopy[lang];
  const title = `${copy.title} | NC PHO`;
  const url = siteUrl(menuPath(lang));
  const root = `<div id="root"><nav class="menu-static-nav" aria-label="${lang === "en" ? "Site navigation" : "Điều hướng"}"><a href="${base}">${lang === "en" ? "Home" : "Trang chủ"}</a><a href="${base}menu">EN</a><a href="${base}vi/menu">VN</a></nav><main>${renderToStaticMarkup(createElement(MenuCatalog, { lang }))}</main></div>`;
  if (!template.includes("<!--app-shell:start-->") || !template.includes("<!--app-shell:end-->")) throw new Error("Missing app shell markers for menu pre-rendering");
  let html = template
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<!--app-shell:start-->[\s\S]*?<!--app-shell:end-->/, () => `<!--app-shell:start-->${root}<!--app-shell:end-->`)
    .replace(/<script\b[^>]*\bdata-home-schema[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<(title|meta|link)\b[^>]*\bdata-seo-fallback[^>]*>(?:[^<]*<\/title>)?/gi, "");
  const fallback = 'data-seo-fallback="true"';
  const alternates = (["en", "vi", "x-default"] as const).map(language => `<link ${fallback} rel="alternate" hreflang="${language}" href="${siteUrl(menuPath(language === "vi" ? "vi" : "en"))}">`).join("\n");
  const head = `<title ${fallback}>${escape(title)}</title>
    <meta ${fallback} name="description" content="${escape(copy.description)}">
    <link ${fallback} rel="canonical" href="${url}">
    ${alternates}
    <meta ${fallback} property="og:type" content="website">
    <meta ${fallback} property="og:site_name" content="NC PHO">
    <meta ${fallback} property="og:title" content="${escape(title)}">
    <meta ${fallback} property="og:description" content="${escape(copy.description)}">
    <meta ${fallback} property="og:url" content="${url}">
    <meta ${fallback} property="og:image" content="${siteUrl("/Logo.png")}">
    <meta ${fallback} name="twitter:card" content="summary_large_image">
    <meta ${fallback} name="twitter:title" content="${escape(title)}">
    <meta ${fallback} name="twitter:description" content="${escape(copy.description)}">
    <meta ${fallback} name="twitter:image" content="${siteUrl("/Logo.png")}">
    <script type="application/ld+json" data-menu-schema-fallback data-menu-language="${lang}">${safeJsonLd(menuStructuredData(lang))}</script>`;
  html = html.replace("</head>", () => `${head}\n</head>`);
  // Keep the strict existing policy; the only inline script is inert JSON-LD.
  assertHtmlCompatibleWithCsp(html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, ""));
  return html;
}

export function menuPagesPlugin(): Plugin {
  let base = "/";
  return {
    name: "ncpho:menu-pages", apply: "build", enforce: "post",
    configResolved(config) { base = config.base; },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset") throw new Error("Missing built index.html");
        const template = String(index.source);
        for (const lang of ["en", "vi"] as const) {
          this.emitFile({ type: "asset", fileName: lang === "en" ? "menu.html" : "vi/menu.html", source: renderMenuDocument(template, lang, base) });
        }
      },
    },
  };
}

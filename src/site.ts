/** The public site stays on Vercel; GitHub is the source repository. */
export const SITE_URL = "https://ncpho-ten.vercel.app";
export const siteUrl = (path = "/") => new URL(path, SITE_URL).href;
export const menuPath = (lang: "en" | "vi") => lang === "vi" ? "/vi/menu" : "/menu";
export const blogPath = (lang: "en" | "vi", slug?: string) => `${lang === "vi" ? "/vi" : ""}/blog${slug ? `/${slug}` : ""}`;

/** Menu and blog pages carry their language in the URL, so each language is its own crawlable page. */
export function pathLanguage(pathname: string): "en" | "vi" | null {
  const match = /^(\/vi)?\/(?:menu|blog(?:\/[a-z0-9-]+)?)$/.exec(pathname);
  return match ? (match[1] ? "vi" : "en") : null;
}

/** The same page in the other language: /menu ↔ /vi/menu, /blog/pho ↔ /vi/blog/pho. */
export const translatedPath = (pathname: string, lang: "en" | "vi") =>
  `${lang === "vi" ? "/vi" : ""}${pathname.replace(/^\/vi(?=\/)/, "")}`;

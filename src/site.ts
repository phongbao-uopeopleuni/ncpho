/** The public site stays on Vercel; GitHub is the source repository. */
export const SITE_URL = "https://ncpho-ten.vercel.app";
export const siteUrl = (path = "/") => new URL(path, SITE_URL).href;
export const menuPath = (lang: "en" | "vi") => lang === "vi" ? "/vi/menu" : "/menu";

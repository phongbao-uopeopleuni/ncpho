/** Only known in-site routes are migrated; URL data can never select an external origin. */
export function migrateLegacyUrl(location: Pick<Location, "pathname" | "search" | "hash">, base = "/"): string | null {
  const prefix = base.replace(/\/$/, "");
  const localPath = location.pathname.slice(prefix.length) || "/";
  const hash = location.hash;
  if ((localPath === "/" || localPath === "/index.html") && (hash === "#menu" || hash === "#/#menu")) {
    return `${prefix}/menu${location.search}`;
  }
  if (!hash.startsWith("#/")) return null;
  let legacy: URL;
  try { legacy = new URL(hash.slice(1), "https://legacy.invalid"); } catch { return null; }
  if (legacy.origin !== "https://legacy.invalid") return null;
  if (!["/", "/gallery", "/privacy", "/terms", "/menu", "/vi/menu"].includes(legacy.pathname)) return null;
  if (legacy.pathname === "/" && legacy.hash === "#menu") return `${prefix}/menu${location.search || legacy.search}`;
  return `${prefix}${legacy.pathname}${location.search || legacy.search}${legacy.hash}`;
}

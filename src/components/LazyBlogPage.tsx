import { useEffect, useState } from "react";
import type { Language } from "../constants";

type BlogPages = typeof import("./BlogPage");
let loaded: BlogPages | undefined;

/** The journal's code and articles load on demand, keeping them out of every other page's bundle. */
export const loadBlogPages = () => import("./BlogPage").then(module => (loaded = module));

/**
 * No Suspense here on purpose: a lazy() boundary would briefly replace pre-rendered blog HTML with its
 * fallback. main.tsx loads this chunk before the first render on blog URLs, so direct visits never wait.
 */
export default function LazyBlogPage({ page, lang }: { page: "index" | "post"; lang: Language }) {
  const [pages, setPages] = useState(loaded);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    if (!pages) loadBlogPages().then(setPages, setError);
  }, [pages]);
  if (error) throw error;
  if (!pages) return <div className="min-h-screen" aria-busy="true" />;
  const Page = page === "index" ? pages.BlogIndexPage : pages.BlogPostPage;
  return <Page lang={lang} />;
}

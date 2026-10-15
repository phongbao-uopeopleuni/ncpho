import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { type Language } from "../constants";
import { menuCategories, menuCopy } from "../data/menu";
import { menuPath, siteUrl } from "../site";
import MenuCatalog from "./MenuCatalog";
import SEO from "./SEO";

export default function MenuPage({ lang }: { lang: Language }) {
  const { hash, search, pathname } = useLocation();
  const navigate = useNavigate();
  const id = hash.replace(/^#menu-/, "").replace(/^#/, "");
  const selected = id === "all" || menuCategories(lang).some(c => c.id === id) ? id : "appetizers";
  const copy = menuCopy[lang];
  useEffect(() => {
    // Static JSON-LD is retained on direct loads. Microdata below covers client-side
    // navigation and language changes without writing script text (a Trusted Types sink).
    document.querySelectorAll('[data-menu-schema-fallback]').forEach(element => {
      if (element.getAttribute('data-menu-language') !== lang) element.remove();
    });
  }, [lang]);
  useEffect(() => {
    const layout = document.querySelector<HTMLElement>(".menu-layout");
    if (layout && layout.getBoundingClientRect().top < 80) {
      window.scrollTo({ top: window.scrollY + layout.getBoundingClientRect().top - 88, behavior: "instant" });
    }
  }, [hash]);
  return <>
    <SEO title={copy.title} titleBrand="NC PHO" description={copy.description} lang={lang}
      canonical={siteUrl(menuPath(lang))} image={siteUrl("/Logo.png")} />
    <Helmet>
      <link rel="alternate" hrefLang="en" href={siteUrl(menuPath("en"))} />
      <link rel="alternate" hrefLang="vi" href={siteUrl(menuPath("vi"))} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl(menuPath("en"))} />
    </Helmet>
    <MenuCatalog lang={lang} selectedCategory={selected} onSelectCategory={category => {
      navigate({ pathname, search, hash: category === "all" ? "#all" : `#menu-${category}` });
    }} />
  </>;
}

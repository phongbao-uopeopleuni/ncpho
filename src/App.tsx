/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MapPin, Phone, ShoppingBag } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import MenuPage from "./components/MenuPage";
import { menuPath, siteUrl } from "./site";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import GalleryPage from "./components/GalleryPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import SEO from "./components/SEO";
import { BRAND_INFO, GOOGLE_MAPS_URL, Language, ORDER_ONLINE_URL } from "./constants";

function Home({ lang }: { lang: Language }) {
  return (
    <>
      <SEO
        title={lang === "en" ? "Vietnamese Restaurant & Hot Soup in Washington, NC" : "Phở Việt và súp nóng tại Washington, NC"}
        titleBrand="NC PHO"
        description={
          lang === "en"
            ? "Find NC PHO in Washington, NC for Vietnamese phở, hot soup and fresh favorites when searching for food near me or a restaurant near me."
            : "Thưởng thức phở Việt, súp nóng và các món ngon tại NC PHO, Washington, NC. Ghé nhà hàng tại 1507 Carolina Ave để trải nghiệm hương vị Việt."
        }
        lang={lang}
      />
      <Hero lang={lang} />
      <About lang={lang} />
      <MenuSection lang={lang} />
      <Contact lang={lang} />
    </>
  );
}

export default function App() {
  const { pathname, hash, search, key } = useLocation();
  const [preferredLang, setPreferredLang] = useState<Language>(() => pathname === "/vi/menu" ? "vi" : "en");
  const navigate = useNavigate();
  const isMenuPage = pathname === "/menu" || pathname === "/vi/menu";
  const lang: Language = isMenuPage ? (pathname === "/vi/menu" ? "vi" : "en") : preferredLang;
  const setLang = (next: Language) => {
    setPreferredLang(next);
    if (isMenuPage) navigate({ pathname: menuPath(next), search, hash });
  };

  useEffect(() => {
    document.documentElement.lang = lang === "vi" ? "vi" : "en";
  }, [lang]);

  // Home section links scroll on click; menu categories filter in place.
  useEffect(() => {
    // Menu category links filter in place; moving the whole page makes the sidebar jump.
    if ((pathname === "/menu" || pathname === "/vi/menu") && hash) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (!hash) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const id = hash.slice(1);
    const run = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior });
      }
    };
    let frame = requestAnimationFrame(() => { frame = requestAnimationFrame(run); });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return (
    <div className="flex flex-col min-h-screen" itemScope itemType="https://schema.org/Restaurant" itemID={siteUrl("/#restaurant")}>
      <meta itemProp="name" content={BRAND_INFO.name} />
      <meta itemProp="url" content={siteUrl()} />
      <meta itemProp="hasMenu" content={siteUrl(`${menuPath(lang)}#restaurant-menu`)} />
      <Navbar lang={lang} setLang={setLang} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/menu" element={<MenuPage lang="en" />} />
          <Route path="/vi/menu" element={<MenuPage lang="vi" />} />
          <Route path="/gallery" element={<GalleryPage lang={lang} />} />
          <Route path="/privacy" element={<PrivacyPolicy lang={lang} />} />
          <Route path="/terms" element={<TermsOfService lang={lang} />} />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </main>

      {!isMenuPage && <nav
        className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-2.5"
        aria-label={lang === "en" ? "Quick actions" : "Thao tác nhanh"}
      >
        {ORDER_ONLINE_URL ? (
          <>
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === "en" ? "Order Online" : "Đặt món"}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-accent-clay text-white shadow-[0_10px_30px_rgba(185,75,44,0.25)] transition-transform hover:scale-105 hover:bg-primary active:scale-95 lg:h-13 lg:w-48 lg:justify-start lg:px-5"
            >
              <ShoppingBag size={18} className="text-white/90" strokeWidth={2.25} aria-hidden />
              <span className="sr-only lg:not-sr-only lg:flex-1 whitespace-nowrap text-center text-xs font-bold uppercase tracking-[0.13em]">
                {lang === "en" ? "Order Online" : "Đặt món"}
              </span>
            </a>

            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-primary text-white shadow-[0_10px_28px_rgba(27,67,50,0.25)] transition-transform hover:scale-105 hover:bg-[#123326] active:scale-95 lg:h-13 lg:w-42 lg:justify-start lg:px-5"
              aria-label={lang === "en" ? "Call Us" : "Gọi ngay"}
            >
              <Phone size={18} className="text-accent-gold" fill="currentColor" strokeWidth={2.25} aria-hidden />
              <span className="sr-only lg:not-sr-only lg:flex-1 whitespace-nowrap text-center text-xs font-bold uppercase tracking-[0.13em]">
                {lang === "en" ? "Call Us" : "Gọi ngay"}
              </span>
            </a>
          </>
        ) : (
          // No online ordering yet: a single call button stands in for both "Order Online" and "Call Us".
          <a
            href={`tel:${BRAND_INFO.phoneTel}`}
            aria-label={lang === "en" ? `Call to order, ${BRAND_INFO.phone}` : `Gọi đặt món, ${BRAND_INFO.phone}`}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-accent-clay text-white shadow-[0_10px_30px_rgba(185,75,44,0.25)] transition-transform hover:scale-105 hover:bg-primary active:scale-95 lg:h-14 lg:w-56 lg:justify-start lg:px-5"
          >
            <Phone size={18} className="text-white/90" fill="currentColor" strokeWidth={2.25} aria-hidden />
            <span className="sr-only lg:not-sr-only lg:flex lg:flex-1 lg:flex-col lg:items-center lg:leading-tight">
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.13em]">
                {lang === "en" ? "Call to Order" : "Gọi đặt món"}
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold tabular-nums text-white/85">{BRAND_INFO.phone}</span>
            </span>
          </a>
        )}

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-bg-cream text-primary shadow-[0_10px_28px_rgba(27,67,50,0.18)] transition-transform hover:scale-105 hover:border-primary hover:bg-white active:scale-95 lg:h-13 lg:w-48 lg:justify-start lg:px-5"
          aria-label={lang === "en" ? "Directions" : "Chỉ đường"}
        >
          <MapPin size={18} className="text-accent-gold-text" strokeWidth={2.25} aria-hidden />
          <span className="sr-only lg:not-sr-only lg:flex-1 whitespace-nowrap text-center text-xs font-bold uppercase tracking-[0.13em]">
            {lang === "en" ? "Directions" : "Chỉ đường"}
          </span>
        </a>
      </nav>}

      <Footer lang={lang} />
    </div>
  );
}

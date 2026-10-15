/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MapPin, Phone, ShoppingBag } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
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
  const [lang, setLang] = useState<Language>("en");
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang === "vi" ? "vi" : "en";
  }, [lang]);

  // Scroll to hash section on home (/#menu, /#about, etc.) or to top otherwise.
  useEffect(() => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/gallery" element={<GalleryPage lang={lang} />} />
          <Route path="/privacy" element={<PrivacyPolicy lang={lang} />} />
          <Route path="/terms" element={<TermsOfService lang={lang} />} />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </main>

      <nav
        className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-2.5"
        aria-label={lang === "en" ? "Quick actions" : "Thao tác nhanh"}
      >
        <a
          href={ORDER_ONLINE_URL || undefined}
          target={ORDER_ONLINE_URL ? "_blank" : undefined}
          rel={ORDER_ONLINE_URL ? "noopener noreferrer" : undefined}
          aria-disabled={!ORDER_ONLINE_URL}
          aria-label={lang === "en" ? "Order Online" : "Đặt món"}
          title={ORDER_ONLINE_URL ? undefined : lang === "en" ? "Online ordering coming soon" : "Liên kết đặt món sẽ sớm được cập nhật"}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-accent-clay text-white shadow-[0_10px_30px_rgba(185,75,44,0.25)] transition-transform lg:h-13 lg:w-48 lg:justify-start lg:px-5 ${ORDER_ONLINE_URL ? "hover:scale-105 hover:bg-primary active:scale-95" : "cursor-not-allowed"}`}
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
      </nav>

      <Footer lang={lang} />
    </div>
  );
}

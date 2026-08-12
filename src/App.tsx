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
        title={lang === "en" ? "Home" : "Trang chủ"}
        description={
          lang === "en"
            ? `Authentic Vietnamese Phở in ${BRAND_INFO.location}. Slow-cooked broth, fresh ingredients.`
            : BRAND_INFO.story.content.vi
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
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang === "vi" ? "vi" : "en";
  }, [lang]);

  // Scroll to hash section on home (/#menu, /#about, etc.) or to top otherwise.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const id = hash.slice(1);
    const run = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const frame = requestAnimationFrame(() => requestAnimationFrame(run));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

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
          title={ORDER_ONLINE_URL ? undefined : lang === "en" ? "Online ordering coming soon" : "Liên kết đặt món sẽ sớm được cập nhật"}
          className={`flex h-12 w-44 items-center rounded-full border-2 border-white/80 bg-accent-gold-text px-4 text-white shadow-[0_10px_30px_rgba(140,109,31,0.28)] transition-transform sm:h-13 sm:w-48 sm:px-5 ${ORDER_ONLINE_URL ? "hover:scale-105 hover:bg-primary active:scale-95" : "cursor-not-allowed"}`}
        >
          <ShoppingBag size={18} className="text-white/90" strokeWidth={2.25} aria-hidden />
          <span className="flex-1 whitespace-nowrap text-center text-[11px] font-bold uppercase tracking-[0.13em] sm:text-xs">
            {lang === "en" ? "Order Online" : "Đặt món"}
          </span>
        </a>

        <a
          href={`tel:${BRAND_INFO.phoneTel}`}
          className="flex h-12 w-38 items-center rounded-full border-2 border-white/70 bg-primary px-4 text-white shadow-[0_10px_28px_rgba(27,67,50,0.25)] transition-transform hover:scale-105 hover:bg-[#123326] active:scale-95 sm:h-13 sm:w-42 sm:px-5"
          aria-label={lang === "en" ? "Call Us" : "Gọi ngay"}
        >
          <Phone size={18} className="text-accent-gold" fill="currentColor" strokeWidth={2.25} aria-hidden />
          <span className="flex-1 whitespace-nowrap text-center text-[11px] font-bold uppercase tracking-[0.13em] sm:text-xs">
            {lang === "en" ? "Call Us" : "Gọi ngay"}
          </span>
        </a>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-44 items-center rounded-full border-2 border-primary/20 bg-bg-cream px-4 text-primary shadow-[0_10px_28px_rgba(27,67,50,0.18)] transition-transform hover:scale-105 hover:border-primary hover:bg-white active:scale-95 sm:h-13 sm:w-48 sm:px-5"
          aria-label={lang === "en" ? "Directions" : "Chỉ đường"}
        >
          <MapPin size={18} className="text-accent-gold-text" strokeWidth={2.25} aria-hidden />
          <span className="flex-1 whitespace-nowrap text-center text-[11px] font-bold uppercase tracking-[0.13em] sm:text-xs">
            {lang === "en" ? "Directions" : "Chỉ đường"}
          </span>
        </a>
      </nav>

      <Footer lang={lang} />
    </div>
  );
}

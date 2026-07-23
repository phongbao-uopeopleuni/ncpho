/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
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
import { Language, BRAND_INFO } from "./constants";

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

      {/* Floating Call Button for Mobile */}
      <a
        href={`tel:${BRAND_INFO.phoneTel}`}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-primary text-white p-4 rounded-full shadow-2xl border-2 border-white animate-bounce flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>

      <Footer lang={lang} />
    </div>
  );
}

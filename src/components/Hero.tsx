/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { BRAND_INFO, Language } from "../constants";
import { menuPath } from "../site";

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="hero-warmth relative isolate overflow-hidden scroll-mt-24 pb-24 pt-24 sm:pt-32 lg:flex lg:min-h-svh lg:items-center lg:scroll-mt-32 lg:py-32">
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 sm:gap-12 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <p className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-hero-ink sm:text-sm">
            <MapPin size={16} className="text-accent-clay" aria-hidden />
            {BRAND_INFO.location}
          </p>
          <h1 className="font-serif text-hero-green">
            <span className="hero-brand block font-bold">
              NC PHO
            </span>
            <span className="mt-5 block font-sans text-xs font-semibold tracking-[0.17em] text-accent-clay sm:text-sm lg:text-base">
              VIETNAMESE NOODLE HOUSE
            </span>
          </h1>
          <p className="mt-7 max-w-lg font-serif text-3xl italic leading-tight text-hero-ink sm:text-4xl">
            {lang === "en" ? "Comfort, by the bowl." : "Ấm lòng từ một tô phở."}
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-hero-muted sm:text-lg">
            {lang === "en"
              ? "Slow-simmered broth, fresh herbs, and a warm Vietnamese welcome in the heart of Washington, NC."
              : "Nước dùng hầm chậm, rau thơm tươi và một lời chào Việt Nam ấm áp ngay tại Washington, NC."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link to={menuPath(lang)} className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-accent-clay px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-clay/20 transition-colors hover:bg-hero-clay-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-clay sm:gap-3 sm:px-7 sm:text-base">
              {lang === "en" ? "Explore Menu" : "Xem thực đơn"}
              <ArrowRight size={19} aria-hidden />
            </Link>
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-hero-green/40 px-5 py-3.5 text-sm font-semibold text-hero-green transition-colors hover:border-hero-green hover:bg-hero-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-green sm:px-7 sm:text-base"
            >
              <Phone size={18} aria-hidden />
              {lang === "en" ? "Call Us" : "Gọi ngay"}
            </a>
          </div>
          <p className="mt-8 hidden border-t border-hero-green/15 pt-5 text-sm font-medium text-hero-muted sm:block">
            {lang === "en" ? "Phở · Bánh mì · Vietnamese favorites" : "Phở · Bánh mì · Hương vị Việt"}
          </p>
        </motion.div>
        <motion.figure
          initial={reducedMotion ? false : { opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[21rem] sm:max-w-[30rem] lg:mr-0 lg:max-w-[34rem]"
        >
          <div className="hero-photo-frame pointer-events-none absolute -inset-2 rotate-3 bg-hero-gold/65 sm:-inset-3" aria-hidden />
          <div className="hero-photo-frame relative aspect-square overflow-hidden bg-hero-gold shadow-2xl shadow-hero-ink/15">
            <img
              src={`${import.meta.env.BASE_URL}images/gallery/food-3.webp`}
              alt={lang === "en" ? "A steaming bowl of beef phở with fresh herbs, lime, and Vietnamese accompaniments" : "Tô phở bò nóng hổi cùng rau thơm, chanh và các món ăn kèm Việt Nam"}
              width="1200"
              height="1697"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-bottom"
            />
          </div>
          <figcaption className="absolute -bottom-6 -left-2 rounded-2xl bg-hero-surface px-5 py-4 shadow-xl shadow-hero-ink/10 sm:-left-5 sm:px-6">
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent-clay">
              {lang === "en" ? "A house favorite" : "Món ngon của nhà"}
            </span>
            <span className="mt-1.5 block font-serif text-xl font-bold text-hero-ink sm:text-2xl">
              {lang === "en" ? "Signature beef phở" : "Phở bò đặc biệt"}
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

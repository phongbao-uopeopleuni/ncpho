/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BRAND_INFO, Language } from "../constants";

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-bg-cream rounded-full overflow-hidden shadow-2xl relative z-10 border border-primary/5 p-3 sm:p-4">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                <img
                  src={`${import.meta.env.BASE_URL}home.webp`}
                  srcSet={`${import.meta.env.BASE_URL}home-360.webp 360w, ${import.meta.env.BASE_URL}home.webp 540w`}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  alt=""
                  className="absolute left-1/2 top-1/2 h-[92%] w-[92%] max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain object-center"
                  decoding="async"
                  width="540"
                  height="540"
                />
                {/* Wash + vignette: giữ tone kem/xanh mềm, chữ vẫn rõ */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-bg-cream/80 via-primary/20 to-bg-cream/70"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-white/25"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(255,250,245,0.55)_100%)]" aria-hidden />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/35" aria-hidden />
                <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-start px-6 text-center">
                  <span className="serif-italic mb-2 block text-2xl text-primary drop-shadow-[0_1px_12px_rgba(255,250,245,0.9)] md:text-3xl">
                    {lang === "en" ? "Our Story" : "Câu chuyện"}
                  </span>
                  <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-accent-gold-text drop-shadow-[0_1px_8px_rgba(255,250,245,0.85)]">
                    {lang === "en" ? "Traditional Roots" : "Nguồn cội truyền thống"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Oval decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-accent-gold/20 rounded-[100%] rotate-12 -z-0" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-pink/10 rounded-full blur-2xl animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8"
          >
            <div>
              <span className="text-accent-gold-text font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{lang === "en" ? "About Us" : "Về chúng tôi"}</span>
              <h2 className="text-4xl md:text-5xl text-primary font-bold leading-tight">
                {lang === "en" ? (
                  <>Authentic Vietnamese <span className="text-accent-gold-text italic font-serif">Taste</span> <br /> in Washington, NC</>
                ) : (
                  <>Hương vị Việt <span className="text-accent-gold-text italic font-serif">Đích thực</span> <br /> tại Washington, NC</>
                )}
              </h2>
            </div>
            
            <p className="text-text-dark/80 text-lg font-sans leading-relaxed">
              {BRAND_INFO.story.content[lang]}
            </p>
            
            <div className="grid grid-cols-2 gap-8 py-6 border-y border-primary/10">
              <div>
                <p className="text-accent-gold-text font-serif font-bold text-2xl mb-1">24+ {lang === "en" ? "Hours" : "Giờ"}</p>
                <p className="text-sm text-text-dark/70 font-sans uppercase tracking-wider">{lang === "en" ? "Slow Cooked Broth" : "Hầm nước dùng"}</p>
              </div>
              <div>
                <p className="text-accent-gold-text font-serif font-bold text-2xl mb-1">100%</p>
                <p className="text-sm text-text-dark/70 font-sans uppercase tracking-wider">{lang === "en" ? "Fresh Ingredients" : "Nguyên liệu tươi"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-primary">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-bg-cream" />
                ))}
              </div>
              <p className="text-sm font-sans font-medium">
                {lang === "en" ? "Highly rated by local community" : "Được đánh giá cao bởi cộng đồng địa phương"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { BRAND_INFO, GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, Language } from "../constants";

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  return (
    <section id="contact" className="section-padding bg-white scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <div className="bg-bg-cream rounded-3xl p-6 md:p-8 h-full flex flex-col items-center justify-center border border-primary/5">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin size={28} className="text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-primary mb-3 text-center">{lang === "en" ? "Where are we?" : "Chúng tôi ở đâu?"}</h2>
            <p className="text-center text-text-dark/70 mb-3 max-w-sm">
              {lang === "en"
                ? "Visit NC PHO in Washington, NC for hot soup, slow-simmered phở, fresh herbs and Vietnamese favorites."
                : "Ghé NC PHO tại Washington, NC để thưởng thức súp nóng, phở hầm chậm, rau thơm tươi và các món ngon Việt Nam."}
            </p>
            <p className="text-center text-text-dark/70 mb-5 max-w-sm">
              {lang === "en"
                ? `Find us at ${BRAND_INFO.address}. Easy access with convenient parking nearby.`
                : `Tìm chúng tôi tại ${BRAND_INFO.address}. Dễ dàng di chuyển và có chỗ đậu xe thuận tiện.`}
            </p>
            <div className="h-48 w-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-inner sm:h-52">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title={lang === "en" ? `Map to ${BRAND_INFO.name}` : `Bản đồ đến ${BRAND_INFO.name}`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-accent-gold-text px-8 py-3 text-center font-bold text-white shadow-lg shadow-accent-gold/20 transition-all hover:scale-105 hover:bg-primary"
            >
              {lang === "en" ? "Get Directions on Google Maps" : "Chỉ đường qua Google Maps"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

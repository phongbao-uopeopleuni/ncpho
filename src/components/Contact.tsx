/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Phone, Clock } from "lucide-react";
import { BRAND_INFO, GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, Language } from "../constants";

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const hours = BRAND_INFO.hours[lang];

  return (
    <section id="contact" className="section-padding bg-white scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl p-8 md:p-12 text-white flex flex-col"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold mb-5 tracking-tight">
                {lang === "en" ? "Visit Us" : "Ghé thăm chúng tôi"}
              </h2>
              <div className="mb-9 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full max-w-[16rem] sm:max-w-[17rem] md:max-w-[18rem] aspect-square"
                >
                  <div
                    className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent-gold/20 via-white/5 to-transparent blur-2xl"
                    aria-hidden
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/25">
                    <img
                      src={`${import.meta.env.BASE_URL}home.webp`}
                      srcSet={`${import.meta.env.BASE_URL}home-360.webp 360w, ${import.meta.env.BASE_URL}home.webp 540w`}
                      sizes="(min-width: 640px) 288px, 256px"
                      alt={lang === "en" ? "North Carolina Phở restaurant" : "Nhà hàng North Carolina Phở"}
                      className="h-full w-full object-contain object-center p-3 sm:p-4"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      width="540"
                      height="540"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-accent-gold/25"
                      aria-hidden
                    />
                  </div>
                </motion.div>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                    <MapPin className="text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{lang === "en" ? "Location" : "Vị trí"}</h3>
                    <p className="text-white/80">{BRAND_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                    <Phone className="text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{lang === "en" ? "Phone" : "Điện thoại"}</h3>
                    <p className="text-white/80">{BRAND_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                    <Clock className="text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{lang === "en" ? "Opening Hours" : "Giờ mở cửa"}</h3>
                    {hours.map((h) => (
                      <p key={h.day} className="text-white/80">{h.day}: {h.time}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="bg-bg-cream rounded-3xl p-8 h-full flex flex-col items-center justify-center border border-primary/5">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                   <MapPin size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 text-center">{lang === "en" ? "Where are we?" : "Chúng tôi ở đâu?"}</h3>
                <p className="text-center text-text-dark/70 mb-8 max-w-sm">
                  {lang === "en" 
                    ? `Find us at ${BRAND_INFO.address}. Easy access with convenient parking nearby.`
                    : `Tìm chúng tôi tại ${BRAND_INFO.address}. Dễ dàng di chuyển và có chỗ đậu xe thuận tiện.`}
                </p>
                <div className="h-72 w-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-inner">
                  <iframe
                    src={GOOGLE_MAPS_EMBED_URL}
                    title={lang === "en" ? "Map to North Carolina Phở" : "Bản đồ đến North Carolina Phở"}
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
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-accent-gold-text px-8 py-3 text-center font-bold text-white shadow-lg shadow-accent-gold/20 transition-all hover:scale-105 hover:bg-primary"
                >
                  {lang === "en" ? "Get Directions on Google Maps" : "Chỉ đường qua Google Maps"}
                </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

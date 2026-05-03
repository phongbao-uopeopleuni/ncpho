/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Phone, Clock } from "lucide-react";
import { BRAND_INFO, Language } from "../constants";

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
              <div className="mb-9 rounded-[1.75rem] sm:rounded-[2rem] bg-gradient-to-br from-white/[0.14] via-white/[0.07] to-white/[0.04] p-3 sm:p-4 md:p-5 ring-1 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <div className="overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/10">
                  <img
                    src={`${import.meta.env.BASE_URL}home.png`}
                    alt={lang === "en" ? "North Carolina Phở restaurant" : "Nhà hàng North Carolina Phở"}
                    className="block w-full max-h-[9.5rem] sm:max-h-[11rem] md:max-h-[12rem] rounded-3xl object-contain object-center"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                    <MapPin className="text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{lang === "en" ? "Location" : "Vị trí"}</h4>
                    <p className="text-white/70">{BRAND_INFO.address}</p>
                    <p className="text-white/70">{BRAND_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                    <Phone className="text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{lang === "en" ? "Phone" : "Điện thoại"}</h4>
                    <p className="text-white/70">{BRAND_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shadow-sm">
                    <Clock className="text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{lang === "en" ? "Opening Hours" : "Giờ mở cửa"}</h4>
                    {hours.map((h) => (
                      <p key={h.day} className="text-white/70">{h.day}: {h.time}</p>
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
                    ? "Located in the heart of downtown Washington, NC. Easy to find with ample parking space."
                    : "Tọa lạc tại trung tâm thành phố Washington, NC. Dễ dàng tìm thấy và có chỗ đậu xe rộng rãi."}
                </p>
                <div className="w-full h-64 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center">
                  <span className="serif-italic text-primary opacity-30 text-lg">{lang === "en" ? "Map loading..." : "Bản đồ đang tải..."}</span>
                </div>
                <button className="mt-8 bg-accent-gold text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-accent-gold/20 hover:scale-105 transition-all">
                  {lang === "en" ? "Get Directions on Google Maps" : "Chỉ đường qua Google Maps"}
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

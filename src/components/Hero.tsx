/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { BRAND_INFO, Language } from "../constants";

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden scroll-mt-24 pb-16 pt-24 md:scroll-mt-32 md:pb-24 md:pt-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-pink/5 rounded-full blur-3xl opacity-30" />
      
      {/* Bamboo Pattern (Visual mockup) */}
      <div className="absolute top-40 left-10 opacity-10 pointer-events-none hidden lg:block">
        <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0V400" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <path d="M100 50C120 40 150 70 100 100" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <path d="M100 150C80 140 50 170 100 200" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <path d="M100 250C120 240 150 270 100 300" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="serif-italic text-accent-gold-text text-lg md:text-xl mb-4 block tracking-wide">
            {BRAND_INFO.tagline[lang]}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary leading-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block"
            >
              NORTH CAROLINA
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-accent-gold-text italic"
            >
              Phở
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-text-dark/80 text-lg mb-10 font-sans"
          >
            {lang === "en" 
              ? "Experience refined traditional flavors in the heart of Washington, NC. Each bowl is a masterpiece, crafted with meticulous care and passion."
              : "Trải nghiệm hương vị truyền thống tinh tế tại trung tâm Washington, NC. Mỗi bát phở là một tác phẩm nghệ thuật, kết tinh từ sự tỉ mỉ và tâm huyết."}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Link to="/#menu" className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex justify-center">
              {lang === "en" ? "Explore Menu" : "Khám phá thực đơn"}
            </Link>
            <a 
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="w-full sm:w-auto border-2 border-primary text-primary px-10 py-4 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-all flex justify-center items-center gap-2"
            >
              <Phone size={20} />
              {lang === "en" ? "Call Us" : "Gọi cho chúng tôi"}
            </a>
          </motion.div>
        </motion.div>

        {/* Lotus Icon Mockup */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-20 flex w-full justify-center text-accent-pink opacity-20"
        >
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C12 2 10 14 12 14C14 14 12 2 12 2Z" />
            <path d="M12 14C14.5 14 20 18 20 18C20 18 14 18 12 14Z" />
            <path d="M12 14C9.5 14 4 18 4 18C4 18 10 18 12 14Z" />
            <path d="M12 14C12 14 18 10 18 10C18 10 14 12 12 14Z" />
            <path d="M12 14C12 14 6 10 6 10C6 10 10 12 12 14Z" />
          </svg>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center justify-center gap-2 text-primary opacity-50"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">
          {lang === "en" ? "Scroll Down" : "Cuộn xuống"}
        </span>
        <div className="w-px h-12 bg-primary/30" />
      </motion.div>
    </section>
  );
}

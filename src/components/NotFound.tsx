/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Home } from "lucide-react";
import { BRAND_INFO, Language } from "../constants";
import SEO from "./SEO";

interface NotFoundProps {
  lang: Language;
}

export default function NotFound({ lang }: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream section-padding">
      <SEO 
        title={lang === "en" ? "404 - Not Found" : "404 - Không tìm thấy trang"}
        description={lang === "en" ? "The page you are looking for does not exist." : "Trang bạn đang tìm kiếm không tồn tại."}
        lang={lang}
      />
      <div className="text-center">
        <h1 className="text-9xl font-serif font-bold text-primary opacity-10 mb-[-1.5rem]">404</h1>
        <div className="relative z-10">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            {lang === "en" ? "Oops! Page Lost" : "Rất tiếc! Trang đã lạc mất"}
          </h2>
          <p className="text-text-dark/60 mb-10 max-w-sm mx-auto">
            {lang === "en" 
              ? "It seems like the bowl of phở you're looking for has already been served." 
              : "Có vẻ như bát phở bạn đang tìm đã được phục vụ đi mất rồi."}
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20"
          >
            <Home size={18} />
            {lang === "en" ? "Back to Home" : "Quay lại trang chủ"}
          </motion.a>
        </div>
      </div>
    </div>
  );
}

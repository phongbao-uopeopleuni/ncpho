/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { BRAND_INFO, GOOGLE_MAPS_URL, Language } from "../constants";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const navLinks = BRAND_INFO.nav[lang];
  const hours = BRAND_INFO.hours[lang];

  return (
    <footer className="bg-bg-cream border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-12 mb-12">
          <div className="col-span-1 xl:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center bg-white">
                <span className="text-primary font-serif font-black text-xl italic">NC</span>
              </div>
              <p className="text-xl font-serif font-bold text-primary sm:text-2xl">
                {BRAND_INFO.name}
              </p>
            </div>
            <p className="text-text-dark/70 max-w-sm font-sans mb-6">
              {lang === "en" 
                ? "Proudly serving traditional Phở flavors to the Washington, NC community. Your satisfaction is our happiness."
                : "Tự hào mang đến hương vị Phở truyền thống cho cộng đồng Washington, NC. Sự hài lòng của bạn là niềm hạnh phúc của chúng tôi."}
            </p>
          </div>

          <div className="col-span-1 xl:col-span-2">
            <h2 className="font-bold text-primary uppercase tracking-widest text-xs mb-6">
              {lang === "en" ? "Visit Us" : "Ghé thăm chúng tôi"}
            </h2>
            <div className="space-y-5 text-sm font-sans text-text-dark/70">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-accent-gold-text" aria-hidden />
                <div>
                  <h3 className="font-bold text-primary mb-1">{lang === "en" ? "Location" : "Vị trí"}</h3>
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold-text transition-colors">
                    {BRAND_INFO.address}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-accent-gold-text" aria-hidden />
                <div>
                  <h3 className="font-bold text-primary mb-1">{lang === "en" ? "Phone" : "Điện thoại"}</h3>
                  <a href={`tel:${BRAND_INFO.phoneTel}`} className="hover:text-accent-gold-text transition-colors">
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-accent-gold-text" aria-hidden />
                <div>
                  <h3 className="font-bold text-primary mb-1">{lang === "en" ? "Opening Hours" : "Giờ mở cửa"}</h3>
                  {hours.map((h) => (
                    <p key={h.day}>{h.day}: {h.time}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-bold text-primary uppercase tracking-widest text-xs mb-6">
              {lang === "en" ? "Quick Links" : "Liên kết nhanh"}
            </h2>
            <ul className="space-y-4 text-text-dark/70 text-sm font-sans">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-accent-gold-text transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-primary uppercase tracking-widest text-xs mb-6">
              {lang === "en" ? "Legal" : "Pháp lý"}
            </h2>
            <ul className="space-y-4 text-text-dark/70 text-sm font-sans">
              <li><Link to="/privacy" className="hover:text-accent-gold-text transition-colors">{lang === "en" ? "Privacy Policy" : "Chính sách bảo mật"}</Link></li>
              <li><Link to="/terms" className="hover:text-accent-gold-text transition-colors">{lang === "en" ? "Terms of Service" : "Điều khoản dịch vụ"}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-text-dark/70 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} {BRAND_INFO.name}. ALL RIGHTS RESERVED.</p>
          <div className="flex w-full md:w-auto flex-col sm:flex-row justify-end gap-2 sm:gap-6 items-center md:ml-auto text-center md:text-right">
            <span>Washington, North Carolina</span>
            <a
              href="https://www.facebook.com/pbao280/"
              target="_blank"
              rel="noreferrer"
              className="normal-case tracking-normal text-accent-gold-text transition-colors hover:text-primary"
            >
              Website designed by PhongB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

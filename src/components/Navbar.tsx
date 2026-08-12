/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Menu as MenuIcon, X, Globe } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { BRAND_INFO, GOOGLE_MAPS_URL, Language } from "../constants";

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400/40 bg-white/30 text-neutral-800 backdrop-blur-sm transition-colors hover:border-neutral-800 hover:bg-neutral-900 hover:text-white"
    >
      {children}
    </a>
  );
}

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = BRAND_INFO.nav[lang];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/35 bg-bg-cream/40 shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset] backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* —— Desktop: chỉ thanh điều hướng (không logo ảnh) —— */}
        <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-3 md:gap-y-2 md:py-2.5 lg:gap-x-5">
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:gap-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900 transition-colors hover:text-primary lg:text-[11px] lg:tracking-[0.2em]"
              >
                {link.name}
              </Link>
            ))}

            <span className="hidden h-3 w-px shrink-0 bg-neutral-400/40 lg:block" aria-hidden />

            <div className="flex shrink-0 items-center gap-2">
              <SocialIconLink href={BRAND_INFO.social.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIconLink>
              <SocialIconLink href={GOOGLE_MAPS_URL} label="Google Maps">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </SocialIconLink>
              <SocialIconLink href={BRAND_INFO.social.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIconLink>
            </div>

            <Link
              to="/#menu"
              className="shrink-0 rounded-full border border-neutral-900 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              {lang === "en" ? "Explore" : "Khám phá"}
            </Link>

            <span className="hidden h-3 w-px shrink-0 bg-neutral-400/40 lg:block" aria-hidden />

            <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/40 bg-white/35 p-0.5 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-all ${
                  lang === "en"
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-all ${
                  lang === "vi"
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                VN
              </button>
            </div>
          </div>
        </div>

        {/* —— Mobile —— */}
        <div className="flex h-14 items-center justify-between md:hidden sm:h-16">
          <Link
            to="/"
            className="font-serif text-base font-semibold tracking-tight text-primary transition-colors hover:text-primary/80 sm:text-lg"
            onClick={() => setIsOpen(false)}
          >
            NC Phở
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
              className="flex items-center gap-1 rounded-full border border-white/40 bg-white/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-800 shadow-sm backdrop-blur-sm"
              aria-label={lang === "en" ? "EN, switch to Vietnamese" : "VN, chuyển sang tiếng Anh"}
            >
              <Globe size={12} strokeWidth={2} />
              {lang === "en" ? "EN" : "VN"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-2 text-neutral-900"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/30 bg-bg-cream/85 px-4 py-4 shadow-lg shadow-black/5 backdrop-blur-2xl md:hidden"
        >
          <div className="mx-auto flex max-w-md flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/#menu"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full border border-neutral-900 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900"
            >
              {lang === "en" ? "Explore menu" : "Khám phá thực đơn"}
            </Link>
            <div className="mt-4 flex justify-center gap-3 border-t border-neutral-100 pt-4">
              <SocialIconLink href={BRAND_INFO.social.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIconLink>
              <SocialIconLink href={GOOGLE_MAPS_URL} label="Google Maps">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </SocialIconLink>
              <SocialIconLink href={BRAND_INFO.social.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIconLink>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

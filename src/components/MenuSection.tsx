/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MENU_CATEGORIES, Language } from "../constants";
import { useState, useEffect, useRef } from "react";

interface MenuSectionProps {
  lang: Language;
}

export default function MenuSection({ lang }: MenuSectionProps) {
  const currentCategories = MENU_CATEGORIES[lang];
  const [activeCategory, setActiveCategory] = useState(currentCategories[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync active category if language changes
  useEffect(() => {
    if (!currentCategories.find(c => c.id === activeCategory)) {
      setActiveCategory(currentCategories[0].id);
    }
  }, [lang, currentCategories, activeCategory]);

  // Scroll active category into view
  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(`[data-active="true"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [activeCategory]);

  const activeItems = currentCategories.find((c) => c.id === activeCategory)?.items || [];

  return (
    <section id="menu" className="section-padding bg-bg-cream scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-accent-gold-text font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            {lang === "en" ? "Our Specials" : "Thực đơn đặc sắc"}
          </span>
          <h2 className="text-4xl md:text-5xl text-primary font-bold mb-4">
            {lang === "en" ? "Vietnamese Culinary Essence" : "Tinh hoa Ẩm thực Việt"}
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto" />
        </div>

        {/* Category pills: horizontal scroll with safe insets so first/last aren’t clipped */}
        <div className="mb-12">
          <div
            ref={scrollRef}
            className="no-scrollbar -mx-4 flex overflow-x-auto overflow-y-visible scroll-smooth pb-4 pl-4 pr-4 [-webkit-overflow-scrolling:touch] sm:-mx-6 sm:pl-6 sm:pr-6 md:mx-0 md:pl-2 md:pr-2 scroll-pl-3 scroll-pr-3 sm:scroll-pl-5 sm:scroll-pr-5"
          >
            <div className="flex w-max min-w-0 flex-nowrap items-center gap-3 py-0.5 pl-1 pr-1 sm:gap-3 sm:pl-2 sm:pr-2 md:mx-auto">
              {currentCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  data-active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-6 sm:px-8 py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white text-primary border border-primary/10 hover:bg-primary/5 shadow-sm"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <motion.div
          key={`${lang}-${activeCategory}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 min-h-[400px]"
        >
          {activeItems.map((item) => {
            if ("sectionLabel" in item && item.sectionLabel) {
              return (
                <div
                  key={item.id}
                  className={`col-span-full ${item.id === "ba-sec-wine" ? "mt-4 border-t border-primary/10 pt-10" : ""}`}
                >
                  <p className="border-b border-primary/15 pb-2 text-xs font-bold uppercase tracking-[0.28em] text-accent-gold-text">
                    {item.sectionLabel}
                  </p>
                </div>
              );
            }

            const variations =
              "variations" in item &&
              item.variations &&
              typeof item.variations === "object" &&
              Object.keys(item.variations).length > 0
                ? item.variations
                : null;

            const menuCode = "menuCode" in item && item.menuCode ? item.menuCode : null;
            const name = "name" in item ? item.name : "";
            const price = "price" in item ? item.price : undefined;

            return (
              <div key={item.id} className="group cursor-default">
                <div
                  className={`mb-2 flex gap-3 ${variations ? "items-start" : "items-baseline"} justify-between`}
                >
                  <h3 className="min-w-0 flex-1 text-xl font-serif font-bold text-primary transition-colors duration-300 group-hover:text-accent-gold-text">
                    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {menuCode ? (
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-accent-gold-text tabular-nums sm:text-xs">
                          {menuCode}
                        </span>
                      ) : null}
                      <span>{name}</span>
                    </span>
                  </h3>
                  {!variations && price ? (
                    <>
                      <div className="mx-4 mb-1 min-w-[2rem] flex-grow border-b border-dashed border-primary/10" />
                      <span className="shrink-0 text-lg font-sans font-bold text-accent-gold-text">{price}</span>
                    </>
                  ) : null}
                </div>

                {variations ? (
                  <ul className="mt-3 space-y-1.5 border-l-2 border-accent-gold/30 pl-4">
                    {Object.entries(variations).map(([optionLabel, optionPrice]) => (
                      <li key={optionLabel} className="flex justify-between gap-4 text-sm">
                        <span className="text-text-dark/75">{optionLabel}</span>
                        <span className="shrink-0 font-sans font-bold tabular-nums text-accent-gold-text">{optionPrice}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {"description" in item && item.description ? (
                  <p className="mt-2 text-sm font-sans leading-relaxed text-text-dark/70 transition-colors duration-300 group-hover:text-text-dark">
                    {item.description}
                  </p>
                ) : null}
              </div>
            );
          })}
        </motion.div>

        <div className="mt-20 p-10 bg-white rounded-3xl border border-primary/5 text-center shadow-xl shadow-primary/5">
          <p className="serif-italic text-primary text-xl mb-6">
            {lang === "en" 
              ? "\"A good bowl of phở is a harmony of five flavors, a warm greeting from the chef's soul.\""
              : "\"Bát phở ngon là sự kết hợp hài hòa giữa ngũ vị, là lời chào nồng hậu từ tâm hồn người đầu bếp.\""}
          </p>
          <button className="text-accent-gold-text font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8">
            {lang === "en" ? "View Full Menu" : "Xem toàn bộ thực đơn"}
          </button>
        </div>
      </div>
    </section>
  );
}

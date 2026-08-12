/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Coffee, Filter, Maximize2, Utensils, X } from "lucide-react";
import { Language } from "../constants";
import SEO from "./SEO";

interface GalleryPageProps {
  lang: Language;
}

type GalleryCategory = "Food" | "Drinks";

type GalleryItem = {
  id: string;
  image: string;
  category: GalleryCategory;
  title: Record<Language, string>;
};

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "food-3", image: "/images/gallery/food-3.webp", category: "Food", title: { en: "Signature Beef Phở", vi: "Phở Bò Đặc Biệt" } },
  { id: "food-28", image: "/images/gallery/food-28.webp", category: "Food", title: { en: "Oxtail Beef Phở", vi: "Phở Đuôi Bò" } },
  { id: "food-27", image: "/images/gallery/food-27.webp", category: "Food", title: { en: "Rib Beef Phở", vi: "Phở Sườn Bò" } },
  { id: "food-16", image: "/images/gallery/food-16.webp", category: "Food", title: { en: "Seafood Phở", vi: "Phở Hải Sản" } },
  { id: "food-23", image: "/images/gallery/food-23.webp", category: "Food", title: { en: "Spicy Beef Noodle Soup", vi: "Bún Bò Cay" } },
  { id: "food-21", image: "/images/gallery/food-21.webp", category: "Food", title: { en: "Chicken Noodle Soup", vi: "Phở Gà" } },
  { id: "food-18", image: "/images/gallery/food-18.webp", category: "Food", title: { en: "Vegetable Phở", vi: "Phở Rau Củ" } },
  { id: "food-22", image: "/images/gallery/food-22.webp", category: "Food", title: { en: "Wonton Egg Noodle Soup", vi: "Mì Hoành Thánh" } },
  { id: "food-15", image: "/images/gallery/food-15.webp", category: "Food", title: { en: "Beef Stew with Bread", vi: "Bò Kho Bánh Mì" } },
  { id: "food-2", image: "/images/gallery/food-2.webp", category: "Food", title: { en: "Vietnamese Bánh Mì", vi: "Bánh Mì Việt Nam" } },
  { id: "food-19", image: "/images/gallery/food-19.webp", category: "Food", title: { en: "Lemongrass Beef Vermicelli", vi: "Bún Bò Sả" } },
  { id: "food-20", image: "/images/gallery/food-20.webp", category: "Food", title: { en: "Grilled Chicken Vermicelli", vi: "Bún Gà Nướng Chả Giò" } },
  { id: "food-1", image: "/images/gallery/food-1.webp", category: "Food", title: { en: "Crispy Egg Noodles", vi: "Mì Xào Giòn" } },
  { id: "food-13", image: "/images/gallery/food-13.webp", category: "Food", title: { en: "Chow Fun Noodles", vi: "Hủ Tiếu Xào" } },
  { id: "food-9", image: "/images/gallery/food-9.webp", category: "Food", title: { en: "Chicken Pad Thai", vi: "Pad Thái Gà" } },
  { id: "food-14", image: "/images/gallery/food-14.webp", category: "Food", title: { en: "House Special Fried Rice", vi: "Cơm Chiên Đặc Biệt" } },
  { id: "food-10", image: "/images/gallery/food-10.webp", category: "Food", title: { en: "House Clay Pot", vi: "Cơm Thố Đặc Biệt" } },
  { id: "food-11", image: "/images/gallery/food-11.webp", category: "Food", title: { en: "Shaking Beef", vi: "Bò Lúc Lắc" } },
  { id: "food-17", image: "/images/gallery/food-17.webp", category: "Food", title: { en: "Shaking Tofu", vi: "Đậu Hũ Lúc Lắc" } },
  { id: "food-4", image: "/images/gallery/food-4.webp", category: "Food", title: { en: "Sesame Chicken", vi: "Gà Mè" } },
  { id: "food-26", image: "/images/gallery/food-26.webp", category: "Food", title: { en: "House Chicken Favorites", vi: "Các Món Gà Đặc Biệt" } },
  { id: "food-8", image: "/images/gallery/food-8.webp", category: "Food", title: { en: "Five Spice Chicken", vi: "Gà Ngũ Vị" } },
  { id: "food-6", image: "/images/gallery/food-6.webp", category: "Food", title: { en: "Grilled Beef and Shrimp", vi: "Bò Tôm Nướng" } },
  { id: "food-7", image: "/images/gallery/food-7.webp", category: "Food", title: { en: "Grilled Pork Chop and Eggs", vi: "Cơm Sườn Trứng" } },
  { id: "food-5", image: "/images/gallery/food-5.webp", category: "Food", title: { en: "Papaya Salad", vi: "Gỏi Đu Đủ" } },
  { id: "food-12", image: "/images/gallery/food-12.webp", category: "Food", title: { en: "Vietnamese Rolls", vi: "Chả Giò và Gỏi Cuốn" } },
  { id: "food-25", image: "/images/gallery/food-25.webp", category: "Food", title: { en: "Appetizer Favorites", vi: "Khai Vị Đặc Sắc" } },
  { id: "drink-1", image: "/images/gallery/drink-1.webp", category: "Drinks", title: { en: "Vietnamese Drinks", vi: "Thức Uống Việt Nam" } },
  { id: "drink-2", image: "/images/gallery/drink-2.webp", category: "Drinks", title: { en: "Fresh Smoothies", vi: "Sinh Tố Tươi" } },
];

const FEATURED_ITEMS = [GALLERY_ITEMS[0], GALLERY_ITEMS[9], GALLERY_ITEMS[28]];

function categoryLabel(category: GalleryCategory, lang: Language) {
  if (category === "Drinks") return lang === "en" ? "Drinks" : "Thức uống";
  return lang === "en" ? "Food" : "Món ăn";
}

export default function GalleryPage({ lang }: GalleryPageProps) {
  const [filter, setFilter] = useState<"All" | GalleryCategory>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = filter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const selectedItem = selectedIndex === null ? null : filteredItems[selectedIndex];

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => current === null ? null : (current - 1 + filteredItems.length) % filteredItems.length);
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => current === null ? null : (current + 1) % filteredItems.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredItems.length, selectedItem]);

  const changeFilter = (category: "All" | GalleryCategory) => {
    setFilter(category);
    setSelectedIndex(null);
  };

  const openFeaturedItem = (item: GalleryItem) => {
    setFilter("All");
    setSelectedIndex(GALLERY_ITEMS.findIndex((galleryItem) => galleryItem.id === item.id));
  };

  return (
    <div className="min-h-screen bg-bg-cream">
      <SEO
        title={lang === "en" ? "Gallery" : "Thư viện ảnh"}
        description={lang === "en"
          ? "Explore signature Vietnamese dishes, phở, drinks, and house specialties at North Carolina Phở."
          : "Khám phá các món Việt đặc sắc, phở, thức uống và món đặc biệt tại North Carolina Phở."}
        lang={lang}
      />

      <main className="overflow-hidden pb-24 pt-24 md:pt-32">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-8 text-white shadow-2xl shadow-primary/20 md:px-10 md:py-12 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-14"
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full border border-accent-gold/20" />

            <div className="relative z-10 flex flex-col justify-center pb-8 lg:pb-0">
              <span className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent-gold">
                <span className="h-px w-10 bg-accent-gold" />
                {lang === "en" ? "A feast for the eyes" : "Bữa tiệc thị giác"}
              </span>
              <h1 className="max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                {lang === "en" ? "Made to be craved." : "Đậm vị, khó quên."}
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                {lang === "en"
                  ? "From aromatic bowls of phở to sizzling house favorites, every plate is prepared to look as memorable as it tastes."
                  : "Từ tô phở thơm nồng đến các món đặc biệt nóng hổi, mỗi món ăn đều được chăm chút để đẹp mắt và trọn vị."}
              </p>
              <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                <Camera size={17} className="text-accent-gold" aria-hidden />
                {lang === "en" ? "29 house favorites" : "29 món đặc sắc"}
              </div>
            </div>

            <div className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4 lg:grid lg:grid-cols-3 lg:items-center lg:overflow-visible lg:pb-0">
              {FEATURED_ITEMS.map((item, index) => (
                <motion.button
                  type="button"
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.12, duration: 0.65 }}
                  onClick={() => openFeaturedItem(item)}
                  className="group relative aspect-[42/59.4] w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/15 bg-[#142f25] text-left sm:w-[56%] lg:w-auto"
                  aria-label={`${lang === "en" ? "View" : "Xem"} ${item.title[lang]}`}
                >
                  <img
                    src={item.image}
                    alt={item.title[lang]}
                    width="1200"
                    height="1697"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    <Maximize2 size={16} aria-hidden />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-7 border-b border-primary/10 pb-8 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.3em] text-accent-gold-text">
                {lang === "en" ? "Explore the menu" : "Khám phá thực đơn"}
              </span>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                {lang === "en" ? "The full table" : "Trọn vẹn hương vị"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2" aria-label={lang === "en" ? "Gallery filters" : "Bộ lọc thư viện ảnh"}>
              {(["All", "Food", "Drinks"] as const).map((category) => {
                const active = filter === category;
                const label = category === "All"
                  ? (lang === "en" ? "All" : "Tất cả")
                  : categoryLabel(category, lang);
                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => changeFilter(category)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all ${active
                      ? "bg-primary text-white shadow-lg shadow-primary/15"
                      : "border border-primary/10 bg-white text-primary hover:border-primary/30"}`}
                    aria-pressed={active}
                  >
                    {active ? <Filter size={13} aria-hidden /> : category === "Drinks" ? <Coffee size={13} aria-hidden /> : category === "Food" ? <Utensils size={13} aria-hidden /> : null}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.button
                  layout
                  type="button"
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.25) }}
                  onClick={() => setSelectedIndex(index)}
                  className="group relative overflow-hidden rounded-[1.5rem] bg-[#221c19] text-left shadow-xl shadow-primary/8 ring-1 ring-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold-text"
                  aria-label={`${lang === "en" ? "View" : "Xem"} ${item.title[lang]}`}
                >
                  <div className="aspect-[42/59.4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      width="1200"
                      height="1697"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/25 to-transparent px-5 pb-5 pt-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">{categoryLabel(item.category, lang)}</span>
                      <h3 className="mt-1 font-serif text-lg font-bold text-white">{item.title[lang]}</h3>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                      <Maximize2 size={17} aria-hidden />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0d1712]/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title[lang]}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-primary sm:right-8 sm:top-8"
              aria-label={lang === "en" ? "Close image" : "Đóng ảnh"}
            >
              <X size={22} aria-hidden />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-primary sm:left-8 sm:h-12 sm:w-12"
              aria-label={lang === "en" ? "Previous image" : "Ảnh trước"}
            >
              <ChevronLeft size={24} aria-hidden />
            </button>

            <motion.figure
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex max-h-[88vh] max-w-[min(88vw,760px)] flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.title[lang]}
                width="1200"
                height="1697"
                className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-gold">{categoryLabel(selectedItem.category, lang)}</span>
                <p className="mt-1 font-serif text-lg font-bold text-white">{selectedItem.title[lang]}</p>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % filteredItems.length);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-primary sm:right-8 sm:h-12 sm:w-12"
              aria-label={lang === "en" ? "Next image" : "Ảnh tiếp theo"}
            >
              <ChevronRight size={24} aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

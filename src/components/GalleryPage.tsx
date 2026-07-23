/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState } from "react";
import { BRAND_INFO, Language } from "../constants";
import SEO from "./SEO";
import { Camera, Utensils, Home as HomeIcon, Filter } from "lucide-react";

interface GalleryPageProps {
  lang: Language;
}

export default function GalleryPage({ lang }: GalleryPageProps) {
  const [filter, setFilter] = useState<string>("All");
  const galleryItems = BRAND_INFO.gallery[lang];
  
  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
      case "món ăn":
        return <Utensils size={14} />;
      case "interior":
      case "không gian":
        return <HomeIcon size={14} />;
      default:
        return <Camera size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream">
      <SEO 
        title={lang === "en" ? "Gallery" : "Thư viện ảnh"}
        description={lang === "en" ? "Explore the authentic atmosphere and delicious Vietnamese dishes at North Carolina Phở." : "Khám phá không gian ấm cúng và những món ăn Việt Nam hấp dẫn tại North Carolina Phở."}
        lang={lang}
      />
      
      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent-gold-text font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              {lang === "en" ? "Visual Journey" : "Hành trình thị giác"}
            </span>
            <h1 className="text-4xl md:text-6xl text-primary font-bold mb-6">
              {lang === "en" ? "Our Gallery" : "Thư viện ảnh"}
            </h1>
            <div className="w-24 h-1 bg-accent-gold mx-auto mb-8" />
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                    filter === cat
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-primary border border-primary/10 hover:bg-primary/5"
                  }`}
                >
                  {filter === cat && <Filter size={12} />}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary/5 border border-primary/5"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <div className="flex items-center gap-2 text-accent-gold mb-2">
                       {getIcon(item.category)}
                       <span className="text-[10px] uppercase font-bold tracking-widest">{item.category}</span>
                    </div>
                    <h2 className="text-white text-xl font-serif font-bold mb-2">{item.title}</h2>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="p-6 md:hidden">
                    <div className="flex items-center gap-2 text-accent-gold-text mb-1">
                       {getIcon(item.category)}
                       <span className="text-[10px] uppercase font-bold tracking-widest">{item.category}</span>
                    </div>
                    <h2 className="text-primary text-lg font-serif font-bold mb-1">{item.title}</h2>
                    <p className="text-text-dark/70 text-xs">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

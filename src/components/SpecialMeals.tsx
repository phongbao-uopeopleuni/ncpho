import { ArrowLeft, ArrowRight, Pause, Play, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { menuPath } from "../site";
import { Language } from "../constants";
import { GALLERY_ITEMS } from "../data/gallery";

// Lead with a mix of house favorites, then show the full collection.
const featuredIds = ["food-10", "food-12", "food-13", "food-15", "food-3"];
const meals = [
  ...featuredIds.map((id) => GALLERY_ITEMS.find((item) => item.id === id)!),
  ...GALLERY_ITEMS.filter((item) => !featuredIds.includes(item.id)),
];
const loopItems = [...meals, ...meals.slice(0, 4)];
const pixelsPerMillisecond = 0.035;

export default function SpecialMeals({ lang }: { lang: Language }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ animation: Animation; loopWidth: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [loopWidth, setLoopWidth] = useState(0);

  // Hand the current visual position back to native scrolling before interaction.
  const stopAnimation = useCallback(() => {
    const running = animationRef.current;
    if (!running) return;
    const time = Number(running.animation.currentTime ?? 0);
    running.animation.cancel();
    animationRef.current = null;
    if (stripRef.current) stripRef.current.style.willChange = "";
    if (trackRef.current) {
      trackRef.current.scrollLeft = (time * pixelsPerMillisecond) % running.loopWidth;
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      // Entries can arrive batched (oldest first); only the last one is the current state.
      (entries) => setVisible(entries[entries.length - 1].isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const first = strip.querySelector<HTMLElement>("[data-meal-card]");
    const repeat = strip.querySelector<HTMLElement>("[data-loop-start]");
    const measure = () => {
      if (first && repeat) setLoopWidth(repeat.offsetLeft - first.offsetLeft);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const strip = stripRef.current;
    if (!track || !strip || loopWidth <= 0 || !playing || !visible || !pageVisible || hovered || focused) return;
    const position = track.scrollLeft % loopWidth;
    strip.style.willChange = "transform";
    const animation = strip.animate(
      [{ transform: "translate3d(0, 0, 0)" }, { transform: `translate3d(${-loopWidth}px, 0, 0)` }],
      { duration: loopWidth / pixelsPerMillisecond, iterations: Infinity, easing: "linear" },
    );
    animation.currentTime = position / pixelsPerMillisecond;
    animationRef.current = { animation, loopWidth };
    track.scrollLeft = 0;
    return stopAnimation;
  }, [playing, visible, pageVisible, hovered, focused, loopWidth, stopAnimation]);

  const move = (direction: number) => {
    stopAnimation();
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>("[data-meal-card]");
    const second = first?.nextElementSibling as HTMLElement | null;
    const repeat = track?.querySelector<HTMLElement>("[data-loop-start]");
    if (!track || !first || !second || !repeat) return;
    setPlaying(false);
    const step = second.offsetLeft - first.offsetLeft;
    const loopWidth = repeat.offsetLeft - first.offsetLeft;
    if (direction < 0 && track.scrollLeft < step) track.scrollLeft += loopWidth;
    if (direction > 0 && track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
    track.scrollBy({ left: direction * step, behavior: reducedMotion ? "instant" : "smooth" });
  };

  const controlClass = "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent-gold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-gold";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="special-meals-heading"
      className="special-meals relative overflow-hidden py-16 text-white md:py-24"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="pointer-events-none absolute -left-64 top-12 h-[34rem] w-[34rem] rounded-full border border-accent-gold/10" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-8">
        <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#E9BD69]">
              <span className="h-px w-8 bg-[#E9BD69]" aria-hidden />
              {lang === "en" ? "Our Special Meals" : "Món ngon đặc sắc"}
            </p>
            <h2 id="special-meals-heading" className="text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">{lang === "en" ? "Signature" : "Hương vị"}</span>
              <span className="block font-normal italic text-[#E9BD69]">{lang === "en" ? "Favorites" : "đặc trưng"}</span>
            </h2>
          </div>
          <div className="max-w-md lg:pb-2">
            <p className="text-base leading-relaxed text-white/80">
              {lang === "en"
                ? "From comforting bowls of phở to house favorites, explore the flavors of NC PHO."
                : "Từ tô phở nóng hổi đến những món đặc biệt của nhà hàng, khám phá hương vị tại NC PHO."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Link to={menuPath(lang)} className="inline-flex items-center gap-3 rounded-full bg-accent-clay px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9E3E23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-gold">
                {lang === "en" ? "View Full Menu" : "Xem thực đơn"}
                <ArrowUpRight size={18} aria-hidden />
              </Link>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                {meals.length} {lang === "en" ? "favorites" : "món đặc sắc"}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-6 flex justify-end gap-2.5" role="group" aria-label={lang === "en" ? "Slideshow controls" : "Điều khiển dải ảnh"}>
          <button type="button" onClick={() => move(-1)} className={controlClass} aria-label={lang === "en" ? "Previous dish" : "Món trước"} aria-controls="special-meals-track">
            <ArrowLeft size={19} aria-hidden />
          </button>
          <button type="button" onClick={() => { setFocused(false); setPlaying((value) => !value); }} className={controlClass} aria-label={playing ? (lang === "en" ? "Pause slideshow" : "Tạm dừng dải ảnh") : (lang === "en" ? "Play slideshow" : "Chạy dải ảnh")} aria-controls="special-meals-track">
            {playing ? <Pause size={17} aria-hidden /> : <Play size={17} aria-hidden />}
          </button>
          <button type="button" onClick={() => move(1)} className={controlClass} aria-label={lang === "en" ? "Next dish" : "Món tiếp theo"} aria-controls="special-meals-track">
            <ArrowRight size={19} aria-hidden />
          </button>
        </div>
        <div
          ref={trackRef}
          id="special-meals-track"
          role="region"
          aria-label={lang === "en" ? "Special meals photos. Use arrow keys to browse." : "Ảnh món đặc sắc. Dùng phím mũi tên để xem."}
          tabIndex={0}
          className="no-scrollbar relative -mr-6 overflow-x-auto overscroll-x-contain pb-4 pr-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-gold sm:-mr-10 sm:pr-10 lg:mr-0 lg:pr-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onPointerDown={() => { stopAnimation(); setPlaying(false); }}
          onWheel={(event) => {
            if (event.deltaX || event.shiftKey) { stopAnimation(); setPlaying(false); }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <div ref={stripRef} data-meals-strip className="relative flex w-max items-start gap-4 md:gap-6">
            {loopItems.map((meal, index) => (
              <figure
                key={`${meal.id}-${index}`}
                data-meal-card
                data-loop-start={index === meals.length ? "true" : undefined}
                aria-hidden={index >= meals.length ? true : undefined}
                className={`w-[72vw] max-w-[21rem] shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-[#201A15] sm:w-72 lg:w-80 xl:w-[21rem] ${(index % meals.length) % 2 === 0 ? "mt-8" : ""}`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/special-meals/${meal.id}-720.webp`}
                  srcSet={`${import.meta.env.BASE_URL}images/special-meals/${meal.id}-360.webp 360w, ${import.meta.env.BASE_URL}images/special-meals/${meal.id}-720.webp 720w`}
                  sizes="(min-width: 1280px) 336px, (min-width: 1024px) 320px, (min-width: 640px) 288px, (min-width: 467px) 336px, 72vw"
                  alt={index < meals.length ? meal.title[lang] : ""}
                  width="720"
                  height="1018"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[42/59.4] h-auto w-full object-contain"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

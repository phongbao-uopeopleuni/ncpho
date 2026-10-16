import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND_INFO, type Language } from "../constants";
import {
  blogCopy, blogDish, blogGuides, blogImageSrc, blogImageSrcSet, blogStories, dishPrice, formatBlogDate, readingMinutes,
  type BlogPost, type BlogTopic,
} from "../data/blog";
import { blogPath, menuPath } from "../site";

interface Props {
  lang: Language;
  topic?: BlogTopic | "all";
  /** Present only in the browser: the pre-rendered page lists every guide and shows no filter buttons. */
  onTopic?: (topic: BlogTopic | "all") => void;
}

const TOPICS: BlogTopic[] = ["noodles", "rice", "vegetarian", "starters"];
/** "Part 1 — Phở: …" reads as "Phở: …" where the part number is already shown. */
const withoutPart = (title: string) => title.replace(/^[^—]+—\s*/, "");

/** The journal front page: masthead, the five-part series, then the menu guides. */
export default function BlogJournal({ lang, topic = "all", onTopic }: Props) {
  const copy = blogCopy[lang];
  const stories = blogStories();
  const guides = blogGuides();
  const [opener, ...parts] = stories;
  const shown = topic === "all" ? guides : guides.filter(guide => guide.topic === topic);

  return (
    <div className="pb-20 pt-16 sm:pt-20">
      <header className="special-meals relative mx-3 overflow-hidden rounded-[2rem] text-white sm:mx-6">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-hero-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              {copy.headingLead} <span className="serif-italic text-hero-gold">{copy.headingAccent}</span>
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg">{copy.intro}</p>
            <dl className="mt-8 flex gap-10 border-t border-white/15 pt-6">
              {([[stories.length, copy.stories], [guides.length, copy.guides]] as const).map(([count, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="serif-italic text-4xl text-hero-gold">{count}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8" aria-labelledby="journal-series">
        <div className="flex flex-col gap-3 border-b border-primary/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="journal-series" className="text-3xl text-primary sm:text-4xl">{copy.seriesTitle}</h2>
          <p className="max-w-md text-sm leading-relaxed text-text-dark/70">{copy.seriesIntro}</p>
        </div>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Link to={blogPath(lang, opener.slug)} className="group grid items-center gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div className="hero-photo-frame mx-auto aspect-[720/1018] w-full max-w-[19rem] overflow-hidden bg-primary/10 shadow-[0_30px_60px_-32px_rgba(27,67,50,0.55)]">
              <img src={blogImageSrc(opener, 720)} srcSet={blogImageSrcSet(opener)} sizes="(min-width: 640px) 304px, 80vw"
                width={720} height={1018} alt={opener[lang].imageAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-clay">
                {copy.startHere} · {copy.part(opener.part, stories.length)}
              </p>
              <h3 className="mt-3 text-3xl leading-tight text-primary sm:text-4xl">{withoutPart(opener[lang].title)}</h3>
              <p className="mt-4 leading-relaxed text-text-dark/75">{opener[lang].description}</p>
              <PostMeta post={opener} lang={lang} />
              <span className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors group-hover:bg-accent-clay">
                {copy.readStory} <ArrowRight size={16} aria-hidden />
              </span>
            </div>
          </Link>

          <ol className="divide-y divide-primary/10 border-y border-primary/10">
            {parts.map(story => (
              <li key={story.slug}>
                <Link to={blogPath(lang, story.slug)} className="group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-4 py-5 sm:gap-6">
                  <span className="serif-italic text-5xl leading-none text-accent-gold-text" aria-hidden>
                    {String(story.part).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="sr-only">{copy.part(story.part, stories.length)}: </span>
                    <span className="block font-serif text-xl leading-snug text-primary underline-offset-4 group-hover:underline">
                      {withoutPart(story[lang].title)}
                    </span>
                    <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-dark/70">{story[lang].description}</span>
                  </span>
                  <img src={blogImageSrc(story, 360)} width={360} height={509} alt="" loading="lazy"
                    className="h-20 w-14 rounded-full object-cover sm:h-24 sm:w-16" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-20 border-y border-primary/10 bg-white py-16 sm:py-20" aria-labelledby="journal-guides">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="journal-guides" className="text-3xl text-primary sm:text-4xl">{copy.guidesTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-dark/70">{copy.guidesIntro}</p>
            </div>
            {onTopic && (
              <div className="flex flex-wrap gap-2" role="group" aria-label={copy.topicsLabel}>
                {(["all", ...TOPICS] as const).map(option => (
                  <button key={option} type="button" aria-pressed={topic === option} onClick={() => onTopic(option)}
                    className={`min-h-10 rounded-full border px-4 text-xs font-semibold tracking-wide transition-colors ${
                      topic === option
                        ? "border-primary bg-primary text-white"
                        : "border-primary/20 text-primary hover:border-primary"
                    }`}>
                    {option === "all" ? copy.all : copy.topics[option]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {shown.map(guide => {
              const { item } = blogDish(guide, lang);
              return (
                <li key={guide.slug}>
                  <Link to={blogPath(lang, guide.slug)}
                    className="group flex h-full gap-5 rounded-3xl border border-primary/10 bg-bg-cream p-3 pr-5 transition-colors hover:border-primary/40 sm:p-4 sm:pr-6">
                    <img src={blogImageSrc(guide, 360)} width={360} height={509} alt="" loading="lazy"
                      className="h-36 w-26 shrink-0 rounded-2xl object-cover sm:h-44 sm:w-31" />
                    <span className="flex min-w-0 flex-col py-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-clay">
                        {copy.dishNumber(item.menuCode ?? "")} <span className="text-text-dark/40" aria-hidden>·</span>{" "}
                        <span className="text-text-dark/60">{copy.topics[guide.topic]}</span>
                      </span>
                      <span className="mt-2 font-serif text-xl leading-snug text-primary underline-offset-4 group-hover:underline">{guide[lang].title}</span>
                      <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-dark/70">{guide[lang].description}</span>
                      <span className="mt-auto pt-3 text-xs text-text-dark/60">
                        {copy.minutes(readingMinutes(guide, lang))} · {dishPrice(item, lang)}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="hero-warmth rounded-[2rem] border border-accent-gold/40 px-6 py-12 text-center sm:px-12">
          <p className="serif-italic text-4xl text-accent-clay">{copy.ctaTitle}</p>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-text-dark/75">{copy.ctaBody(BRAND_INFO.address)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={menuPath(lang)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-clay">
              {copy.ctaMenu} <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={`tel:${BRAND_INFO.phoneTel}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-white">
              <Phone size={16} aria-hidden /> {copy.ctaCall} · {BRAND_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PostMeta({ post, lang }: { post: BlogPost; lang: Language }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-text-dark/60">
      <time dateTime={post.published}>{formatBlogDate(post.published, lang)}</time>
      <span aria-hidden>·</span>
      <span>{blogCopy[lang].minutes(readingMinutes(post, lang))}</span>
    </p>
  );
}

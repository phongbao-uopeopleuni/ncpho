import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND_INFO, type Language } from "../constants";
import {
  blogCopy, blogDish, blogImageSrc, blogImageSrcSet, blogImageUrl, blogStories, dishMenuLink, formatBlogDate,
  readingMinutes, relatedPosts, type BlogPost,
} from "../data/blog";
import { blogPath, siteUrl } from "../site";
import { PostMeta } from "./BlogJournal";

/** One journal post. Microdata keeps the article described during client-side navigation. */
export default function BlogArticle({ lang, post }: { lang: Language; post: BlogPost }) {
  const copy = blogCopy[lang];
  const text = post[lang];
  const { item, category } = blogDish(post, lang);
  const options = Object.entries(item.variations || {});
  const label = post.kind === "story"
    ? `${copy.seriesTitle} · ${copy.part(post.part, blogStories().length)}`
    : `${copy.guideLabel} · ${copy.dishNumber(item.menuCode ?? "")}`;

  return (
    <article className="pb-20 pt-24 sm:pt-28" itemScope itemType="https://schema.org/BlogPosting"
      itemID={`${siteUrl(blogPath(lang, post.slug))}#article`}>
      <meta itemProp="inLanguage" content={lang} />
      <meta itemProp="mainEntityOfPage" content={siteUrl(blogPath(lang, post.slug))} />
      <header className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label={lang === "en" ? "Breadcrumb" : "Đường dẫn"} className="text-xs text-text-dark/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to={blogPath(lang)} className="font-semibold text-primary underline-offset-4 hover:underline">{copy.journal}</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page">{post.kind === "story" ? copy.seriesTitle : copy.guideLabel}</li>
          </ol>
        </nav>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-clay">{label}</p>
            <h1 itemProp="headline" className="mt-4 text-4xl leading-[1.08] text-primary sm:text-5xl lg:text-[3.5rem]">{text.title}</h1>
            <p itemProp="description" className="mt-6 max-w-2xl text-lg leading-relaxed text-text-dark/75">{text.description}</p>
            <div className="flex flex-wrap items-center gap-x-2">
              <PostMeta post={post} lang={lang} />
              <p className="mt-4 text-xs text-text-dark/60" itemProp="author" itemScope itemType="https://schema.org/Organization">
                <span aria-hidden>· </span><span itemProp="name">{copy.author}</span>
              </p>
            </div>
            <meta itemProp="datePublished" content={post.published} />
          </div>
          <figure className="mx-auto w-full max-w-[19rem] lg:mr-0">
            <div className="hero-photo-frame aspect-[720/1018] overflow-hidden bg-primary/10 shadow-[0_30px_60px_-30px_rgba(27,67,50,0.5)]">
              <img src={blogImageSrc(post, 720)} srcSet={blogImageSrcSet(post)} sizes="(min-width: 1024px) 304px, 80vw"
                width={720} height={1018} alt={text.imageAlt} className="h-full w-full object-cover" />
            </div>
            <meta itemProp="image" content={blogImageUrl(post)} />
          </figure>
        </div>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 border-t border-primary/10 px-4 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:px-8">
        <div className="journal-prose max-w-[42rem]" itemProp="articleBody">
          <p className="journal-lede">{text.intro}</p>
          {text.sections.map((section, index) => (
            <section key={section.heading}>
              <h2><span className="journal-step" aria-hidden>{String(index + 1).padStart(2, "0")}</span>{section.heading}</h2>
              {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-labelledby="journal-dish">
          <div className="rounded-[1.75rem] bg-primary p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-hero-gold">{copy.onMenu}</p>
            <p id="journal-dish" className="mt-3 font-serif text-2xl leading-snug">{item.name}</p>
            <p className="mt-1 text-sm text-white/70">{copy.dishNumber(item.menuCode ?? "")} · {category.title}</p>
            <dl className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
              {(options.length ? options : [[copy.price, item.price ?? ""]]).map(([name, price]) => (
                <div key={name} className="flex justify-between gap-4">
                  <dt className="text-white/80">{name}</dt>
                  <dd className="font-semibold tabular-nums text-hero-gold">{price}</dd>
                </div>
              ))}
            </dl>
            {item.description && <p className="mt-4 text-sm leading-relaxed text-white/70">{item.description}</p>}
            <Link to={dishMenuLink(post, lang)}
              className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-hero-gold px-5 text-sm font-semibold text-primary transition-colors hover:bg-white">
              {copy.seeOnMenu} <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={`tel:${BRAND_INFO.phoneTel}`}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold transition-colors hover:bg-white/10">
              <Phone size={16} aria-hidden /> {BRAND_INFO.phone}
            </a>
          </div>
        </aside>
      </div>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8" aria-labelledby="journal-more">
        <div className="flex items-end justify-between gap-4 border-b border-primary/10 pb-4">
          <h2 id="journal-more" className="text-3xl text-primary">{copy.keepReading}</h2>
          <Link to={blogPath(lang)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            {copy.allPosts} <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedPosts(post).map(other => (
            <li key={other.slug}>
              <Link to={blogPath(lang, other.slug)} className="group flex gap-4">
                <img src={blogImageSrc(other, 360)} width={360} height={509} alt="" loading="lazy"
                  className="h-28 w-20 shrink-0 rounded-full object-cover" />
                <span className="flex min-w-0 flex-col justify-center">
                  <span className="font-serif text-lg leading-snug text-primary underline-offset-4 group-hover:underline">{other[lang].title}</span>
                  <span className="mt-2 text-xs text-text-dark/60">
                    {formatBlogDate(other.published, lang)} · {copy.minutes(readingMinutes(other, lang))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { type Language } from "../constants";
import { blogCopy, blogImageUrl, findBlogPost, type BlogTopic } from "../data/blog";
import { blogPath, siteUrl } from "../site";
import BlogArticle from "./BlogArticle";
import BlogJournal from "./BlogJournal";
import NotFound from "./NotFound";
import SEO from "./SEO";

function Alternates({ slug }: { slug?: string }) {
  return (
    <Helmet>
      <link rel="alternate" hrefLang="en" href={siteUrl(blogPath("en", slug))} />
      <link rel="alternate" hrefLang="vi" href={siteUrl(blogPath("vi", slug))} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl(blogPath("en", slug))} />
    </Helmet>
  );
}

export function BlogIndexPage({ lang }: { lang: Language }) {
  const [topic, setTopic] = useState<BlogTopic | "all">("all");
  const copy = blogCopy[lang];
  return <>
    <SEO title={copy.title} titleBrand="NC Phở" description={copy.description} lang={lang}
      canonical={siteUrl(blogPath(lang))} image={siteUrl("/Logo.png")} />
    <Alternates />
    <BlogJournal lang={lang} topic={topic} onTopic={setTopic} />
  </>;
}

export function BlogPostPage({ lang }: { lang: Language }) {
  const post = findBlogPost(useParams().slug);
  if (!post) return <NotFound lang={lang} />;
  return <>
    <SEO title={post[lang].title} titleBrand="NC Phở" description={post[lang].description} lang={lang} type="article"
      canonical={siteUrl(blogPath(lang, post.slug))} image={blogImageUrl(post)} />
    <Alternates slug={post.slug} />
    <BlogArticle lang={lang} post={post} />
  </>;
}

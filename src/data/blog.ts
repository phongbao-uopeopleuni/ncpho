import { BRAND_INFO, type Language, type MenuDishItem } from "../constants";
import { blogPath, menuPath, siteUrl } from "../site";
import { GALLERY_ITEMS, type GalleryItem } from "./gallery";
import { BLOG_POSTS } from "./blog-posts";
import { menuCategories, priceNumber, type MenuCategory } from "./menu";

export type BlogTopic = "noodles" | "rice" | "vegetarian" | "starters";
export type BlogSection = { heading: string; body: string[] };
export type BlogCopy = { title: string; description: string; imageAlt: string; intro: string; sections: BlogSection[] };
type BlogPostBase = {
  slug: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  /** A GALLERY_ITEMS id: every photo is NC Phở's own, served from this origin. */
  image: string;
  /** The MENU_CATEGORIES item the post is about; its live name and prices fill the sidebar. */
  dish: string;
  en: BlogCopy;
  vi: BlogCopy;
};
export type BlogStory = BlogPostBase & { kind: "story"; part: number };
export type BlogGuide = BlogPostBase & { kind: "guide"; topic: BlogTopic };
export type BlogPost = BlogStory | BlogGuide;

export { BLOG_POSTS };
export const blogStories = () => BLOG_POSTS.filter((post): post is BlogStory => post.kind === "story").sort((a, b) => a.part - b.part);
export const blogGuides = () => BLOG_POSTS.filter((post): post is BlogGuide => post.kind === "guide");
export const findBlogPost = (slug: string | undefined) => BLOG_POSTS.find(post => post.slug === slug);

export const blogCopy = {
  en: {
    title: "Vietnamese Food Stories & Dish Guides in Washington, NC",
    description: "Read the NC Phở journal: the history of phở, bún bò Huế, bánh mì and Vietnamese coffee, plus guides to the dishes on our menu in Washington, NC.",
    eyebrow: "The NC Phở Journal", headingLead: "Notes from", headingAccent: "our kitchen",
    intro: "The stories behind the Vietnamese dishes we serve in Washington, NC: where they come from, how to eat them, and what to order next.",
    stories: "stories", guides: "menu guides",
    seriesTitle: "Vietnam on the Table",
    seriesIntro: "A five-part series on the dishes and drinks that shaped how Vietnam eats.",
    guidesTitle: "Menu guides",
    guidesIntro: "Short guides to ten dishes from our menu, with item numbers so you can order with confidence.",
    topicsLabel: "Filter menu guides", all: "All",
    topics: { noodles: "Noodles & soups", rice: "Rice plates", vegetarian: "Vegetarian", starters: "Starters & salads" } as Record<BlogTopic, string>,
    startHere: "Start here", readStory: "Read the story", readGuide: "Read the guide",
    minutes: (n: number) => `${n} min read`,
    part: (n: number, total: number) => `Part ${n} of ${total}`,
    dishNumber: (code: string) => `No. ${code}`,
    from: "from", price: "Price",
    ctaTitle: "Hungry yet?",
    ctaBody: (address: string) => `Every dish in these stories is on our menu at ${address}.`,
    ctaMenu: "See the full menu", ctaCall: "Call to order",
    journal: "Journal", guideLabel: "Menu guide", author: "NC Phở",
    onMenu: "On our menu", seeOnMenu: "Find it on the menu",
    keepReading: "Keep reading", allPosts: "All stories",
  },
  vi: {
    title: "Câu chuyện ẩm thực Việt & hướng dẫn món ăn tại Washington, NC",
    description: "Đọc sổ tay NC Phở: lịch sử phở, bún bò Huế, bánh mì, cà phê Việt và hướng dẫn các món trong thực đơn tại Washington, NC.",
    eyebrow: "Sổ tay NC Phở", headingLead: "Chuyện kể từ", headingAccent: "gian bếp",
    intro: "Những câu chuyện phía sau các món Việt chúng tôi phục vụ tại Washington, NC: nguồn gốc, cách thưởng thức và nên gọi món gì tiếp theo.",
    stories: "câu chuyện", guides: "hướng dẫn món",
    seriesTitle: "Việt Nam trên bàn ăn",
    seriesIntro: "Loạt bài năm phần về những món ăn, thức uống đã định hình cách người Việt ăn uống.",
    guidesTitle: "Hướng dẫn món ăn",
    guidesIntro: "Hướng dẫn ngắn về mười món trong thực đơn, kèm số món để bạn gọi thật dễ dàng.",
    topicsLabel: "Lọc hướng dẫn món ăn", all: "Tất cả",
    topics: { noodles: "Bún, phở & súp", rice: "Cơm đĩa", vegetarian: "Món chay", starters: "Khai vị & gỏi" } as Record<BlogTopic, string>,
    startHere: "Bắt đầu từ đây", readStory: "Đọc câu chuyện", readGuide: "Đọc hướng dẫn",
    minutes: (n: number) => `${n} phút đọc`,
    part: (n: number, total: number) => `Phần ${n}/${total}`,
    dishNumber: (code: string) => `Món số ${code}`,
    from: "từ", price: "Giá",
    ctaTitle: "Đói bụng rồi chứ?",
    ctaBody: (address: string) => `Mọi món trong các bài viết đều có trong thực đơn tại ${address}.`,
    ctaMenu: "Xem toàn bộ thực đơn", ctaCall: "Gọi đặt món",
    journal: "Sổ tay", guideLabel: "Hướng dẫn món ăn", author: "NC Phở",
    onMenu: "Có trong thực đơn", seeOnMenu: "Xem trong thực đơn",
    keepReading: "Đọc tiếp", allPosts: "Tất cả bài viết",
  },
};

/** About 220 words a minute, never under two minutes. */
export function readingMinutes(post: BlogPost, lang: Language): number {
  const { intro, sections } = post[lang];
  const words = [intro, ...sections.flatMap(s => [s.heading, ...s.body])].join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}

export function formatBlogDate(iso: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-US", { dateStyle: "long", timeZone: "UTC" })
    .format(new Date(`${iso}T00:00:00Z`));
}

/** The featured dish as the menu shows it, so names and prices never drift from the menu. */
export function blogDish(post: BlogPost, lang: Language): { item: MenuDishItem; category: MenuCategory } {
  for (const category of menuCategories(lang)) {
    const item = category.items.find((entry): entry is MenuDishItem => "name" in entry && entry.id === post.dish);
    if (item) return { item, category };
  }
  throw new Error(`Blog post ${post.slug} refers to unknown menu item ${post.dish}`);
}

export function dishPrice(item: MenuDishItem, lang: Language): string {
  const prices = Object.values(item.variations || {}).map(priceNumber).filter((price): price is number => price !== undefined);
  if (!prices.length) return item.price ?? "";
  return `${blogCopy[lang].from} $${Math.min(...prices).toFixed(2)}`;
}

export const dishMenuLink = (post: BlogPost, lang: Language) => `${menuPath(lang)}#menu-${blogDish(post, lang).category.id}`;

export function blogImage(post: BlogPost): GalleryItem {
  const image = GALLERY_ITEMS.find(item => item.id === post.image);
  if (!image) throw new Error(`Blog post ${post.slug} refers to unknown photo ${post.image}`);
  return image;
}

const withBase = (path: string) => `${import.meta.env?.BASE_URL ?? "/"}${path}`;
/** The 360/720px variants generated beside every gallery photo. */
export const blogImageSrc = (post: BlogPost, width: 360 | 720) => withBase(`images/special-meals/${post.image}-${width}.webp`);
export const blogImageSrcSet = (post: BlogPost) => `${blogImageSrc(post, 360)} 360w, ${blogImageSrc(post, 720)} 720w`;
export const blogImageUrl = (post: BlogPost) => siteUrl(`/images/special-meals/${post.image}-720.webp`);

/** Same-topic posts first, then the same kind, then the rest, in list order. */
export function relatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const score = (other: BlogPost) =>
    (other.kind === post.kind ? 2 : 0) + (other.kind === "guide" && post.kind === "guide" && other.topic === post.topic ? 1 : 0);
  return BLOG_POSTS.filter(other => other.slug !== post.slug)
    .map((other, index) => ({ other, index }))
    .sort((a, b) => score(b.other) - score(a.other) || a.index - b.index)
    .slice(0, count).map(({ other }) => other);
}

const publisher = () => ({
  "@type": "Organization", name: BRAND_INFO.name, url: siteUrl(),
  logo: { "@type": "ImageObject", url: siteUrl("/Logo.png") },
});

export function blogIndexStructuredData(lang: Language) {
  const url = siteUrl(blogPath(lang));
  return {
    "@context": "https://schema.org", "@type": "Blog", "@id": `${url}#blog`, url,
    name: blogCopy[lang].eyebrow, description: blogCopy[lang].description, inLanguage: lang, publisher: publisher(),
    blogPost: BLOG_POSTS.map(post => ({
      "@type": "BlogPosting", headline: post[lang].title, url: siteUrl(blogPath(lang, post.slug)),
      datePublished: post.published, image: blogImageUrl(post),
    })),
  };
}

export function blogPostStructuredData(post: BlogPost, lang: Language) {
  const url = siteUrl(blogPath(lang, post.slug));
  const copy = post[lang];
  const { item } = blogDish(post, lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, headline: copy.title, description: copy.description,
        image: blogImageUrl(post), datePublished: post.published, dateModified: post.published, inLanguage: lang,
        author: { "@type": "Organization", name: blogCopy[lang].author, url: siteUrl() }, publisher: publisher(),
        mainEntityOfPage: url, isPartOf: { "@type": "Blog", "@id": `${siteUrl(blogPath(lang))}#blog` },
        about: { "@type": "MenuItem", "@id": siteUrl(`${menuPath(lang)}#dish-${item.id}`), name: item.name },
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Trang chủ", item: siteUrl() },
          { "@type": "ListItem", position: 2, name: blogCopy[lang].journal, item: siteUrl(blogPath(lang)) },
          { "@type": "ListItem", position: 3, name: copy.title, item: url },
        ],
      },
    ],
  };
}

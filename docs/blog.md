# Journal (blog)

Production URLs:

- English: https://ncpho-ten.vercel.app/blog
- Vietnamese: https://ncpho-ten.vercel.app/vi/blog
- Posts: `/blog/<slug>` and `/vi/blog/<slug>`

The journal has two parts: a five-part culture series ("Vietnam on the Table") and ten
menu guides. Every post is written for NC Phở in English and Vietnamese. Stories describe
Vietnamese food in general terms; anything said about NC Phở itself comes from the menu.

## Editing posts

Posts live in `src/data/blog-posts.ts`. Each post names one menu item (`dish`) and one
gallery photo (`image`). The article sidebar reads that dish's name, number and prices
from `MENU_CATEGORIES`, so never write prices into the text. If a menu number changes,
update the text; `npm run test:app` fails when a post quotes a number that is not on the
menu, or mentions another restaurant's name or city.

To add a post: append it to `BLOG_POSTS`, add both URLs to `public/sitemap.xml` (the test
lists any that are missing), and use a photo that already exists in `public/images/gallery`
with its 360/720px variants in `public/images/special-meals`. The CSP allows same-origin
images only.

## Build and SEO

`npm run build` emits `blog.html`, `vi/blog.html` and `blog/<slug>.html`,
`vi/blog/<slug>.html` (32 documents) alongside the app, the same way as the menu. Each has
its own title, description, canonical, language alternates, Open Graph image and
`Blog`/`BlogPosting` + `BreadcrumbList` JSON-LD. Vercel's SPA fallback excludes `/blog`
and `/vi/blog`, so crawlers and visitors without JavaScript get the full article.

The journal's code and text are a separate chunk (`BlogPage-*.js`). Other pages never
download it. On a direct blog visit, `src/main.tsx` loads that chunk before React replaces
the pre-rendered HTML, so the page does not flash.

## Validation

- `npm run lint`
- `npm run test:app` (content rules, menu numbers, pre-rendered HTML, routes, sitemap)
- `npm run test:security` (strict CSP on all 32 built journal documents)
- `npm run build`

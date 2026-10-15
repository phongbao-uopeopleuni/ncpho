# Menu landing page

Hosting stays on Vercel. Production URLs:

- English: https://ncpho-ten.vercel.app/menu
- Vietnamese: https://ncpho-ten.vercel.app/vi/menu

GitHub stores source and runs checks against Vercel's root-path routing. The obsolete
GitHub Pages publishing workflow has been removed. The live-site monitor targets
the Vercel origin after successful checks on main, and on its existing schedule.

`src/components/MenuCatalog.tsx` is the independent menu template. It uses the full
`MENU_CATEGORIES` data in `src/constants.ts`: 151 entries, 147 option prices and
11 categories per language. Section headings for beer and wine are preserved.
Update dishes and prices in that source only; do not maintain a second menu list.

The approved warm design uses local Lora fonts for dish names and headings, and
existing Inter for prices and navigation. The cream, green and gold palette is
unchanged. Dish hover only adds a pale surface and a thin green border.

## Build and SEO

`npm run build` replaces `dist/` and emits `menu.html` and `vi/menu.html` alongside
the app. Vercel's `cleanUrls` serves `/menu` and `/vi/menu` from those documents;
the SPA fallback explicitly excludes them. Both contain the entire readable menu, metadata, canonical, language
alternates and Menu/Restaurant JSON-LD before JavaScript runs. Without JavaScript,
all dishes remain readable and category anchors work.

React enhances the template with category filtering. Live microdata retains all
menu items and option prices during client navigation and language changes.
JSON-LD is produced only at build time: creating script elements in React or
writing script text conflicts with the existing Trusted Types policy. No script
allowlist, third-party font origin or Trusted Types exception was added.

Legacy `/#/#menu` and `/#menu` links map to `/menu`. Old gallery/legal hash routes
also map to their clean equivalents. Category and language changes retain query
parameters, including advertising UTMs. Use `/menu?utm_source=...#menu-pho` for a
campaign that opens the Phở category. Canonicals never include campaign parameters.
This does not install advertising pixels or conversion tracking.

## Validation

- `npm run lint`
- `npm run test:app` (complete data, EN/VI price parity, HTML and metadata)
- `npm run test:security` (strict policy and built menu documents)
- `npm run build`
- `node tests/security/browser-csp.mjs dist --out=tmp/menu-browser-report.json --screenshots=tmp --profile-root=tmp`

The last command expects `tmp/` to exist. It tests production HTML, navigation,
languages, campaign parameters, JavaScript failure, and CSP in a real browser.
It closes its browser and local servers when finished. Optional screenshots and
reports stay in ignored `tmp/`. Do not upload `tmp/` or original print assets.

Review the Vercel preview after a Git push to confirm routing on the hosting
platform itself. Local tests do not publish a production deployment or prove
Google has indexed the page.

Vercel's [Vite guidance](https://vercel.com/docs/frameworks/frontend/vite) requires
extensionless rewrite destinations when `cleanUrls` is enabled. The SPA fallback
therefore targets `/`, not `/index.html`. Google supports both JSON-LD and
[microdata](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

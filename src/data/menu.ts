import { BRAND_INFO, MENU_CATEGORIES, type Language, type MenuDishItem } from "../constants";
import { menuPath, siteUrl } from "../site";

export type MenuHeading = { id: string; sectionLabel: string };
export type MenuCategory = { id: string; title: string; description: string; items: (MenuDishItem | MenuHeading)[] };
export const menuCategories = (lang: Language): MenuCategory[] => MENU_CATEGORIES[lang];
export const menuDishes = (lang: Language) => menuCategories(lang).flatMap(c => c.items.filter((item): item is MenuDishItem => "name" in item));
export const menuCopy = {
  en: {
    eyebrow: "Our Menu", heading: "Vietnamese Culinary Essence",
    title: "Vietnamese Menu — Phở, Rice & House Specials",
    description: "Explore the NC PHO menu in Washington, NC: Vietnamese phở, hot soup, appetizers, rice plates, vegetarian favorites and drinks, with prices and options.",
    categories: "Menu categories", all: "Full menu", from: "from",
  },
  vi: {
    eyebrow: "Thực đơn", heading: "Tinh hoa Ẩm thực Việt",
    title: "Thực đơn Việt — Phở, Cơm & Món đặc biệt",
    description: "Khám phá thực đơn NC PHO tại Washington, NC: phở, súp nóng, món khai vị, cơm, món chay và đồ uống, kèm giá và các lựa chọn.",
    categories: "Danh mục thực đơn", all: "Toàn bộ thực đơn", from: "từ",
  },
};
export function priceNumber(value: string): number | undefined {
  return /^\$\d+(?:\.\d{1,2})?$/.test(value) ? Number(value.slice(1)) : undefined;
}
/** Built from the same complete catalogue as the visible menu, including option prices. */
export function menuStructuredData(lang: Language) {
  const url = siteUrl(menuPath(lang));
  const menu = {
    "@type": "Menu", "@id": `${url}#restaurant-menu`, url,
    name: lang === "en" ? "NC PHO Menu" : "Thực đơn NC PHO", inLanguage: lang,
    hasMenuSection: menuCategories(lang).map(category => ({
      "@type": "MenuSection", name: category.title, description: category.description,
      hasMenuItem: category.items.filter((item): item is MenuDishItem => "name" in item).map(item => {
        const options = Object.entries(item.variations || {});
        const prices = options.length ? options : item.price ? [[item.name, item.price]] : [];
        const offers = prices.flatMap(([name, value]) => {
          const price = priceNumber(value);
          return price === undefined ? [] : [{ "@type": "Offer", name, price: price.toFixed(2), priceCurrency: "USD" }];
        });
        return { "@type": "MenuItem", "@id": `${url}#dish-${item.id}`, name: item.name,
          ...(item.description ? { description: item.description } : {}), ...(offers.length ? { offers } : {}) };
      }),
    })),
  };
  return {
    "@context": "https://schema.org", "@graph": [menu, restaurantStructuredData(`${url}#restaurant-menu`)],
  };
}

export function restaurantStructuredData(menuId = siteUrl("/menu#restaurant-menu")) {
  return {
      "@type": "Restaurant", "@id": siteUrl("/#restaurant"), name: BRAND_INFO.name,
      url: siteUrl(), image: siteUrl("/Logo.png"), telephone: BRAND_INFO.phoneTel,
      servesCuisine: "Vietnamese", priceRange: "$$", hasMenu: { "@id": menuId },
      address: { "@type": "PostalAddress", streetAddress: "1507 Carolina Ave", addressLocality: "Washington", addressRegion: "NC", postalCode: "27889", addressCountry: "US" },
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "11:00", closes: "21:30" }],
  };
}
export const safeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

import { useEffect, useRef } from "react";
import { type Language, type MenuDishItem } from "../constants";
import { menuCategories, menuCopy, priceNumber } from "../data/menu";
import { menuPath, siteUrl } from "../site";

interface Props {
  lang: Language;
  selectedCategory?: string;
  onSelectCategory?: (id: string) => void;
}

/** Native anchors and all sections remain usable in the pre-rendered HTML without JavaScript. */
export default function MenuCatalog({ lang, selectedCategory = "all", onSelectCategory }: Props) {
  const categories = menuCategories(lang);
  const copy = menuCopy[lang];
  const categoryNav = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = categoryNav.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="true"]');
    if (nav && active && window.matchMedia("(max-width: 767px)").matches) {
      nav.scrollTo({ left: active.offsetLeft - nav.offsetLeft - 12,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }, [selectedCategory]);
  return (
    <section id="menu" className="menu-page" aria-labelledby="menu-heading"
      itemScope itemType="https://schema.org/Menu" itemID={siteUrl(`${menuPath(lang)}#restaurant-menu`)}>
      <meta itemProp="inLanguage" content={lang} />
      <meta itemProp="url" content={siteUrl(menuPath(lang))} />
      <header className="menu-intro">
        <p className="menu-eyebrow">{copy.eyebrow}</p>
        <h1 id="menu-heading" itemProp="name">{copy.heading}</h1>
        <span className="menu-heading-rule" aria-hidden="true" />
      </header>
      <div className="menu-layout">
        <nav ref={categoryNav} className="menu-categories" aria-label={copy.categories}>
          {[...categories.map(c => ({ id: c.id, title: c.title })), { id: "all", title: copy.all }].map(category => (
            <a key={category.id} href={category.id === "all" ? "#all" : `#menu-${category.id}`}
              data-category={category.id} aria-current={selectedCategory === category.id ? "true" : undefined}
              onClick={onSelectCategory ? event => { event.preventDefault(); onSelectCategory(category.id); } : undefined}>
              {category.title}
            </a>
          ))}
        </nav>
        <div className="menu-sections" id="all">
          {categories.map(category => (
            <section key={category.id} id={`menu-${category.id}`} className="menu-category-section"
              hidden={selectedCategory !== "all" && selectedCategory !== category.id} aria-labelledby={`heading-${category.id}`}
              itemProp="hasMenuSection" itemScope itemType="https://schema.org/MenuSection">
              <div className="menu-category-heading">
                <h2 id={`heading-${category.id}`} itemProp="name">{category.title}</h2>
                <p itemProp="description">{category.description}</p>
              </div>
              <div className="menu-items">
                {category.items.map(item => "sectionLabel" in item
                  ? <h3 key={item.id} className="menu-subheading">{item.sectionLabel}</h3>
                  : <MenuItem key={item.id} item={item} lang={lang} />)}
              </div>
            </section>
          ))}
          <p className="menu-price-note">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}

function MenuItem({ item, lang }: { key?: string; item: MenuDishItem; lang: Language }) {
  const options = Object.entries(item.variations || {});
  const optionPrices = options.map(([, value]) => priceNumber(value)).filter((price): price is number => price !== undefined);
  const minimum = optionPrices.length ? Math.min(...optionPrices) : undefined;
  return (
    <article className="menu-item" id={`dish-${item.id}`} data-menu-item={item.id}
      itemProp="hasMenuItem" itemScope itemType="https://schema.org/MenuItem" itemID={siteUrl(`${menuPath(lang)}#dish-${item.id}`)}>
      <span className="menu-code">{item.menuCode}</span>
      <h3 className="menu-dish-name" itemProp="name">{item.name}</h3>
      <p className="menu-price" {...(!options.length && item.price ? { itemProp: "offers", itemScope: true, itemType: "https://schema.org/Offer" } : {})}>
        {!options.length && item.price && <>
          <meta itemProp="price" content={String(priceNumber(item.price))} /><meta itemProp="priceCurrency" content="USD" />
        </>}
        {options.length && minimum !== undefined
          ? <><span className="menu-from">{menuCopy[lang].from}</span> ${minimum.toFixed(2)}</>
          : item.price}
      </p>
      {item.description && <p className="menu-description" itemProp="description">{item.description}</p>}
      {options.length > 0 && <dl className="menu-options">
        {options.map(([label, price]) => <div key={label} itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <dt itemProp="name">{label}</dt><dd><meta itemProp="price" content={String(priceNumber(price))} /><meta itemProp="priceCurrency" content="USD" />{price}</dd>
        </div>)}
      </dl>}
    </article>
  );
}

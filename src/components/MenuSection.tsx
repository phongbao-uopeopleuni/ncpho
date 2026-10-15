import { Link } from "react-router-dom";
import { type Language } from "../constants";
import { menuPath } from "../site";
import SpecialMeals from "./SpecialMeals";

export default function MenuSection({ lang }: { lang: Language }) {
  return <>
    <SpecialMeals lang={lang} />
    <section className="menu-home-preview" aria-labelledby="menu-preview-heading">
      <p className="menu-eyebrow">{lang === "en" ? "Our Menu" : "Thực đơn"}</p>
      <h2 id="menu-preview-heading">{lang === "en" ? "Find your next favorite" : "Tìm món ngon bạn yêu thích"}</h2>
      <p>{lang === "en" ? "Phở, fresh starters, rice plates and house favorites. Explore every dish and its options." : "Phở, món khai vị, cơm và những món đặc sắc. Khám phá đầy đủ món ăn và các lựa chọn."}</p>
      <Link to={menuPath(lang)} className="menu-full-link">{lang === "en" ? "Explore the full menu" : "Xem toàn bộ thực đơn"}<span aria-hidden="true">↗</span></Link>
    </section>
  </>;
}

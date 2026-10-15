import { Language } from "../constants";

export type GalleryCategory = "Food" | "Drinks";

export type GalleryItem = {
  id: string;
  image: string;
  category: GalleryCategory;
  title: Record<Language, string>;
};

// Image paths are written root-relative; prefix Vite's base so they also resolve when the
// site is served from a sub-path (GitHub Pages project site: /ncpho/).
const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const GALLERY_ITEMS: GalleryItem[] = ([
  { id: "food-3", image: "/images/gallery/food-3.webp", category: "Food", title: { en: "Signature Beef Phở", vi: "Phở Bò Đặc Biệt" } },
  { id: "food-28", image: "/images/gallery/food-28.webp", category: "Food", title: { en: "Oxtail Beef Phở", vi: "Phở Đuôi Bò" } },
  { id: "food-27", image: "/images/gallery/food-27.webp", category: "Food", title: { en: "Rib Beef Phở", vi: "Phở Sườn Bò" } },
  { id: "food-16", image: "/images/gallery/food-16.webp", category: "Food", title: { en: "Seafood Phở", vi: "Phở Hải Sản" } },
  { id: "food-23", image: "/images/gallery/food-23.webp", category: "Food", title: { en: "Spicy Beef Noodle Soup", vi: "Bún Bò Cay" } },
  { id: "food-21", image: "/images/gallery/food-21.webp", category: "Food", title: { en: "Chicken Noodle Soup", vi: "Phở Gà" } },
  { id: "food-18", image: "/images/gallery/food-18.webp", category: "Food", title: { en: "Vegetable Phở", vi: "Phở Rau Củ" } },
  { id: "food-22", image: "/images/gallery/food-22.webp", category: "Food", title: { en: "Wonton Egg Noodle Soup", vi: "Mì Hoành Thánh" } },
  { id: "food-15", image: "/images/gallery/food-15.webp", category: "Food", title: { en: "Beef Stew with Bread", vi: "Bò Kho Bánh Mì" } },
  { id: "food-2", image: "/images/gallery/food-2.webp", category: "Food", title: { en: "Vietnamese Bánh Mì", vi: "Bánh Mì Việt Nam" } },
  { id: "food-19", image: "/images/gallery/food-19.webp", category: "Food", title: { en: "Lemongrass Beef Vermicelli", vi: "Bún Bò Sả" } },
  { id: "food-20", image: "/images/gallery/food-20.webp", category: "Food", title: { en: "Grilled Chicken Vermicelli", vi: "Bún Gà Nướng Chả Giò" } },
  { id: "food-1", image: "/images/gallery/food-1.webp", category: "Food", title: { en: "Crispy Egg Noodles", vi: "Mì Xào Giòn" } },
  { id: "food-13", image: "/images/gallery/food-13.webp", category: "Food", title: { en: "Chow Fun Noodles", vi: "Hủ Tiếu Xào" } },
  { id: "food-9", image: "/images/gallery/food-9.webp", category: "Food", title: { en: "Chicken Pad Thai", vi: "Pad Thái Gà" } },
  { id: "food-14", image: "/images/gallery/food-14.webp", category: "Food", title: { en: "House Special Fried Rice", vi: "Cơm Chiên Đặc Biệt" } },
  { id: "food-10", image: "/images/gallery/food-10.webp", category: "Food", title: { en: "House Clay Pot", vi: "Cơm Thố Đặc Biệt" } },
  { id: "food-11", image: "/images/gallery/food-11.webp", category: "Food", title: { en: "Shaking Beef", vi: "Bò Lúc Lắc" } },
  { id: "food-17", image: "/images/gallery/food-17.webp", category: "Food", title: { en: "Shaking Tofu", vi: "Đậu Hũ Lúc Lắc" } },
  { id: "food-4", image: "/images/gallery/food-4.webp", category: "Food", title: { en: "Sesame Chicken", vi: "Gà Mè" } },
  { id: "food-26", image: "/images/gallery/food-26.webp", category: "Food", title: { en: "House Chicken Favorites", vi: "Các Món Gà Đặc Biệt" } },
  { id: "food-8", image: "/images/gallery/food-8.webp", category: "Food", title: { en: "Five Spice Chicken", vi: "Gà Ngũ Vị" } },
  { id: "food-6", image: "/images/gallery/food-6.webp", category: "Food", title: { en: "Grilled Beef and Shrimp", vi: "Bò Tôm Nướng" } },
  { id: "food-7", image: "/images/gallery/food-7.webp", category: "Food", title: { en: "Grilled Pork Chop and Eggs", vi: "Cơm Sườn Trứng" } },
  { id: "food-5", image: "/images/gallery/food-5.webp", category: "Food", title: { en: "Papaya Salad", vi: "Gỏi Đu Đủ" } },
  { id: "food-12", image: "/images/gallery/food-12.webp", category: "Food", title: { en: "Vietnamese Rolls", vi: "Chả Giò và Gỏi Cuốn" } },
  { id: "food-25", image: "/images/gallery/food-25.webp", category: "Food", title: { en: "Appetizer Favorites", vi: "Khai Vị Đặc Sắc" } },
  { id: "drink-1", image: "/images/gallery/drink-1.webp", category: "Drinks", title: { en: "Vietnamese Drinks", vi: "Thức Uống Việt Nam" } },
  { id: "drink-2", image: "/images/gallery/drink-2.webp", category: "Drinks", title: { en: "Fresh Smoothies", vi: "Sinh Tố Tươi" } },
] satisfies GalleryItem[]).map((item) => ({ ...item, image: withBase(item.image) }));


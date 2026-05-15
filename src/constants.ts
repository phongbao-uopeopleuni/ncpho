/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = "en" | "vi";

/** Optional menu reference # (item_id) and per-option prices when base price is N/A in POS */
export type MenuDishItem = {
  id: string;
  menuCode?: string;
  name: string;
  price?: string;
  description?: string;
  variations?: Record<string, string>;
};

export const BRAND_INFO = {
  name: "North Carolina Phở",
  tagline: {
    en: "Vietnamese Authentic House",
    vi: "Ngôi Nhà Phở Việt Đích Thực"
  },
  location: "Washington, NC",
  address: "109 Greenville Blvd SE Suite #100, Greenville, NC 27858",
  /** Display string for UI */
  phone: "(+1) 252-756-7272",
  /** E.164 without `tel:` prefix — use for `href="tel:..."` */
  phoneTel: "+12527567272",
  email: "info@ncpho.com",
  social: {
    facebook: "https://facebook.com/ncpho",
    instagram: "https://instagram.com/ncpho",
  },
  hours: {
    en: [
      { day: "Monday", time: "Closed" },
      { day: "Tue - Sun", time: "11:00 AM - 9:30 PM" },
    ],
    vi: [
      { day: "Thứ Hai", time: "Đóng cửa" },
      { day: "Thứ Ba - Chủ Nhật", time: "11:00 SA - 9:30 CH" },
    ]
  },
  story: {
    title: {
      en: "Authentic Traditional Taste",
      vi: "Hương vị truyền thống đích thực"
    },
    content: {
      en: "At North Carolina Phở, we don't just serve food; we share a piece of culture. Using the freshest ingredients and traditional cooking techniques passed down through generations, we bring Washington, NC the most authentic Vietnamese culinary experiences.",
      vi: "Tại North Carolina Phở, chúng tôi không chỉ phục vụ thức ăn; chúng tôi chia sẻ một phần văn hóa. Sử dụng những nguyên liệu tươi ngon nhất và kỹ thuật nấu nướng truyền thống được truyền qua nhiều thế hệ, chúng tôi mang đến Washington, NC những trải nghiệm ẩm thực Việt Nam đích thực nhất."
    }
  },
  nav: {
    en: [
      { name: "Home", href: "/" },
      { name: "Menu", href: "/#menu" },
      { name: "Gallery", href: "/gallery" },
      { name: "About", href: "/#about" },
      { name: "Contact", href: "/#contact" },
    ],
    vi: [
      { name: "Trang chủ", href: "/" },
      { name: "Thực đơn", href: "/#menu" },
      { name: "Thư viện ảnh", href: "/gallery" },
      { name: "Về chúng tôi", href: "/#about" },
      { name: "Liên hệ", href: "/#contact" },
    ]
  },
  gallery: {
    en: [
      { id: 1, title: "Signature Phở", category: "Food", description: "Our 24-hour slow-cooked beef broth with premium steak.", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800" },
      { id: 2, title: "Authentic Bánh Mì", category: "Food", description: "Crispy baguette with house-made pâté and grilled pork.", image: "https://images.unsplash.com/photo-1600454021970-351feb4a503e?auto=format&fit=crop&q=80&w=800" },
      { id: 3, title: "Restaurant Ambiance", category: "Interior", description: "A warm and inviting space for family and friends.", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800" },
      { id: 4, title: "Vietnamese Coffee", category: "Drinks", description: "Traditional drip coffee with condensed milk.", image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=800" },
      { id: 5, title: "Spring Rolls", category: "Food", description: "Fresh rice paper rolls with shrimp and herbs.", image: "https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&q=80&w=800" },
      { id: 6, title: "Bún Chả", category: "Food", description: "Grilled pork with vermicelli noodles and dipping sauce.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" },
    ],
    vi: [
      { id: 1, title: "Phở Đặc Biệt", category: "Món ăn", description: "Nước dùng bò hầm 24 giờ với thịt bò thượng hạng.", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800" },
      { id: 2, title: "Bánh Mì Truyền Thống", category: "Món ăn", description: "Bánh mì giòn rụm với pate nhà làm và thịt nướng.", image: "https://images.unsplash.com/photo-1600454021970-351feb4a503e?auto=format&fit=crop&q=80&w=800" },
      { id: 3, title: "Không Gian Nhà Hàng", category: "Không gian", description: "Không gian ấm cúng dành cho gia đình và bạn bè.", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800" },
      { id: 4, title: "Cà Phê Sữa Đá", category: "Đồ uống", description: "Cà phê phin truyền thống với sữa đặc.", image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=800" },
      { id: 5, title: "Gỏi Cuốn Tôm", category: "Món ăn", description: "Cuốn bánh tráng tươi mát với tôm và rau thơm.", image: "https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&q=80&w=800" },
      { id: 6, title: "Bún Chả Hà Nội", category: "Món ăn", description: "Thịt heo nướng than hoa ăn kèm bún và nước chấm.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" },
    ]
  }
};

export const MENU_CATEGORIES = {
  en: [
    {
      id: "appetizers",
      title: "Appetizers",
      description: "Khai Vị - Traditional Vietnamese starters.",
      items: [
        { id: "a1", menuCode: "1", name: "Vietnamese Egg Rolls (3 rolls)", price: "$7.50" },
        { id: "a2", menuCode: "2", name: "Fresh Shrimp Spring Rolls (2 rolls)", price: "$7.50" },
        { id: "a3", menuCode: "3", name: "Fried Tofu Spring Rolls (2 rolls)", price: "$7.50" },
        { id: "a4", menuCode: "4", name: "Grilled Beef Spring Rolls (2 rolls)", price: "$7.50" },
        { id: "a5", menuCode: "5", name: "Crab Rangoon (6 pcs)", price: "$7.50" },
        {
          id: "a6",
          menuCode: "6",
          name: "Pot Stickers (6 pcs)",
          variations: {
            "Steam Pot Sticker": "$7.50",
            "Fried Pot Stickers": "$7.50",
            "Half Half": "$7.50",
          },
        },
        { id: "a7", menuCode: "7", name: "Popcorn Chicken", price: "$7.50" },
        {
          id: "a8",
          menuCode: "8",
          name: "Vietnamese Sandwich",
          variations: {
            "Grilled pork": "$8.90",
            "Grilled beef": "$8.90",
            "BBQ Pork": "$8.90",
            "Cold cut": "$8.90",
            "Chicken": "$8.90",
          },
        },
        { id: "a9", menuCode: "9", name: "Fried Fish Ball", price: "$7.50" },
        { id: "a10", menuCode: "10", name: "Rocket Shrimp Rolls (5 pieces)", price: "$7.50" },
        { id: "a10-1", menuCode: "10.1", name: "Crispy Salt and Pepper Squid", price: "$14.99" },
      ]
    },
    {
      id: "salads",
      title: "Salads",
      description: "Rau Xà Lách - Fresh and vibrant Vietnamese salads.",
      items: [
        { id: "sl11", menuCode: "11", name: "Green Papaya Salad", price: "$16.50" },
        { id: "sl12", menuCode: "12", name: "Shrimp Salad", price: "$16.50" },
        { id: "sl13", menuCode: "13", name: "Chicken Salad", price: "$16.50" },
        { id: "sl14", menuCode: "14", name: "Seaweed Salad", price: "$9.50" },
        { id: "sl15", menuCode: "15", name: "Asia Squid Salad", price: "$9.50" },
        { id: "sl-m1", menuCode: "M1", name: "Mango Salad Shrimp", price: "$15.50" },
      ]
    },
    {
      id: "pho",
      title: "Phở",
      description: "Beef Noodle Soup - Served with rice noodles, scallions, onion, and a bag of herbs.",
      items: [
        {
          id: "p16",
          menuCode: "16",
          name: "Eye Round Steak",
          variations: { Large: "$19.00", Regular: "$14.50" },
        },
        {
          id: "p17",
          menuCode: "17",
          name: "Brisket",
          variations: { Large: "$19.00", Regular: "$14.50" },
        },
        {
          id: "p18",
          menuCode: "18",
          name: "Eye Round Steak and Brisket",
          variations: { Large: "$20.00", Regular: "$15.50" },
        },
        {
          id: "p19",
          menuCode: "19",
          name: "House Special with Eye Round Steak, Brisket and Beef Balls",
          variations: { Large: "$21.00", Regular: "$16.50" },
        },
        {
          id: "p20",
          menuCode: "20",
          name: "Eye Round Steak and Beef Balls",
          variations: { Large: "$20.00", Regular: "$15.50" },
        },
        {
          id: "p21",
          menuCode: "21",
          name: "Beef Balls",
          variations: { Large: "$19.00", Regular: "$14.50" },
        },
        {
          id: "p22",
          menuCode: "22",
          name: "Seafood Phở",
          variations: { Large: "$22.00", Regular: "$17.50" },
        },
        {
          id: "p23",
          menuCode: "23",
          name: "Shrimp Phở",
          variations: { Large: "$21.00", Regular: "$16.50" },
        },
        {
          id: "p24",
          menuCode: "24",
          name: "Chicken Phở",
          variations: { Large: "$20.00", Regular: "$15.50" },
        },
        {
          id: "p25",
          menuCode: "25",
          name: "Vegetable Phở",
          variations: { Large: "$20.00", Regular: "$15.50" },
        },
        { id: "p26", menuCode: "26", name: "Extra Large Add", price: "$4.50" },
        {
          id: "p26-1",
          menuCode: "26.1",
          name: "Broth and Noodle",
          variations: {
            "Chicken broth": "$10.99",
            "Beef broth": "$10.99",
          },
        },
        {
          id: "p26-2",
          menuCode: "26.2",
          name: "Broth (Only)",
          variations: {
            "Chicken broth": "$8.99",
            "Beef broth": "$8.99",
          },
        },
        {
          id: "ec1",
          menuCode: "EC1",
          name: "Pho Oxtail Beef",
          variations: { Large: "$27.00", Regular: "$22.50" },
        },
        {
          id: "ec2",
          menuCode: "EC2",
          name: "Pho Ribs Beef",
          variations: { Large: "$27.00", Regular: "$22.50" },
        },
      ]
    },
    {
      id: "vermicelli",
      title: "Vermicelli",
      description: "Bún - Served with shredded lettuce, basil, relish, peanuts, and fish sauce.",
      items: [
        { id: "b27", menuCode: "27", name: "Vermicelli with Grilled Pork", price: "$16.50" },
        { id: "b28", menuCode: "28", name: "Vermicelli with Grilled Beef", price: "$17.50" },
        { id: "b29", menuCode: "29", name: "Vermicelli with Grilled Chicken", price: "$16.50" },
        { id: "b30", menuCode: "30", name: "Vermicelli with Grilled Shrimp", price: "$17.50" },
        { id: "b31", menuCode: "31", name: "Vermicelli with Grilled Beef and Chicken", price: "$17.50" },
        {
          id: "b32",
          menuCode: "32",
          name: "Vermicelli with Grilled Chicken, Beef, and Shrimp",
          price: "$18.50",
        },
        { id: "b33", menuCode: "33", name: "Vermicelli with Vietnamese Egg Rolls", price: "$16.50" },
        {
          id: "b34",
          menuCode: "34",
          name: "Vermicelli with Grilled Pork and Vietnamese Egg Rolls",
          price: "$17.50",
        },
        {
          id: "b35",
          menuCode: "35",
          name: "Vermicelli with Grilled Beef and Vietnamese Egg Rolls",
          price: "$17.50",
        },
        {
          id: "b36",
          menuCode: "36",
          name: "Vermicelli with Grilled Chicken and Vietnamese Egg Rolls",
          price: "$17.50",
        },
        { id: "b37", menuCode: "37", name: "Vermicelli with Lemongrass Beef", price: "$17.50" },
        { id: "b38", menuCode: "38", name: "Vermicelli with Lemongrass Chicken", price: "$17.50" },
      ]
    },
    {
      id: "rice",
      title: "Rice Plates",
      description: "Cơm Đĩa - Served with white rice and marinated salad.",
      items: [
        {
          id: "r39",
          menuCode: "39",
          name: "Grilled Beef with Steamed Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
        {
          id: "r40",
          menuCode: "40",
          name: "Grilled Chicken with Steamed Rice",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
        {
          id: "r41",
          menuCode: "41",
          name: "Grilled Shrimp with Steam Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$21.25" },
        },
        {
          id: "r42",
          menuCode: "42",
          name: "Grilled Pork with Steam Rice",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
        {
          id: "r43",
          menuCode: "43",
          name: "Grilled Beef and Chicken with Steam Rice",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "r44",
          menuCode: "44",
          name: "Grilled Beef and Shrimp with Steam Rice",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "r45",
          menuCode: "45",
          name: "Grilled Chicken and Shrimp with Steam Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
        {
          id: "r46",
          menuCode: "46",
          name: "Grilled Chicken, Beef, and Shrimp with Steam Rice",
          variations: { "Steamed Rice": "$19.50", "Fried Rice": "$24.25" },
        },
        {
          id: "r47",
          menuCode: "47",
          name: "Grilled Pork Chop and Eggs with Steam Rice",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "r48",
          menuCode: "48",
          name: "Shaking Beef with Steam Rice",
          variations: { "Steamed Rice": "$19.50", "Fried Rice": "$24.25" },
        },
        {
          id: "r49",
          menuCode: "49",
          name: "Lemongrass Chicken with Steam Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
        {
          id: "r50",
          menuCode: "50",
          name: "Lemongrass Beef with Steam Rice",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "r51",
          menuCode: "51",
          name: "Stir Fried Vegetables with Steam Rice",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
        {
          id: "r52",
          menuCode: "52",
          name: "Grilled Chicken and Vietnamese Egg Rolls with Steam Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
        {
          id: "r53",
          menuCode: "53",
          name: "Grilled Beef and Vietnamese Egg Rolls with Steam Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
        {
          id: "r54",
          menuCode: "54",
          name: "Sweet and Sour Chicken with Steamed Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
        {
          id: "r55",
          menuCode: "55",
          name: "Five Spice Chicken with Garlic and Steamed Rice",
          variations: { "Steamed Rice": "$17.50", "Fried Rice": "$22.25" },
        },
      ]
    },
    {
      id: "fried-rice",
      title: "Fried Rice",
      description: "Cơm Chiên - Authentic wok-fried rice dishes.",
      items: [
        { id: "f56", menuCode: "56", name: "Mixed Vegetable Fried Rice", price: "$16.50" },
        { id: "f57", menuCode: "57", name: "Chicken Fried Rice", price: "$17.50" },
        { id: "f58", menuCode: "58", name: "Beef Fried Rice", price: "$18.50" },
        { id: "f59", menuCode: "59", name: "Shrimp Fried Rice", price: "$18.50" },
        {
          id: "f60",
          menuCode: "60",
          name: "Seafood Fried Rice with Shrimp, Fishball, Squid and Crab Meat",
          price: "$19.50",
        },
        {
          id: "f61",
          menuCode: "61",
          name: "House Special Fried Rice with BBQ Pork, Chinese Sausages and Shrimp",
          price: "$19.50",
        },
      ]
    },
    {
      id: "vegetarian",
      title: "Vegetarian",
      description: "Thực Đơn Chay - Delicious plant-based options.",
      items: [
        { id: "v62", menuCode: "62", name: "Vietnamese Vegetarian Egg Rolls", price: "$7.50" },
        { id: "v63", menuCode: "63", name: "Vegetarian Pho", price: "$15.50" },
        { id: "v64", menuCode: "64", name: "Fried Tofu with Vermicelli", price: "$14.50" },
        {
          id: "v65",
          menuCode: "65",
          name: "Vietnamese Vegetarian Egg Rolls with Vermicelli",
          price: "$15.50",
        },
        { id: "v66", menuCode: "66", name: "Shaking Tofu with Steamed Rice", price: "$16.50" },
        {
          id: "v67",
          menuCode: "67",
          name: "Stir Fried Vegetables and Tofu with Steamed Rice",
          price: "$16.50",
        },
        {
          id: "v68",
          menuCode: "68",
          name: "Sweet and Sour Tofu with Steamed Rice",
          price: "$16.50",
        },
      ]
    },
    {
      id: "specials",
      title: "House Specials",
      description: "Món Đặc Biệt - Chef's signature selections.",
      items: [
        {
          id: "sp-69",
          menuCode: "69",
          name: "Curry Chicken with Steamed Rice / Vermicelli",
          variations: {
            "with Steam Rice": "$16.50",
            "with Fried Rice": "$21.25",
            "with Vermicelli": "$16.50",
          },
        },
        {
          id: "sp-70",
          menuCode: "70",
          name: "Curry Beef with Steam Rice / Vermicelli",
          variations: {
            "with Steam Rice": "$17.50",
            "with Fried Rice": "$22.25",
            "with Vermicelli": "$17.50",
          },
        },
        {
          id: "sp-71",
          menuCode: "71",
          name: "Curry Shrimp with Steamed Rice / Vermicelli",
          variations: {
            "with Steam Rice": "$18.50",
            "with Fried Rice": "$23.25",
            "with Vermicelli": "$18.50",
          },
        },
        {
          id: "sp-72",
          menuCode: "72",
          name: "Curry Seafood with Steamed Rice / Vermicelli",
          variations: {
            "with Steam Rice": "$18.50",
            "with Fried Rice": "$23.25",
            "with Vermicelli": "$18.50",
          },
        },
        {
          id: "sp-73",
          menuCode: "73",
          name: "Pad Thai with Chicken or Beef",
          variations: { Beef: "$17.50", Chicken: "$17.50" },
        },
        {
          id: "sp-74",
          menuCode: "74",
          name: "Pad Thai with Seafood or Shrimp",
          variations: { Shrimp: "$18.50", Seafood: "$18.50" },
        },
        {
          id: "sp-75",
          menuCode: "75",
          name: "Clay Pot with Beef or Chicken with Steamed Rice",
          variations: {
            Beef: "$17.50",
            Chicken: "$17.50",
            "with Fried Rice": "$22.25",
          },
        },
        {
          id: "sp-76",
          menuCode: "76",
          name: "Clay Pot with Seafood or Shrimp",
          variations: { Shrimp: "$18.50", Seafood: "$18.50" },
        },
        {
          id: "sp-77",
          menuCode: "77",
          name: "Chow Foon Noodle with Beef or Chicken",
          variations: {
            Beef: "$18.50",
            Chicken: "$18.50",
            Combination: "$18.50",
          },
        },
        {
          id: "sp-78",
          menuCode: "78",
          name: "Chow Foon Noodle with Shrimp or Seafood",
          variations: {
            Shrimp: "$19.50",
            Seafood: "$19.50",
            Combination: "$19.50",
          },
        },
        {
          id: "sp-79",
          menuCode: "79",
          name: "Lo Mein Noodle with Vegetables Chicken, Beef, Shrimp with Egg Noodles",
          price: "$18.50",
        },
        {
          id: "sp-80",
          menuCode: "80",
          name: "Crispy Egg Noodles with Chicken, Beef, and Shrimp",
          price: "$19.50",
        },
        {
          id: "sp-81",
          menuCode: "81",
          name: "Udon Noodle with Chicken",
          price: "$15.50",
        },
        {
          id: "sp-82",
          menuCode: "82",
          name: "Udon Noodle with Seafood",
          price: "$17.50",
        },
        {
          id: "sp-83",
          menuCode: "83",
          name: "Spicy Beef Noodle Soup",
          price: "$17.50",
        },
        {
          id: "sp-84",
          menuCode: "84",
          name: "Wonton with Egg Noodle Soup",
          price: "$18.50",
        },
        {
          id: "sp-85",
          menuCode: "85",
          name: "Beef Stew",
          description: "Bò kho — bread, rice noodles or egg noodles.",
          price: "$17.50",
        },
        { id: "sp-s1", menuCode: "S1", name: "Vietnamese Sweet and Sour Shrimp Soup", price: "$14.99" },
        { id: "sp-s2", menuCode: "S2", name: "Vietnamese Caramelized Clay Pot Catfish", price: "$15.99" },
        { id: "sp-s2-1", menuCode: "S2.1", name: "Whole Meal SP01 & SP02", price: "$27.99" },
        {
          id: "sp-s3",
          menuCode: "S3",
          name: "Sesame Chicken with Steamed Rice",
          variations: { "Steamed Rice": "$16.99", "Fried Rice": "$21.74" },
        },
        {
          id: "sp-s4",
          menuCode: "S4",
          name: "Orange Chicken with Steamed Rice",
          variations: { "Steamed Rice": "$16.99", "Fried Rice": "$21.74" },
        },
        { id: "sp-s5", menuCode: "S5", name: "Fish Sauce Chicken Wings (6 pcs)", price: "$11.99" },
        {
          id: "sp-s6",
          menuCode: "S6",
          name: "Fish Sauce Chicken Wings with Steamed Rice / Fried Rice",
          variations: { "Steamed Rice": "$14.99", "Fried Rice": "$19.74" },
        },
        {
          id: "sp-s7-1",
          menuCode: "S7.1",
          name: "Combo — Fried Chicken, Egg Rolls, Grilled Pork",
          price: "$18.50",
        },
        {
          id: "sp-s7-2",
          menuCode: "S7.2",
          name: "Combo — Fried Chicken, Egg Rolls, Grilled Beef",
          price: "$19.50",
        },
        { id: "sp-s8", menuCode: "S8", name: "Fried Chicken Wings with Fried Rice", price: "$14.50" },
        { id: "sp-s9", menuCode: "S9", name: "5 Pieces of Fried Chicken", price: "$14.50" },
        {
          id: "sp-s10",
          menuCode: "S10",
          name: "Flat Noodle with Beef, Chicken & Shrimp",
          variations: {
            "Beef & Shrimp": "$18.50",
            "Chicken & Shrimp": "$18.50",
            "Beef & Chicken": "$18.50",
          },
        },
        { id: "sp-s11", menuCode: "S11", name: "Fish Congee", price: "$14.50" },
        { id: "sp-s14", menuCode: "S14", name: "Shaking Beef with Pasta", price: "$20.50" },
        {
          id: "sp-ts1",
          menuCode: "TS1",
          name: "Walnut Shrimp with Steam Rice",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "sp-ts2",
          menuCode: "TS2",
          name: "General Tso's Chicken with Steam Rice",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "sp-ts3",
          menuCode: "TS3",
          name: "Kung Pao Chicken with Steam Rice",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
        {
          id: "sp-ts4",
          menuCode: "TS4",
          name: "Cashew Chicken with Steam Rice",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
      ]
    },
    {
      id: "drinks",
      title: "Drinks",
      description: "Thức Uống - Refreshing beverages and desserts.",
      items: [
        {
          id: "d86-1",
          menuCode: "86.1",
          name: "Soft Drinks",
          variations: {
            Coke: "$2.50",
            "Cherry Coke": "$2.50",
            "Diet Coke": "$2.50",
            Sprite: "$2.50",
            "Dr.Pepper": "$2.50",
            Fanta: "$2.50",
            "Minute Maid Lemonade": "$2.50",
            "HI - C": "$2.50",
            Powerade: "$2.50",
            Sweetened: "$2.50",
            Unsweetened: "$2.50",
          },
        },
        {
          id: "d86-2",
          menuCode: "86.2",
          name: "Ice Tea",
          variations: { Sweetened: "$2.50", Unsweetened: "$2.50" },
        },
        {
          id: "d87",
          menuCode: "87",
          name: "Hot Tea",
          variations: { Jasmine: "$2.50", "Green Tea": "$2.50" },
        },
        { id: "d88", menuCode: "88", name: "Vietnamese Iced Coffee", price: "$7.50" },
        { id: "d89", menuCode: "89", name: "Vietnamese Hot Coffee", price: "$7.50" },
        { id: "d90", menuCode: "90", name: "Thai Tea with Boba", price: "$7.50" },
        { id: "d91", menuCode: "91", name: "Coconut Juice", price: "$7.50" },
        { id: "d92-1", menuCode: "92.1", name: "Limeade — Lemonade", price: "$7.50" },
        { id: "d92-2", menuCode: "92.2", name: "Fresh Limeade — Lemonade", price: "$7.50" },
        { id: "d93", menuCode: "93", name: "3 Bean Dessert", price: "$7.50" },
        { id: "d94", menuCode: "94", name: "Passion Fruit", price: "$7.50" },
        {
          id: "d95-1",
          menuCode: "95.1",
          name: "Real Fruit Smoothie (with boba)",
          variations: {
            Strawberry: "$7.50",
            Peach: "$7.50",
            Mango: "$7.50",
            Banana: "$7.50",
            "Red bean": "$7.50",
            "Green bean": "$7.50",
            Taro: "$7.50",
            Coconut: "$7.50",
            "Milk Tea": "$7.50",
          },
        },
        {
          id: "d95-2",
          menuCode: "95.2",
          name: "Real Fruit Smoothie (NO boba)",
          variations: {
            Strawberry: "$7.50",
            Peach: "$7.50",
            Mango: "$7.50",
            Banana: "$7.50",
            "Red bean": "$7.50",
            "Green bean": "$7.50",
            Taro: "$7.50",
            Coconut: "$7.50",
            "Milk Tea": "$7.50",
          },
        },
        { id: "d96", menuCode: "96", name: "Ice Carrot Cake", price: "$5.50" },
        { id: "d97", menuCode: "97", name: "Cheesecake", price: "$5.50" },
        { id: "d98", menuCode: "98", name: "Tamarind Tea", price: "$7.50" },
        { id: "d99", menuCode: "99", name: "Peach Tea", price: "$7.50" },
      ]
    },
    {
      id: "beer-alcohol",
      title: "Beer / Alcohol",
      description: "Beer, wine, and Vietnamese imports — please drink responsibly.",
      items: [
        { id: "ba-sec-beer", sectionLabel: "Beer — $4.50" },
        { id: "ba1", name: "Yuengling", price: "$4.50" },
        { id: "ba2", name: "Miller Lite", price: "$4.50" },
        { id: "ba3", name: "Sapporo", price: "$4.50" },
        { id: "ba4", name: "Asahi", price: "$4.50" },
        { id: "ba5", name: "Tsingtao", price: "$4.50" },
        { id: "ba6", name: "Dos Equis", price: "$4.50" },
        { id: "ba7", name: "Corona", price: "$4.50" },
        { id: "ba8", name: "Heineken", price: "$4.50" },
        { id: "ba12", name: "GREEN 1640 PILSNER", price: "$4.50" },
        { id: "ba15", name: "BLUE 1640 PILSNER", price: "$4.50" },
        { id: "ba13", name: "33 EXPORT", price: "$4.50" },
        { id: "ba14", name: "BIA SAIGON", price: "$4.50" },
        { id: "ba-sec-wine", sectionLabel: "Wine — $4.50" },
        { id: "ba9", name: "Cabernet Sauvignon", price: "$4.50" },
        { id: "ba10", name: "Moscato Wine", price: "$4.50" },
        { id: "ba11", name: "Chardonnay", price: "$4.50" },
      ]
    },
    {
      id: "sides",
      title: "Extra Sides",
      description: "Đồ Ăn Thêm - Add-ons for your meal.",
      items: [
        { id: "sd-noodles", menuCode: "1", name: "Noodles", price: "$3.75" },
        { id: "sd-egg-noodles", menuCode: "2", name: "Egg Noodles", price: "$3.75" },
        { id: "sd-meat", menuCode: "3", name: "Meat", price: "$7.99" },
        { id: "sd-vegetable", menuCode: "4", name: "Extra Vegetable", price: "$3.75" },
        { id: "sd-seafood", menuCode: "5", name: "Seafood", price: "$7.99" },
        { id: "sd-steam-rice", menuCode: "6", name: "Steam Rice", price: "$3.00" },
        { id: "sd-fried-rice", menuCode: "7", name: "Fried Rice (No Meat)", price: "$8.99" },
        { id: "sd-noodle-soup", menuCode: "8", name: "Noodle Soup (No Meat)", price: "$10.99" },
        { id: "sd-oxtail", menuCode: "9", name: "Side order Oxtail Meat", price: "$15.00" },
        { id: "sd-ribs", menuCode: "10", name: "Side order Ribs Meat", price: "$15.00" },
      ]
    }
  ],
  vi: [
    {
      id: "appetizers",
      title: "Khai Vị",
      description: "Các món khai vị truyền thống Việt Nam.",
      items: [
        { id: "a1", menuCode: "1", name: "Chả Giò (3 cuốn)", price: "$7.50" },
        { id: "a2", menuCode: "2", name: "Gỏi Cuốn Tôm (2 cuốn)", price: "$7.50" },
        { id: "a3", menuCode: "3", name: "Gỏi Cuốn Đậu Hũ (2 cuốn)", price: "$7.50" },
        { id: "a4", menuCode: "4", name: "Gỏi Cuốn Bò Nướng (2 cuốn)", price: "$7.50" },
        { id: "a5", menuCode: "5", name: "Hoành Thánh Chiên Nhân Cua (6 miếng)", price: "$7.50" },
        {
          id: "a6",
          menuCode: "6",
          name: "Sủi Cảo (6 miếng)",
          variations: {
            "Sủi cảo hấp": "$7.50",
            "Sủi cảo chiên": "$7.50",
            "Nửa nửa": "$7.50",
          },
        },
        { id: "a7", menuCode: "7", name: "Gà Viên Popcorn", price: "$7.50" },
        {
          id: "a8",
          menuCode: "8",
          name: "Bánh Mì",
          variations: {
            "Heo nướng": "$8.90",
            "Bò nướng": "$8.90",
            "Xá xíu": "$8.90",
            "Thịt nguội": "$8.90",
            "Gà nướng": "$8.90",
          },
        },
        { id: "a9", menuCode: "9", name: "Cá Viên Chiên", price: "$7.50" },
        { id: "a10", menuCode: "10", name: "Tôm Tiễn Tên (5 miếng)", price: "$7.50" },
        { id: "a10-1", menuCode: "10.1", name: "Mực Chiên Giòn Muối Tiêu", price: "$14.99" },
      ]
    },
    {
      id: "salads",
      title: "Rau Xà Lách",
      description: "Gỏi tươi mát mang hương vị đậm đà.",
      items: [
        { id: "sl11", menuCode: "11", name: "Gỏi Đu Đủ", price: "$16.50" },
        { id: "sl12", menuCode: "12", name: "Gỏi Tôm", price: "$16.50" },
        { id: "sl13", menuCode: "13", name: "Gỏi Gà", price: "$16.50" },
        { id: "sl14", menuCode: "14", name: "Gỏi Rong Biển", price: "$9.50" },
        { id: "sl15", menuCode: "15", name: "Gỏi Mực", price: "$9.50" },
        { id: "sl-m1", menuCode: "M1", name: "Gỏi Xoài Tôm", price: "$15.50" },
      ]
    },
    {
      id: "pho",
      title: "Phở",
      description: "Phục vụ kèm bánh phở, hành lá, hành tây và rau thơm.",
      items: [
        {
          id: "p16",
          menuCode: "16",
          name: "Phở Tái",
          variations: { "Lớn": "$19.00", "Thường": "$14.50" },
        },
        {
          id: "p17",
          menuCode: "17",
          name: "Phở Nạm",
          variations: { "Lớn": "$19.00", "Thường": "$14.50" },
        },
        {
          id: "p18",
          menuCode: "18",
          name: "Phở Tái Nạm",
          variations: { "Lớn": "$20.00", "Thường": "$15.50" },
        },
        {
          id: "p19",
          menuCode: "19",
          name: "Phở Đặc Biệt (Tái, Nạm, Bò Viên)",
          variations: { "Lớn": "$21.00", "Thường": "$16.50" },
        },
        {
          id: "p20",
          menuCode: "20",
          name: "Phở Tái Bò Viên",
          variations: { "Lớn": "$20.00", "Thường": "$15.50" },
        },
        {
          id: "p21",
          menuCode: "21",
          name: "Phở Bò Viên",
          variations: { "Lớn": "$19.00", "Thường": "$14.50" },
        },
        {
          id: "p22",
          menuCode: "22",
          name: "Phở Hải Sản",
          variations: { "Lớn": "$22.00", "Thường": "$17.50" },
        },
        {
          id: "p23",
          menuCode: "23",
          name: "Phở Tôm",
          variations: { "Lớn": "$21.00", "Thường": "$16.50" },
        },
        {
          id: "p24",
          menuCode: "24",
          name: "Phở Gà",
          variations: { "Lớn": "$20.00", "Thường": "$15.50" },
        },
        {
          id: "p25",
          menuCode: "25",
          name: "Phở Rau Cải",
          variations: { "Lớn": "$20.00", "Thường": "$15.50" },
        },
        { id: "p26", menuCode: "26", name: "Thêm cỡ lớn / Extra Large Add", price: "$4.50" },
        {
          id: "p26-1",
          menuCode: "26.1",
          name: "Nước dùng và bánh phở",
          variations: {
            "Nước gà": "$10.99",
            "Nước bò": "$10.99",
          },
        },
        {
          id: "p26-2",
          menuCode: "26.2",
          name: "Chỉ nước dùng",
          variations: {
            "Nước gà": "$8.99",
            "Nước bò": "$8.99",
          },
        },
        {
          id: "ec1",
          menuCode: "EC1",
          name: "Phở đuôi bò",
          variations: { "Lớn": "$27.00", "Thường": "$22.50" },
        },
        {
          id: "ec2",
          menuCode: "EC2",
          name: "Phở sườn bò",
          variations: { "Lớn": "$27.00", "Thường": "$22.50" },
        },
      ]
    },
    {
      id: "vermicelli",
      title: "Bún",
      description: "Phục vụ kèm xà lách, rau thơm, đậu phộng và nước mắm.",
      items: [
        { id: "b27", menuCode: "27", name: "Bún Thịt Heo Nướng", price: "$16.50" },
        { id: "b28", menuCode: "28", name: "Bún Thịt Bò Nướng", price: "$17.50" },
        { id: "b29", menuCode: "29", name: "Bún Gà Nướng", price: "$16.50" },
        { id: "b30", menuCode: "30", name: "Bún Tôm Nướng", price: "$17.50" },
        { id: "b31", menuCode: "31", name: "Bún Bò & Gà Nướng", price: "$17.50" },
        { id: "b32", menuCode: "32", name: "Bún Gà, Bò & Tôm Nướng", price: "$18.50" },
        { id: "b33", menuCode: "33", name: "Bún Chả Giò", price: "$16.50" },
        { id: "b34", menuCode: "34", name: "Bún Thịt Nướng Chả Giò", price: "$17.50" },
        { id: "b35", menuCode: "35", name: "Bún Bò Nướng Chả Giò", price: "$17.50" },
        { id: "b36", menuCode: "36", name: "Bún Gà Nướng Chả Giò", price: "$17.50" },
        { id: "b37", menuCode: "37", name: "Bún Bò Xào Sả", price: "$17.50" },
        { id: "b38", menuCode: "38", name: "Bún Gà Xào Sả", price: "$17.50" },
      ]
    },
    {
      id: "rice",
      title: "Cơm Đĩa",
      description: "Phục vụ kèm cơm trắng và sa lát muối chua.",
      items: [
        {
          id: "r39",
          menuCode: "39",
          name: "Cơm Bò Nướng",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
        {
          id: "r40",
          menuCode: "40",
          name: "Cơm Gà Nướng",
          variations: { "Cơm trắng": "$16.50", "Cơm chiên": "$21.25" },
        },
        {
          id: "r41",
          menuCode: "41",
          name: "Cơm Tôm Nướng",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$21.25" },
        },
        {
          id: "r42",
          menuCode: "42",
          name: "Cơm Thịt Heo Nướng",
          variations: { "Cơm trắng": "$16.50", "Cơm chiên": "$21.25" },
        },
        {
          id: "r43",
          menuCode: "43",
          name: "Cơm Bò & Gà Nướng",
          variations: { "Cơm trắng": "$18.50", "Cơm chiên": "$23.25" },
        },
        {
          id: "r44",
          menuCode: "44",
          name: "Cơm Bò & Tôm Nướng",
          variations: { "Cơm trắng": "$18.50", "Cơm chiên": "$23.25" },
        },
        {
          id: "r45",
          menuCode: "45",
          name: "Cơm Gà & Tôm Nướng",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
        {
          id: "r46",
          menuCode: "46",
          name: "Cơm Gà, Bò & Tôm Nướng",
          variations: { "Cơm trắng": "$19.50", "Cơm chiên": "$24.25" },
        },
        {
          id: "r47",
          menuCode: "47",
          name: "Cơm Sườn Trứng",
          variations: { "Cơm trắng": "$18.50", "Cơm chiên": "$23.25" },
        },
        {
          id: "r48",
          menuCode: "48",
          name: "Cơm Bò Lúc Lắc",
          variations: { "Cơm trắng": "$19.50", "Cơm chiên": "$24.25" },
        },
        {
          id: "r49",
          menuCode: "49",
          name: "Cơm Gà Xào Sả",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
        {
          id: "r50",
          menuCode: "50",
          name: "Cơm Bò Xào Sả",
          variations: { "Cơm trắng": "$18.50", "Cơm chiên": "$23.25" },
        },
        {
          id: "r51",
          menuCode: "51",
          name: "Cơm Xào Rau Cải",
          variations: { "Cơm trắng": "$16.50", "Cơm chiên": "$21.25" },
        },
        {
          id: "r52",
          menuCode: "52",
          name: "Cơm Gà Nướng Chả Giò",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
        {
          id: "r53",
          menuCode: "53",
          name: "Cơm Bò Nướng Chả Giò",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
        {
          id: "r54",
          menuCode: "54",
          name: "Cơm Gà Xào Chua Ngọt",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
        {
          id: "r55",
          menuCode: "55",
          name: "Cơm Gà Ngũ Vị Hương Tỏi",
          variations: { "Cơm trắng": "$17.50", "Cơm chiên": "$22.25" },
        },
      ]
    },
    {
      id: "fried-rice",
      title: "Cơm Chiên",
      description: "Cơm chiên thơm ngon đậm đà phong cách Việt.",
      items: [
        { id: "f56", menuCode: "56", name: "Cơm Chiên Rau Cải", price: "$16.50" },
        { id: "f57", menuCode: "57", name: "Cơm Chiên Gà", price: "$17.50" },
        { id: "f58", menuCode: "58", name: "Cơm Chiên Bò", price: "$18.50" },
        { id: "f59", menuCode: "59", name: "Cơm Chiên Tôm", price: "$18.50" },
        {
          id: "f60",
          menuCode: "60",
          name: "Cơm Chiên Hải Sản",
          description: "Tôm, cá viên, mực và thịt cua.",
          price: "$19.50",
        },
        {
          id: "f61",
          menuCode: "61",
          name: "Cơm Chiên Dương Châu",
          description: "Xá xíu, lạp xưởng và tôm.",
          price: "$19.50",
        },
      ]
    },
    {
      id: "vegetarian",
      title: "Thực Đơn Chay",
      description: "Những lựa chọn thuần thực vật bổ dưỡng.",
      items: [
        { id: "v62", menuCode: "62", name: "Chả Giò Chay", price: "$7.50" },
        { id: "v63", menuCode: "63", name: "Phở Chay", price: "$15.50" },
        { id: "v64", menuCode: "64", name: "Bún Đậu Hũ Chiên", price: "$14.50" },
        { id: "v65", menuCode: "65", name: "Bún Chả Giò Chay", price: "$15.50" },
        { id: "v66", menuCode: "66", name: "Cơm Đậu Hũ Lúc Lắc", price: "$16.50" },
        { id: "v67", menuCode: "67", name: "Cơm Xào Rau Cải & Đậu Hũ", price: "$16.50" },
        { id: "v68", menuCode: "68", name: "Cơm Đậu Hũ Xào Chua Ngọt", price: "$16.50" },
      ]
    },
    {
      id: "specials",
      title: "Món Đặc Biệt",
      description: "Những món ăn đặc trưng tinh túy của thương hiệu.",
      items: [
        {
          id: "sp-69",
          menuCode: "69",
          name: "Cà ri gà với cơm trắng / bún",
          variations: {
            "with Steam Rice": "$16.50",
            "with Fried Rice": "$21.25",
            "with Vermicelli": "$16.50",
          },
        },
        {
          id: "sp-70",
          menuCode: "70",
          name: "Cà ri bò với cơm / bún",
          variations: {
            "with Steam Rice": "$17.50",
            "with Fried Rice": "$22.25",
            "with Vermicelli": "$17.50",
          },
        },
        {
          id: "sp-71",
          menuCode: "71",
          name: "Cà ri tôm với cơm / bún",
          variations: {
            "with Steam Rice": "$18.50",
            "with Fried Rice": "$23.25",
            "with Vermicelli": "$18.50",
          },
        },
        {
          id: "sp-72",
          menuCode: "72",
          name: "Cà ri hải sản với cơm / bún",
          variations: {
            "with Steam Rice": "$18.50",
            "with Fried Rice": "$23.25",
            "with Vermicelli": "$18.50",
          },
        },
        {
          id: "sp-73",
          menuCode: "73",
          name: "Pad Thai gà hoặc bò",
          variations: { Beef: "$17.50", Chicken: "$17.50" },
        },
        {
          id: "sp-74",
          menuCode: "74",
          name: "Pad Thai hải sản hoặc tôm",
          variations: { Shrimp: "$18.50", Seafood: "$18.50" },
        },
        {
          id: "sp-75",
          menuCode: "75",
          name: "Niêu đất bò hoặc gà kèm cơm",
          variations: {
            Beef: "$17.50",
            Chicken: "$17.50",
            "with Fried Rice": "$22.25",
          },
        },
        {
          id: "sp-76",
          menuCode: "76",
          name: "Niêu đất hải sản hoặc tôm",
          variations: { Shrimp: "$18.50", Seafood: "$18.50" },
        },
        {
          id: "sp-77",
          menuCode: "77",
          name: "Phở xào Chow Foon bò hoặc gà",
          variations: {
            Beef: "$18.50",
            Chicken: "$18.50",
            Combination: "$18.50",
          },
        },
        {
          id: "sp-78",
          menuCode: "78",
          name: "Phở xào Chow Foon tôm hoặc hải sản",
          variations: {
            Shrimp: "$19.50",
            Seafood: "$19.50",
            Combination: "$19.50",
          },
        },
        {
          id: "sp-79",
          menuCode: "79",
          name: "Mì xào Lo Mein rau, gà, bò, tôm (mì trứng)",
          price: "$18.50",
        },
        {
          id: "sp-80",
          menuCode: "80",
          name: "Mì xào giòn gà, bò & tôm",
          price: "$19.50",
        },
        {
          id: "sp-81",
          menuCode: "81",
          name: "Mì Udon gà",
          price: "$15.50",
        },
        {
          id: "sp-82",
          menuCode: "82",
          name: "Mì Udon hải sản",
          price: "$17.50",
        },
        {
          id: "sp-83",
          menuCode: "83",
          name: "Bún bò cay / súp mì bò cay",
          price: "$17.50",
        },
        {
          id: "sp-84",
          menuCode: "84",
          name: "Mì hoành thánh trứng",
          price: "$18.50",
        },
        {
          id: "sp-85",
          menuCode: "85",
          name: "Bò kho",
          description: "Ăn kèm bánh mì, bún hoặc mì.",
          price: "$17.50",
        },
        { id: "sp-s1", menuCode: "S1", name: "Canh chua tôm kiểu Việt", price: "$14.99" },
        { id: "sp-s2", menuCode: "S2", name: "Cá kho tộ caramel", price: "$15.99" },
        { id: "sp-s2-1", menuCode: "S2.1", name: "Combo suất SP01 & SP02", price: "$27.99" },
        {
          id: "sp-s3",
          menuCode: "S3",
          name: "Gà sốt mè với cơm",
          variations: { "Steamed Rice": "$16.99", "Fried Rice": "$21.74" },
        },
        {
          id: "sp-s4",
          menuCode: "S4",
          name: "Gà sốt cam với cơm",
          variations: { "Steamed Rice": "$16.99", "Fried Rice": "$21.74" },
        },
        { id: "sp-s5", menuCode: "S5", name: "Cánh gà chiên nước mắm (6 miếng)", price: "$11.99" },
        {
          id: "sp-s6",
          menuCode: "S6",
          name: "Cánh gà nước mắm kèm cơm trắng / chiên",
          variations: { "Steamed Rice": "$14.99", "Fried Rice": "$19.74" },
        },
        {
          id: "sp-s7-1",
          menuCode: "S7.1",
          name: "Combo — gà chiên, chả giò, thịt heo nướng",
          price: "$18.50",
        },
        {
          id: "sp-s7-2",
          menuCode: "S7.2",
          name: "Combo — gà chiên, chả giò, thịt bò nướng",
          price: "$19.50",
        },
        { id: "sp-s8", menuCode: "S8", name: "Cánh gà chiên kèm cơm chiên", price: "$14.50" },
        { id: "sp-s9", menuCode: "S9", name: "5 miếng gà chiên", price: "$14.50" },
        {
          id: "sp-s10",
          menuCode: "S10",
          name: "Mì xẹt bò, gà & tôm",
          variations: {
            "Beef & Shrimp": "$18.50",
            "Chicken & Shrimp": "$18.50",
            "Beef & Chicken": "$18.50",
          },
        },
        { id: "sp-s11", menuCode: "S11", name: "Cháo cá", price: "$14.50" },
        { id: "sp-s14", menuCode: "S14", name: "Nui xào bò lúc lắc", price: "$20.50" },
        {
          id: "sp-ts1",
          menuCode: "TS1",
          name: "Tôm walnut kèm cơm",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "sp-ts2",
          menuCode: "TS2",
          name: "Gà General Tso kèm cơm",
          variations: { "Steamed Rice": "$18.50", "Fried Rice": "$23.25" },
        },
        {
          id: "sp-ts3",
          menuCode: "TS3",
          name: "Gà Kung Pao kèm cơm",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
        {
          id: "sp-ts4",
          menuCode: "TS4",
          name: "Gà xào hạt điều kèm cơm",
          variations: { "Steamed Rice": "$16.50", "Fried Rice": "$21.25" },
        },
      ]
    },
    {
      id: "drinks",
      title: "Thức Uống",
      description: "Đồ uống giải khát và món tráng miệng.",
      items: [
        {
          id: "d86-1",
          menuCode: "86.1",
          name: "Nước ngọt",
          variations: {
            Coke: "$2.50",
            "Cherry Coke": "$2.50",
            "Diet Coke": "$2.50",
            Sprite: "$2.50",
            "Dr.Pepper": "$2.50",
            Fanta: "$2.50",
            "Minute Maid Lemonade": "$2.50",
            "HI - C": "$2.50",
            Powerade: "$2.50",
            "Ngọt": "$2.50",
            "Không ngọt": "$2.50",
          },
        },
        {
          id: "d86-2",
          menuCode: "86.2",
          name: "Trà đá",
          variations: { "Ngọt": "$2.50", "Không ngọt": "$2.50" },
        },
        {
          id: "d87",
          menuCode: "87",
          name: "Trà nóng",
          variations: { "Nhài": "$2.50", "Trà xanh": "$2.50" },
        },
        { id: "d88", menuCode: "88", name: "Cà phê sữa đá", price: "$7.50" },
        { id: "d89", menuCode: "89", name: "Cà phê nóng", price: "$7.50" },
        { id: "d90", menuCode: "90", name: "Trà Thái trân châu", price: "$7.50" },
        { id: "d91", menuCode: "91", name: "Nước dừa", price: "$7.50" },
        { id: "d92-1", menuCode: "92.1", name: "Chanh tươi / Lemonade", price: "$7.50" },
        { id: "d92-2", menuCode: "92.2", name: "Chanh tươi ép / Lemonade", price: "$7.50" },
        { id: "d93", menuCode: "93", name: "Chè ba màu", price: "$7.50" },
        { id: "d94", menuCode: "94", name: "Chanh dây", price: "$7.50" },
        {
          id: "d95-1",
          menuCode: "95.1",
          name: "Sinh tố trái cây (có trân châu)",
          variations: {
            "Dâu": "$7.50",
            "Đào": "$7.50",
            "Xoài": "$7.50",
            "Chuối": "$7.50",
            "Đậu đỏ": "$7.50",
            "Đậu xanh": "$7.50",
            "Khoai môn": "$7.50",
            "Dừa": "$7.50",
            "Trà sữa": "$7.50",
          },
        },
        {
          id: "d95-2",
          menuCode: "95.2",
          name: "Sinh tố trái cây (không trân châu)",
          variations: {
            "Dâu": "$7.50",
            "Đào": "$7.50",
            "Xoài": "$7.50",
            "Chuối": "$7.50",
            "Đậu đỏ": "$7.50",
            "Đậu xanh": "$7.50",
            "Khoai môn": "$7.50",
            "Dừa": "$7.50",
            "Trà sữa": "$7.50",
          },
        },
        { id: "d96", menuCode: "96", name: "Bánh cà rốt đông lạnh", price: "$5.50" },
        { id: "d97", menuCode: "97", name: "Bánh phô mai", price: "$5.50" },
        { id: "d98", menuCode: "98", name: "Trà me", price: "$7.50" },
        { id: "d99", menuCode: "99", name: "Trà đào", price: "$7.50" },
      ]
    },
    {
      id: "beer-alcohol",
      title: "Bia / Rượu",
      description: "Bia, rượu vang và nhập khẩu Việt — vui lòng uống có trách nhiệm.",
      items: [
        { id: "ba-sec-beer", sectionLabel: "Bia — $4.50" },
        { id: "ba1", name: "Yuengling", price: "$4.50" },
        { id: "ba2", name: "Miller Lite", price: "$4.50" },
        { id: "ba3", name: "Sapporo", price: "$4.50" },
        { id: "ba4", name: "Asahi", price: "$4.50" },
        { id: "ba5", name: "Tsingtao", price: "$4.50" },
        { id: "ba6", name: "Dos Equis", price: "$4.50" },
        { id: "ba7", name: "Corona", price: "$4.50" },
        { id: "ba8", name: "Heineken", price: "$4.50" },
        { id: "ba12", name: "GREEN 1640 PILSNER", price: "$4.50" },
        { id: "ba15", name: "BLUE 1640 PILSNER", price: "$4.50" },
        { id: "ba13", name: "33 EXPORT", price: "$4.50" },
        { id: "ba14", name: "Bia Sài Gòn", price: "$4.50" },
        { id: "ba-sec-wine", sectionLabel: "Rượu vang — $4.50" },
        { id: "ba9", name: "Cabernet Sauvignon", price: "$4.50" },
        { id: "ba10", name: "Rượu Moscato", price: "$4.50" },
        { id: "ba11", name: "Chardonnay", price: "$4.50" },
      ]
    },
    {
      id: "sides",
      title: "Đồ Ăn Thêm",
      description: "Các món thêm cho bữa ăn tròn vị.",
      items: [
        { id: "sd-noodles", menuCode: "1", name: "Thêm bánh phở", price: "$3.75" },
        { id: "sd-egg-noodles", menuCode: "2", name: "Mì trứng", price: "$3.75" },
        { id: "sd-meat", menuCode: "3", name: "Thêm thịt", price: "$7.99" },
        { id: "sd-vegetable", menuCode: "4", name: "Thêm rau", price: "$3.75" },
        { id: "sd-seafood", menuCode: "5", name: "Thêm hải sản", price: "$7.99" },
        { id: "sd-steam-rice", menuCode: "6", name: "Cơm trắng", price: "$3.00" },
        { id: "sd-fried-rice", menuCode: "7", name: "Cơm chiên (không thịt)", price: "$8.99" },
        { id: "sd-noodle-soup", menuCode: "8", name: "Nước súp có bánh phở (không thịt)", price: "$10.99" },
        { id: "sd-oxtail", menuCode: "9", name: "Thêm đuôi bò", price: "$15.00" },
        { id: "sd-ribs", menuCode: "10", name: "Thêm sườn bò", price: "$15.00" },
      ]
    }
  ]
};


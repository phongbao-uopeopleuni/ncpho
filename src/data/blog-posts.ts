import type { BlogPost } from "./blog";

/**
 * Journal posts, written for NC Phở. Item numbers and dish names quote MENU_CATEGORIES;
 * prices are never written into the text (the article sidebar reads them from the menu).
 * Stories describe Vietnamese food culture in general terms; only menu facts describe NC Phở.
 */
const PUBLISHED = "2026-10-16";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pho-a-century-in-a-bowl", kind: "story", part: 1, published: PUBLISHED, image: "food-3", dish: "p19",
    en: {
      title: "Part 1 — Phở: A Century in a Bowl",
      description: "How phở grew from a northern Vietnamese street soup into a dish the world knows by name: its history, its broth, and how to enjoy a bowl at NC Phở.",
      imageAlt: "Bowl of eye round steak and brisket phở with herbs, lime and bean sprouts at NC Phở",
      intro: "Phở is young as Vietnamese dishes go. It appears in northern Vietnam around the start of the twentieth century, sold by street vendors who carried their kitchens on shoulder poles. In barely a hundred years it traveled from those poles to restaurant menus around the world, including ours, where it is the word on our sign.",
      sections: [
        { heading: "Born in the north", body: [
          "Most food historians place phở's birth in the Red River Delta, in and around Hanoi and Nam Định, in the early 1900s. It was a time of change. French colonial rule had brought more beef into Vietnamese markets, Chinese communities had long sold rice noodle soups, and Vietnamese cooks blended those influences into something new.",
          "Some link the name to the French pot-au-feu, others to the Cantonese words for rice noodles. The debate continues; the soup speaks for itself.",
        ] },
        { heading: "The broth is the dish", body: [
          "Ask any phở cook where the work goes and they will point to the pot. A classic beef broth simmers bones for many hours and is skimmed patiently so it stays clear. Onion and ginger are charred before they go in, for depth and sweetness. Star anise, cinnamon, clove, black cardamom and coriander seed add the warm fragrance that drifts out of every phở shop, and fish sauce with a little rock sugar brings it into balance.",
          "The goal is a broth that tastes rich but looks light. Everything else in the bowl is there to frame it.",
        ] },
        { heading: "North and south", body: [
          "When Vietnam was divided in 1954, many northerners moved south and brought phở with them. In Saigon the bowl changed: the broth often grew a little sweeter, and plates of bean sprouts, Thai basil, lime and chili appeared beside it, with hoisin and sriracha on the table. Northern-style phở stayed more austere, often finished with little more than scallions and herbs.",
          "After 1975, Vietnamese families carried the southern style abroad. That is why most phở in the United States arrives with a plate of fresh garnishes.",
        ] },
        { heading: "How to enjoy a bowl at NC Phở", body: [
          "Our phở is served with rice noodles, scallions, onion and a bag of herbs. Taste the broth first, before adding anything. Then add herbs, lime and sauces a little at a time; many people put hoisin and sriracha in a small dish for dipping the meat instead of stirring them into the broth.",
          "Thin slices of eye round steak are traditionally added rare so the hot broth finishes them, so eat those first. Our house special, No. 19, brings together eye round steak, brisket and beef balls, and the menu also offers chicken, seafood, shrimp and vegetable bowls.",
        ] },
      ],
    },
    vi: {
      title: "Phần 1 — Phở: Một thế kỷ trong một tô",
      description: "Phở đã đi từ gánh hàng rong miền Bắc trở thành món ăn cả thế giới biết tên như thế nào: lịch sử, nước dùng và cách thưởng thức một tô phở tại NC Phở.",
      imageAlt: "Tô phở tái nạm với rau thơm, chanh và giá tại NC Phở",
      intro: "So với nhiều món Việt khác, phở còn khá trẻ. Phở xuất hiện ở miền Bắc vào khoảng đầu thế kỷ XX, theo chân những người bán hàng gánh cả gian bếp trên vai. Chỉ trong khoảng một trăm năm, phở đã đi từ những gánh hàng ấy đến thực đơn nhà hàng khắp thế giới, kể cả nhà hàng của chúng tôi, nơi chữ Phở nằm ngay trên biển hiệu.",
      sections: [
        { heading: "Sinh ra ở miền Bắc", body: [
          "Phần lớn các nhà nghiên cứu ẩm thực cho rằng phở ra đời ở đồng bằng sông Hồng, quanh Hà Nội và Nam Định, vào những năm đầu thế kỷ XX. Đó là thời kỳ nhiều biến động. Thời Pháp thuộc đưa thịt bò vào chợ Việt nhiều hơn, cộng đồng người Hoa từ lâu đã bán các món bánh nước, và người Việt đã kết hợp những ảnh hưởng ấy thành một món ăn mới.",
          "Có người cho rằng tên gọi phở bắt nguồn từ món pot-au-feu của Pháp, người khác lại liên hệ với cách gọi bánh phở trong tiếng Quảng Đông. Cuộc tranh luận vẫn tiếp diễn; còn tô phở thì tự nói lên tất cả.",
        ] },
        { heading: "Nước dùng là linh hồn", body: [
          "Hỏi bất kỳ người nấu phở nào công sức dồn vào đâu, họ sẽ chỉ vào nồi nước dùng. Nước phở bò truyền thống được ninh từ xương trong nhiều giờ, hớt bọt kiên nhẫn để giữ nước trong. Hành và gừng được nướng trước khi thả vào nồi để tạo vị ngọt và chiều sâu. Hoa hồi, quế, đinh hương, thảo quả và hạt mùi mang lại mùi thơm ấm áp lan khắp quán phở, còn nước mắm và chút đường phèn giúp cân bằng vị.",
          "Mục tiêu là nước dùng đậm đà mà vẫn trong veo. Mọi thứ khác trong tô đều để tôn nước dùng lên.",
        ] },
        { heading: "Phở Bắc và phở Nam", body: [
          "Khi đất nước chia cắt năm 1954, nhiều người miền Bắc di cư vào Nam và mang theo phở. Ở Sài Gòn, tô phở thay đổi: nước dùng thường ngọt hơn một chút, bên cạnh là đĩa giá, húng quế, chanh và ớt, cùng tương đen và tương ớt trên bàn. Phở Bắc vẫn giữ vẻ thanh giản, thường chỉ thêm hành lá và rau thơm.",
          "Sau năm 1975, các gia đình Việt mang phong cách miền Nam ra nước ngoài. Vì vậy phần lớn tô phở ở Mỹ đều đi kèm một đĩa rau tươi.",
        ] },
        { heading: "Thưởng thức phở tại NC Phở", body: [
          "Phở của chúng tôi được phục vụ kèm bánh phở, hành lá, hành tây và rau thơm. Hãy nếm nước dùng trước khi nêm bất cứ thứ gì. Sau đó thêm rau, chanh và nước sốt từ từ; nhiều người thích cho tương đen và tương ớt ra chén riêng để chấm thịt thay vì khuấy vào nước dùng.",
          "Thịt bò tái theo truyền thống được cho vào khi còn sống để nước dùng nóng làm chín, nên hãy ăn phần thịt ấy trước. Phở đặc biệt, món số 19, gồm tái, nạm và bò viên; thực đơn còn có phở gà, phở hải sản, phở tôm và phở rau cải.",
        ] },
      ],
    },
  },
  {
    slug: "bun-bo-hue-imperial-city-noodle-soup", kind: "story", part: 2, published: PUBLISHED, image: "food-23", dish: "sp-83",
    en: {
      title: "Part 2 — Bún Bò Huế: The Imperial City's Bold Bowl",
      description: "Bún bò Huế comes from Vietnam's old royal capital: a lemongrass-scented, chili-red noodle soup with real character. Here is its story, and the spicy beef bowl at NC Phở.",
      imageAlt: "Spicy beef noodle soup with herbs, lime and chili on the side at NC Phở",
      intro: "If phở is Vietnam's calm, bún bò Huế is its spark. This noodle soup comes from Huế, the central city that was the seat of the Nguyễn emperors from 1802 to 1945, a place known both for refined cooking and for liking its food hot.",
      sections: [
        { heading: "A city that cooks with fire", body: [
          "Huế's cuisine grew from two directions at once: the elaborate dishes of the royal court and the bold, chili-forward home cooking of central Vietnam. Bún bò Huế belongs to the second tradition but carries the polish of the first.",
          "In Huế it is a breakfast dish, and central Vietnamese families tend to defend it fiercely when someone else's version does not measure up.",
        ] },
        { heading: "What makes it different from phở", body: [
          "Almost everything. The noodles are thick and round instead of flat. The broth, built from beef and pork bones, is scented heavily with lemongrass and deepened with mắm ruốc, a fermented shrimp paste that gives it an unmistakable savory backbone. A spoonful of chili oil, sa tế, turns the surface red.",
          "Traditional bowls hold beef shank and pork knuckle, sometimes Vietnamese ham and other cuts, and come with lime, herbs and shredded banana blossom or cabbage on the side.",
        ] },
        { heading: "Eating it the way Huế does", body: [
          "Taste the broth, then add lime to lift it. Add herbs and greens a little at a time so they stay crisp. Expect a slow, building heat and a fragrance that lingers.",
          "A bowl of bún bò Huế is not rushed. It is eaten with a spoon in one hand, chopsticks in the other, and something cold to drink close by.",
        ] },
        { heading: "Our spicy beef noodle soup", body: [
          "On the NC Phở menu, the bowl that follows this road is No. 83, Spicy Beef Noodle Soup. If you love phở and want something with more lemongrass and more heat, it is the natural next step.",
          "Ask our team what goes into the bowl and how spicy it runs before you order, and we will help you decide.",
        ] },
      ],
    },
    vi: {
      title: "Phần 2 — Bún bò Huế: Tô bún đậm đà của đất cố đô",
      description: "Bún bò Huế đến từ kinh đô xưa của Việt Nam: tô bún thơm sả, đỏ màu sa tế và đầy cá tính. Câu chuyện của món ăn, và tô bún bò cay tại NC Phở.",
      imageAlt: "Tô bún bò cay với rau thơm, chanh và ớt tại NC Phở",
      intro: "Nếu phở là sự điềm tĩnh của ẩm thực Việt, thì bún bò Huế là ngọn lửa. Món bún này đến từ Huế, thành phố miền Trung từng là kinh đô của triều Nguyễn từ năm 1802 đến năm 1945, vùng đất nổi tiếng với cách nấu tinh tế và khẩu vị cay nồng.",
      sections: [
        { heading: "Thành phố nấu ăn bằng lửa", body: [
          "Ẩm thực Huế phát triển từ hai hướng cùng lúc: những món cầu kỳ của cung đình và lối nấu cay đậm của các gia đình miền Trung. Bún bò Huế thuộc về truyền thống thứ hai nhưng mang nét chỉn chu của truyền thống thứ nhất.",
          "Người Huế ăn bún bò vào buổi sáng, và người miền Trung thường rất khắt khe với những tô bún bò không đúng vị.",
        ] },
        { heading: "Khác phở ở điểm nào", body: [
          "Gần như mọi thứ. Sợi bún to và tròn thay vì dẹt. Nước dùng ninh từ xương bò và xương heo, thơm nồng mùi sả và đậm đà nhờ mắm ruốc, loại mắm lên men tạo nên vị mặn mà không thể nhầm lẫn. Một muỗng sa tế nhuộm đỏ mặt nước.",
          "Tô bún truyền thống có bắp bò, giò heo, đôi khi thêm chả lụa và các phần thịt khác, ăn kèm chanh, rau thơm và bắp chuối bào hoặc bắp cải.",
        ] },
        { heading: "Ăn như người Huế", body: [
          "Nếm nước dùng trước, rồi vắt chanh cho dậy vị. Thêm rau từng ít một để rau giữ được độ giòn. Hãy chờ vị cay lên dần và mùi thơm đọng lại.",
          "Tô bún bò Huế không ăn vội. Một tay cầm muỗng, một tay cầm đũa, bên cạnh là ly nước mát.",
        ] },
        { heading: "Tô bún bò cay của chúng tôi", body: [
          "Trong thực đơn NC Phở, tô bún đi theo con đường ấy là món số 83, Bún Bò Cay. Nếu bạn yêu phở và muốn thử món đậm mùi sả và cay hơn, đây là bước tiếp theo tự nhiên.",
          "Hãy hỏi nhân viên về thành phần và độ cay của tô bún trước khi gọi, chúng tôi sẽ giúp bạn chọn.",
        ] },
      ],
    },
  },
  {
    slug: "banh-mi-french-loaf-vietnamese-sandwich", kind: "story", part: 3, published: PUBLISHED, image: "food-2", dish: "a8",
    en: {
      title: "Part 3 — Bánh Mì: How a French Loaf Became Vietnamese",
      description: "The bánh mì story: a colonial-era baguette, a lighter Vietnamese loaf, and the fillings that made Saigon's sandwich famous, plus the Vietnamese sandwiches at NC Phở.",
      imageAlt: "Vietnamese bánh mì with grilled meat, pickled vegetables and herbs at NC Phở",
      intro: "Bánh mì simply means bread. Say it almost anywhere today, though, and people picture one thing: a crackly Vietnamese baguette split open and packed with meat, pickles and herbs. Its story is one of borrowing an outsider's ingredient and making it unmistakably local.",
      sections: [
        { heading: "A colonial-era loaf", body: [
          "The French brought wheat bread to Vietnam in the second half of the nineteenth century. For decades it was eaten much as it was in France: with butter, with pâté, or torn and dipped into something warm.",
          "Over time Vietnamese bakers adjusted the loaf to local tastes and to the climate, producing a baguette with a thin, shattering crust and a light, airy crumb. Many cooks credit a little rice flour for that lightness; others credit technique. Either way, it is a different bread from its Parisian ancestor.",
        ] },
        { heading: "The Saigon sandwich", body: [
          "In the 1950s, Saigon vendors began selling the loaf already filled, and the modern bánh mì took shape. A classic version layers pâté and mayonnaise with cold cuts such as chả lụa, Vietnamese pork sausage, then adds pickled carrot and daikon, cucumber, cilantro and chili, often with a few drops of Maggi seasoning.",
          "The result is rich and bright, soft and crunchy, all in one bite.",
        ] },
        { heading: "Why the bread matters most", body: [
          "A bánh mì lives or dies by its crust. A good one crackles when pressed and leaves crumbs on the table, while the inside stays soft enough not to scrape the roof of your mouth.",
          "That light structure is what lets a generous filling stay balanced instead of heavy.",
        ] },
        { heading: "Bánh mì at NC Phở", body: [
          "Our Vietnamese Sandwich, No. 8, comes with your choice of grilled pork, grilled beef, BBQ pork, cold cut or chicken. It makes a quick lunch on its own or a starter to share.",
          "Bread is not only for sandwiches here. Our bò kho, No. 85, can be ordered with bread for dipping, the way many Vietnamese families eat it for breakfast.",
        ] },
      ],
    },
    vi: {
      title: "Phần 3 — Bánh mì: Ổ bánh Pháp trở thành món Việt",
      description: "Câu chuyện bánh mì: ổ bánh từ thời Pháp thuộc, ổ bánh Việt nhẹ xốp hơn và những loại nhân làm nên danh tiếng bánh mì Sài Gòn, cùng bánh mì tại NC Phở.",
      imageAlt: "Bánh mì Việt Nam với thịt nướng, đồ chua và rau thơm tại NC Phở",
      intro: "Bánh mì chỉ đơn giản là bánh làm từ bột mì. Thế nhưng ngày nay nhắc đến bánh mì ở hầu hết mọi nơi, người ta đều nghĩ đến một hình ảnh: ổ bánh mì Việt giòn rụm được xẻ dọc, kẹp đầy thịt, đồ chua và rau thơm. Câu chuyện của nó là câu chuyện về việc mượn một nguyên liệu ngoại lai và biến nó thành thứ mang đậm bản sắc Việt.",
      sections: [
        { heading: "Ổ bánh từ thời Pháp thuộc", body: [
          "Người Pháp đưa bánh mì vào Việt Nam trong nửa sau thế kỷ XIX. Trong nhiều thập kỷ, bánh mì được ăn giống như ở Pháp: với bơ, với pa-tê, hoặc xé nhỏ chấm vào một món nước nóng.",
          "Dần dần, thợ làm bánh Việt điều chỉnh ổ bánh cho hợp khẩu vị và khí hậu, tạo ra ổ bánh có lớp vỏ mỏng giòn tan và ruột nhẹ xốp. Nhiều người cho rằng chút bột gạo tạo nên độ xốp ấy; người khác lại cho rằng đó là nhờ kỹ thuật. Dù thế nào, đây đã là một loại bánh khác hẳn tổ tiên Paris của nó.",
        ] },
        { heading: "Ổ bánh mì Sài Gòn", body: [
          "Vào thập niên 1950, những người bán hàng ở Sài Gòn bắt đầu bán bánh mì kẹp sẵn nhân, và bánh mì hiện đại thành hình. Một ổ bánh mì kinh điển có pa-tê, bơ trứng và các loại thịt nguội như chả lụa, thêm đồ chua cà rốt củ cải, dưa leo, ngò và ớt, thường rưới vài giọt nước tương Maggi.",
          "Kết quả là béo mà tươi, mềm mà giòn, tất cả trong một miếng cắn.",
        ] },
        { heading: "Vì sao ổ bánh quan trọng nhất", body: [
          "Một ổ bánh mì ngon hay dở nằm ở lớp vỏ. Ổ bánh ngon kêu răng rắc khi bóp và để lại vụn trên bàn, còn ruột bánh vẫn đủ mềm để không cứa miệng.",
          "Cấu trúc nhẹ ấy giúp phần nhân đầy đặn vẫn cân bằng thay vì nặng nề.",
        ] },
        { heading: "Bánh mì tại NC Phở", body: [
          "Bánh mì của chúng tôi, món số 8, có các lựa chọn thịt heo nướng, bò nướng, xá xíu, thịt nguội hoặc gà. Đây có thể là bữa trưa nhanh gọn hoặc món khai vị để chia sẻ.",
          "Bánh mì ở đây không chỉ để kẹp. Bò kho, món số 85, có thể gọi kèm bánh mì để chấm, đúng cách nhiều gia đình Việt vẫn ăn vào buổi sáng.",
        ] },
      ],
    },
  },
  {
    slug: "goi-cuon-fresh-spring-rolls", kind: "story", part: 4, published: PUBLISHED, image: "food-12", dish: "a2",
    en: {
      title: "Part 4 — Gỏi Cuốn: The Roll That Isn't Fried",
      description: "Fresh spring rolls, gỏi cuốn, are Vietnam's cool, translucent answer to fried food. Learn how they are made, how to dip them, and which rolls to try at NC Phở.",
      imageAlt: "Fresh shrimp spring rolls and Vietnamese egg rolls with dipping sauces at NC Phở",
      intro: "Much of the world knows spring rolls as something crisp and fried. Vietnam's gỏi cuốn go the other way: soft rice paper, cool noodles, crisp greens and shrimp glowing pink through a translucent wrapper. Nothing is cooked at the last minute, and that is exactly the appeal.",
      sections: [
        { heading: "Built by hand", body: [
          "Each roll starts with bánh tráng, a thin sheet of rice paper dipped briefly in water until it turns soft and pliable. On it go lettuce, herbs, rice vermicelli and the protein; classic versions often pair shrimp with thin slices of boiled pork.",
          "The roll is folded and tightened by hand, with the shrimp placed so they show through the wrapper. It takes practice to make them neat and firm.",
        ] },
        { heading: "The sauce is half the story", body: [
          "In southern Vietnam, gỏi cuốn are usually dipped in a thick sauce built from hoisin and peanut, sometimes topped with crushed peanuts and chili. Others prefer nước chấm, the lighter fish sauce dip.",
          "The roll itself is quiet on purpose. The sauce brings the volume.",
        ] },
        { heading: "How to eat them", body: [
          "Pick a roll up with your fingers, dip just the end, and bite. Dip again as you go rather than soaking the whole roll, which can make the rice paper slippery.",
          "Eat them soon after they arrive. Rice paper is at its best when fresh and tender.",
        ] },
        { heading: "Fresh rolls at NC Phở", body: [
          "Our appetizer menu offers three: Fresh Shrimp Spring Rolls (No. 2), Fried Tofu Spring Rolls (No. 3) and Grilled Beef Spring Rolls (No. 4), each served two rolls to an order.",
          "For a crunchy contrast, add a plate of Vietnamese egg rolls, No. 1, and share both.",
        ] },
      ],
    },
    vi: {
      title: "Phần 4 — Gỏi cuốn: Món cuốn không cần chiên",
      description: "Gỏi cuốn là món cuốn tươi mát, trong veo của ẩm thực Việt. Tìm hiểu cách cuốn, cách chấm và nên thử loại gỏi cuốn nào tại NC Phở.",
      imageAlt: "Gỏi cuốn tôm và chả giò kèm nước chấm tại NC Phở",
      intro: "Phần lớn thế giới biết đến món cuốn như một món chiên giòn. Gỏi cuốn Việt Nam thì ngược lại: bánh tráng mềm, bún mát, rau giòn và những con tôm hồng ửng hiện qua lớp bánh trong suốt. Không có gì phải nấu vào phút chót, và đó chính là sức hấp dẫn của món ăn.",
      sections: [
        { heading: "Cuốn bằng tay", body: [
          "Mỗi cuốn bắt đầu từ một tấm bánh tráng mỏng, nhúng nhanh qua nước cho mềm dẻo. Bên trên là xà lách, rau thơm, bún và phần đạm; gỏi cuốn truyền thống thường có tôm và thịt ba chỉ luộc thái mỏng.",
          "Cuốn được gấp và siết chặt bằng tay, tôm được xếp sao cho lộ qua lớp bánh. Phải luyện tập mới cuốn được đẹp và chắc tay.",
        ] },
        { heading: "Nước chấm là một nửa câu chuyện", body: [
          "Ở miền Nam, gỏi cuốn thường được chấm với tương đen pha đậu phộng sánh đặc, đôi khi rắc thêm đậu phộng giã và ớt. Có người lại thích nước mắm chua ngọt nhẹ nhàng hơn.",
          "Cuốn gỏi cố tình mang vị thanh. Nước chấm mới là phần làm nên vị đậm đà.",
        ] },
        { heading: "Ăn sao cho ngon", body: [
          "Cầm cuốn gỏi bằng tay, chấm phần đầu rồi cắn. Ăn đến đâu chấm đến đó thay vì nhúng cả cuốn, vì bánh tráng dễ bị trơn.",
          "Hãy ăn ngay khi món vừa ra. Bánh tráng ngon nhất khi còn tươi và mềm.",
        ] },
        { heading: "Gỏi cuốn tại NC Phở", body: [
          "Thực đơn khai vị có ba loại: Gỏi Cuốn Tôm (số 2), Gỏi Cuốn Đậu Hũ (số 3) và Gỏi Cuốn Bò Nướng (số 4), mỗi phần hai cuốn.",
          "Muốn có độ giòn tương phản, hãy gọi thêm một đĩa chả giò, món số 1, để cả bàn cùng thưởng thức.",
        ] },
      ],
    },
  },
  {
    slug: "ca-phe-sua-da-vietnamese-iced-coffee", kind: "story", part: 5, published: PUBLISHED, image: "drink-1", dish: "d88",
    en: {
      title: "Part 5 — Cà Phê Sữa Đá: Vietnam's Slow Coffee",
      description: "Vietnamese iced coffee, cà phê sữa đá: how coffee came to Vietnam, why it is made with condensed milk, and how to drink it at NC Phở.",
      imageAlt: "Vietnamese iced coffee among other drinks on the NC Phở menu",
      intro: "Order cà phê sữa đá in Vietnam and you are signing up to wait. Dark coffee drips slowly through a small metal filter onto a layer of sweetened condensed milk, then gets stirred and poured over ice. The result is strong, sweet and cold, and in Vietnam it is part of nearly every day.",
      sections: [
        { heading: "How coffee came to Vietnam", body: [
          "French missionaries and colonists introduced coffee in the nineteenth century, and plantations spread into the cool Central Highlands. Today Vietnam is one of the largest coffee producers in the world, second only to Brazil.",
          "Most of what it grows is robusta: a bold, low-acid bean with more caffeine and a deep, almost chocolatey bitterness.",
        ] },
        { heading: "Why condensed milk?", body: [
          "Fresh milk was scarce and hard to keep in Vietnam's heat, while canned sweetened condensed milk kept for months. It also happens to suit robusta perfectly: its thick sweetness rounds off the coffee's bitterness.",
          "What started as a practical choice became the signature of the drink.",
        ] },
        { heading: "The phin and the pause", body: [
          "The traditional brewer is the phin, a small metal filter that sits on top of the cup. Hot water is poured over the grounds and left to drip, a few minutes for each cup.",
          "In Vietnamese cafés that pause is the point. People sit, talk and watch the coffee fall drop by drop. Then everything is stirred, poured over ice and sipped slowly.",
        ] },
        { heading: "Coffee at NC Phở", body: [
          "Our menu lists Vietnamese Iced Coffee, No. 88, and for cooler days Vietnamese Hot Coffee, No. 89. Stir well before your first sip so the coffee and milk come together, and expect a strong cup.",
          "It is a classic finish to a bowl of phở, or a good reason to stop by on its own.",
        ] },
      ],
    },
    vi: {
      title: "Phần 5 — Cà phê sữa đá: Ly cà phê chậm rãi của người Việt",
      description: "Cà phê sữa đá: cà phê đến Việt Nam như thế nào, vì sao pha với sữa đặc, và thưởng thức ra sao tại NC Phở.",
      imageAlt: "Cà phê sữa đá cùng các thức uống khác trong thực đơn NC Phở",
      intro: "Gọi một ly cà phê sữa đá ở Việt Nam là chấp nhận chờ đợi. Cà phê đậm nhỏ từng giọt qua chiếc phin nhỏ xuống lớp sữa đặc, rồi được khuấy đều và rót vào ly đá. Kết quả là ly cà phê đậm, ngọt và mát lạnh, và ở Việt Nam, nó có mặt trong gần như mọi ngày.",
      sections: [
        { heading: "Cà phê đến Việt Nam", body: [
          "Các nhà truyền giáo và người Pháp đưa cây cà phê vào Việt Nam từ thế kỷ XIX, và các đồn điền dần lan lên vùng Tây Nguyên mát mẻ. Ngày nay Việt Nam là một trong những nước sản xuất cà phê lớn nhất thế giới, chỉ sau Brazil.",
          "Phần lớn là cà phê robusta, hay cà phê vối: hạt đậm, ít chua, nhiều caffeine và có vị đắng sâu gần như sô-cô-la.",
        ] },
        { heading: "Vì sao là sữa đặc?", body: [
          "Sữa tươi ngày trước khan hiếm và khó bảo quản trong cái nóng nhiệt đới, còn sữa đặc có đường đóng lon để được hàng tháng. Thật tình cờ, sữa đặc lại rất hợp với robusta: vị ngọt sánh làm dịu vị đắng của cà phê.",
          "Từ một lựa chọn thực tế, sữa đặc trở thành dấu ấn của thức uống này.",
        ] },
        { heading: "Chiếc phin và khoảng lặng", body: [
          "Dụng cụ pha truyền thống là chiếc phin, bộ lọc kim loại nhỏ đặt trên miệng ly. Nước nóng được rót lên bột cà phê rồi để nhỏ giọt, mất vài phút cho mỗi ly.",
          "Ở các quán cà phê Việt, khoảng chờ ấy chính là ý nghĩa. Người ta ngồi, trò chuyện và ngắm từng giọt cà phê rơi. Rồi tất cả được khuấy đều, rót vào ly đá và nhâm nhi chậm rãi.",
        ] },
        { heading: "Cà phê tại NC Phở", body: [
          "Thực đơn của chúng tôi có Cà Phê Sữa Đá, món số 88, và cho những ngày se lạnh là Cà Phê Nóng, món số 89. Khuấy đều trước ngụm đầu tiên để cà phê và sữa hòa quyện, và hãy chuẩn bị cho một ly cà phê đậm.",
          "Đây là cách kết thúc kinh điển sau một tô phở, hoặc là lý do để bạn ghé quán.",
        ] },
      ],
    },
  },

  {
    slug: "vietnamese-egg-rolls-washington-nc", kind: "guide", topic: "starters", published: PUBLISHED, image: "food-12", dish: "a1",
    en: {
      title: "Vietnamese Egg Rolls: Why the First Bite Crackles",
      description: "Get to know chả giò, the Vietnamese egg rolls at NC Phở in Washington, NC: how they are traditionally made, how to eat them, and what to order alongside.",
      imageAlt: "Vietnamese egg rolls and fresh shrimp spring rolls with dipping sauces at NC Phở",
      intro: "Ask a table of Vietnamese families what goes on the plate first at a celebration, and chả giò will come up fast. These small fried rolls are party food and Sunday food, and at NC Phở they are item No. 1 on the menu: three rolls to start the meal while the kitchen works on the rest.",
      sections: [
        { heading: "Small roll, many layers", body: [
          "In southern Vietnam they are called chả giò; in the north, nem rán. Recipes change from family to family, but a classic filling mixes seasoned ground meat with finely cut vegetables such as carrot, onion and taro, plus glass noodles and wood ear mushroom for a little chew. The roll is wrapped tightly and fried until the outside turns deep gold and blistered.",
          "That tight wrap matters. It keeps the filling juicy while the shell crisps, which is why a good egg roll crackles first and steams second.",
        ] },
        { heading: "Eat them like a regular", body: [
          "You can simply dip and bite. Many Vietnamese diners go one step further: wrap a piece of egg roll in a lettuce leaf with a few herbs, then dip. A cool leaf and a hot roll in the same bite is the whole point.",
          "Cutting a roll in half also lets it cool faster if you cannot wait.",
        ] },
        { heading: "Where else egg rolls appear on our menu", body: [
          "Egg rolls are not only a starter. At NC Phở you will find them in vermicelli bowls (Nos. 33 to 36), on rice plates with grilled chicken or beef (Nos. 52 and 53), and in the house combos with fried chicken (S7.1 and S7.2).",
          "If you do not eat meat, No. 62 is a vegetarian version, and No. 65 serves those rolls over vermicelli.",
        ] },
        { heading: "Pair them well", body: [
          "Because egg rolls are rich and crisp, they balance best against something fresh: a bowl of phở, a vermicelli bowl full of herbs, or a cold drink. Ordering for the table? A plate of three goes quickly, so consider two.",
          "If you have a food allergy, ask our team about fillings and frying oil before you order.",
        ] },
      ],
    },
    vi: {
      title: "Chả giò: Vì sao miếng đầu tiên luôn giòn rụm",
      description: "Tìm hiểu chả giò tại NC Phở ở Washington, NC: cách làm truyền thống, cách ăn cho đúng vị và nên gọi kèm món gì.",
      imageAlt: "Chả giò và gỏi cuốn tôm kèm nước chấm tại NC Phở",
      intro: "Trong mâm cỗ ngày vui của nhiều gia đình Việt, chả giò thường là món được dọn ra đầu tiên. Món cuốn chiên nhỏ nhắn này gắn với những bữa tiệc và những ngày cuối tuần, và ở NC Phở, đó là món số 1 trong thực đơn: ba cuốn để mở đầu bữa ăn trong lúc bếp chuẩn bị các món chính.",
      sections: [
        { heading: "Cuốn nhỏ, nhiều lớp hương vị", body: [
          "Người miền Nam gọi là chả giò, người miền Bắc gọi là nem rán. Mỗi nhà một công thức, nhưng nhân truyền thống thường gồm thịt xay tẩm ướp, rau củ thái nhỏ như cà rốt, hành và khoai môn, thêm miến và mộc nhĩ để tạo độ dai. Cuốn được quấn thật chặt rồi chiên đến khi lớp vỏ vàng sậm, nổi bọt li ti.",
          "Quấn chặt tay là bí quyết: nhân giữ được độ ẩm trong khi vỏ giòn lên, nên một cuốn chả giò ngon sẽ giòn rụm trước, rồi mới thơm nóng bên trong.",
        ] },
        { heading: "Ăn chả giò như người sành ăn", body: [
          "Bạn có thể chấm và ăn ngay. Nhưng nhiều người Việt thích cuốn chả giò trong lá xà lách cùng vài cọng rau thơm rồi mới chấm. Lá rau mát lạnh và cuốn chả giò nóng hổi trong cùng một miếng, đó chính là cái thú của món này.",
          "Cắt đôi cuốn chả giò cũng giúp nhân nguội nhanh hơn nếu bạn không đợi được.",
        ] },
        { heading: "Chả giò còn có ở đâu trong thực đơn", body: [
          "Chả giò không chỉ là món khai vị. Ở NC Phở, bạn sẽ gặp chả giò trong các tô bún (từ món số 33 đến 36), trên đĩa cơm cùng gà hoặc bò nướng (món số 52 và 53), và trong các phần combo với gà chiên (S7.1 và S7.2).",
          "Nếu ăn chay, bạn có thể chọn chả giò chay (món số 62) hoặc bún chả giò chay (món số 65).",
        ] },
        { heading: "Gọi kèm cho tròn vị", body: [
          "Chả giò béo và giòn nên hợp nhất khi đi cùng món tươi mát: một tô phở, một tô bún đầy rau thơm hay một ly nước mát. Đi đông người? Một đĩa ba cuốn hết rất nhanh, hãy cân nhắc gọi hai đĩa.",
          "Nếu bạn bị dị ứng thực phẩm, hãy hỏi nhân viên về nhân và dầu chiên trước khi gọi món.",
        ] },
      ],
    },
  },
  {
    slug: "green-papaya-salad-washington-nc", kind: "guide", topic: "starters", published: PUBLISHED, image: "food-5", dish: "sl11",
    en: {
      title: "Green Papaya Salad: Crunch You Can Hear",
      description: "Green papaya salad at NC Phở in Washington, NC: what gỏi đu đủ is, how it differs from other papaya salads, and what to pair with it.",
      imageAlt: "Green papaya salad with shrimp and fresh herbs at NC Phở",
      intro: "Before papaya turns sweet and orange, it is firm, pale green and almost neutral in flavor. Shredded into long ribbons, it becomes the base of gỏi đu đủ, a crisp Vietnamese salad that is all about texture. At NC Phở you will find it as No. 11.",
      sections: [
        { heading: "A salad built on crunch", body: [
          "Green papaya does not bring much flavor on its own, and that is its gift: it takes on the dressing while staying crunchy. Vietnamese gỏi are typically tossed with herbs, roasted peanuts and a dressing that balances fish sauce, lime, sugar and chili.",
          "Toppings vary by region and by cook: shrimp, pork, or shredded beef jerky on the streets of Saigon.",
        ] },
        { heading: "Not the same as som tam", body: [
          "You may know Thai papaya salad, som tam, which is pounded in a mortar so the dressing bruises into the papaya. Vietnamese gỏi đu đủ is usually tossed rather than pounded.",
          "The strands stay longer and crisper, and the herbs play a bigger role.",
        ] },
        { heading: "When to eat it", body: [
          "Gỏi often opens a meal or sits alongside richer dishes. Its brightness resets your palate between bites of egg rolls, grilled meat or fried rice.",
          "Eat it soon after it arrives, while the papaya is at its crispest.",
        ] },
        { heading: "Our other salads", body: [
          "If you enjoy No. 11, our salad section also includes Shrimp Salad (No. 12), Chicken Salad (No. 13), Seaweed Salad (No. 14), Asia Squid Salad (No. 15) and Mango Salad with Shrimp (M1).",
        ] },
      ],
    },
    vi: {
      title: "Gỏi đu đủ: Giòn đến mức nghe được",
      description: "Gỏi đu đủ tại NC Phở, Washington, NC: gỏi đu đủ là gì, khác gì các món gỏi đu đủ khác, và nên ăn kèm món nào.",
      imageAlt: "Gỏi đu đủ tôm với rau thơm tại NC Phở",
      intro: "Trước khi chín ngọt và chuyển màu cam, đu đủ xanh có ruột chắc, màu xanh nhạt và gần như không mùi vị. Bào thành sợi dài, nó trở thành nền của gỏi đu đủ, món gỏi Việt giòn mát, đề cao kết cấu. Ở NC Phở, đó là món số 11.",
      sections: [
        { heading: "Món gỏi của độ giòn", body: [
          "Đu đủ xanh tự nó không đậm vị, và đó lại là điểm hay: sợi đu đủ thấm nước trộn mà vẫn giữ được độ giòn. Gỏi Việt thường được trộn với rau thơm, đậu phộng rang và nước trộn cân bằng giữa nước mắm, chanh, đường và ớt.",
          "Phần ăn kèm thay đổi tùy vùng và tùy người nấu: tôm, thịt heo, hay khô bò trên những con phố Sài Gòn.",
        ] },
        { heading: "Không giống som tam", body: [
          "Có thể bạn đã biết gỏi đu đủ Thái, som tam, được giã trong cối để nước trộn ngấm vào sợi đu đủ. Gỏi đu đủ Việt thường được trộn chứ không giã.",
          "Sợi đu đủ vì thế dài và giòn hơn, và rau thơm giữ vai trò quan trọng hơn.",
        ] },
        { heading: "Khi nào nên ăn", body: [
          "Gỏi thường mở đầu bữa ăn hoặc ăn kèm những món đậm vị. Vị tươi mát giúp làm mới vị giác giữa những miếng chả giò, thịt nướng hay cơm chiên.",
          "Hãy ăn ngay khi món vừa ra, lúc đu đủ còn giòn nhất.",
        ] },
        { heading: "Các món gỏi khác", body: [
          "Nếu thích món số 11, mục gỏi của chúng tôi còn có Gỏi Tôm (số 12), Gỏi Gà (số 13), Gỏi Rong Biển (số 14), Gỏi Mực (số 15) và Gỏi Xoài Tôm (M1).",
        ] },
      ],
    },
  },
  {
    slug: "grilled-beef-vermicelli-washington-nc", kind: "guide", topic: "noodles", published: PUBLISHED, image: "food-19", dish: "b28",
    en: {
      title: "Grilled Beef Vermicelli: A Bowl You Build Bite by Bite",
      description: "Bún bò nướng at NC Phở in Washington, NC: grilled beef over rice vermicelli with lettuce, basil, relish, peanuts and fish sauce, plus how to mix it and what else to try.",
      imageAlt: "Vermicelli bowl with lemongrass beef, fresh greens and dipping sauce at NC Phở",
      intro: "Phở gets the headlines, but on a warm afternoon in Vietnam plenty of people reach for bún instead: a room-temperature bowl of thin rice noodles, smoky grilled meat and a pile of fresh greens. At NC Phở that bowl is No. 28, Vermicelli with Grilled Beef.",
      sections: [
        { heading: "What is in the bowl", body: [
          "Bún are thin, round rice noodles, cooked and rinsed so they stay light and springy. Our vermicelli bowls come with shredded lettuce, basil, relish and peanuts, with fish sauce alongside, and the grilled beef goes on top.",
          "In Vietnamese cooking, beef for the grill is usually marinated with ingredients like garlic, lemongrass, fish sauce and a touch of sugar, which caramelizes over the heat and gives the edges their char.",
        ] },
        { heading: "Pour, toss, taste", body: [
          "The fish sauce is a dressing, not only a dip. Pour some over the bowl, then toss everything with chopsticks so each strand picks up a little sauce, herb and peanut. Add more as you go rather than all at once: the noodles soak it up, and you can always add but never take away.",
          "Every bite comes out a little different, more beef in one and more lettuce and basil in the next. That variety keeps a vermicelli bowl interesting to the last forkful.",
        ] },
        { heading: "Choosing among our bún bowls", body: [
          "If grilled beef is not your pick, the same bowl comes with grilled pork (No. 27), chicken (No. 29) or shrimp (No. 30), and in combinations (Nos. 31 and 32). For extra crunch, Nos. 33 to 36 add Vietnamese egg rolls.",
          "Nos. 37 and 38 swap the grill for lemongrass beef or chicken, and vegetarians can turn to Nos. 64 and 65.",
        ] },
        { heading: "A lunch that will not slow you down", body: [
          "A vermicelli bowl is filling without the heaviness of a hot soup, which is why many people think of it as a lunch dish. Add a fresh limeade or a Vietnamese iced coffee and you are set.",
        ] },
      ],
    },
    vi: {
      title: "Bún bò nướng: Tô bún tự trộn theo khẩu vị",
      description: "Bún bò nướng tại NC Phở, Washington, NC: thịt bò nướng trên bún cùng xà lách, rau thơm, đồ chua, đậu phộng và nước mắm, cách trộn và những lựa chọn khác.",
      imageAlt: "Tô bún bò xào sả với rau tươi và nước chấm tại NC Phở",
      intro: "Phở nổi tiếng nhất, nhưng vào những buổi trưa oi ả ở Việt Nam, nhiều người lại chọn bún: tô bún để nguội với sợi bún mảnh, thịt nướng thơm khói và thật nhiều rau. Ở NC Phở, đó là món số 28, Bún Thịt Bò Nướng.",
      sections: [
        { heading: "Trong tô bún có gì", body: [
          "Bún là sợi gạo tròn, mảnh, được luộc rồi xả nước để giữ độ mềm và tơi. Các tô bún của chúng tôi có xà lách, rau thơm, đồ chua và đậu phộng, kèm nước mắm, phía trên là thịt bò nướng.",
          "Trong ẩm thực Việt, thịt bò nướng thường được ướp với tỏi, sả, nước mắm và chút đường; đường gặp lửa sẽ cháy cạnh, tạo nên phần mép xém thơm.",
        ] },
        { heading: "Rưới, trộn, nếm", body: [
          "Nước mắm ở đây để trộn chứ không chỉ để chấm. Rưới một ít lên tô, dùng đũa trộn đều để từng sợi bún thấm nước mắm, rau thơm và đậu phộng. Hãy rưới từ từ: bún hút nước rất nhanh, thêm thì dễ mà bớt thì không được.",
          "Mỗi miếng sẽ một khác, miếng nhiều thịt, miếng nhiều rau. Chính sự thay đổi ấy làm tô bún hấp dẫn đến đũa cuối cùng.",
        ] },
        { heading: "Chọn tô bún hợp ý", body: [
          "Nếu không chọn bò nướng, bạn có bún thịt heo nướng (số 27), bún gà nướng (số 29), bún tôm nướng (số 30) hoặc các phần kết hợp (số 31 và 32). Muốn thêm giòn, các món từ số 33 đến 36 có chả giò.",
          "Món số 37 và 38 là bún bò hoặc gà xào sả, còn người ăn chay có thể chọn món số 64 và 65.",
        ] },
        { heading: "Bữa trưa no mà không nặng bụng", body: [
          "Tô bún đủ no nhưng không nặng như một tô súp nóng, nên nhiều người xem đây là món của buổi trưa. Gọi thêm ly nước chanh tươi hoặc cà phê sữa đá là vừa đẹp.",
        ] },
      ],
    },
  },
  {
    slug: "grilled-pork-rice-plate-washington-nc", kind: "guide", topic: "rice", published: PUBLISHED, image: "food-7", dish: "r42",
    en: {
      title: "Grilled Pork and Rice: The Plate Saigon Eats at Every Hour",
      description: "Grilled pork with steamed rice at NC Phở in Washington, NC: the story behind Vietnam's favorite rice plate, steamed versus fried rice, and the pork chop with eggs.",
      imageAlt: "Grilled pork chop with fried egg, steamed rice and fresh salad at NC Phở",
      intro: "Walk through Saigon at almost any hour and you will smell it: pork sizzling over charcoal at a cơm tấm stall, waiting to be laid over a mound of rice. That simple pairing of grilled meat, rice and something fresh is the idea behind No. 42 at NC Phở, Grilled Pork with Steamed Rice.",
      sections: [
        { heading: "A street plate with a story", body: [
          "Cơm tấm means broken rice. Grains that cracked during milling were once sold cheaply, and cooks turned them into a dish of their own, topped with grilled pork chops. Today cơm tấm is eaten from breakfast to late night, and the grilled pork rice plate is one of the most familiar Vietnamese meals anywhere.",
          "Our rice plates are served with white rice and a marinated salad, so each forkful can move between smoky, savory and bright.",
        ] },
        { heading: "Steamed or fried rice?", body: [
          "Every plate in our rice plate section lets you choose. Steamed rice is the classic: soft, plain and ready to soak up the juices of the pork. Fried rice makes a heartier meal with more savory flavor of its own.",
          "If it is your first time, start with steamed. It lets the grill speak.",
        ] },
        { heading: "When you want the full Saigon plate", body: [
          "No. 47 pairs a grilled pork chop with eggs over steamed rice, close to the cơm sườn trứng many Vietnamese grew up eating.",
          "Breaking an egg yolk over hot rice is reason enough to order it.",
        ] },
        { heading: "More from the grill", body: [
          "Grilled beef (No. 39), chicken (No. 40) and shrimp (No. 41) follow the same format, as do the combination plates from No. 43 to No. 46. If you like both pork and noodles, Vermicelli with Grilled Pork, No. 27, puts the same idea in a bowl.",
        ] },
      ],
    },
    vi: {
      title: "Cơm thịt heo nướng: Đĩa cơm Sài Gòn ăn ở mọi giờ",
      description: "Cơm thịt heo nướng tại NC Phở, Washington, NC: câu chuyện phía sau đĩa cơm quen thuộc, chọn cơm trắng hay cơm chiên, và món cơm sườn trứng.",
      imageAlt: "Cơm sườn nướng trứng ốp la với cơm trắng và rau tươi tại NC Phở",
      intro: "Dạo quanh Sài Gòn vào gần như bất kỳ giờ nào, bạn cũng sẽ ngửi thấy mùi thịt heo nướng trên than hồng ở những quán cơm tấm. Sự kết hợp giản dị giữa thịt nướng, cơm và chút rau tươi chính là tinh thần của món số 42 tại NC Phở, Cơm Thịt Heo Nướng.",
      sections: [
        { heading: "Đĩa cơm vỉa hè có câu chuyện riêng", body: [
          "Cơm tấm là cơm nấu từ hạt gạo bị vỡ trong lúc xay xát. Ngày trước, tấm được bán rẻ, rồi người nấu biến nó thành một món ăn riêng, ăn kèm sườn nướng. Ngày nay cơm tấm được ăn từ sáng đến khuya, và đĩa cơm thịt nướng là một trong những bữa ăn Việt quen thuộc nhất ở khắp nơi.",
          "Các món cơm đĩa của chúng tôi được phục vụ kèm cơm trắng và sa lát muối chua, để mỗi miếng ăn chuyển giữa vị khói, vị đậm đà và vị tươi mát.",
        ] },
        { heading: "Cơm trắng hay cơm chiên?", body: [
          "Mọi món trong mục cơm đĩa đều cho bạn chọn. Cơm trắng là lựa chọn kinh điển: mềm, mộc và thấm nước thịt. Cơm chiên biến đĩa cơm thành bữa ăn chắc bụng hơn với hương vị đậm đà riêng.",
          "Nếu là lần đầu, hãy thử cơm trắng để vị nướng lên tiếng.",
        ] },
        { heading: "Khi bạn muốn đúng chất đĩa cơm Sài Gòn", body: [
          "Món số 47 là cơm sườn nướng kèm trứng, gần với đĩa cơm sườn trứng mà nhiều người Việt đã ăn từ nhỏ.",
          "Chỉ riêng cảm giác trộn lòng đỏ trứng với cơm nóng đã đủ lý do để gọi món này.",
        ] },
        { heading: "Thêm lựa chọn từ bếp nướng", body: [
          "Cơm bò nướng (số 39), cơm gà nướng (số 40) và cơm tôm nướng (số 41) cũng theo cùng công thức, cũng như các đĩa cơm kết hợp từ món số 43 đến 46. Nếu thích cả thịt heo nướng lẫn bún, Bún Thịt Heo Nướng, món số 27, mang cùng ý tưởng ấy vào một tô bún.",
        ] },
      ],
    },
  },
  {
    slug: "grilled-chicken-egg-rolls-rice-washington-nc", kind: "guide", topic: "rice", published: PUBLISHED, image: "food-20", dish: "r52",
    en: {
      title: "Grilled Chicken, Egg Rolls and Rice: An Easy First Order",
      description: "Grilled chicken and Vietnamese egg rolls with steamed rice at NC Phở in Washington, NC: why this combination plate is a smart first order, and how to make it your own.",
      imageAlt: "Vermicelli bowl with grilled chicken and a Vietnamese egg roll at NC Phở",
      intro: "New to Vietnamese food and not sure where to start? Many people land on a plate like No. 52: grilled chicken, Vietnamese egg rolls and rice, with a marinated salad on the side. It is familiar enough to feel safe and Vietnamese enough to teach you something.",
      sections: [
        { heading: "Three textures, one plate", body: [
          "Grilled chicken brings smoke and savor. The egg rolls bring crunch. Rice is the calm center that ties them together, and the marinated salad adds a sour, crisp contrast.",
          "Try a bite of each on its own first, then start combining.",
        ] },
        { heading: "Why combination plates are so common", body: [
          "In Vietnam a rice plate is rarely just one thing. Street vendors and family kitchens like to pair a grilled meat with something fried or something pickled, so a single plate covers every craving.",
          "Our combination plates follow the same thinking.",
        ] },
        { heading: "Make it your way", body: [
          "Like every plate in our rice plate section, No. 52 comes with steamed rice or, for a heartier meal, fried rice. Prefer beef? No. 53 swaps in grilled beef.",
          "Want noodles instead of rice? Vermicelli with Grilled Chicken and Vietnamese Egg Rolls, No. 36, is the bowl version of the same idea.",
        ] },
        { heading: "Good for sharing, good for first-timers", body: [
          "Because everything on this plate is easy to recognize, it is a dependable choice for kids and for anyone trying Vietnamese food for the first time. Ordering for a group? Add a phở and a vermicelli bowl, and everyone at the table gets to taste something different.",
        ] },
      ],
    },
    vi: {
      title: "Cơm gà nướng chả giò: Món dễ chọn cho lần đầu",
      description: "Cơm gà nướng chả giò tại NC Phở, Washington, NC: vì sao đĩa cơm kết hợp này là lựa chọn dễ chịu cho lần đầu, và cách chọn theo ý bạn.",
      imageAlt: "Tô bún gà nướng kèm chả giò tại NC Phở",
      intro: "Mới làm quen với món Việt và chưa biết bắt đầu từ đâu? Nhiều người chọn một đĩa như món số 52: gà nướng, chả giò và cơm, kèm sa lát muối chua. Đủ quen thuộc để yên tâm, và đủ chất Việt để khám phá điều mới.",
      sections: [
        { heading: "Ba kết cấu trên một đĩa", body: [
          "Gà nướng mang vị khói và đậm đà. Chả giò mang độ giòn. Cơm là phần trung tâm nhẹ nhàng gắn kết tất cả, còn sa lát muối chua thêm vị chua giòn tương phản.",
          "Hãy nếm riêng từng món trước, rồi bắt đầu kết hợp.",
        ] },
        { heading: "Vì sao cơm phần kết hợp phổ biến", body: [
          "Ở Việt Nam, một đĩa cơm hiếm khi chỉ có một món. Hàng quán và bếp nhà đều thích kết hợp thịt nướng với món chiên hoặc đồ chua, để một đĩa cơm thỏa mãn mọi cơn thèm.",
          "Các đĩa cơm kết hợp của chúng tôi cũng theo tinh thần đó.",
        ] },
        { heading: "Chọn theo ý bạn", body: [
          "Như mọi món trong mục cơm đĩa, món số 52 có thể dùng cơm trắng, hoặc cơm chiên nếu bạn muốn chắc bụng hơn. Thích bò? Món số 53 thay bằng bò nướng.",
          "Muốn ăn bún thay cơm? Bún Gà Nướng Chả Giò, món số 36, là phiên bản tô bún của cùng ý tưởng.",
        ] },
        { heading: "Dễ chia sẻ, hợp cả người mới thử", body: [
          "Vì mọi thứ trên đĩa đều dễ nhận ra, đây là lựa chọn an toàn cho trẻ em và cho người lần đầu thử món Việt. Đi theo nhóm? Gọi thêm một tô phở và một tô bún để cả bàn cùng nếm nhiều hương vị.",
        ] },
      ],
    },
  },
  {
    slug: "sweet-and-sour-chicken-washington-nc", kind: "guide", topic: "rice", published: PUBLISHED, image: "food-4", dish: "r54",
    en: {
      title: "Sweet and Sour Chicken: A Flavor Vietnam Knows Well",
      description: "Sweet and sour chicken with steamed rice at NC Phở in Washington, NC: the sweet-sour balance in Vietnamese cooking, rice choices, and dishes to try next.",
      imageAlt: "Sesame chicken with steamed rice and vegetables at NC Phở",
      intro: "Sweet and sour chicken is often filed under takeout, but the pairing of sour and sweet runs deep in Vietnamese cooking. Chua ngọt shows up in soups, braises and dipping sauces across the country. At NC Phở, No. 54 serves it the easy way: over rice.",
      sections: [
        { heading: "Sour and sweet, in balance", body: [
          "Vietnamese cooks rarely let one flavor dominate. Canh chua, the sour soup of the Mekong Delta, balances tamarind with sweetness and savory fish sauce, and even everyday nước chấm is a careful mix of lime, sugar and fish sauce.",
          "Sweet and sour dishes follow the same rule: neither side should overpower the other.",
        ] },
        { heading: "What to expect on the plate", body: [
          "Sweet and sour chicken pairs pieces of chicken with a glossy sauce that is tangy first and sweet second; many versions add vegetables or fruit such as bell pepper, onion or pineapple.",
          "It is mild, comforting and easy to share, which makes it a familiar choice for families.",
        ] },
        { heading: "Steamed or fried rice", body: [
          "Steamed rice is the natural partner and soaks up the extra sauce. Choose fried rice for a heartier plate. Either way, the marinated salad served with our rice plates adds welcome crunch.",
        ] },
        { heading: "If you like this, try these", body: [
          "Sweet and Sour Tofu, No. 68, brings the same idea to a vegetarian plate. For a soup in the same spirit, try Vietnamese Sweet and Sour Shrimp Soup (S1).",
          "If saucy chicken over rice is your favorite, our specials also include Sesame Chicken (S3), Orange Chicken (S4) and General Tso's Chicken (TS2).",
        ] },
      ],
    },
    vi: {
      title: "Gà xào chua ngọt: Hương vị người Việt rất quen",
      description: "Cơm gà xào chua ngọt tại NC Phở, Washington, NC: sự cân bằng chua ngọt trong ẩm thực Việt, cách chọn cơm và các món nên thử tiếp.",
      imageAlt: "Cơm gà sốt mè với rau củ tại NC Phở",
      intro: "Gà xào chua ngọt thường bị xem là món ăn mang về kiểu Mỹ, nhưng sự kết hợp chua và ngọt vốn đã ăn sâu vào ẩm thực Việt. Vị chua ngọt có mặt trong canh, món kho và nước chấm khắp ba miền. Ở NC Phở, món số 54 mang hương vị ấy đến theo cách đơn giản nhất: ăn cùng cơm.",
      sections: [
        { heading: "Chua và ngọt, vừa vặn", body: [
          "Người nấu Việt hiếm khi để một vị lấn át. Canh chua miền Tây cân bằng vị chua của me với vị ngọt và vị mặn của nước mắm, và ngay cả chén nước chấm hằng ngày cũng là sự pha trộn tỉ mỉ giữa chanh, đường và nước mắm.",
          "Các món chua ngọt cũng theo nguyên tắc ấy: không vị nào át vị nào.",
        ] },
        { heading: "Trên đĩa có gì", body: [
          "Gà xào chua ngọt gồm những miếng gà quyện trong lớp sốt bóng, chua trước rồi ngọt sau; nhiều cách làm còn thêm rau củ hoặc trái cây như ớt chuông, hành tây hay thơm.",
          "Món ăn dịu vị, dễ ăn và dễ chia sẻ, nên là lựa chọn quen thuộc của nhiều gia đình.",
        ] },
        { heading: "Cơm trắng hay cơm chiên", body: [
          "Cơm trắng là cặp đôi tự nhiên, thấm hết phần sốt. Chọn cơm chiên nếu bạn muốn đĩa cơm chắc bụng hơn. Dù chọn cách nào, phần sa lát muối chua đi kèm các món cơm đĩa cũng thêm độ giòn dễ chịu.",
        ] },
        { heading: "Nếu thích món này, hãy thử thêm", body: [
          "Cơm Đậu Hũ Xào Chua Ngọt, món số 68, mang cùng ý tưởng đến một đĩa cơm chay. Muốn món canh cùng tinh thần, hãy thử Canh chua tôm kiểu Việt (S1).",
          "Và nếu thích gà sốt ăn với cơm, thực đơn món đặc biệt còn có Gà sốt mè (S3), Gà sốt cam (S4) và Gà General Tso (TS2).",
        ] },
      ],
    },
  },
  {
    slug: "shrimp-fried-rice-washington-nc", kind: "guide", topic: "rice", published: PUBLISHED, image: "food-14", dish: "f59",
    en: {
      title: "Shrimp Fried Rice: What the Wok Adds",
      description: "Shrimp fried rice at NC Phở in Washington, NC: how wok-fried rice gets its flavor, and how our six fried rice dishes compare.",
      imageAlt: "House special fried rice topped with shrimp at NC Phở",
      intro: "Fried rice is one of the world's great ways to use yesterday's rice, and Vietnamese kitchens have their own take on it: cơm chiên, tossed fast and hot until every grain is separate and lightly toasted. Our Shrimp Fried Rice, No. 59, is a straightforward version of that idea.",
      sections: [
        { heading: "Why fried rice starts the day before", body: [
          "Cooks across Asia prefer rice that was cooked ahead and allowed to cool. Fresh rice is soft and steamy and clumps in the pan; chilled rice has firmed up, so the grains stay separate and can crisp a little.",
          "A very hot wok and constant movement add a toasty, slightly smoky flavor that is hard to get any other way.",
        ] },
        { heading: "Shrimp and rice, built to match", body: [
          "Shrimp cook in minutes, which suits the speed of a wok. They bring sweetness and a gentle snap that plays against the soft rice.",
          "Fried rice is mild by design. If you like more punch, a little chili sauce goes a long way.",
        ] },
        { heading: "Six fried rice dishes, compared", body: [
          "Our fried rice section runs from Mixed Vegetable (No. 56) through Chicken (No. 57), Beef (No. 58) and Shrimp (No. 59). Seafood Fried Rice, No. 60, combines shrimp, fishball, squid and crab meat.",
          "House Special Fried Rice, No. 61, with BBQ pork, Chinese sausage and shrimp, follows the style Vietnamese call cơm chiên Dương Châu.",
        ] },
        { heading: "Make it a meal", body: [
          "Fried rice pairs well with something crisp or fresh: Vietnamese egg rolls (No. 1), fresh shrimp spring rolls (No. 2) or a green papaya salad (No. 11). And if you like fried rice with grilled meat, every plate in our rice plate section can be ordered with fried rice instead of steamed.",
        ] },
      ],
    },
    vi: {
      title: "Cơm chiên tôm: Chảo nóng làm nên khác biệt",
      description: "Cơm chiên tôm tại NC Phở, Washington, NC: vì sao cơm chiên thơm ngon, và sáu món cơm chiên trong thực đơn khác nhau thế nào.",
      imageAlt: "Cơm chiên Dương Châu với tôm tại NC Phở",
      intro: "Cơm chiên là một trong những cách tận dụng cơm nguội nổi tiếng nhất thế giới, và bếp Việt có cách làm riêng: đảo thật nhanh trên chảo thật nóng cho từng hạt cơm tơi và hơi se mặt. Cơm Chiên Tôm, món số 59, là phiên bản giản dị của tinh thần ấy.",
      sections: [
        { heading: "Vì sao cơm chiên bắt đầu từ hôm trước", body: [
          "Đầu bếp khắp châu Á thích dùng cơm đã nấu sẵn và để nguội. Cơm mới nấu mềm, nhiều hơi nước và dễ vón cục; cơm nguội đã ráo hạt nên khi chiên vẫn tơi và có thể giòn nhẹ.",
          "Chảo thật nóng và đảo liên tục tạo nên mùi thơm khói nhẹ khó có được bằng cách khác.",
        ] },
        { heading: "Tôm và cơm, một cặp ăn ý", body: [
          "Tôm chín chỉ trong vài phút, rất hợp với tốc độ của chảo nóng. Tôm mang vị ngọt và độ giòn sần sật, tương phản với hạt cơm mềm.",
          "Cơm chiên vốn có vị nhẹ. Nếu thích cay, thêm một chút tương ớt là đủ.",
        ] },
        { heading: "So sánh sáu món cơm chiên", body: [
          "Mục cơm chiên của chúng tôi gồm Cơm Chiên Rau Cải (số 56), Cơm Chiên Gà (số 57), Cơm Chiên Bò (số 58) và Cơm Chiên Tôm (số 59). Cơm Chiên Hải Sản, món số 60, có tôm, cá viên, mực và thịt cua.",
          "Cơm Chiên Dương Châu, món số 61, gồm xá xíu, lạp xưởng và tôm.",
        ] },
        { heading: "Gọi thêm cho tròn bữa", body: [
          "Cơm chiên hợp với món giòn hoặc tươi mát: chả giò (số 1), gỏi cuốn tôm (số 2) hoặc gỏi đu đủ (số 11). Nếu thích cơm chiên ăn cùng thịt nướng, mọi món trong mục cơm đĩa đều có thể đổi sang cơm chiên thay vì cơm trắng.",
        ] },
      ],
    },
  },
  {
    slug: "vegetarian-pho-washington-nc", kind: "guide", topic: "vegetarian", published: PUBLISHED, image: "food-18", dish: "v63",
    en: {
      title: "Vegetarian Phở: All the Ritual, None of the Beef",
      description: "Vegetarian phở at NC Phở in Washington, NC: where meatless phở comes from, what usually goes into the bowl, and the other vegetarian dishes on our menu.",
      imageAlt: "Bowl of vegetable phở with tofu, broccoli and carrots at NC Phở",
      intro: "Phở began as a beef soup, but Vietnam also has a long tradition of meat-free cooking. Many Buddhist families eat vegetarian on the first and fifteenth days of the lunar month, and temple kitchens have spent generations drawing deep flavor out of vegetables. Phở chay grew from that tradition, and at NC Phở it is No. 63.",
      sections: [
        { heading: "Where the flavor comes from", body: [
          "A good vegetarian phở keeps what people love most about phở: slippery rice noodles, fresh herbs, and a broth fragrant with spices like star anise and cinnamon.",
          "Without bones to simmer, cooks traditionally build that broth from vegetables such as daikon, carrot, onion and mushrooms, often with charred onion and ginger for depth. Tofu adds protein and soaks up the broth.",
        ] },
        { heading: "Eat it the phở way", body: [
          "Treat it like any other bowl. Taste the broth before adding anything, then add herbs, a squeeze of lime and sauces a little at a time.",
          "Lift the noodles with chopsticks, sip the broth from the spoon, and enjoy it while it is hot.",
        ] },
        { heading: "Ask us about your diet", body: [
          "Our menu has two vegetable-focused phở bowls: Vegetarian Pho (No. 63) in the vegetarian section and Vegetable Phở (No. 25) among our classic phở.",
          "If you eat strictly vegetarian or vegan, tell us when you order. Our team can walk you through the broth and sauces in each bowl and help you choose.",
        ] },
        { heading: "More from our vegetarian menu", body: [
          "Vietnamese Vegetarian Egg Rolls (No. 62) make an easy starter. Fried Tofu with Vermicelli (No. 64), Vegetarian Egg Rolls with Vermicelli (No. 65), Shaking Tofu (No. 66), Stir-Fried Vegetables and Tofu (No. 67) and Sweet and Sour Tofu (No. 68) round out the section.",
        ] },
      ],
    },
    vi: {
      title: "Phở chay: Trọn nghi thức của tô phở, không cần thịt bò",
      description: "Phở chay tại NC Phở, Washington, NC: nguồn gốc của phở chay, những gì thường có trong tô phở và các món chay khác trong thực đơn.",
      imageAlt: "Tô phở rau củ với đậu hũ, bông cải và cà rốt tại NC Phở",
      intro: "Phở khởi đầu là món nước dùng bò, nhưng Việt Nam cũng có truyền thống ăn chay lâu đời. Nhiều gia đình theo đạo Phật ăn chay vào ngày rằm và mùng một âm lịch, và các bếp chùa đã dành nhiều thế hệ để làm nên hương vị đậm đà từ rau củ. Phở chay ra đời từ truyền thống ấy, và ở NC Phở, đó là món số 63.",
      sections: [
        { heading: "Vị ngọt đến từ đâu", body: [
          "Một tô phở chay ngon vẫn giữ những điều người ta yêu ở phở: sợi bánh phở mềm mượt, rau thơm tươi và nước dùng thơm mùi hồi, quế.",
          "Không có xương để ninh, người nấu thường hầm nước dùng từ củ cải trắng, cà rốt, hành tây và nấm, thêm hành và gừng nướng để dậy mùi. Đậu hũ bổ sung đạm và thấm đẫm nước dùng.",
        ] },
        { heading: "Ăn đúng kiểu ăn phở", body: [
          "Hãy thưởng thức như mọi tô phở khác. Nếm nước dùng trước khi nêm, rồi thêm rau thơm, chút chanh và nước sốt từ từ.",
          "Gắp bánh phở bằng đũa, húp nước dùng bằng muỗng và ăn khi còn nóng.",
        ] },
        { heading: "Hãy cho chúng tôi biết chế độ ăn của bạn", body: [
          "Thực đơn có hai tô phở thiên về rau: Phở Chay (số 63) trong mục món chay và Phở Rau Cải (số 25) trong nhóm phở truyền thống.",
          "Nếu bạn ăn chay hoặc thuần chay nghiêm ngặt, hãy báo khi gọi món. Nhân viên sẽ giải thích về nước dùng và nước sốt của từng tô và giúp bạn chọn.",
        ] },
        { heading: "Thêm món từ thực đơn chay", body: [
          "Chả Giò Chay (số 62) là món khai vị dễ gọi. Bún Đậu Hũ Chiên (số 64), Bún Chả Giò Chay (số 65), Cơm Đậu Hũ Lúc Lắc (số 66), Cơm Xào Rau Cải & Đậu Hũ (số 67) và Cơm Đậu Hũ Xào Chua Ngọt (số 68) hoàn thiện thực đơn chay.",
        ] },
      ],
    },
  },
  {
    slug: "stir-fried-vegetables-tofu-washington-nc", kind: "guide", topic: "vegetarian", published: PUBLISHED, image: "food-17", dish: "v67",
    en: {
      title: "Stir-Fried Vegetables and Tofu: A Vegetarian Plate with Backbone",
      description: "Stir-fried vegetables and tofu with steamed rice at NC Phở in Washington, NC: why tofu matters in Vietnamese cooking and how to choose among our tofu dishes.",
      imageAlt: "Shaking tofu with vegetables and steamed rice at NC Phở",
      intro: "In Vietnam, đậu hũ, tofu, is not a stand-in for anything. It is sold fresh at morning markets, fried golden at home and cooked with real care in temple kitchens. No. 67 at NC Phở, Stir-Fried Vegetables and Tofu with Steamed Rice, is a simple way to see why.",
      sections: [
        { heading: "Why tofu works in a stir-fry", body: [
          "Tofu is mild, which makes it a willing partner for whatever it is cooked with. Fried first, it develops a golden skin that holds its shape in a hot pan and grabs onto sauce.",
          "Tossed with vegetables in a quick stir-fry, xào in Vietnamese, it adds protein and a soft center that contrasts with crisp vegetables.",
        ] },
        { heading: "A plate that stays light", body: [
          "A stir-fry keeps vegetables bright and crunchy rather than soft, so the plate feels fresh even though it is warm and filling.",
          "Spoon some vegetables and sauce over the rice as you go, so the last bites are as good as the first.",
        ] },
        { heading: "Which tofu dish is right for you", body: [
          "Our vegetarian section offers several ways to eat tofu. Shaking Tofu (No. 66) is cubed and tossed in a hot pan, the way shaking beef is. Sweet and Sour Tofu (No. 68) leans tangy. Fried Tofu with Vermicelli (No. 64) moves tofu into a cool noodle bowl.",
          "If you would rather have vegetables with fried rice, Stir-Fried Vegetables (No. 51) in our rice plate section can be ordered with steamed or fried rice.",
        ] },
        { heading: "Tell us how you eat", body: [
          "If you avoid fish sauce, eggs or other animal products, mention it when you order. Our team can walk you through what goes into each sauce and help you find the right plate.",
        ] },
      ],
    },
    vi: {
      title: "Cơm xào rau cải & đậu hũ: Đĩa cơm chay đầy đặn",
      description: "Cơm xào rau cải & đậu hũ tại NC Phở, Washington, NC: vai trò của đậu hũ trong ẩm thực Việt và cách chọn giữa các món đậu hũ.",
      imageAlt: "Cơm đậu hũ lúc lắc với rau củ và cơm trắng tại NC Phở",
      intro: "Ở Việt Nam, đậu hũ không phải là món ăn thay thế. Đậu hũ được bán tươi ở chợ sáng, chiên vàng trong bếp nhà và được nấu nâng niu trong bếp chùa. Món số 67 tại NC Phở, Cơm Xào Rau Cải & Đậu Hũ, là cách đơn giản để hiểu vì sao.",
      sections: [
        { heading: "Vì sao đậu hũ hợp với món xào", body: [
          "Đậu hũ có vị nhẹ, nên dễ hòa hợp với bất cứ nguyên liệu nào nấu cùng. Chiên trước, đậu có lớp vỏ vàng giữ được hình khi đảo trên chảo nóng và bám sốt rất tốt.",
          "Xào nhanh cùng rau củ, đậu hũ bổ sung đạm và phần ruột mềm, tương phản với rau giòn.",
        ] },
        { heading: "Đĩa cơm vẫn nhẹ nhàng", body: [
          "Món xào giữ cho rau xanh tươi và giòn thay vì mềm nhũn, nên đĩa cơm vẫn tươi mát dù ấm nóng và no bụng.",
          "Hãy múc rau và nước sốt lên cơm dần dần, để những miếng cuối vẫn ngon như miếng đầu.",
        ] },
        { heading: "Món đậu hũ nào hợp với bạn", body: [
          "Thực đơn chay có nhiều cách thưởng thức đậu hũ. Cơm Đậu Hũ Lúc Lắc (số 66) cắt hạt lựu và đảo trên chảo nóng như bò lúc lắc. Cơm Đậu Hũ Xào Chua Ngọt (số 68) thiên về vị chua ngọt. Bún Đậu Hũ Chiên (số 64) đưa đậu hũ vào tô bún mát.",
          "Nếu muốn rau xào ăn với cơm chiên, Cơm Xào Rau Cải (số 51) trong mục cơm đĩa có thể chọn cơm trắng hoặc cơm chiên.",
        ] },
        { heading: "Cho chúng tôi biết cách bạn ăn", body: [
          "Nếu bạn kiêng nước mắm, trứng hay các sản phẩm từ động vật, hãy báo khi gọi món. Nhân viên sẽ giải thích thành phần từng loại sốt và giúp bạn chọn đĩa phù hợp.",
        ] },
      ],
    },
  },
  {
    slug: "bo-kho-beef-stew-washington-nc", kind: "guide", topic: "noodles", published: PUBLISHED, image: "food-15", dish: "sp-85",
    en: {
      title: "Bò Kho: The Vietnamese Beef Stew That Asks for Bread",
      description: "Bò kho at NC Phở in Washington, NC: what makes Vietnamese beef stew different from phở, and whether to pair it with bread, rice noodles or egg noodles.",
      imageAlt: "Bowl of bò kho beef stew served with a toasted baguette at NC Phở",
      intro: "If phở is clear and delicate, bò kho is its warm, brick-red cousin. This slow-cooked Vietnamese beef stew is a breakfast favorite in the south, usually eaten with a crusty baguette for dipping. At NC Phở it sits among our house specials as No. 85.",
      sections: [
        { heading: "Stew, not soup", body: [
          "Phở broth is strained and clear; bò kho is thick and rich. Chunks of beef are braised until tender with aromatics such as lemongrass, ginger, garlic, star anise and cinnamon, and the stew is traditionally tinted orange-red with annatto. Carrots cook down in the same pot and soak up the spiced broth.",
          "Kho means to braise slowly, the same technique behind Vietnamese caramelized catfish in a clay pot, which you will also find on our specials menu (S2).",
        ] },
        { heading: "Bread, rice noodles or egg noodles", body: [
          "Our bò kho comes with your choice of bread, rice noodles or egg noodles, and each changes the dish. Bread is the classic: tear it, dip it, and let it soak up the stew.",
          "Rice noodles turn it into a lighter bowl. Egg noodles add a springier bite and stand up well to the thick broth.",
        ] },
        { heading: "Finishing the bowl", body: [
          "In Vietnam, bò kho is often brightened with a squeeze of lime and a handful of herbs such as Thai basil, which cut through the richness and the spices.",
          "Save some bread for the end. Wiping the bowl clean is part of the tradition.",
        ] },
        { heading: "When to order it", body: [
          "Bò kho is a comforting choice on a cool day, or whenever you want something heartier than a noodle soup. If you love it, try our Spicy Beef Noodle Soup (No. 83) next, or keep the bread theme going with a Vietnamese Sandwich (No. 8).",
        ] },
      ],
    },
    vi: {
      title: "Bò kho: Món bò hầm phải chấm với bánh mì",
      description: "Bò kho tại NC Phở, Washington, NC: điểm khác biệt giữa bò kho và phở, và nên ăn kèm bánh mì, bún hay mì.",
      imageAlt: "Tô bò kho ăn kèm bánh mì nướng giòn tại NC Phở",
      intro: "Nếu phở trong và thanh, thì bò kho là người anh em đậm đà, ấm áp với sắc đỏ cam. Món bò hầm này là món ăn sáng quen thuộc ở miền Nam, thường ăn cùng ổ bánh mì giòn để chấm. Ở NC Phở, bò kho nằm trong nhóm món đặc biệt với số 85.",
      sections: [
        { heading: "Là món hầm, không phải món súp", body: [
          "Nước phở được lọc trong, còn bò kho sánh và đậm. Thịt bò cắt miếng được hầm mềm cùng sả, gừng, tỏi, hoa hồi và quế, và theo truyền thống được tạo màu đỏ cam bằng hạt điều màu. Cà rốt được hầm chung nồi, thấm đều nước dùng thơm mùi gia vị.",
          "Chữ kho chỉ cách nấu liu riu cho thấm, cũng là kỹ thuật làm nên món cá kho tộ có trong thực đơn món đặc biệt của chúng tôi (S2).",
        ] },
        { heading: "Bánh mì, bún hay mì", body: [
          "Bò kho ở đây được phục vụ kèm bánh mì, bún hoặc mì tùy bạn chọn, và mỗi lựa chọn mang lại một trải nghiệm khác. Bánh mì là kinh điển: xé nhỏ, chấm ngập nước kho.",
          "Bún giúp tô bò kho nhẹ nhàng hơn. Mì có độ dai và rất hợp với nước dùng sánh.",
        ] },
        { heading: "Ăn cho trọn tô", body: [
          "Ở Việt Nam, bò kho thường được ăn kèm chút chanh và rau thơm như húng quế để cân bằng vị béo và mùi gia vị.",
          "Hãy chừa lại một miếng bánh mì cho cuối bữa. Vét sạch tô cũng là một phần của truyền thống.",
        ] },
        { heading: "Khi nào nên gọi bò kho", body: [
          "Bò kho là lựa chọn ấm lòng vào ngày se lạnh, hoặc bất cứ khi nào bạn muốn món gì chắc bụng hơn một tô súp mì. Nếu thích bò kho, lần sau hãy thử Bún Bò Cay (số 83), hoặc tiếp nối chủ đề bánh mì với Bánh Mì (số 8).",
        ] },
      ],
    },
  },
];

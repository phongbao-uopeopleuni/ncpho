/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { BRAND_INFO, Language } from "../constants";
import SEO from "./SEO";

interface TermsOfServiceProps {
  lang: Language;
}

const LAST_UPDATED = "May 15, 2026";

interface Section {
  heading: string;
  body: string[];
}

const CONTENT: Record<Language, { intro: string; sections: Section[] }> = {
  en: {
    intro:
      "Welcome to North Carolina Phở. These Terms of Service (\"Terms\") govern your use of our website and the information presented on it. By accessing or using this site, you agree to be bound by these Terms. If you do not agree, please do not use the site.",
    sections: [
      {
        heading: "1. About These Terms",
        body: [
          `These Terms apply to the website operated by ${BRAND_INFO.name} ("we", "us", "our"). They do not govern in-restaurant dining, which is subject to our normal restaurant policies and applicable law.`,
          "We may update these Terms from time to time. When we do, we will revise the \"Last Updated\" date at the top of this page. Continued use of the website after a change means you accept the updated Terms.",
        ],
      },
      {
        heading: "2. Use of the Website",
        body: [
          "The website is provided for personal, non-commercial informational purposes — to share our menu, story, photos, hours, and location with our guests.",
          "You agree not to: (a) use the site for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the site, server, or related infrastructure; (c) interfere with or disrupt the site, including by introducing malware, scraping at a rate that degrades service, or bypassing security measures; (d) use automated systems to harvest content or contact information for commercial use without our permission.",
        ],
      },
      {
        heading: "3. Menu, Pricing, and Availability",
        body: [
          "We make reasonable efforts to keep menu items, descriptions, photos, and prices accurate, but everything on this website is subject to change without notice. The version of the menu used in our restaurant at the time of your visit controls — including item availability, portion size, and final price.",
          "Photographs are illustrative. Actual plating may vary.",
          "Promotional offers, if any, are limited in time and quantity, may exclude certain items, and may not be combined with other offers unless we state otherwise.",
        ],
      },
      {
        heading: "4. Allergies, Dietary Restrictions, and Food Safety",
        body: [
          "Our kitchen handles a wide range of ingredients — including beef, pork, poultry, seafood, shellfish, eggs, dairy, soy, wheat, peanuts, tree nuts, sesame, and gluten — often on shared equipment and surfaces. We cannot guarantee that any dish is free of any specific allergen or contaminant.",
          "If you have a food allergy, intolerance, or other dietary restriction, please inform our staff before ordering so we can describe ingredients and preparation methods. The final decision to consume any dish is yours.",
          "Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions.",
        ],
      },
      {
        heading: "5. Intellectual Property",
        body: [
          `All content on this website — including the "${BRAND_INFO.name}" name and logo, menu descriptions, photographs, illustrations, layout, and code — is owned by us or used with permission and is protected by copyright, trademark, and other intellectual property laws.`,
          "You may view, share, and print pages for personal, non-commercial use. You may not reproduce, modify, distribute, or commercially exploit any part of the site without our prior written permission.",
        ],
      },
      {
        heading: "6. External Links and Third-Party Services",
        body: [
          "The website may contain links to third-party websites (for example, mapping services or social media). We provide these links for convenience only; we do not control and are not responsible for the content, policies, or practices of any third-party site or service.",
        ],
      },
      {
        heading: "7. Disclaimers",
        body: [
          "THE WEBSITE AND ITS CONTENT ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, OR UNINTERRUPTED AVAILABILITY.",
          "We do not warrant that the website will be error-free or free of viruses or other harmful components. Your use of the website is at your sole risk.",
        ],
      },
      {
        heading: "8. Limitation of Liability",
        body: [
          "To the fullest extent permitted by law, we and our owners, employees, and suppliers will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or any information on it, even if we have been advised of the possibility of such damages.",
          "Nothing in these Terms limits or excludes liability that cannot be limited or excluded under applicable law.",
        ],
      },
      {
        heading: "9. Indemnification",
        body: [
          "You agree to defend, indemnify, and hold harmless North Carolina Phở and its owners, employees, and suppliers from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of your violation of these Terms or your misuse of the website.",
        ],
      },
      {
        heading: "10. Governing Law",
        body: [
          "These Terms are governed by the laws of the State of North Carolina, USA, without regard to its conflict-of-laws principles. You agree that any dispute relating to these Terms or the website shall be brought exclusively in the state or federal courts located in North Carolina, and you consent to the jurisdiction of those courts.",
        ],
      },
      {
        heading: "11. Severability and Entire Agreement",
        body: [
          "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect. These Terms, together with our Privacy Policy, are the entire agreement between you and us regarding the website.",
        ],
      },
      {
        heading: "12. Contact Us",
        body: [
          `Questions about these Terms? Please contact us:`,
          `${BRAND_INFO.name} — ${BRAND_INFO.address}`,
          `Phone: ${BRAND_INFO.phone} · Email: ${BRAND_INFO.email}`,
        ],
      },
    ],
  },
  vi: {
    intro:
      "Chào mừng bạn đến với North Carolina Phở. Điều khoản dịch vụ này (\"Điều khoản\") quy định việc bạn sử dụng website và các thông tin được trình bày trên đó. Khi truy cập hoặc sử dụng website, bạn đồng ý bị ràng buộc bởi các Điều khoản này. Nếu không đồng ý, vui lòng không sử dụng website.",
    sections: [
      {
        heading: "1. Về các Điều khoản này",
        body: [
          `Điều khoản này áp dụng cho website do ${BRAND_INFO.name} ("chúng tôi") vận hành. Điều khoản không điều chỉnh việc dùng bữa trực tiếp tại nhà hàng — việc đó tuân theo chính sách nhà hàng thông thường và luật áp dụng.`,
          "Chúng tôi có thể cập nhật Điều khoản theo thời gian. Khi cập nhật, ngày \"Cập nhật lần cuối\" ở đầu trang sẽ thay đổi. Tiếp tục sử dụng website sau khi cập nhật đồng nghĩa với việc bạn chấp nhận Điều khoản mới.",
        ],
      },
      {
        heading: "2. Sử dụng website",
        body: [
          "Website được cung cấp cho mục đích thông tin cá nhân, phi thương mại — để chia sẻ thực đơn, câu chuyện, hình ảnh, giờ mở cửa và địa chỉ của nhà hàng với khách hàng.",
          "Bạn đồng ý không: (a) sử dụng website cho mục đích trái pháp luật; (b) cố truy cập trái phép bất kỳ phần nào của website, máy chủ hoặc hạ tầng liên quan; (c) gây cản trở hoặc gián đoạn website, bao gồm phát tán mã độc, thu thập dữ liệu với tần suất ảnh hưởng dịch vụ, hoặc vượt qua các biện pháp bảo mật; (d) dùng hệ thống tự động để thu thập nội dung hoặc thông tin liên hệ phục vụ mục đích thương mại khi chưa có sự cho phép của chúng tôi.",
        ],
      },
      {
        heading: "3. Thực đơn, giá cả và tình trạng có sẵn",
        body: [
          "Chúng tôi cố gắng giữ thực đơn, mô tả món, hình ảnh và giá chính xác, nhưng mọi nội dung trên website có thể thay đổi mà không cần báo trước. Phiên bản thực đơn sử dụng tại nhà hàng vào thời điểm bạn dùng bữa là phiên bản chính thức — bao gồm tình trạng có sẵn, định lượng và giá cuối cùng.",
          "Ảnh chỉ mang tính minh họa. Cách trình bày món thực tế có thể khác.",
          "Các chương trình khuyến mãi (nếu có) sẽ giới hạn thời gian và số lượng, có thể loại trừ một số món và không kết hợp với khuyến mãi khác trừ khi chúng tôi nêu rõ.",
        ],
      },
      {
        heading: "4. Dị ứng, hạn chế ăn uống và an toàn thực phẩm",
        body: [
          "Bếp của chúng tôi sử dụng nhiều nguyên liệu — bao gồm bò, heo, gia cầm, hải sản, động vật có vỏ, trứng, sữa, đậu nành, lúa mì, đậu phộng, hạt cây, mè, gluten — thường trên cùng thiết bị và bề mặt sơ chế. Chúng tôi không thể đảm bảo bất kỳ món nào hoàn toàn không chứa chất gây dị ứng cụ thể.",
          "Nếu bạn dị ứng thực phẩm, không dung nạp hoặc có chế độ ăn riêng, vui lòng thông báo cho nhân viên trước khi gọi món để chúng tôi mô tả nguyên liệu và cách chế biến. Quyết định cuối cùng về việc dùng món thuộc về bạn.",
          "Việc tiêu thụ thịt, gia cầm, hải sản, động vật có vỏ hoặc trứng sống/chưa chín kỹ có thể tăng nguy cơ ngộ độc thực phẩm, đặc biệt với người có bệnh lý nhất định.",
        ],
      },
      {
        heading: "5. Sở hữu trí tuệ",
        body: [
          `Toàn bộ nội dung trên website — bao gồm tên và logo "${BRAND_INFO.name}", mô tả món, ảnh chụp, hình minh họa, bố cục và mã nguồn — thuộc quyền sở hữu của chúng tôi hoặc được sử dụng theo giấy phép, và được bảo vệ bởi luật bản quyền, nhãn hiệu và sở hữu trí tuệ.`,
          "Bạn được xem, chia sẻ và in các trang cho mục đích cá nhân, phi thương mại. Bạn không được sao chép, sửa đổi, phân phối hoặc khai thác thương mại bất kỳ phần nào của website nếu chưa có văn bản đồng ý của chúng tôi.",
        ],
      },
      {
        heading: "6. Liên kết ngoài và dịch vụ bên thứ ba",
        body: [
          "Website có thể chứa liên kết tới website của bên thứ ba (ví dụ dịch vụ bản đồ hoặc mạng xã hội). Các liên kết này chỉ nhằm mục đích tiện lợi; chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung, chính sách hay thực hành của các website/dịch vụ bên thứ ba đó.",
        ],
      },
      {
        heading: "7. Tuyên bố miễn trừ",
        body: [
          "WEBSITE VÀ NỘI DUNG ĐƯỢC CUNG CẤP THEO HIỆN TRẠNG (\"AS IS\") VÀ TÙY THUỘC TÍNH KHẢ DỤNG (\"AS AVAILABLE\"), KHÔNG KÈM BẤT KỲ BẢO ĐẢM NÀO, RÕ RÀNG HAY NGỤ Ý, BAO GỒM BẢO ĐẢM VỀ KHẢ NĂNG THƯƠNG MẠI, PHÙ HỢP MỤC ĐÍCH NHẤT ĐỊNH, KHÔNG VI PHẠM, TÍNH CHÍNH XÁC HAY KHẢ NĂNG TRUY CẬP LIÊN TỤC.",
          "Chúng tôi không bảo đảm website hoàn toàn không có lỗi hoặc không chứa virus, mã độc. Bạn tự chịu rủi ro khi sử dụng website.",
        ],
      },
      {
        heading: "8. Giới hạn trách nhiệm",
        body: [
          "Trong phạm vi tối đa luật cho phép, chúng tôi cùng chủ sở hữu, nhân viên và nhà cung cấp sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hệ quả hoặc trừng phạt phát sinh từ hoặc liên quan đến việc bạn sử dụng website hoặc thông tin trên đó, kể cả khi đã được thông báo trước về khả năng phát sinh thiệt hại.",
          "Không nội dung nào trong Điều khoản này hạn chế hoặc loại trừ trách nhiệm pháp lý mà luật áp dụng không cho phép loại trừ.",
        ],
      },
      {
        heading: "9. Bồi hoàn",
        body: [
          "Bạn đồng ý bảo vệ, bồi hoàn và giữ cho North Carolina Phở cùng chủ sở hữu, nhân viên, nhà cung cấp không bị tổn hại trước mọi khiếu nại, thiệt hại, trách nhiệm, chi phí và phí tổn (bao gồm phí luật sư hợp lý) phát sinh từ việc bạn vi phạm Điều khoản hoặc sử dụng sai mục đích website.",
        ],
      },
      {
        heading: "10. Luật áp dụng",
        body: [
          "Điều khoản này được điều chỉnh bởi luật của Bang North Carolina, Hoa Kỳ, không xét đến nguyên tắc xung đột luật. Bạn đồng ý mọi tranh chấp liên quan đến Điều khoản hoặc website sẽ được giải quyết độc quyền tại tòa án bang hoặc liên bang tại North Carolina, và bạn chấp nhận thẩm quyền của các tòa án này.",
        ],
      },
      {
        heading: "11. Hiệu lực từng phần và toàn bộ thỏa thuận",
        body: [
          "Nếu một điều khoản bất kỳ trong Điều khoản này bị xem là vô hiệu hoặc không thể thi hành, các điều khoản còn lại vẫn giữ nguyên hiệu lực. Điều khoản này, cùng với Chính sách bảo mật, là toàn bộ thỏa thuận giữa bạn và chúng tôi liên quan đến website.",
        ],
      },
      {
        heading: "12. Liên hệ",
        body: [
          `Mọi câu hỏi về Điều khoản, vui lòng liên hệ:`,
          `${BRAND_INFO.name} — ${BRAND_INFO.address}`,
          `Điện thoại: ${BRAND_INFO.phone} · Email: ${BRAND_INFO.email}`,
        ],
      },
    ],
  },
};

export default function TermsOfService({ lang }: TermsOfServiceProps) {
  const t = CONTENT[lang];
  const title = lang === "en" ? "Terms of Service" : "Điều khoản dịch vụ";
  const lastUpdatedLabel = lang === "en" ? "Last updated" : "Cập nhật lần cuối";
  const backLabel = lang === "en" ? "Back to Home" : "Quay lại trang chủ";
  const description =
    lang === "en"
      ? "The terms that govern your use of the North Carolina Phở website."
      : "Các điều khoản điều chỉnh việc bạn sử dụng website North Carolina Phở.";

  return (
    <div className="bg-bg-cream min-h-screen">
      <SEO title={title} description={description} lang={lang} canonical="https://ncpho.com/terms" />
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors text-sm font-sans mb-8"
          >
            <ChevronLeft size={16} />
            {backLabel}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-text-dark/70 text-sm font-sans mb-12 uppercase tracking-widest">
              {lastUpdatedLabel}: {LAST_UPDATED}
            </p>

            <div className="bg-white rounded-3xl p-8 md:p-12 ring-1 ring-primary/5 shadow-[0_25px_60px_-30px_rgba(27,67,50,0.25)]">
              <p className="text-text-dark/80 font-sans leading-relaxed mb-10">
                {t.intro}
              </p>

              <div className="space-y-10">
                {t.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-primary mb-4">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-text-dark/80 font-sans leading-relaxed">
                      {section.body.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <p className="mt-8 text-xs text-text-dark/70 font-sans italic text-center">
              {lang === "en"
                ? "This document is provided for general informational purposes only and does not constitute legal advice. Please consult a qualified attorney to ensure it meets your specific legal requirements."
                : "Tài liệu này chỉ mang tính chất tham khảo thông tin chung và không thay thế cho tư vấn pháp lý. Vui lòng tham khảo luật sư có chuyên môn để đảm bảo phù hợp với yêu cầu pháp lý cụ thể của bạn."}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { BRAND_INFO, Language } from "../constants";
import SEO from "./SEO";

interface PrivacyPolicyProps {
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
      "North Carolina Phở (\"we\", \"us\", \"our\") values your privacy. This Privacy Policy explains what limited information we collect when you visit our website, how it is used, and the choices you have. By using this site, you agree to the practices described below.",
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "Our website is primarily informational. We do not require you to create an account, place online orders, or submit personal payment information through this site.",
          "We may automatically collect technical data sent by your browser when you visit (IP address, browser type and version, device type, pages viewed, referring URL, and timestamps). This data is collected by our hosting provider for security, abuse prevention, and basic traffic analysis.",
          "If you contact us by phone or email using the details on this site, we receive whatever information you choose to share with us in that communication.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: [
          "We use limited technical data to operate the website, maintain security (for example, blocking abusive traffic), troubleshoot errors, and understand which pages visitors find useful.",
          "We use contact information you voluntarily provide (phone, email) only to respond to your inquiry or reservation request. We do not sell, rent, or trade your personal information.",
        ],
      },
      {
        heading: "3. Cookies and Similar Technologies",
        body: [
          "This website uses only the minimum cookies and local storage necessary for the site to function (for example, remembering your preferred language). We do not currently use third-party advertising or cross-site tracking cookies.",
          "If we add analytics in the future (such as Google Analytics), we will update this Policy and, where required, request your consent before activation.",
          "You can control or delete cookies through your browser settings at any time. Disabling cookies may affect minor preferences but will not block access to the site.",
        ],
      },
      {
        heading: "4. Third-Party Services",
        body: [
          "Our website is delivered through reputable hosting and content-delivery providers. These services may process limited technical metadata (such as IP address and request headers) on our behalf, solely to deliver the site to you.",
          "If we link to external sites (for example, Google Maps for directions, or social media pages), those sites operate under their own privacy policies, which we encourage you to review. We are not responsible for the content or privacy practices of third-party websites.",
        ],
      },
      {
        heading: "5. Data Retention",
        body: [
          "Technical access logs are retained only as long as reasonably necessary for security and operational purposes, typically a few weeks to a few months, and then deleted or anonymized.",
          "Any direct communications you send us (email, voicemail) are kept only as long as needed to address your request or as required by applicable law.",
        ],
      },
      {
        heading: "6. Your Privacy Rights",
        body: [
          "Depending on where you live, you may have the right to request access to, correction of, or deletion of personal information we hold about you, and to opt out of certain uses. Because this site collects very little personal information, in most cases we will have nothing on file beyond standard server logs.",
          "To exercise any right, contact us using the information at the end of this Policy. We will respond within a reasonable time and in line with applicable law.",
        ],
      },
      {
        heading: "7. Children's Privacy",
        body: [
          "This website is intended for a general audience and is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us personal information, please contact us so we can delete it.",
        ],
      },
      {
        heading: "8. Security",
        body: [
          "We use reasonable administrative and technical measures (including HTTPS, security headers, and limited data collection) to protect the information available to us. No method of transmission over the Internet is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "9. Changes to This Policy",
        body: [
          `We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. Continued use of the website after changes means you accept the updated Policy.`,
        ],
      },
      {
        heading: "10. Contact Us",
        body: [
          `If you have questions about this Privacy Policy or how your information is handled, please contact us:`,
          `${BRAND_INFO.name} — ${BRAND_INFO.address}`,
          `Phone: ${BRAND_INFO.phone} · Email: ${BRAND_INFO.email}`,
        ],
      },
    ],
  },
  vi: {
    intro:
      "North Carolina Phở (\"chúng tôi\") tôn trọng quyền riêng tư của bạn. Chính sách bảo mật này giải thích những thông tin hạn chế mà chúng tôi thu thập khi bạn truy cập website, cách chúng tôi sử dụng và các lựa chọn bạn có. Khi sử dụng website, bạn đồng ý với các thực hành được mô tả dưới đây.",
    sections: [
      {
        heading: "1. Thông tin chúng tôi thu thập",
        body: [
          "Website của chúng tôi chủ yếu mang tính chất giới thiệu. Bạn không cần tạo tài khoản, đặt hàng trực tuyến hay nhập thông tin thanh toán cá nhân trên website này.",
          "Chúng tôi có thể tự động thu nhận dữ liệu kỹ thuật do trình duyệt gửi đến khi bạn truy cập (địa chỉ IP, loại và phiên bản trình duyệt, loại thiết bị, các trang đã xem, URL giới thiệu và thời gian truy cập). Dữ liệu này được nhà cung cấp hosting thu thập nhằm bảo mật, ngăn chặn lạm dụng và phân tích lưu lượng cơ bản.",
          "Nếu bạn chủ động liên hệ qua điện thoại hoặc email của chúng tôi, chúng tôi sẽ nhận được những thông tin bạn lựa chọn chia sẻ trong nội dung trao đổi đó.",
        ],
      },
      {
        heading: "2. Cách chúng tôi sử dụng thông tin",
        body: [
          "Chúng tôi sử dụng dữ liệu kỹ thuật hạn chế để vận hành website, duy trì bảo mật (ví dụ chặn lưu lượng lạm dụng), khắc phục lỗi và hiểu trang nào hữu ích với người truy cập.",
          "Chúng tôi chỉ dùng thông tin liên hệ mà bạn tự cung cấp (điện thoại, email) để phản hồi yêu cầu hoặc đặt chỗ. Chúng tôi không bán, cho thuê hay trao đổi thông tin cá nhân của bạn.",
        ],
      },
      {
        heading: "3. Cookie và công nghệ tương tự",
        body: [
          "Website chỉ dùng tối thiểu cookie và bộ nhớ cục bộ cần thiết để hoạt động (ví dụ ghi nhớ ngôn ngữ ưu tiên). Hiện tại chúng tôi không sử dụng cookie quảng cáo hoặc cookie theo dõi liên trang của bên thứ ba.",
          "Nếu trong tương lai chúng tôi tích hợp công cụ phân tích (chẳng hạn Google Analytics), chúng tôi sẽ cập nhật Chính sách này và xin sự đồng ý của bạn khi luật yêu cầu, trước khi kích hoạt.",
          "Bạn có thể quản lý hoặc xóa cookie qua thiết lập trình duyệt bất cứ lúc nào. Việc tắt cookie có thể ảnh hưởng đến một số tùy chọn nhỏ nhưng không chặn truy cập website.",
        ],
      },
      {
        heading: "4. Dịch vụ bên thứ ba",
        body: [
          "Website được phân phối qua các nhà cung cấp hosting và CDN có uy tín. Các dịch vụ này có thể xử lý dữ liệu kỹ thuật hạn chế (như địa chỉ IP, header request) thay mặt chúng tôi, chỉ nhằm mục đích chuyển tải nội dung đến bạn.",
          "Nếu chúng tôi liên kết tới website bên ngoài (ví dụ Google Maps chỉ đường, hoặc trang mạng xã hội), các website đó vận hành theo chính sách bảo mật riêng — bạn nên đọc trước khi sử dụng. Chúng tôi không chịu trách nhiệm về nội dung và thực hành bảo mật của bên thứ ba.",
        ],
      },
      {
        heading: "5. Thời gian lưu trữ",
        body: [
          "Log truy cập kỹ thuật chỉ được giữ trong khoảng thời gian hợp lý cho mục đích bảo mật và vận hành, thường vài tuần đến vài tháng, sau đó được xóa hoặc ẩn danh.",
          "Mọi nội dung bạn gửi trực tiếp (email, lời nhắn thoại) chỉ được lưu trong thời gian cần thiết để xử lý yêu cầu hoặc theo quy định pháp luật.",
        ],
      },
      {
        heading: "6. Quyền của bạn",
        body: [
          "Tùy nơi bạn sinh sống, bạn có thể có quyền yêu cầu truy cập, đính chính, xóa thông tin cá nhân mà chúng tôi đang giữ về bạn, cũng như từ chối một số mục đích sử dụng. Do website thu thập rất ít thông tin cá nhân, trong phần lớn trường hợp chúng tôi không lưu giữ gì ngoài log máy chủ tiêu chuẩn.",
          "Để thực hiện quyền, vui lòng liên hệ qua thông tin ở cuối Chính sách. Chúng tôi sẽ phản hồi trong thời gian hợp lý và theo quy định pháp luật áp dụng.",
        ],
      },
      {
        heading: "7. Quyền riêng tư của trẻ em",
        body: [
          "Website hướng đến công chúng nói chung và không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. Nếu bạn cho rằng có trẻ em đã cung cấp thông tin cho chúng tôi, vui lòng liên hệ để chúng tôi xóa.",
        ],
      },
      {
        heading: "8. Bảo mật",
        body: [
          "Chúng tôi áp dụng các biện pháp hành chính và kỹ thuật hợp lý (bao gồm HTTPS, security header và việc thu thập dữ liệu ở mức tối thiểu) để bảo vệ thông tin mà chúng tôi có. Không có phương thức truyền tin trên Internet nào tuyệt đối an toàn, nên chúng tôi không thể đảm bảo bảo mật tuyệt đối.",
        ],
      },
      {
        heading: "9. Cập nhật Chính sách",
        body: [
          `Chúng tôi có thể cập nhật Chính sách này theo thời gian. Khi đó, ngày "Cập nhật lần cuối" ở đầu trang sẽ được thay đổi. Tiếp tục sử dụng website sau khi cập nhật đồng nghĩa với việc bạn chấp nhận Chính sách mới.`,
        ],
      },
      {
        heading: "10. Liên hệ",
        body: [
          `Nếu có câu hỏi về Chính sách bảo mật hoặc cách xử lý thông tin của bạn, vui lòng liên hệ:`,
          `${BRAND_INFO.name} — ${BRAND_INFO.address}`,
          `Điện thoại: ${BRAND_INFO.phone} · Email: ${BRAND_INFO.email}`,
        ],
      },
    ],
  },
};

export default function PrivacyPolicy({ lang }: PrivacyPolicyProps) {
  const t = CONTENT[lang];
  const title = lang === "en" ? "Privacy Policy" : "Chính sách bảo mật";
  const lastUpdatedLabel = lang === "en" ? "Last updated" : "Cập nhật lần cuối";
  const backLabel = lang === "en" ? "Back to Home" : "Quay lại trang chủ";
  const description =
    lang === "en"
      ? "How North Carolina Phở handles the limited information collected when you visit our website."
      : "Cách North Carolina Phở xử lý những thông tin hạn chế thu thập khi bạn truy cập website.";

  return (
    <div className="bg-bg-cream min-h-screen">
      <SEO title={title} description={description} lang={lang} canonical="https://ncpho.com/privacy" />
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors text-sm font-sans mb-8"
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
            <p className="text-text-dark/50 text-sm font-sans mb-12 uppercase tracking-widest">
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
                    <div className="space-y-4 text-text-dark/75 font-sans leading-relaxed">
                      {section.body.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <p className="mt-8 text-xs text-text-dark/40 font-sans italic text-center">
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

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Thay domain của bạn vào đây
  const baseUrl = "https://kaidev.vn";

  return {
    rules: {
      userAgent: "*", // Áp dụng cho tất cả các loại Bot (Google, Bing, Yahoo...)
      allow: "/", // Cho phép vào tất cả
      disallow: [
        // TRỪ NHỮNG CHỖ NÀY RA (Cấm vào):
        "/admin/",
        "/account/",
        "/checkout/",
        "/api/", // API nội bộ cũng không cần index
        "/private/",
      ],
    },
    // Chỉ đường dẫn đến Sitemap (Rất quan trọng)
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

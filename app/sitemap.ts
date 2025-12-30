import { MetadataRoute } from "next";
// Import cái service lấy bài viết của bạn (ví dụ)
import { PostService } from "@/services/post";
import { IPost } from "@/types/post.type";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://blog.kaidev.space"; // Thay domain thật của bạn vào

  // 1. Lấy danh sách bài viết từ API/DB (Dynamic)
  // Hàm này chạy trên server nên await thoải mái
  let posts: IPost[] = [];
  try {
    const response = await PostService.getPosts();
    posts = response.data || [];
  } catch (error) {
    console.error("Lỗi lấy sitemap blog:", error);
  }

  // 2. Map dữ liệu bài viết thành format sitemap
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.created_at || post.updated_at), // Google thích cái này để biết bài mới hay cũ
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3. Các trang tĩnh cố định (Static)
  const staticRoutes = [
    {
      url: baseUrl, // Trang chủ
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/post`, // Trang danh sách blog
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // 4. Gộp lại và trả về
  return [...staticRoutes, ...postUrls];
}

import { Metadata } from "next";

import { PostService } from "@/services/post";
import PostContent from "./_components/post-content";

export const meta: Metadata = {
  title: "Các bài viết ",
  description: "Nextjs như cớt  =)))))",
  openGraph: {
    title: "Các bài viết ",
    description: "Nextjs như cớt  =)))))",
    images: [
      {
        url: "https://blog.kaidev.space/og-post.jpg",
        width: 1200,
        height: 600,
      },
    ],
  },
};

export default async function PostPage() {
  const posts = await PostService.getPosts();

  if (!posts) {
    return <div>No blog posts available.</div>;
  }

  return <PostContent data={posts.data} />;
}

import { Metadata } from "next";

import { PostService } from "@/services/post";
import PostContent from "./_components/post-content";

export const meta: Metadata = {
  title: "Kai Dev Blog",
  description: "Hello MY fennnnnnn",
};

export default async function AboutPage() {
  const posts = await PostService.getPosts();

  if (!posts) {
    return <div>No blog posts available.</div>;
  }

  return <PostContent data={posts.data} />;
}

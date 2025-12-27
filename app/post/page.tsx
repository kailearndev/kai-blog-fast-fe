import { Metadata } from "next";

import { PostService } from "@/services/post";
import PostContent from "./_components/post-content";
import { Suspense } from "react";

export const meta: Metadata = {
  title: "Kai Dev Blog - About",
  description:
    "Learn more about Kai Dev and the technologies used in this blog.",
};

export default async function AboutPage() {
  const posts = await PostService.getPosts();
  if (!posts) {
    return <div>No blog posts available.</div>;
  }
  return (
    <section>
      <PostContent data={posts} />
    </section>
  );
}

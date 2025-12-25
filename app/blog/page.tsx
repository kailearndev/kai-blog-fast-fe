import { Metadata } from "next";
import BlogContent from "./_components/blog-content";

export const meta: Metadata = {
  title: "Kai Dev Blog - About",
  description:
    "Learn more about Kai Dev and the technologies used in this blog.",
};

export default async function AboutPage() {
  return (
    <section>
      <BlogContent />
    </section>
  );
}

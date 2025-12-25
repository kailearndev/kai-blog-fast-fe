import ChromaGrid from "@/components/ChromaGrid";
import { IPost } from "@/types/post.type";
import parse from "html-react-parser";

export default function PostContent({ data }: { data: IPost[] }) {
  const items = data.map((post) => ({
    image: post.thumbnail,
    title: post.title,
    subtitle: parse(post.content.slice(0, 100) + "..."),
    location: `/blog/${post.slug}`,
    url: `/blog/${post.slug}`,
  }));

  return (
    <section className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-4">
        Chào mừng các thần dân đến với blog của Kai Dev!
      </h1>
      <div className="flex justify-center">
        <ChromaGrid
          className="grid-cols-4 grid"
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  );
}

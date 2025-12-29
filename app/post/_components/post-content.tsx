import ChromaGrid from "@/components/ChromaGrid";
import { IPost } from "@/types/post.type";

export default function PostContent({ data }: { data: IPost[] }) {
  return (
    <section className="flex flex-col py-5 ">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Chào mừng các thần dân đến với blog của Kai Dev!
      </h1>

      <ChromaGrid
        className="lg:grid-cols-3 grid grid-cols-1 md:grid-cols-2 gap-6 "
        items={data}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </section>
  );
}

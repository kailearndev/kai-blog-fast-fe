import { api } from "@/lib/fetch";
import PostDetail from "./_components/post-detail";
import { IPost } from "@/types/post.type";

export default async function PostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: IPost = await api.get(`posts/${slug}`);

  return (
    <section className="flex flex-col ">
      <PostDetail data={data} />
    </section>
  );
}

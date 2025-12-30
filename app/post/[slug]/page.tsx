import { PostService } from "@/services/post";
import { IPost } from "@/types/post.type";
import { Metadata } from "next";
import PostDetail from "./_components/post-detail";

const getPostBySlug = async (slug: string): Promise<IPost> => {
  const data: IPost = await PostService.getPostBySlug(slug);
  return data;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [
        {
          url: post.thumbnail,
          width: 800,
          height: 600,
        },
      ],
    },
  };
};

export default async function PostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  return (
    <section className="flex flex-col ">
      <PostDetail data={data} />
    </section>
  );
}

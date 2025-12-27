import { IPost } from "@/types/post.type";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import the German locale
import parse from "html-react-parser";
export default function PostDetail({ data }: { data: IPost }) {
  return (
    <article className="flex flex-col gap-6">
      <section className="flex md:flex-row gap-2 flex-col  md:justify-between items-baseline">
        <h1 className="md:text-5xl text-4xl">{data.title}</h1>
        <span className="text-lg md:text-xl text-amber-50 capitalize tracking-wide">
          {dayjs(data.created_at).locale("vi").format("DD MMMM YYYY")}
        </span>
      </section>
      <hr className="border border-dotted  my-4" />

      <span className="prose max-w-max mx-auto px-5 text-white">
        {parse(data.content)}
      </span>
    </article>
  );
}

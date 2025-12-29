import { IPost } from "@/types/post.type";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import the German locale
import parse from "html-react-parser";
export default function PostDetail({ data }: { data: IPost }) {
  return (
    <article className="flex flex-col gap-6 pt-10 px-4 md:px-10">
      <section className="flex md:flex-row gap-2 flex-col  md:justify-between items-baseline">
        <h1 className="md:text-5xl text-4xl">{data.title}</h1>
        <span className="text-lg md:text-xl text-amber-50 capitalize tracking-wide">
          {dayjs(data.created_at).locale("vi").format("DD MMMM YYYY")}
        </span>
      </section>
      <hr className="border border-dotted  my-4" />

      <div className="prose max-w-6xl text-white  dark:prose-invert prose-a:text-blue-400 prose-img:rounded-lg prose-img:mx-auto prose-img:my-5 prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-code:rounded-sm prose-code:bg-gray-800 prose-code:px-1 ">
        {parse(data.content)}
      </div>
    </article>
  );
}

import ChromaGrid from "@/components/ChromaGrid";
import { IPost } from "@/types/post.type";
import parse from "html-react-parser";
export default function PostContent() {
  const items = {
    title: "Sample Post",
    subtitle: "This is a sample post content...",
    image: "/sample-thumbnail.jpg",
    location: "/blog/sample-post",
    url: "/blog/sample-post",
  };
  return (
    <section className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-4">{items.title}</h1>
      <div className="flex justify-center">
        <div>
          Title: {items.title} <br />
          Subtitle: {items.subtitle} <br />
          Image: {items.image} <br />
          Location: {items.location} <br />
          URL: {items.url} <br />
        </div>
      </div>
    </section>
  );
}

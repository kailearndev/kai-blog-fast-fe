import { Metadata } from "next";
import Home from "./_components/home";

export const metadata: Metadata = {
  title: "Kai Dev Blog - Home",
  description: "Chúng ta là lũ quỹ, ở tận rừng xanh",

  openGraph: {
    title: "Kai Dev Blog - Home",
    siteName: "https://blog.kaidev.space",
    description: "Chúng ta là lũ quỹ, ở tận rừng xanh ",
    images: [
      {
        url: "https://blog.kaidev.space/og-home-image.webp",
        width: 1200,
        height: 630,
        alt: "Kai Dev Blog Home Open Graph Image",
      },
    ],
    type: "website",
    locale: "vi-VN",
  },
};

export default function Page() {
  return <Home />;
}

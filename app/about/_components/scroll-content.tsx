"use client";

import LogoLoop from "@/components/LogoLoop";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import {
  SiFastapi,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function ScrollContent() {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
    {
      node: <SiFastapi />,
      title: "FastAPI",
      href: "https://fastapi.tiangolo.com",
    },

    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  return (
    <div className=" ">
      <div className="text-center">
        <h1 className="text-3xl font-bold ">
          Chào mừng các thần dân đến với blog của Kai Dev!
        </h1>
        <div className="flex justify-center">
          <Image
            src={
              "https://media.tenor.com/fli5xzAP4boAAAAM/familyguy-quagmire.gif"
            }
            alt="Family Guy Quagmire"
            width={200}
            height={200}
          />
        </div>
      </div>
      <ScrollReveal
        textClassName=""
        baseOpacity={0}
        enableBlur={true}
        baseRotation={-5}
        blurStrength={10}
      >
        Đây là nơi mình chia sẻ những kiến thức, kinh nghiệm và câu chuyện về
        lập trình, công nghệ và cuộc sống. mình tin rằng việc học hỏi và chia sẻ
        là một phần quan trọng trong hành trình phát triển cá nhân và nghề
        nghiệp. Mình hy vọng rằng những bài viết trên blog sẽ giúp ích cho các
        bạn trong việc nâng cao kỹ năng lập trình, khám phá công nghệ mới và tìm
        thấy cảm hứng trong cuộc sống hàng ngày.
      </ScrollReveal>
      {/* <div className="fixed top-30 right-4">
        <RadialIntro orbitItems={ITEMS} stageSize={220} />
      </div> */}
      <div
        style={{ height: "200px", position: "relative", overflow: "hidden" }}
      >
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOutColor="#f9fafb"
          ariaLabel="Technology i used in Kai Dev blog"
        />

        {/* Vertical loop with deceleration on hover */}
      </div>
    </div>
  );
}

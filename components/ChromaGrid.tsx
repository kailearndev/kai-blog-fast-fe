"use client";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
export interface ChromaItem {
  thumbnail: string;
  title: string;
  content: string;
  tags?: { id: string; name: string }[];
  location?: string;
  borderColor?: string;
  gradient?: string;
  slug?: string;
  summary?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const navigate = useRouter();

  const gradientList = [
    "linear-gradient(145deg,#4F46E5,#000)",
    "linear-gradient(210deg,#10B981,#000)",
    "linear-gradient(165deg,#F59E0B,#000)",
    "linear-gradient(195deg,#EF4444,#000)",
    "linear-gradient(225deg,#8B5CF6,#000)",
    "linear-gradient(135deg,#06B6D4,#000)",
  ];

  const demo: ChromaItem[] = [
    {
      thumbnail: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      content: "Full Stack Developer",
      tags: [
        { id: "1", name: "Mobile" },
        { id: "2", name: "Developer" },
      ],

      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      slug: "https://github.com/",
    },
    {
      thumbnail: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      content: "DevOps Engineer",
      tags: [
        { id: "1", name: "Mobile" },
        { id: "2", name: "Developer" },
      ],

      borderColor: "#10B981",
      gradient: "linear-gradient(210deg,#10B981,#000)",
      slug: "https://linkedin.com/in/",
    },
    {
      thumbnail: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      content: "UI/UX Designer",
      tags: [
        { id: "1", name: "Mobile" },
        { id: "2", name: "Developer" },
      ],
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg,#F59E0B,#000)",
      slug: "https://dribbble.com/",
    },
    {
      thumbnail: "https://i.pravatar.cc/300?img=16",
      title: "Casey Park",
      content: "Data Scientist",
      tags: [
        { id: "1", name: "Mobile" },
        { id: "2", name: "Developer" },
      ],

      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg,#EF4444,#000)",
      slug: "https://kaggle.com/",
    },
    {
      thumbnail: "https://i.pravatar.cc/300?img=25",
      title: "Sam Kim",
      content: "Mobile Developer",
      tags: [
        { id: "1", name: "Mobile" },
        { id: "2", name: "Developer" },
      ],
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg,#8B5CF6,#000)",
      slug: "https://github.com/",
    },
    {
      thumbnail: "https://i.pravatar.cc/300?img=60",
      title: "Tyler Rodriguez",
      content: "Cloud Architect",
      tags: [
        { id: "1", name: "Cloud" },
        { id: "2", name: "Architect" },
      ],
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg,#06B6D4,#000)",
      slug: "https://aws.amazon.com/",
    },
  ];

  const data = items && items.length > 0 ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (slug?: string) => {
    if (slug) {
      navigate.push(`/post/${slug}`);
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.slug)}
          className="group relative flex flex-col rounded-xl overflow-hidden border-transparent transition-colors duration-300 cursor-pointer"
          style={
            {
              "--card-border": c.borderColor || "transparent",
              background: gradientList[i % gradientList.length],
              "--spotlight-color": "rgba(255,255,255,0.3)",
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
            }}
          />
          <div
            className="bg-cover bg-top h-62" // Các class tĩnh giữ nguyên
            style={{ backgroundImage: `url(${c.thumbnail})` }} // Dynamic value đưa vào đây
          ></div>
          {/* 1. Container cha: Flex Column + h-full */}
          <footer className="flex flex-col h-full p-3 text-white gap-2">
            {/* --- PHẦN 1: TITLE (Chiếm 1/3) --- */}
            {/* flex-1: tự giãn bằng các anh em khác */}
            {/* flex + items-center: để căn chữ nằm giữa theo chiều dọc */}
            <div className="flex-1 flex items-center min-h-0">
              <h3 className="m-0 text-[1.05rem] font-semibold line-clamp-2">
                {c.title}
              </h3>
            </div>

            {/* --- PHẦN 2: TAGS (Chiếm 1/3) --- */}
            <div className="flex-1 flex items-center min-h-0">
              <div className="flex flex-wrap gap-1">
                {c.tags &&
                  c.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[0.65rem] opacity-75 px-2 py-1 bg-green-600 rounded-full whitespace-nowrap line-clamp-1"
                    >
                      #{tag.name}
                    </span>
                  ))}
              </div>
            </div>

            {/* --- PHẦN 3: CONTENT (Chiếm 1/3) --- */}
            <div className="flex-1 flex items-center min-h-10">
              <div className="text-[0.85rem] opacity-85 line-clamp-2">
                {c.summary}
              </div>
            </div>
          </footer>
        </article>
      ))}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function NotFoundGlitch() {
  const router = useRouter();
  const containerRef = useRef(null);
  const glitchRef = useRef(null);

  useGSAP(
    () => {
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      // Hàm tạo hiệu ứng giật ngẫu nhiên
      const chaoticGlitch = (target: string) => {
        const tl = gsap.timeline();
        tl.to(target, {
          x: () => gsap.utils.random(-10, 10), // Giật sang trái phải ngẫu nhiên
          skewX: () => gsap.utils.random(-20, 20), // Nghiêng chữ
          opacity: () => gsap.utils.random(0.5, 1), // Nhấp nháy
          duration: 0.05,
          ease: "power4.inOut",
        }).to(target, { x: 0, skewX: 0, opacity: 1, duration: 0.05 }); // Trả về bình thường nhanh chóng
        return tl;
      };

      // 1. Hiệu ứng tách màu RGB (Red/Blue shift)
      gsap.set(".glitch-layer", { opacity: 0.7, mixBlendMode: "screen" });

      glitchTl
        // Giật mạnh lần 1
        .add(chaoticGlitch(".main-text"))
        .to(".layer-red", { x: -5, y: 2, duration: 0.05 }, "<")
        .to(".layer-blue", { x: 5, y: -2, duration: 0.05 }, "<")
        // Trả về
        .to(".glitch-layer", { x: 0, y: 0, duration: 0.05 })

        // Nghỉ 1 chút rồi giật nhẹ
        .to({}, { duration: gsap.utils.random(0.5, 2) })

        // Giật nhẹ lần 2
        .add(chaoticGlitch(".main-text"))
        .to(".layer-red", { x: 10, opacity: 0.5, duration: 0.1 }, "<")
        .to(".layer-blue", { x: -10, opacity: 0.5, duration: 0.1 }, "<")
        .to(".glitch-layer", { x: 0, opacity: 0.7, duration: 0.1 });

      // 2. Hiệu ứng Scanline chạy dọc màn hình
      gsap.to(".scanline", {
        y: "100vh",
        duration: 3,
        ease: "linear",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-[90svh] w-full flex-col items-center justify-center  overflow-hidden text-white "
    >
      {/* Đường quét scanline */}
      <div className="scanline absolute top-0 left-0 w-full h-2 bg-green-500/20 z-10 pointer-events-none"></div>

      <div ref={glitchRef} className="relative z-20 text-center">
        {/* 3 Lớp chữ chồng lên nhau để làm hiệu ứng tách màu */}
        <div className="relative text-[12rem] font-black leading-none tracking-tighter select-none">
          <span className="main-text relative z-10 block">404</span>
          <span className="glitch-layer layer-red absolute top-0 left-0 text-red-500 z-0 block w-full h-full">
            404
          </span>
          <span className="glitch-layer layer-blue absolute top-0 left-0 text-blue-500 z-0 block w-full h-full">
            404
          </span>
        </div>

        <h2 className="text-2xl mb-8 uppercase tracking-[0.5em] text-green-400">
          System Failure
        </h2>

        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Hệ thống không tìm thấy dữ liệu yêu cầu. <br /> Tọa độ không xác định.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-green-600 text-black font-bold hover:bg-green-500 transition-colors clip-path-polygon"
          >
            TRANG CHỦ_
          </Link>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 border border-green-600 text-green-600 font-bold hover:bg-green-900/30 transition-colors"
          >
            QUAY LẠI_
          </button>
        </div>
      </div>

      {/* Background noise (optional) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
    </section>
  );
}

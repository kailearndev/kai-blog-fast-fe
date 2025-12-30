"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function KaiLogoAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setIsAnimationComplete(true), // Đánh dấu đã xong để thao tác nếu cần
      });

      // --- GIAI ĐOẠN 1: LOGO ANIMATION (Giữ nguyên logic của bạn) ---
      tl.from(".letter-k", {
        y: 100,
        opacity: 0,
        duration: 0.8, // Tăng nhẹ cho mượt
        ease: "back.out(1.7)",
      })
        .to(
          ".rest-wrapper",
          {
            width: "auto",
            opacity: 1,
            duration: 1,
            ease: "power4.inOut",
          },
          "+=0.1"
        )
        .from(
          ".letter-rest",
          {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "<0.3"
        );

      // --- GIAI ĐOẠN 2: EXIT ANIMATION (Màn trập mở ra) ---
      // Sau khi chữ hiện xong, chờ 0.5s rồi đẩy cả màn hình đen lên trên
      tl.to(containerRef.current, {
        yPercent: -100, // Trượt hẳn lên trên
        duration: 1,
        ease: "expo.inOut",
        delay: 0.5,
      });

      // (Optional) Nội dung trang web trượt nhẹ từ dưới lên tạo cảm giác parallax
      tl.from(
        contentRef.current,
        {
          y: 100,
          opacity: 0, // Đảm bảo nội dung không bị lộ trước khi màn đen trượt lên
          duration: 1,
          ease: "power3.out",
        },
        "<0.2" // Chạy song song (trễ 0.2s) với lúc màn đen trượt lên
      );
    },
    { scope: containerRef } // Scope này chỉ bao bọc phần loader
  );

  return (
    <>
      {/* 1. LAYER PRELOADER (Màn hình đen chứa Logo) */}
      <div
        ref={containerRef}
        aria-hidden="true" // 👈 QUAN TRỌNG: Bảo bot đây chỉ là trang trí
        className="fixed inset-0 z-999  flex items-center justify-center bg-black  text-white overflow-hidden h-full w-full"
      >
        <div className="flex items-end overflow-hidden">
          {/* Chữ K */}
          <span className="letter-k text-9xl font-black leading-none tracking-tighter block">
            K
          </span>

          {/* Wrapper chứa AI */}
          <div className="rest-wrapper w-0 overflow-hidden flex items-end opacity-0">
            <span className="letter-rest text-9xl font-black leading-none tracking-tighter">
              A
            </span>
            <span className="letter-rest text-9xl font-black leading-none tracking-tighter">
              I
            </span>
            <span className="letter-rest text-9xl font-black leading-none text-green-500">
              .
            </span>
          </div>
        </div>
      </div>

      {/* 2. LAYER CONTENT (Nội dung trang web thật) */}
      <div ref={contentRef} className="relative z-0 h-[90svh] w-full">
        {children}
      </div>
    </>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

interface CounterProps {
  value: number;
  unit?: string;
  containerStyle?: React.CSSProperties;
}

// Cấu hình chuyển động (Animation Variants)
const variants = {
  initial: {
    y: "100%", // Bắt đầu từ dưới
    rotateX: -90, // Xoay nghiêng 90 độ (nằm ngang)
    opacity: 0,
    scale: 0.5, // Thu nhỏ
    filter: "blur(10px)", // Mờ nhòe
  },
  animate: {
    y: "0%",
    rotateX: 0, // Trở về thẳng đứng
    opacity: 1,
    scale: 1, // Kích thước chuẩn
    filter: "blur(0px)", // Hết mờ
  },
  exit: {
    y: "-100%", // Bay lên trên
    rotateX: 90, // Xoay nghiêng lên trên
    opacity: 0,
    scale: 0.5, // Thu nhỏ lại
    filter: "blur(10px)", // Mờ nhòe lại
  },
};

export default function Counter({ value, containerStyle, unit }: CounterProps) {
  return (
    <div
      // Thêm perspective để tạo chiều sâu 3D cho hiệu ứng xoay
      className="perspective-1000 relative flex h-12 w-14 items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-white/20 to-white/5 shadow-inner backdrop-blur-md md:h-20 md:w-24 border border-white/10"
      style={{ perspective: "1000px", ...containerStyle }} // Fallback nếu Tailwind chưa config perspective
    >
      {/* Hiệu ứng bóng (Glow) tĩnh ở giữa để tăng vẻ hiện đại */}
      <div className="absolute inset-0 z-0 bg-white/5 blur-xl" />

      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          // Tinh chỉnh vật lý: stiffness cao để nảy nhanh, damping để hãm lại
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          }}
          // Thêm style shadow cho chữ để nổi bật trên nền kính
          className="z-10 absolute flex items-center justify-center text-sm font-black text-white md:text-3xl lg:text-4xl xl:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
          style={{ transformOrigin: "50% 50% -20px" }} // Trục xoay nằm sâu hơn 1 chút
        >
          {value < 10 ? `0${value}` : value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

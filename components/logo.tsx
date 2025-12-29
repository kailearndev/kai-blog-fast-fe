"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KaiDevLogoMini() {
  const [isStuck, setIsStuck] = useState(false);

  // Logic vòng lặp: Cứ 4 giây đổi trạng thái một lần
  useEffect(() => {
    const loop = setInterval(() => {
      setIsStuck((prev) => !prev);
    }, 4000); // 4000ms = 4 giây

    return () => clearInterval(loop);
  }, []);

  return (
    <Link
      href="/"
      className="flex flex-col items-start font-mono select-none cursor-pointer group"
    >
      {/* Dòng 1: Tên Logo - Nhỏ gọn, màu trắng */}
      <div className="flex items-center gap-2">
        <motion.div
          className="text-xl font-black tracking-tighter text-white flex items-center"
          whileHover={{ scale: 1.05 }} // Hiệu ứng hover nhẹ
        >
          KAI DEV
          {/* Dấu nhắc lệnh (cursor) nhỏ */}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 h-5 bg-white ml-1"
          />
        </motion.div>
      </div>

      {/* Dòng 2: Slogan - Loop Animation */}
      <div className="flex items-center gap-1 text-sm font-medium text-gray-300 h-6 overflow-hidden">
        <span>Full</span>

        <div className="relative w-12 h-full">
          {/* Trạng thái 1: STACK (Bình thường) */}
          <motion.span
            animate={isStuck ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 text-white"
          >
            Stack
          </motion.span>

          {/* Trạng thái 2: STUCK (Lỗi - Màu đỏ tạo điểm nhấn) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isStuck ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute left-0 top-0 flex items-center gap-1"
          >
            {/* Chữ Stuck gạch ngang */}
            <span className="text-red-400 line-through decoration-wavy decoration-white/30 rotate-6">
              Stuck
            </span>

            {/* Icon Loading */}

            {/* Icon Bug lắc lư */}
          </motion.div>
        </div>

        <span className="ml-6"></span>
      </div>
    </Link>
  );
}

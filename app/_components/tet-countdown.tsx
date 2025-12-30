"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Counter from "./counter";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TetCountdown() {
  // 1. Dùng useMemo hoặc để ra ngoài để không bị khởi tạo lại mỗi lần render
  // 2. Dùng dấu "/" thay vì "-" để support Safari/iOS tốt hơn
  const TET_DATE = useMemo(() => new Date("2026/02/17 00:00:00").getTime(), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [TET_DATE]);

  // Nếu chưa mount xong, return null để tránh lỗi hydration
  if (!isMounted) return null;
  const formatUnit = (unit: string) => {
    switch (unit) {
      case "days":
        return "Ngày";
      case "hours":
        return "Giờ";
      case "minutes":
        return "Phút";
      case "seconds":
        return "Giây";
      default:
        return unit;
    }
  };

  return (
    <div className="flex z-0 py-4 rounded-xl  items-center flex-col  px-6 md:px-12 lg:px-16">
      <div className="flex flex-row justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center mx-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + Object.keys(timeLeft).indexOf(unit) * 0.1,
              }}
              className="mt-2 text-center text-white"
            >
              {formatUnit(unit)}
            </motion.div>
            {/* Component Counter đã tích hợp Motion */}
            <Counter
              value={value as number}
              unit={formatUnit(unit)}
              // Bạn có thể bỏ containerStyle nếu đã style cứng trong component
              // Hoặc truyền vào nếu cần đè style
            />
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-row justify-center mt-2"
      >
        Là tới năm mới {2026} - Xuân Bính Thìn
      </motion.div>
      <Link href="/post">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            scale: 1.05,
          }}
          className="mt-4 cursor-pointer px-4 py-2 border border-white rounded-lg text-white font-medium hover:bg-white/10 transition"
        >
          Khám phá blog của kai
        </motion.div>
      </Link>
    </div>
  );
}

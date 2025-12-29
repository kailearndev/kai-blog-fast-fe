"use client";

import Counter from "@/components/Counter";
import { useEffect, useMemo, useState } from "react";

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

      // Debug: Bật F12 tab Console để xem dòng này
      // console.log("Distance:", distance);

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

  return (
    <div className="flex z-0 py-4 rounded-xl  items-center">
      <Counter
        label="Ngày"
        value={timeLeft.days}
        digitStyle={{ color: "red" }}
      />
      <Counter label="Giờ" value={timeLeft.hours} />
      <Counter label="Phút" value={timeLeft.minutes} />
      <Counter label="Giây" value={timeLeft.seconds} />
    </div>
  );
}

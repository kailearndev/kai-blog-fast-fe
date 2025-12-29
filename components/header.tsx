"use client";

import { RadialNav } from "@/components/animate-ui/components/community/radial-nav";
import { AtSign, Axe, LayoutGrid, Send } from "lucide-react";
import { useRouter } from "next/navigation";

const ITEMS = [
  { id: 1, icon: LayoutGrid, label: "Trang chủ", angle: 0 },
  { id: 2, icon: AtSign, label: "Về tôi", angle: -115 },
  { id: 3, icon: Axe, label: "Bài viết", angle: 115 },
  { id: 4, icon: Send, label: "Liên hệ", angle: 180 },
];

export default function Header() {
  const navigate = useRouter();
  const handleNavigate = (id: number) => {
    switch (id) {
      case 1:
        navigate.push("/");
        break;
      case 2:
        navigate.push("/about");
        break;
      case 3:
        navigate.push("/post");
        break;
      case 4:
        navigate.push("/contact");
        break;
    }
  };
  return (
    <RadialNav
      onActiveChange={handleNavigate}
      items={ITEMS}
      defaultActiveId={1}
      size={120}
      menuButtonConfig={{
        iconSize: 20,
      }}
    />
  );
}

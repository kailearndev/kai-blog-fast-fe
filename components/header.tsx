import Image from "next/image";
import Link from "next/link";
import BubbleMenu from "./BubbleMenu";
export default function Header() {
  const items = [
    {
      label: "home",
      href: "/",
      ariaLabel: "Home",
      rotation: -8,
      hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
    },
    {
      label: "about",
      href: "/about",
      ariaLabel: "About",
      rotation: 8,
      hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
    },
    {
      label: "projects",
      href: "#",
      ariaLabel: "Projects",
      rotation: 8,
      hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
    },
    {
      label: "blog",
      href: "/blog",
      ariaLabel: "Blog",
      rotation: 8,
      hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
    },
    {
      label: "contact",
      href: "#",
      ariaLabel: "Contact",
      rotation: -8,
      hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
    },
  ];

  return (
    <BubbleMenu
      className="backdrop-blur-md shadow-md p-2 "
      logo={
        <Link href="/" className="relative md:w-80 md:h-80 h-60 w-30 ">
          <Image src="/logo-dark.png" alt="Kai Dev Blog" fill preload />
        </Link>
      }
      items={items}
      menuAriaLabel="Toggle navigation"
      menuBg="#f3f4f6"
      menuContentColor="#111111"
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      useFixedPosition
      staggerDelay={0.12}
    />
  );
}

"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";

export default function Navbar({ isFixHeight = false }) {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const router = useTransitionRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;
  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[3.5rem] transition-all duration-500 z-50 ${
        scrollY > 0 ? "shadow-xl backdrop-blur-sm" : "shadow-none"
      } ${isFixHeight && "shadow-xl backdrop-blur-sm"} bg-linear-to-b`}
    >
      <div className="w-full h-full flex justify-between px-7 items-center text-xl text-orange-400">
        <Image
          className="font-bold cursor-pointer"
          onClick={() => {
            if (path == "/") return;
            router.push("/", {
              onTransitionReady: PageAnimation,
            });
          }}
          src="/images/smasa.webp"
          alt="logo smasa"
          width={40}
          height={50}
        />
        <div>
          <h1 className="font-semibold text-xl">Interactive Map</h1>
        </div>
      </div>
    </nav>
  );
}

const PageAnimation = () => {
  document.documentElement.animate(
    [
      {
        transform: `scale(1)`,
        opacity: 1,
      },
      {
        transform: `scale(0.5)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: `scale(1.5)`,
        opacity: 0,
      },
      {
        transform: `scale(1)`,
        opacity: 1,
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

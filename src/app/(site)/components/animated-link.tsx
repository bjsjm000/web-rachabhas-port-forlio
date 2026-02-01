"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();

        // ถ้าลด motion ให้ไปเลย
        if (reduce) {
          router.push(href);
          return;
        }

        // ให้ overlay มีเวลาขึ้น cover ก่อน
        // (RouteTransition จะจับ pathname หลัง push แล้วเล่นต่อ)
        setTimeout(() => router.push(href), 120);
      }}
    >
      {children}
    </a>
  );
}

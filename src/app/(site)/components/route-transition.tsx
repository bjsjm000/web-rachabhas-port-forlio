"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RouteTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const prev = useRef(pathname);
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"cover" | "reveal" | "idle">("idle");

  useEffect(() => {
    if (prev.current === pathname) return;

    prev.current = pathname;
    setShow(true);
    setPhase("cover");

    const t1 = setTimeout(() => setPhase("reveal"), reduce ? 0 : 520);
    const t2 = setTimeout(() => {
      setPhase("idle");
      setShow(false);
    }, reduce ? 0 : 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, reduce]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[1000] pointer-events-none">
        {/* main wipe */}
        <motion.div
          className="absolute inset-0 bg-[#070A12]"
          initial={{ y: "110%" }}
          animate={
            phase === "cover"
              ? { y: "0%" }
              : phase === "reveal"
              ? { y: "-110%" }
              : { y: "110%" }
          }
          transition={{
            duration: reduce ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: "transform" as any }}
        >
          {/* glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(77,143,255,0.4),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(45,190,126,0.25),transparent_60%)]" />

          {/* grid */}
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* center text */}
          {!reduce && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "cover" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                Loading next scene…
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/resume";

type Props = {
  onDone?: () => void;
  autoCloseMs?: number;
};

// Particle component for background sparkles
function Particles({ count = 20 }: { count?: number }) {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            scale: [0, Math.random() * 1.5 + 0.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function StaticIntro() {
  return (
    <div className="fixed inset-0 z-[999] bg-[#070A12]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(77,143,255,0.35),transparent_55%),radial-gradient(circle_at_75%_65%,rgba(45,190,126,0.22),transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-[34px] border border-white/12 bg-white/5 p-6 text-center text-white sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#4D8FFF]" />
            Welcome
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, I&apos;m {profile.name}
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Let&apos;s take a look at my portfolio here.
          </p>
          <div className="mx-auto mt-7 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <div className="h-1 w-3/5 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Intro({ onDone, autoCloseMs = 3000 }: Props) {
  const reduce = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [open, setOpen] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const closingRef = useRef(false);

  const close = useCallback((e?: React.MouseEvent) => {
    if (closingRef.current) return;
    closingRef.current = true;
    
    // Create ripple effect from button position
    if (e) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setRipple({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      setRipple({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    
    setIsExiting(true);
    
    // Close faster - Hero is already visible behind, just slide up the curtain
    setTimeout(() => setOpen(false), reduce ? 0 : 500);
  }, [reduce]);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    if (open) html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (!autoCloseMs || autoCloseMs <= 0) return;
    const t = window.setTimeout(() => close(), autoCloseMs);
    return () => window.clearTimeout(t);
  }, [mounted, autoCloseMs, close]);

  if (!mounted) return <StaticIntro />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: -30,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const nameLetters = profile.name.split("");

  return (
    <AnimatePresence mode="wait" onExitComplete={() => onDone?.()}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-[#070A12]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Animated grid background */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:18px_18px]"
            animate={reduce ? {} : { 
              backgroundPosition: ["0px 0px", "18px 18px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles */}
          {!reduce && <Particles count={35} />}

          {/* Animated gradient orbs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-40 opacity-90"
            animate={reduce ? { x: 0, y: 0 } : { 
              x: [0, 40, -30, 0], 
              y: [0, -30, 20, 0],
              scale: [1, 1.15, 0.9, 1]
            }}
            transition={reduce ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 25% 30%, rgba(77,143,255,0.5), transparent 55%), radial-gradient(circle at 75% 65%, rgba(45,190,126,0.35), transparent 60%)",
              willChange: "transform",
            }}
          />
          
          {/* Secondary floating orb */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-20 opacity-70"
            animate={reduce ? {} : { 
              x: [0, -35, 25, 0], 
              y: [0, 25, -35, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={reduce ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(139,92,246,0.35), transparent 50%)",
              willChange: "transform",
            }}
          />

          {/* Third orb for extra depth */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-32 opacity-50"
            animate={reduce ? {} : { 
              x: [0, 20, -15, 0], 
              y: [0, -20, 30, 0],
            }}
            transition={reduce ? { duration: 0 } : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 30% 70%, rgba(236,72,153,0.2), transparent 45%)",
              willChange: "transform",
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.6))]" />

          {/* POPUP */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isExiting ? "exit" : "visible"}
              className="relative w-full max-w-xl overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.03] p-6 text-center text-white backdrop-blur-xl sm:p-8"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Rotating border gradient */}
              <motion.div
                className="pointer-events-none absolute -inset-[1px] rounded-[35px] opacity-60"
                animate={reduce ? {} : {
                  background: [
                    "linear-gradient(0deg, rgba(77,143,255,0.5), transparent, rgba(45,190,126,0.3))",
                    "linear-gradient(90deg, rgba(45,190,126,0.3), transparent, rgba(139,92,246,0.5))",
                    "linear-gradient(180deg, rgba(139,92,246,0.5), transparent, rgba(77,143,255,0.3))",
                    "linear-gradient(270deg, rgba(77,143,255,0.3), transparent, rgba(45,190,126,0.5))",
                    "linear-gradient(360deg, rgba(77,143,255,0.5), transparent, rgba(45,190,126,0.3))",
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ filter: "blur(15px)" }}
              />

              {/* Inner glow */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-45"
                style={{
                  background:
                    "radial-gradient(circle at 20% 15%, rgba(77,143,255,0.3), transparent 55%), radial-gradient(circle at 80% 70%, rgba(45,190,126,0.22), transparent 60%)",
                }}
              />

              <div className="relative">
                {/* Welcome badge with pulse */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80"
                >
                  <motion.span 
                    className="h-2 w-2 rounded-full bg-[#4D8FFF]"
                    animate={reduce ? {} : { 
                      scale: [1, 1.4, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(77,143,255,0.5)",
                        "0 0 0 10px rgba(77,143,255,0)",
                        "0 0 0 0 rgba(77,143,255,0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Hi, recruiter 👋
                </motion.div>

                {/* Animated name reveal - letter by letter */}
                <motion.h1 
                  variants={itemVariants}
                  className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  I&apos;m{" "}
                  <span className="relative inline-block">
                    {nameLetters.map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.6 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                        style={{ 
                          background: "linear-gradient(135deg, #fff 30%, #4D8FFF 50%, #2DBE7E 70%, #8B5CF6)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    {/* Animated underline sweep */}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#4D8FFF] via-[#2DBE7E] to-[#8B5CF6]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants}
                  className="mt-3 text-sm text-white/70 sm:text-base"
                >
                  Let&apos;s take a look at my portfolio here.
                </motion.p>

                {/* Enhanced progress bar with gradient */}
                <motion.div 
                  variants={itemVariants}
                  className="mx-auto mt-7 h-1.5 w-64 overflow-hidden rounded-full bg-white/10"
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduce ? 0 : 2.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ 
                      willChange: "transform",
                      background: "linear-gradient(90deg, #4D8FFF, #2DBE7E, #8B5CF6, #4D8FFF)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                </motion.div>

                {/* Loading text with animated dots */}
                <motion.div
                  variants={itemVariants}
                  className="mt-5 text-xs text-white/55"
                >
                  <motion.span
                    animate={reduce ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                    transition={reduce ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ✨ Preparing something amazing
                  </motion.span>
                  <motion.span
                    animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </motion.div>

                {/* Buttons with enhanced hover effects */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-7 flex flex-wrap items-center justify-center gap-3"
                >
                  <motion.button
                    whileHover={reduce ? undefined : { 
                      y: -4, 
                      scale: 1.03,
                      boxShadow: "0 15px 50px rgba(77,143,255,0.4)"
                    }}
                    whileTap={reduce ? undefined : { y: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => close(e)}
                    className="relative overflow-hidden rounded-2xl bg-white px-6 py-3.5 text-sm font-medium text-black"
                    style={{ willChange: "transform" }}
                  >
                    {/* Button shimmer effect */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Take a look 
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={reduce ? undefined : { y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={reduce ? undefined : { y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => close(e)}
                    className="rounded-2xl border border-white/18 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/85 transition"
                  >
                    Skip
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Ripple effect on click */}
          <AnimatePresence>
            {ripple && (
              <motion.div
                className="pointer-events-none fixed z-[1000] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(77,143,255,0.3), rgba(45,190,126,0.2), transparent 70%)"
                }}
                initial={{ 
                  width: 0, 
                  height: 0, 
                  x: ripple.x, 
                  y: ripple.y,
                  opacity: 1
                }}
                animate={{ 
                  width: Math.max(window.innerWidth, window.innerHeight) * 3,
                  height: Math.max(window.innerWidth, window.innerHeight) * 3,
                  x: ripple.x - Math.max(window.innerWidth, window.innerHeight) * 1.5,
                  y: ripple.y - Math.max(window.innerWidth, window.innerHeight) * 1.5,
                  opacity: 0
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Enhanced curtain wipe with gradient and loading */}
          <motion.div
            aria-hidden
            className="fixed inset-0 z-[1001]"
            initial={{ y: "110%" }}
            animate={{ y: isExiting ? "0%" : "110%" }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              willChange: "transform",
              background: "linear-gradient(to bottom, #070A12, #0a1628, #070A12)"
            }}
          >
            {/* Loading indicator on curtain */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isExiting ? 1 : 0, scale: isExiting ? 1 : 0.8 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-center"
              >
                <motion.div
                  className="mx-auto h-10 w-10 rounded-full border-2 border-white/20 border-t-[#4D8FFF] border-r-[#2DBE7E]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p 
                  className="mt-4 text-sm text-white/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading portfolio...
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

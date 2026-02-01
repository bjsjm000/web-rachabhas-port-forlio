"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/resume";
import { useIntro } from "@/app/(site)/components/intro-context";

function chip(href: string, label: string) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center rounded-2xl border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10"
    >
      {label}
    </a>
  );
}

function StaticHero() {
  return (
    <section id="top" className="relative min-h-dvh w-full">
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative min-h-dvh overflow-hidden">
          <div className="absolute inset-0 bg-[#070A12]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[18px_18px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(77,143,255,0.35),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(45,190,126,0.22),transparent_58%)]" />

          <div className="relative mx-auto flex min-h-dvh w-full items-center px-6 py-8 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[90rem]">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-12 xl:gap-20">
                {/* LEFT */}
                <div className="flex flex-col justify-center">
                  <p className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80">
                    <span className="h-2 w-2 rounded-full bg-[#4D8FFF]" />
                    {profile.current.role} • {profile.current.company}
                  </p>

                  <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {profile.name}
                  </h1>

                  <div className="mt-4 text-base text-white/75 sm:text-lg">
                    {profile.headline}
                    <span className="mx-2 text-white/35">•</span>
                    <span className="text-white/65">{profile.locationNote}</span>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base lg:max-w-lg">
                    {profile.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#projects"
                      className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
                    >
                      View Projects
                    </a>
                    <a
                      href="#contact"
                      className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Contact Me
                    </a>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2 text-white/80">
                    <span className="mr-2 text-xs text-white/45">Quick contact:</span>
                    {chip(`mailto:${profile.contacts.email}`, profile.contacts.email)}
                    {chip(profile.contacts.github, "GitHub")}
                    {chip(profile.contacts.linkedin, "LinkedIn")}
                    {chip(`tel:${profile.contacts.phone.replace(/\s/g, "")}`, profile.contacts.phone)}
                    {chip("#contact", `LINE: ${profile.contacts.line}`)}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center">
                  <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 text-white/80 lg:p-8">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-white/50">Now</div>
                      <div className="rounded-2xl border border-white/15 bg-white/5 px-3 py-1 text-xs">
                        {profile.current.period}
                      </div>
                    </div>

                    <div className="mt-4 text-xl font-semibold text-white">What I build</div>
                    <p className="mt-2 text-sm text-white/65">
                      Enterprise web apps with strong UX, realtime data, clean architecture, and testing.
                    </p>

                    <div className="mt-5 space-y-3">
                      {profile.current.highlights.map((h) => (
                        <div key={h} className="rounded-2xl border border-white/12 bg-white/5 p-4">
                          <div className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#4D8FFF]" />
                            <p className="text-sm text-white/70">{h}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {profile.quickStats.map((s) => (
                        <div key={s.label} className="rounded-2xl border border-white/12 bg-white/5 p-3">
                          <div className="text-[11px] text-white/50">{s.label}</div>
                          <div className="mt-1 text-sm font-medium text-white/80">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-xs text-white/45">
                      Tip: scroll down — Projects & Timeline are interactive.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]" />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { isIntroComplete } = useIntro();

  useEffect(() => setMounted(true), []);

  // กัน hydration mismatch: SSR ให้เป็น static
  if (!mounted) return <StaticHero />;

  const easing = [0.22, 1, 0.36, 1] as const;

  // Animation จะเริ่มเมื่อ intro complete เท่านั้น
  const shouldAnimate = isIntroComplete;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const up = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
  };

  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: easing } },
  };

  return (
    <section id="top" className="relative w-full">
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative min-h-dvh overflow-hidden">
          {/* base */}
          <div className="absolute inset-0 bg-[#070A12]" />

          {/* grid - animate when intro complete */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate={shouldAnimate ? "show" : "hidden"}
            className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[18px_18px]"
          />

          {/* animated "spotlight drift" */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute -inset-40"
              animate={
                reduce || !shouldAnimate
                  ? { x: 0, y: 0 }
                  : { x: [0, 18, -8, 0], y: [0, -10, 12, 0] }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 14, repeat: Infinity, ease: "easeInOut" }
              }
              style={{
                background:
                  "radial-gradient(circle at 25% 25%, rgba(77,143,255,0.34), transparent 55%), radial-gradient(circle at 78% 60%, rgba(45,190,126,0.22), transparent 58%)",
              }}
            />
          </motion.div>

          {/* tiny "spark" dots */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldAnimate ? 0.08 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />

          {/* content */}
          <div className="relative mx-auto flex min-h-dvh w-full items-center px-6 py-8 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-[90rem]">
              <motion.div
                variants={container}
                initial="hidden"
                animate={shouldAnimate ? "show" : "hidden"}
                className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 xl:gap-20"
              >
                {/* LEFT */}
                <div className="flex flex-col justify-center">
                  <motion.p
                    variants={up}
                    className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#4D8FFF]" />
                    {profile.current.role} • {profile.current.company}
                  </motion.p>

                  {/* name reveal + subtle scale */}
                  <motion.h1
                    variants={up}
                    className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  >
                    <span className="relative inline-block">
                      <span className="relative z-10">{profile.name}</span>
                      <motion.span
                        aria-hidden
                        className="absolute -inset-x-2 -inset-y-1 rounded-3xl"
                        initial={{ opacity: 0, scaleX: 0.85 }}
                        animate={shouldAnimate ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.85 }}
                        transition={{ duration: 0.7, ease: easing }}
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(77,143,255,0.14), rgba(45,190,126,0.10), rgba(255,255,255,0.06))",
                        }}
                      />
                    </span>
                  </motion.h1>

                  <motion.div variants={up} className="mt-4 text-base text-white/75 sm:text-lg">
                    {profile.headline}
                    <span className="mx-2 text-white/35">•</span>
                    <span className="text-white/65">{profile.locationNote}</span>
                  </motion.div>

                  <motion.p
                    variants={up}
                    className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base lg:max-w-lg"
                  >
                    {profile.summary}
                  </motion.p>

                  {/* CTAs: hover micro-interaction */}
                  <motion.div variants={up} className="mt-8 flex flex-wrap gap-3">
                    <motion.a
                      href="#projects"
                      whileHover={reduce ? undefined : { y: -2 }}
                      whileTap={reduce ? undefined : { y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black"
                    >
                      View Projects
                    </motion.a>
                    <motion.a
                      href="#contact"
                      whileHover={reduce ? undefined : { y: -2 }}
                      whileTap={reduce ? undefined : { y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
                    >
                      Contact Me
                    </motion.a>
                  </motion.div>

                  {/* contacts */}
                  <motion.div variants={up} className="mt-8 flex flex-wrap gap-2 text-white/80">
                    <span className="mr-2 text-xs text-white/45">Quick contact:</span>
                    {chip(`mailto:${profile.contacts.email}`, profile.contacts.email)}
                    {chip(profile.contacts.github, "GitHub")}
                    {chip(profile.contacts.linkedin, "LinkedIn")}
                    {chip(`tel:${profile.contacts.phone.replace(/\s/g, "")}`, profile.contacts.phone)}
                    {chip("#contact", `LINE: ${profile.contacts.line}`)}
                  </motion.div>

                  {/* subtle scroll hint */}
                  <motion.div
                    variants={up}
                    className="mt-10 inline-flex items-center gap-2 text-xs text-white/45"
                  >
                    <motion.span
                      className="inline-block"
                      animate={reduce || !shouldAnimate ? { y: 0 } : { y: [0, 6, 0] }}
                      transition={reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ↓
                    </motion.span>
                    <span>Scroll to explore projects & timeline</span>
                  </motion.div>
                </div>

                {/* RIGHT: floating card + accent glow */}
                <div className="flex items-center justify-end">
                  <motion.div
                    variants={up}
                    className="relative w-full max-w-xl rounded-[32px] border border-white/15 bg-white/5 p-6 text-white/80 lg:p-8"
                    animate={
                      reduce || !shouldAnimate
                        ? { y: 0 }
                        : { y: [0, -8, 0] }
                    }
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }
                  >
                    <div
                      className="pointer-events-none absolute -inset-16 opacity-35"
                      style={{
                        background:
                          "radial-gradient(circle at 25% 20%, rgba(77,143,255,0.22), transparent 58%)",
                      }}
                    />

                    <div className="relative flex items-center justify-between">
                      <div className="text-xs text-white/50">Now</div>
                      <div className="rounded-2xl border border-white/15 bg-white/5 px-3 py-1 text-xs">
                        {profile.current.period}
                      </div>
                    </div>

                    <div className="relative mt-4 text-xl font-semibold text-white">What I build</div>
                    <p className="relative mt-2 text-sm text-white/65">
                      Enterprise web apps with strong UX, realtime data, clean architecture, and testing.
                    </p>

                    <div className="relative mt-5 space-y-3">
                      {profile.current.highlights.map((h, i) => (
                        <motion.div
                          key={h}
                          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.35, delay: shouldAnimate ? 0.4 + i * 0.08 : 0, ease: easing }}
                          className="rounded-2xl border border-white/12 bg-white/5 p-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#4D8FFF]" />
                            <p className="text-sm text-white/70">{h}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="relative mt-6 grid grid-cols-3 gap-3">
                      {profile.quickStats.map((s) => (
                        <div key={s.label} className="rounded-2xl border border-white/12 bg-white/5 p-3">
                          <div className="text-[11px] text-white/50">{s.label}</div>
                          <div className="mt-1 text-sm font-medium text-white/80">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="relative mt-6 text-xs text-white/45">
                      Tip: scroll down — Projects & Timeline are interactive.
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]" />
        </div>
      </div>
    </section>
  );
}

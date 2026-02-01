"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { timeline } from "@/data/resume";

function isLightTheme(fg?: string) {
  if (!fg) return false;
  const s = fg.toLowerCase();
  return s !== "#ffffff" && s !== "white";
}

export default function Experience() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  const easing = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="experience" ref={sectionRef} className="relative w-full py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070A12]" />
      
      {/* Animated grid */}
      <motion.div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[40px_40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.08 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -inset-20"
        animate={reduce ? {} : { x: [0, 20, -15, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 15% 25%, rgba(77,143,255,0.25), transparent 50%), radial-gradient(circle at 85% 75%, rgba(45,190,126,0.18), transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: easing }}
          className="mb-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span 
              className="h-2 w-2 rounded-full bg-[#4D8FFF]"
              animate={reduce ? {} : { scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Career Journey
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">Experience Timeline</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            My professional journey through different roles and companies.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: easing }}
            style={{ 
              background: "linear-gradient(to bottom, transparent, rgba(77,143,255,0.5), rgba(45,190,126,0.5), transparent)",
              transformOrigin: "top"
            }}
          />

          <div className="space-y-12 lg:space-y-0">
            {timeline.map((t, i) => (
              <ExperienceCard 
                key={t.id} 
                item={t} 
                index={i} 
                isEven={i % 2 === 0}
                reduce={reduce}
                easing={easing}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ 
  item: t, 
  index, 
  isEven,
  reduce,
  easing
}: { 
  item: any; 
  index: number;
  isEven: boolean;
  reduce: boolean | null;
  easing: readonly [number, number, number, number];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  
  const light = isLightTheme(t.theme?.fg);
  const surface = light ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.08)";
  const surface2 = light ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.12)";
  const border = light ? "rgba(11,34,57,0.15)" : "rgba(255,255,255,0.15)";

  return (
    <motion.div
      ref={ref}
      className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${isEven ? "" : "lg:direction-rtl"}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline dot */}
      <motion.div 
        className="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden lg:block"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div 
          className="h-5 w-5 rounded-full border-4 border-[#070A12]"
          style={{ backgroundColor: t.theme.accent }}
          animate={!reduce ? { 
            boxShadow: [
              `0 0 0 0 ${t.theme.accent}50`,
              `0 0 0 12px ${t.theme.accent}00`,
              `0 0 0 0 ${t.theme.accent}50`
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Content card */}
      <motion.div
        className={`${isEven ? "lg:col-start-1" : "lg:col-start-2"} lg:direction-ltr`}
        initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? -60 : 60, y: 30 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easing }}
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl p-8"
          style={{ 
            backgroundColor: t.theme.bg,
            color: t.theme.fg,
            border: `1px solid ${border}`
          }}
          whileHover={reduce ? undefined : { 
            y: -8, 
            boxShadow: `0 25px 50px -12px ${t.theme.accent}30`
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]" />
          <motion.div 
            className="pointer-events-none absolute inset-0"
            style={{ 
              background: light 
                ? "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.55), transparent 52%)" 
                : "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.12), transparent 52%)" 
            }}
          />
          
          {/* Corner accent */}
          <motion.div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{ background: `radial-gradient(circle at 100% 0%, ${t.theme.accent}25, transparent 70%)` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
          />
          
          <div className="relative">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5, ease: easing }}
              >
                <motion.div 
                  className="text-xs uppercase tracking-widest opacity-60"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.25 }}
                >
                  {t.date}
                </motion.div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight lg:text-3xl">{t.company}</h3>
                <div className="mt-2 text-base opacity-80">{t.role}</div>
              </motion.div>
              <motion.div 
                className="rounded-2xl px-4 py-2 text-sm font-medium"
                style={{ background: t.theme.accent, color: "#fff" }}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                whileHover={reduce ? undefined : { scale: 1.05, rotate: 3 }}
              >
                {t.theme.name}
              </motion.div>
            </div>

            {/* Tags */}
            <motion.div 
              className="mb-6 flex flex-wrap gap-2"
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
            >
              {t.tags.map((tag: string) => (
                <motion.span
                  key={tag}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  whileHover={reduce ? undefined : { scale: 1.08, y: -2 }}
                  className="rounded-xl px-3 py-2 text-sm cursor-default"
                  style={{ border: `1px solid ${border}`, background: surface2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div 
              className="space-y-3"
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
            >
              {t.highlights.map((h: string, i: number) => (
                <motion.div
                  key={h}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                  whileHover={reduce ? undefined : { x: 8, backgroundColor: surface2 }}
                  className="rounded-2xl p-4 transition-colors"
                  style={{ border: `1px solid ${border}`, background: surface }}
                >
                  <div className="flex items-start gap-3">
                    <motion.span 
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full" 
                      style={{ backgroundColor: t.theme.accent }}
                      animate={!reduce ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                    />
                    <p className="text-sm opacity-90">{h}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Empty column for layout */}
      <div className={`hidden lg:block ${isEven ? "lg:col-start-2" : "lg:col-start-1"}`} />
    </motion.div>
  );
}

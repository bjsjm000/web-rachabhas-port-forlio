"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { projects } from "@/data/resume";

export default function Projects() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const p = projects[active];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-15%" });

  useEffect(() => setMounted(true), []);

  const nextProject = () => setActive((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActive((prev) => (prev - 1 + projects.length) % projects.length);

  const easing = [0.22, 1, 0.36, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easing } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing } }
  };

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-dvh w-full">
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative min-h-dvh overflow-hidden">
          {/* Animated Background */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backgroundColor: p.theme.bg }}
            transition={{ duration: 0.8, ease: easing }}
          />
          
          {/* Animated gradient orbs */}
          <motion.div
            className="pointer-events-none absolute -inset-20"
            animate={reduce ? {} : { x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle at 20% 30%, ${p.theme.accent}22, transparent 50%), radial-gradient(circle at 80% 70%, ${p.theme.accent}15, transparent 45%)`,
            }}
          />

          {/* texture */}
          <motion.div 
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.06 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Floating particles */}
          {mounted && !reduce && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full"
                  style={{ 
                    backgroundColor: p.theme.accent,
                    left: `${10 + (i * 7)}%`,
                    top: `${20 + (i * 6)}%`,
                  }}
                  animate={{ y: [0, -80, 0], opacity: [0, 0.5, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                />
              ))}
            </div>
          )}

          <div className="relative flex min-h-dvh w-full items-center justify-center px-6 py-16 sm:px-10 lg:px-14" style={{ color: p.theme.fg }}>
            <div className="w-full max-w-7xl mx-auto">
              {/* Header */}
              <motion.div 
                className="mb-10 text-center"
                variants={headerVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
              >
                <motion.div
                  className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs mb-4"
                  style={{ border: `1px solid ${p.theme.border}`, background: p.theme.surface }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span 
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.theme.accent }}
                    animate={reduce ? {} : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Featured Work
                </motion.div>
                <h2 className="text-3xl font-semibold lg:text-4xl">Projects Showcase</h2>
                <p className="mt-2 opacity-70">Interactive showcase — click to navigate.</p>
              </motion.div>

              {/* Main Content */}
              <div className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
                {/* LEFT: Project List */}
                <motion.div 
                  className="space-y-2 lg:max-h-[55vh] overflow-auto pr-2 [scrollbar-width:thin]"
                  variants={containerVariants}
                  initial={mounted ? "hidden" : false}         
                  animate={mounted && isInView ? "show" : "hidden"} 
                >
                  {projects.map((item, i) => {
                    const isActive = i === active;
                    return (
                      <motion.button
                        key={item.id}
                        variants={itemVariants}
                        initial={false}
                        onClick={() => setActive(i)}
                        whileHover={reduce ? undefined : { scale: 1.02, x: 4 }}
                        whileTap={reduce ? undefined : { scale: 0.98 }}
                        className="relative w-full rounded-xl p-3 text-left"
                        tabIndex={0}
                        style={{
                          border: `1px solid ${isActive ? item.theme.accent : p.theme.border}`,
                          background: isActive ? p.theme.surface2 : p.theme.surface,
                        }}
                      >
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full"
                          style={{ backgroundColor: item.theme.accent }}
                          animate={{ height: isActive ? "50%" : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: easing }}
                        />
                        
                        <div className="flex items-center gap-2">
                          <motion.span 
                            className="h-2 w-2 shrink-0 rounded-full" 
                            style={{ backgroundColor: item.theme.accent }}
                            animate={isActive && !reduce ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{item.title}</div>
                            <div className="text-[11px] opacity-60 truncate">{item.company}</div>
                          </div>
                          {isActive && (
                            <span
                              className="shrink-0 rounded-lg px-2 py-0.5 text-[9px] font-semibold uppercase"
                              style={{ background: item.theme.accent, color: item.theme.fg ?? "#fff" }}
                            >
                              Active
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* RIGHT: Project Detail */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: easing }}
                    className="relative rounded-3xl p-6 lg:p-8"
                    style={{ border: `1px solid ${p.theme.border}`, background: p.theme.surface }}
                  >
                    {/* Corner glow */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-3xl"
                      style={{ background: `radial-gradient(circle at 100% 0%, ${p.theme.accent}30, transparent 70%)` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />

                    {/* Header */}
                    <motion.div 
                      className="flex flex-wrap items-start justify-between gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4, ease: easing }}
                    >
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-widest opacity-60">{p.period}</div>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight lg:text-3xl">{p.title}</h3>
                        <div className="mt-2 text-sm opacity-70">{p.subtitle}</div>
                        <div className="mt-1 text-xs opacity-60">{p.company}</div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        whileHover={reduce ? undefined : { scale: 1.05, rotate: 2 }}
                        className="rounded-2xl px-3 py-2 text-xs font-medium"
                        style={{ background: p.theme.accent, color: p.theme.fg ?? "#fff" }}
                      >
                        {p.badges?.[0] ?? "Project"}
                      </motion.div>
                    </motion.div>

                    {/* Stack */}
                    <motion.div 
                      className="mt-6 flex flex-wrap gap-2"
                      initial="hidden"
                      animate="show"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
                    >
                      {p.stack.map((tag) => (
                        <motion.span
                          key={tag}
                          variants={{ hidden: { opacity: 0, scale: 0.8, y: 10 }, show: { opacity: 1, scale: 1, y: 0 } }}
                          whileHover={reduce ? undefined : { scale: 1.1, y: -2 }}
                          className="rounded-xl px-3 py-1 text-xs cursor-default"
                          style={{ border: `1px solid ${p.theme.border}`, background: p.theme.surface2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Highlights */}
                    {/* Highlights */}
<motion.div 
  className="mt-6 grid gap-3 sm:grid-cols-2 items-stretch"
  initial="hidden"
  animate="show"
  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
>
  {p.highlights.map((h, i) => (
    <motion.div
      key={h}
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      whileHover={reduce ? undefined : { scale: 1.02, y: -4 }}
      className="h-full rounded-2xl p-4 flex"   // ✅ เพิ่ม h-full + flex
      style={{ border: `1px solid ${p.theme.border}`, background: p.theme.surface2 }}
    >
      <div className="flex items-start gap-3 w-full"> {/* ✅ ให้เต็มการ์ด */}
        <motion.span 
          className="mt-1 h-2 w-2 shrink-0 rounded-full" 
          style={{ backgroundColor: p.theme.accent }}
          animate={!reduce ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
        <p className="text-sm opacity-80">{h}</p>
      </div>
    </motion.div>
  ))}
</motion.div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation - Outside the grid */}
              <motion.div 
                className="mt-10 flex items-center justify-center gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={prevProject}
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                  className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium"
                  tabIndex={0}
                  style={{ 
                    border: `1px solid ${p.theme.border}`, 
                    background: p.theme.surface,
                    color: p.theme.fg
                  }}
                >
                  <span>←</span>
                  <span className="hidden sm:inline">Previous</span>
                </motion.button>
                
                <div 
                  className="flex items-center gap-2 rounded-full px-4 py-2"
                  style={{ background: p.theme.surface, border: `1px solid ${p.theme.border}` }}
                >
                  {projects.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActive(i)}
                      className="h-2.5 rounded-full"
                      tabIndex={0}
                      style={{ backgroundColor: i === active ? p.theme.accent : `${p.theme.fg}30` }}
                      animate={{ width: i === active ? 24 : 10 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextProject}
                  tabIndex={0} 
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                  className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium"
                  style={{ 
                    border: `1px solid ${p.theme.border}`, 
                    background: p.theme.surface,
                    color: p.theme.fg
                  }}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

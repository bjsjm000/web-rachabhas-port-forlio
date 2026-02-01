"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { skills } from "@/data/resume";

type SkillGroup = {
  category: string;
  items: { name: string; level: number }[];
};

// Transform skills object into array with levels
const skillGroups: SkillGroup[] = [
  { 
    category: "Languages", 
    items: skills.programming.map((s, i) => ({ name: s, level: 85 - (i * 3) })) 
  },
  { 
    category: "Frameworks", 
    items: skills.frameworks.map((s, i) => ({ name: s, level: 90 - (i * 4) })) 
  },
  { 
    category: "Database", 
    items: skills.databases.map((s, i) => ({ name: s, level: 80 - (i * 5) })) 
  },
  { 
    category: "Tools", 
    items: skills.tools.map((s, i) => ({ name: s, level: 85 - (i * 3) })) 
  },
];

export default function Skills() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const easing = [0.22, 1, 0.36, 1] as const;

  // Create animated particles (memoized to prevent recreation)
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })), []);

  return (
    <section id="skills" ref={sectionRef} className="relative w-full py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070A12]" />
      
      {/* Animated grid */}
      <motion.div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[40px_40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.06 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -inset-20"
        animate={reduce ? {} : { x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 20% 30%, rgba(147,51,234,0.20), transparent 45%), radial-gradient(circle at 80% 70%, rgba(77,143,255,0.18), transparent 45%)",
        }}
      />

      {/* Floating particles */}
      {mounted && !reduce && particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 2 === 0 ? "rgba(147,51,234,0.6)" : "rgba(77,143,255,0.6)",
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, p.id % 2 === 0 ? 20 : -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

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
              className="h-2 w-2 rounded-full bg-purple-500"
              animate={reduce ? {} : { scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Technical Expertise
          </motion.div>
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">Skills & Technologies</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ 
            hidden: {}, 
            show: { transition: { staggerChildren: 0.15 } } 
          }}
        >
          {skillGroups.map((group, gi) => (
            <SkillGroupCard 
              key={group.category} 
              group={group} 
              index={gi} 
              reduce={reduce} 
              easing={easing}
              mounted={mounted}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const colors = [
  { accent: "#4D8FFF", glow: "rgba(77,143,255,0.25)" },
  { accent: "#9333EA", glow: "rgba(147,51,234,0.25)" },
  { accent: "#2DBE7E", glow: "rgba(45,190,126,0.25)" },
  { accent: "#F97316", glow: "rgba(249,115,22,0.25)" },
  { accent: "#EC4899", glow: "rgba(236,72,153,0.25)" },
  { accent: "#06B6D4", glow: "rgba(6,182,212,0.25)" },
];

function SkillGroupCard({ 
  group, 
  index,
  reduce, 
  easing,
  mounted
}: { 
  group: SkillGroup; 
  index: number;
  reduce: boolean | null;
  easing: readonly [number, number, number, number];
  mounted: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      variants={{ 
        hidden: { opacity: 0, y: 50, scale: 0.95 }, 
        show: { opacity: 1, y: 0, scale: 1 } 
      }}
      transition={{ duration: 0.6, ease: easing }}
      className="group relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 h-full"
        whileHover={reduce ? undefined : { 
          y: -8, 
          borderColor: `${color.accent}50`,
          boxShadow: `0 25px 50px -12px ${color.glow}`
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Corner glow */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color.glow}, transparent 70%)` }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        />

        {/* Background dots */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

        {/* Category header */}
        <motion.div 
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.1, duration: 0.5, ease: easing }}
        >
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
            style={{ backgroundColor: `${color.accent}20` }}
            whileHover={reduce ? undefined : { scale: 1.1, rotate: 5 }}
          >
            {getCategoryIcon(group.category)}
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">{group.category}</h3>
            <div className="text-sm text-white/50">{group.items.length} skills</div>
          </div>
        </motion.div>

        {/* Skills list */}
        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
        >
          {group.items.map((item, i) => (
            <SkillItem 
              key={item.name} 
              item={item} 
              index={i}
              color={color}
              reduce={reduce}
              mounted={mounted}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SkillItem({ 
  item, 
  index,
  color,
  reduce,
  mounted
}: { 
  item: { name: string; level: number }; 
  index: number;
  color: { accent: string; glow: string };
  reduce: boolean | null;
  mounted: boolean;
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }}
      className="group/item"
    >
      <motion.div 
        className="flex items-center justify-between mb-2"
        whileHover={reduce ? undefined : { x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-sm font-medium text-white/90">{item.name}</span>
        <motion.span 
          className="text-xs font-mono text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.05 }}
        >
          {item.level}%
        </motion.span>
      </motion.div>
      
      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ 
            background: `linear-gradient(90deg, ${color.accent}, ${color.accent}90)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${item.level}%` }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {/* Shimmer effect */}
          {mounted && !reduce && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    "Frontend": "⚛️",
    "Backend": "🔧",
    "Database": "🗄️",
    "DevOps": "🚀",
    "Tools": "🛠️",
    "Design": "🎨",
    "Mobile": "📱",
    "Languages": "💻",
    "Frameworks": "📦",
    "Cloud": "☁️",
  };
  return icons[category] || "💡";
}

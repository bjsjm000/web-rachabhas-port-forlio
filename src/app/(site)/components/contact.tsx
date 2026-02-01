"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { profile } from "@/data/resume";

function textOnColor(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#0B0F1A" : "#FFFFFF";
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

type ContactItem = {
  label: string;
  value: string;
  href: string;
  accent: string;
  icon: string;
  copy?: string;
};

export default function Contact() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [toast, setToast] = useState<string | null>(null);

  // Particles for background
  const particles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 12,
      delay: Math.random() * 5,
    })), []);

  const contacts: ContactItem[] = useMemo(() => {
    const c = profile.contacts;
    return [
      { label: "Email", value: c.email, href: `mailto:${c.email}`, accent: "#4D8FFF", icon: "✉️", copy: c.email },
      { label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}`, accent: "#2DBE7E", icon: "📞", copy: c.phone },
      { label: "LINE", value: c.line, href: "#", accent: "#22C55E", icon: "💬", copy: c.line },
      { label: "GitHub", value: "bjsjm000", href: c.github, accent: "#A8EFF4", icon: "🐙" },
      { label: "LinkedIn", value: "rachabhas-vongbuntoon", href: c.linkedin, accent: "#2F80ED", icon: "in" },
    ];
  }, []);

  async function onCopy(value: string) {
    const ok = await copyText(value);
    setToast(ok ? `Copied: ${value}` : "Copy failed");
    window.setTimeout(() => setToast(null), 1600);
  }

  const easing = [0.22, 1, 0.36, 1] as const;

  const container = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing, staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
  };

  // SSR fallback
  if (!mounted) {
    return (
      <section id="contact" ref={sectionRef} className="relative w-full">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="relative overflow-hidden bg-[#070A12] text-white">
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[18px_18px]" />
            <div className="relative h-full w-full px-6 py-12 sm:px-10 lg:px-14">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Contact</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="relative w-full">
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative overflow-hidden bg-[#070A12] text-white">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[18px_18px]" />
          
          {/* Animated gradient orbs */}
          <motion.div
            className="pointer-events-none absolute -inset-20"
            animate={reduce ? {} : { x: [0, 25, -15, 0], y: [0, -15, 25, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle at 18% 18%, rgba(77,143,255,0.32), transparent 55%), radial-gradient(circle at 78% 62%, rgba(45,190,126,0.22), transparent 58%)",
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
                background: p.id % 2 === 0 ? "rgba(77,143,255,0.5)" : "rgba(45,190,126,0.5)",
              }}
              animate={{ y: [0, -50, 0], x: [0, p.id % 2 === 0 ? 15 : -15, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}

          <div className="relative h-full w-full px-6 py-12 sm:px-10 lg:px-14">
            <motion.div
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
            >
              {/* LEFT */}
              <motion.div variants={item}>
                <motion.div 
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                >
                  <motion.span 
                    className="h-2 w-2 rounded-full bg-[#4D8FFF]"
                    animate={reduce ? {} : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Let's work together
                </motion.div>

                <motion.h2 
                  className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: easing }}
                >
                  Contact
                </motion.h2>

                <motion.p 
                  className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: easing }}
                >
                  I'm available for <span className="text-white/85">Web Developer / Software Developer</span> roles.
                  If you're an HR or hiring manager, the fastest way to reach me is email or phone.
                </motion.p>

                <motion.div 
                  className="mt-7 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: easing }}
                >
                  <motion.a
                    href={`mailto:${profile.contacts.email}`}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition"
                    whileHover={reduce ? undefined : { scale: 1.05, boxShadow: "0 10px 30px -10px rgba(77,143,255,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Email Me
                  </motion.a>
                  <motion.a
                    href={`tel:${profile.contacts.phone.replace(/\s/g, "")}`}
                    className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition"
                    whileHover={reduce ? undefined : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Call Now
                  </motion.a>
                </motion.div>

                <motion.div 
                  className="mt-10 grid gap-3 sm:grid-cols-3"
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
                >
                  {[
                    { k: "Role", v: "Full-Stack / UI Motion" },
                    { k: "Strength", v: "Realtime + Enterprise" },
                    { k: "Location", v: profile.locationNote ?? "Bangkok" },
                  ].map((s) => (
                    <motion.div 
                      key={s.k} 
                      className="rounded-3xl border border-white/12 bg-white/5 p-4"
                      variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                      whileHover={reduce ? undefined : { y: -4, borderColor: "rgba(77,143,255,0.3)" }}
                    >
                      <div className="text-[11px] text-white/45">{s.k}</div>
                      <div className="mt-1 text-sm font-medium text-white/85">{s.v}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT */}
              <motion.div 
                variants={item} 
                className="rounded-[36px] border border-white/12 bg-white/5 p-6 sm:p-8 relative overflow-hidden"
              >
                {/* Corner glow */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(77,143,255,0.2), transparent 70%)" }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 }}
                />

                <div className="flex items-center justify-between relative">
                  <div className="text-sm font-semibold text-white/90">Direct channels</div>
                  <motion.div 
                    className="text-xs text-white/45"
                    animate={reduce ? {} : { opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Response fast ⚡
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-6 grid gap-3 relative"
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                >
                  {contacts.map((c, idx) => {
                    const fg = textOnColor(c.accent);
                    const isExternal = c.href.startsWith("http");
                    const canCopy = !!c.copy;

                    return (
                      <motion.div
                        key={c.label}
                        variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }}
                        className="group rounded-3xl border border-white/12 bg-white/5 p-4 transition"
                        whileHover={reduce ? undefined : { 
                          y: -4, 
                          borderColor: `${c.accent}50`,
                          boxShadow: `0 10px 30px -10px ${c.accent}30`
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <motion.div
                              className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold"
                              style={{ backgroundColor: c.accent, color: fg }}
                              whileHover={reduce ? undefined : { scale: 1.1, rotate: 5 }}
                            >
                              {c.icon}
                            </motion.div>
                            <div>
                              <div className="text-xs text-white/50">{c.label}</div>
                              <div className="mt-1 text-sm font-medium text-white/90">{c.value}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {canCopy && (
                              <motion.button
                                onClick={() => onCopy(c.copy!)}
                                className="rounded-2xl border border-white/14 bg-white/5 px-3 py-2 text-xs text-white/80 transition"
                                whileHover={reduce ? undefined : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Copy
                              </motion.button>
                            )}
                            <motion.a
                              href={c.href === "#" ? undefined : c.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noreferrer" : undefined}
                              onClick={(e) => {
                                if (c.href === "#") { e.preventDefault(); onCopy(c.value); }
                              }}
                              className="rounded-2xl px-3 py-2 text-xs font-medium transition"
                              style={{ backgroundColor: c.accent, color: fg }}
                              whileHover={reduce ? undefined : { scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Open
                            </motion.a>
                          </div>
                        </div>

                        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-1 rounded-full"
                            style={{ backgroundColor: c.accent }}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, delay: 0.3 + idx * 0.1, ease: easing }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div 
                  className="mt-7 text-xs text-white/45"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Prefer email with your job description + tech stack. I'll respond as soon as possible.
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),transparent)]" />
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <motion.div 
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
        >
          <div className="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-sm px-4 py-2 text-xs text-white/85">
            ✓ {toast}
          </div>
        </motion.div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Intro from "@/app/(site)/components/intro";
import { IntroProvider, useIntro } from "@/app/(site)/components/intro-context";

function PageContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { setIntroComplete } = useIntro();

  useEffect(() => setMounted(true), []);

  // SSR-safe: render ปกติไปก่อน
  if (!mounted) {
    return (
      <>
        <Intro onDone={setIntroComplete} />
        <main>{children}</main>
      </>
    );
  }

  // Hero อยู่ด้านหลังตลอด, Intro อยู่ด้านบนแล้ว slide ขึ้นไป
  return (
    <>
      {/* Content อยู่ด้านหลัง - แสดงทันที */}
      <main>{children}</main>
      
      {/* Intro อยู่ด้านบน - slide up เมื่อ exit */}
      <Intro onDone={setIntroComplete} />
    </>
  );
}

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <IntroProvider>
      <PageContent>{children}</PageContent>
    </IntroProvider>
  );
}

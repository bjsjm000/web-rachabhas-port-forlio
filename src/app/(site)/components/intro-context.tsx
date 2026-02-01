"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type IntroContextType = {
  isIntroComplete: boolean;
  setIntroComplete: () => void;
};

const IntroContext = createContext<IntroContextType | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  
  const setIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  return (
    <IntroContext.Provider value={{ isIntroComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    // Return default values if used outside provider
    return { isIntroComplete: true, setIntroComplete: () => {} };
  }
  return context;
}

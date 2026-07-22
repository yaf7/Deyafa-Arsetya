"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved === "en" || saved === "id") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (key: string): string => {
    if (!mounted) return key.split('.').pop() || key; // Prevent hydration mismatch by returning raw key or fallback during SSR (better handled with actual text, but for our simple site this is fine)
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  };

  // Safe SSR fallback for 't' before mount
  const ssrT = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations["id"]; // Default to ID for SSR
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: mounted ? t : ssrT }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

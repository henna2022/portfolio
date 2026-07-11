"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Locale = "en" | "ko";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: "en", setLocale: () => {} });

// The Korean translations still need human rework, so production builds are
// English-only: the provider ignores any stored locale and never applies the
// lang-ko class. Development keeps the full EN/KO behavior. NODE_ENV is
// inlined at build time, so the dead branch is stripped from prod bundles.
const localeEnabled = process.env.NODE_ENV === "development";

// Client-side locale state. The server always renders English; a pre-paint
// script in app/layout.tsx (dev only) applies the saved lang/class to <html>
// so the Korean font is ready before hydration swaps the text.
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Adopt the persisted choice after mount (avoids a hydration mismatch).
  useEffect(() => {
    if (!localeEnabled) return;
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "ko" || stored === "en") setLocaleState(stored);
    } catch {}
  }, []);

  // Reflect the active locale on <html> for fonts and accessibility.
  useEffect(() => {
    if (!localeEnabled) return;
    document.documentElement.lang = locale;
    document.documentElement.classList.toggle("lang-ko", locale === "ko");
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    if (!localeEnabled) return;
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch {}
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

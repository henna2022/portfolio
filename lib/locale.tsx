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

// Client-side locale state. The server always renders English; a pre-paint
// script in app/layout.tsx applies the saved lang/class to <html> so the
// Korean font is ready before hydration swaps the text.
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Adopt the persisted choice after mount (avoids a hydration mismatch).
  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "ko" || stored === "en") setLocaleState(stored);
    } catch {}
  }, []);

  // Reflect the active locale on <html> for fonts and accessibility.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.classList.toggle("lang-ko", locale === "ko");
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
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

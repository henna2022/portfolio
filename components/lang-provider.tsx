"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { KO_ENABLED, ui, uiKo, type UiStrings } from "@/lib/i18n";

export type Lang = "en" | "ko";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: UiStrings;
}>({ lang: "en", setLang: () => {}, t: ui });

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR/최초 렌더는 항상 EN — 저장된 선택은 마운트 후 반영해 하이드레이션
  // 불일치를 피한다 (layout 의 langScript 가 폰트 클래스는 미리 붙여둔다).
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // KO 비활성화 중에는 저장된 선택을 무시하고 EN 으로 고정한다.
    // 이전에 KO 를 골라 둔 방문자도 EN 으로 돌아오도록 저장값까지 지운다.
    if (!KO_ENABLED) {
      try {
        localStorage.removeItem("pf_lang");
      } catch {}
      return;
    }
    try {
      if (localStorage.getItem("pf_lang") === "ko") setLang("ko");
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const ko = KO_ENABLED && lang === "ko";
    root.lang = ko ? "ko" : "en";
    root.classList.toggle("lang-ko", ko);
    if (!KO_ENABLED) return;
    try {
      localStorage.setItem("pf_lang", lang);
    } catch {}
  }, [lang]);

  return (
    <LangContext.Provider
      value={
        KO_ENABLED
          ? { lang, setLang, t: lang === "ko" ? uiKo : ui }
          : // 비활성화 중에는 setLang 을 무력화해 어떤 경로로도 KO 로 못 넘어가게 한다
            { lang: "en", setLang: () => {}, t: ui }
      }
    >
      {children}
    </LangContext.Provider>
  );
}

export function useI18n() {
  return useContext(LangContext);
}

// 로컬라이즈 헬퍼 — KO 텍스트가 아직 없으면 EN 으로 폴백한다.
export function pick<T>(lang: Lang, en: T, ko: T | undefined): T {
  return lang === "ko" && ko !== undefined ? ko : en;
}

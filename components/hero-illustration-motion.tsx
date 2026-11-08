"use client";

import styles from "./hero-illustration-motion.module.css";
import { useI18n } from "./lang-provider";

const profileChips = {
  en: [
    ["Role", "Education R&D · Developer"],
    ["Role", "Product planning (PM)"],
    ["Field", "AI & coding education"],
    ["Field", "Science museum exhibits"],
    ["Field", "Smart farm & IoT"],
    ["Interest", "EdTech"],
  ],
  ko: [
    ["직무", "교육 R&D \u2060·\u2060 개발자"],
    ["직무", "서비스 기획(PM)"],
    ["분야", "AI\u2060·\u2060코딩 교육"],
    ["분야", "과학관 전시"],
    ["분야", "스마트팜\u2060·\u2060IoT"],
    ["관심", "에듀테크"],
  ],
} as const;

export function HeroIllustrationMotion({ playing }: { playing: boolean }) {
  const { lang } = useI18n();

  return (
    <div aria-hidden="true" className={styles.layer} data-playing={playing} lang={lang}>
      {profileChips[lang].map(([label, value], index) => (
        <div key={index} className={`${styles.item} ${styles.chip}`}
          style={{ animationDelay: `${800 + index * 3300}ms` }}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  );
}

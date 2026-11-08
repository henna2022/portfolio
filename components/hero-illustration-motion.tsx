"use client";

import styles from "./hero-illustration-motion.module.css";
import { useI18n } from "./lang-provider";

const profileChips = {
  en: [
    ["Role", "Education R&D · Developer"],
    ["Field", "Education program planning"],
    ["Field", "AI & coding education"],
    ["Field", "Science museum exhibits"],
    ["Field", "Smart farm & IoT"],
    ["Field", "Exhibit operations software"],
  ],
  ko: [
    ["직무", "교육 R&D \u2060·\u2060 개발자"],
    ["분야", "교육 프로그램 기획"],
    ["분야", "AI\u2060·\u2060코딩 교육"],
    ["분야", "과학관 전시"],
    ["분야", "스마트팜\u2060·\u2060IoT"],
    ["분야", "전시 운영 소프트웨어"],
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

"use client";

import { hero, person } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { HeroIllustrationMotion } from "./hero-illustration-motion";

export function SkyHero() {
  const { t, lang } = useI18n();
  const h = lang === "ko" ? heroKo : hero;
  return (
    <section id="top" className="sky-band">
      <svg aria-hidden="true" focusable="false" className="sky-clouds" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 0H320C298 23 263 30 233 22C204 64 132 64 105 30C65 45 21 34 0 23Z" />
        <path d="M660 0H947C921 20 889 22 862 14C839 45 789 49 758 22C722 36 679 25 660 0Z" />
        <path d="M1160 0H1440V32C1401 48 1358 41 1339 24C1301 59 1240 47 1223 22C1198 25 1176 15 1160 0Z" />
      </svg>
      <div className="home-shell sky-content">
        <div className="sky-copy">
          <h1 className="font-display ko-hero-display">{h.headline}</h1>
          <p className="sky-role">{lang === "ko" ? person.hangul : person.name}<br />{t.educationRole}</p>
          <div className="sky-actions">
            <a href="#work" className="home-primary">{t.viewWork} <span aria-hidden="true">↗</span></a>
            <a href="#contact" className="home-link">{t.nav.contact} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="sky-art relative min-w-0">
          <img src={assetPath("/illustration/hero-character.webp")} alt={t.heroCharacterAlt}
            width={1230} height={1037} decoding="async" className="sky-character" />
          <HeroIllustrationMotion />
        </div>
      </div>
    </section>
  );
}

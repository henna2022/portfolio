"use client";

import type { ReactNode } from "react";
import { about, person } from "@/lib/data";
import { aboutKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { KoSentences } from "./ko-sentences";

export function About({ photo }: { photo: ReactNode }) {
  const { t, lang } = useI18n();
  const content = lang === "ko" ? aboutKo : about;
  return (
    <section id="about" className="home-section home-shell" aria-labelledby="about-title">
      <div className="about-grid">
        <div>{photo}</div>
        <div className="about-copy">
          <h2 id="about-title" className="home-heading">{lang === "ko" ? person.hangul : person.name}</h2>
          <p className="about-intro font-display">
            {content.quote.map((part) => part.text).join("")}
          </p>
          <p className="mt-7"><KoSentences lang={lang} text={content.prose[0].map((part) => part.text).join("")} /></p>
          <p className="mt-5"><KoSentences lang={lang} text={content.tagline} /></p>
          <a href={assetPath(lang === "ko" ? person.cvKo : person.cv)} download className="home-link mt-7 inline-block">{t.downloadCv} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

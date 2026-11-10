"use client";

import { useLayoutEffect, useRef } from "react";
import { hero, person } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { ui, uiKo } from "@/lib/i18n";
import { useI18n } from "./lang-provider";
import { HeroRobots } from "./hero-robots";

export function SkyHero() {
  const { t, lang } = useI18n();
  const band = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const home = band.current?.closest<HTMLElement>(".home-page");
    const header = home?.querySelector<HTMLElement>(".site-header");
    if (!home || !header) return;
    // offsetHeight: 페이지 zoom 이 걸려도 CSS 값과 같은 단위(getBoundingClientRect 는 줄어든 화면 값)
    const measure = () => home.style.setProperty("--site-header-height", `${header.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={band} id="top" className="sky-band">
      <svg aria-hidden="true" focusable="false" className="sky-clouds" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 0H320C298 23 263 30 233 22C204 64 132 64 105 30C65 45 21 34 0 23Z" />
        <path d="M660 0H947C921 20 889 22 862 14C839 45 789 49 758 22C722 36 679 25 660 0Z" />
        <path d="M1160 0H1440V32C1401 48 1358 41 1339 24C1301 59 1240 47 1223 22C1198 25 1176 15 1160 0Z" />
      </svg>
      <div className="home-shell sky-content">
        <div className="sky-copy-versions">
          {/* 두 언어의 높이를 함께 확보한다. */}
          {(["en", "ko"] as const).map((language) => {
            const copy = language === "ko" ? heroKo : hero;
            const strings = language === "ko" ? uiKo : ui;
            return (
              <div key={language} lang={language} className="sky-copy" aria-hidden={lang !== language}
                ref={(node) => { if (node) node.inert = lang !== language; }}>
                <h1 className="font-display ko-hero-display">{copy.headline}</h1>
                <div className="sky-identity">
                  <p className="sky-name">{language === "ko" ? person.hangul : person.name}</p>
                  <p className="sky-role">{strings.educationRole}</p>
                </div>
                <div className="sky-actions">
                  <a href="#work" className="home-primary">{strings.viewWork} <span aria-hidden="true">↗</span></a>
                  <a href="#contact" className="home-link">{strings.nav.contact} <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sky-art relative min-w-0">
          <HeroRobots label={t.heroCharacterAlt} />
        </div>
      </div>
    </section>
  );
}

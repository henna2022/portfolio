"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";

export function SectionNav() {
  const { locale } = useLocale();
  const t = dict[locale];
  const pathname = usePathname();
  const lenis = useLenis();
  const isHome = pathname === "/";
  const [active, setActive] = useState("top");
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: highlight the section currently near the top of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // thin band ~42% down the viewport → one section active at a time
      { rootMargin: "-42% 0px -53% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Keep the active chip in view within the horizontally-scrollable nav.
  useEffect(() => {
    const el = navRef.current?.querySelector(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    if (!isHome || !lenis) return; // off-home: let the href navigate home
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setActive(id);
    lenis.scrollTo(target, {
      offset: -88,
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    history.replaceState(null, "", assetPath(id === "top" ? "/" : `/#${id}`));
  }

  return (
    <div
      ref={navRef}
      className="no-scrollbar flex items-center gap-1 overflow-x-auto"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            data-id={s.id}
            href={assetPath(s.id === "top" ? "/" : `/#${s.id}`)}
            onClick={(e) => handleClick(e, s.id)}
            aria-current={isActive ? "true" : undefined}
            // 3D 블럭 스타일: 흰 블럭 + 아래 단차, 활성 탭은 파란 블럭이 눌린 상태
            className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? "translate-y-[2px] bg-lime text-white shadow-[0_2px_0_#1d4ed8]"
                : "bg-white text-ink/70 shadow-[0_4px_0_rgba(28,27,23,0.14)] hover:translate-y-[1px] hover:text-ink hover:shadow-[0_3px_0_rgba(28,27,23,0.14)] dark:bg-sand-deep dark:text-cream/70 dark:shadow-[0_4px_0_rgba(0,0,0,0.5)] dark:hover:text-cream dark:hover:shadow-[0_3px_0_rgba(0,0,0,0.5)]"
            }`}
          >
            {t.nav[s.id] ?? s.label}
          </a>
        );
      })}
    </div>
  );
}

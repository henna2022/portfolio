"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { ui } from "@/lib/i18n";

export function SectionNav() {
  const t = ui;
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
    // 블럭 없는 순수 텍스트 내비 — 8개가 항상 한 줄에 들어가도록 컴팩트하게
    <div
      ref={navRef}
      className="flex items-center justify-center gap-0.5 sm:gap-2"
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
            // 활성 항목은 굵기·색만으로는 잘 안 잡혀서 밑줄 인디케이터를 함께 둔다.
            // (Inter 는 가변 폰트라 800 까지 실제 굵기가 나온다)
            className={`relative shrink-0 px-1.5 py-1 text-xs transition-colors sm:px-2.5 sm:text-sm ${
              isActive
                ? "font-extrabold text-lime after:absolute after:inset-x-1.5 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-lime after:content-[''] sm:after:inset-x-2.5"
                : "font-semibold text-ink/60 hover:text-ink"
            }`}
          >
            {t.nav[s.id] ?? s.label}
          </a>
        );
      })}
    </div>
  );
}

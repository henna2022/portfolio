"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";

const sectionIds = ["top", "work", "make", "experience", "skills", "about", "awards", "contact"];

export function SectionNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState(isHome ? "top" : pathname.startsWith("/work") ? "work" : "");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const link = scroller.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    // 세로 위치는 유지하고 내비 안에서만 즉시 이동한다.
    scroller.scrollTo({ left: link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2, behavior: "auto" });
  }, [active]);

  useEffect(() => {
    if (!isHome) return;
    const elements = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav aria-label={t.sectionNavLabel}>
      <div ref={scrollerRef} className="relative -mx-4 overflow-x-auto px-4 no-scrollbar">
        <div className="mx-auto flex w-max items-center gap-1 sm:gap-3">
          {sectionIds.map((id) => (
            <a key={id} data-id={id} href={isHome ? `#${id}` : assetPath(`/#${id}`)}
              onClick={() => setActive(id)} aria-current={active === id ? "location" : undefined}
              className={`shrink-0 border-b-2 px-2 py-1.5 text-[14px] transition-colors sm:text-[15px] ${active === id
                ? "border-lime font-semibold text-blue-accessible dark:text-lime"
                : "border-transparent text-muted hover:text-ink"}`}>
              {t.nav[id]}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

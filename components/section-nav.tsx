"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";

const sectionIds = ["top", "work", "make", "experience", "skills", "about", "awards", "contact"];

export function SectionNav() {
  const { t, lang } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState(isHome ? "top" : pathname.startsWith("/work") ? "work" : "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const scroller = scrollerRef.current;
    const items = itemsRef.current;
    if (!scroller || !items) return;
    const updateEdges = () => {
      const left = scroller.scrollLeft > 1;
      const right = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 1;
      setEdges((previous) => previous.left === left && previous.right === right
        ? previous : { left, right });
    };
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(scroller);
    observer.observe(items);
    scroller.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", updateEdges);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const link = scroller.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    // 세로 위치는 유지하고 내비 안에서만 즉시 이동한다.
    scroller.scrollTo({ left: link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2, behavior: "auto" });
  }, [active, lang]);

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
    <nav aria-label={t.sectionNavLabel} className="section-nav relative -mx-4 xl:mx-0"
      data-fade-left={edges.left} data-fade-right={edges.right}>
      <div ref={scrollerRef} className="relative overflow-x-auto px-4 no-scrollbar xl:px-0">
        <div ref={itemsRef} className="mx-auto flex w-max items-center gap-1 sm:gap-3 xl:gap-1">
          {sectionIds.map((id) => (
            <a key={id} data-id={id} href={isHome ? `#${id}` : assetPath(`/#${id}`)}
              onClick={() => setActive(id)} aria-current={active === id ? "location" : undefined}
              className={`shrink-0 whitespace-nowrap border-b-2 px-2 py-1.5 text-[14px] leading-5 transition-colors sm:text-[15px] xl:text-[14px] ${active === id
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

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  // 좁은 화면에서 스트립이 넘칠 때: 활성 항목이 항상 보이도록 가로 센터링.
  // (scrollIntoView 는 페이지 세로 스크롤까지 건드릴 수 있어 scrollLeft 만 조작)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const link = scroller.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    scroller.scrollTo({
      left: link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

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
    const start = window.scrollY;
    const goal = target.getBoundingClientRect().top + start - 88;
    lenis.scrollTo(target, {
      offset: -88,
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    // Lenis 의 부드러운 스크롤은 rAF 보간이라, 탭이 스로틀되거나 기기가 바쁘면
    // 한 프레임도 진행되지 않아 클릭이 씹힌 것처럼 보인다. 잠깐 뒤에도 제자리면
    // 즉시 이동으로 보정한다 (3D 벽 버튼·캐러셀과 같은 처리).
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - start) < 8 && Math.abs(goal - start) > 8) {
        lenis.scrollTo(goal, { immediate: true });
      }
    }, 350);
    history.replaceState(null, "", assetPath(id === "top" ? "/" : `/#${id}`));
  }

  return (
    // 블럭 없는 순수 텍스트 내비 — 넓은 화면에선 중앙 정렬로 한 줄,
    // 좁은 화면에선 가로 스크롤 스트립(스크롤바 숨김 + 양끝 페이드로 잘림을 암시).
    // justify-center 는 넘칠 때 앞쪽 항목이 스크롤로도 닿지 않게 되므로
    // 안쪽 w-max + mx-auto 로 "들어가면 중앙, 넘치면 스크롤" 을 만든다.
    <div
      ref={scrollerRef}
      className="relative -mx-4 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="mx-auto flex w-max items-center gap-0.5 sm:gap-2">
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
              className={`relative shrink-0 px-1.5 py-1.5 text-xs transition-colors sm:px-2.5 sm:py-1 sm:text-sm ${
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
    </div>
  );
}

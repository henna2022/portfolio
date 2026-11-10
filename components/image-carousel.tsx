"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset";
import { ArrowIcon } from "./icons";
import { useI18n } from "./lang-provider";
import { pageZoom } from "@/lib/zoom";

// Horizontal, snap-scrolling gallery. Touch devices swipe natively;
// mouse users can drag or use the arrows. Dots show position for 2+ images.
export function ImageCarousel({
  images,
  alt,
  alts,
  aspect = "aspect-[4/3]",
  fit = "cover",
}: {
  images: string[];
  alt: string;
  // 이미지별 설명. 지정된 항목만 이 값을 쓰고, 나머지는 "제목 (n)" 으로 둔다.
  // 지표를 증명하는 대시보드 캡처처럼 그림 자체가 근거일 때 필요하다.
  alts?: Record<string, string>;
  aspect?: string;
  // "cover" = 프레임을 가득 채우고 넘치면 crop (사진용)
  // "contain" = 전체를 다 보여줌 (UI 스크린샷처럼 잘리면 안 되는 경우)
  fit?: "cover" | "contain";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const [idx, setIdx] = useState(0);
  const multiple = images.length > 1;
  const { t } = useI18n();
  // 끝에 닿아 화살표가 비활성화되면 포커스가 사라지지 않게 반대쪽 화살표로 옮긴다.
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const focusAfter = useRef<"prev" | "next" | null>(null);
  // 넘김이 끝나 idx 가 바뀐 뒤에야 반대쪽 화살표가 활성화되므로 그때 포커스를 옮긴다.
  useEffect(() => {
    const want = focusAfter.current;
    if (!want || idx !== (want === "prev" ? images.length - 1 : 0)) return;
    focusAfter.current = null;
    // 비활성화로 포커스를 잃었을 때만 옮긴다(그사이 Tab 으로 나갔으면 그대로 둔다).
    const active = document.activeElement as HTMLButtonElement | null;
    if (active && active !== document.body && !active.disabled) return;
    (want === "prev" ? prevRef : nextRef).current?.focus();
  }, [idx, images.length]);

  function onScroll() {
    const el = ref.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const left = i * el.clientWidth;
    const from = el.scrollLeft;
    el.scrollTo({ left, behavior: "smooth" });
    // behavior:"smooth" 는 rAF 로 보간된다. 탭이 스로틀되거나 기기가 바쁘면
    // 프레임이 오지 않아 스크롤이 아예 진행되지 않고 화살표가 먹통처럼 보인다.
    // 잠깐 뒤에도 안 움직였으면 즉시 이동으로 보정한다.
    window.setTimeout(() => {
      const now = ref.current;
      if (now && Math.abs(now.scrollLeft - from) < 4 && from !== left) {
        now.scrollTo({ left, behavior: "auto" });
        setIdx(i);
      }
    }, 320);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startLeft: ref.current.scrollLeft,
    };
    ref.current.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || !ref.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    // clientX 는 화면 값, scrollLeft 는 zoom 전 값이라 끄는 만큼 따라오게 나눠 준다
    ref.current.scrollLeft = drag.current.startLeft - dx / pageZoom();
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (drag.current.active && el) {
      // settle to the nearest slide
      goTo(Math.round(el.scrollLeft / el.clientWidth));
    }
    drag.current.active = false;
    ref.current?.releasePointerCapture?.(e.pointerId);
  }

  return (
    <div
      className={`group/carousel relative ${aspect} overflow-hidden rounded-2xl bg-sand-deep`}
    >
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        // pan-x 가 없으면 터치 기기에서 가로 스와이프가 통째로 막혀
        // 캐러셀이 넘어가지 않는다 (pan-y 는 세로 페이지 스크롤용)
        style={{ touchAction: "pan-x pan-y pinch-zoom" }}
        className={`no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto ${
          multiple ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={assetPath(src)}
            alt={alts?.[src] ?? `${alt} (${i + 1})`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`h-full w-full shrink-0 snap-center select-none ${
              fit === "contain"
                ? // UI 스크린샷 — 전체가 다 보여야 하므로 프레임 안에 맞춘다
                  "object-contain"
                : // 사진 — 좌우 레터박스 없이 가득 채운다.
                  // 인물이 대체로 상단에 오므로 중앙보다 살짝 위를 기준점으로.
                  "object-cover object-[center_35%]"
            }`}
          />
        ))}
      </div>

      {multiple ? (
        <>
          {/* prev / next — 모바일은 항상 표시(호버가 없으므로), 데스크톱은 호버 시 표시 */}
          <button
            type="button"
            ref={prevRef}
            aria-label={t.prevImage}
            onClick={() => { const n = Math.max(0, idx - 1); goTo(n); if (n === 0) focusAfter.current = "next"; }}
            className="absolute after:absolute after:-inset-1.5 after:content-[''] left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow transition-opacity disabled:!opacity-0 sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:focus-visible:opacity-100"
            disabled={idx === 0}
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            ref={nextRef}
            aria-label={t.nextImage}
            onClick={() => { const n = Math.min(images.length - 1, idx + 1); goTo(n); if (n === images.length - 1) focusAfter.current = "prev"; }}
            className="absolute after:absolute after:-inset-1.5 after:content-[''] right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow transition-opacity disabled:!opacity-0 sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:focus-visible:opacity-100"
            disabled={idx === images.length - 1}
          >
            <ArrowIcon className="h-4 w-4" />
          </button>

          {/* dots — 점 자체는 작게 두되 버튼은 24px 이상으로 키워 탭 영역을 확보한다
              (WCAG 2.5.8 최소 타겟 크기. 6px 점은 모바일에서 사실상 못 누른다) */}
          {/* 흰 화면 캡처 위에서도 보이게 어두운 바탕을 깔고 점은 흰색으로 둔다 */}
          <div className="absolute inset-x-0 bottom-1 flex items-center justify-center">
            <div className="flex rounded-full bg-black/40 px-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t.goToImage.replace("{n}", String(i + 1))}
                aria-current={i === idx ? "true" : undefined}
                onClick={() => goTo(i)}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-4 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              </button>
            ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

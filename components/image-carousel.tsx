"use client";

import { useRef, useState } from "react";
import { assetPath } from "@/lib/asset";
import { ArrowIcon } from "./icons";

// Horizontal, snap-scrolling gallery. Touch devices swipe natively;
// mouse users can drag or use the arrows. Dots show position for 2+ images.
export function ImageCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const [idx, setIdx] = useState(0);
  const multiple = images.length > 1;

  function onScroll() {
    const el = ref.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
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
    ref.current.scrollLeft = drag.current.startLeft - dx;
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
    <div className="group/carousel relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand-deep">
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ touchAction: "pan-y pinch-zoom" }}
        className={`no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto ${
          multiple ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={assetPath(src)}
            alt={`${alt} — ${i + 1}`}
            loading="lazy"
            draggable={false}
            className="h-full w-full shrink-0 snap-center select-none object-cover"
          />
        ))}
      </div>

      {multiple ? (
        <>
          {/* prev / next (desktop hover) */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(Math.max(0, idx - 1))}
            className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 shadow transition-opacity group-hover/carousel:opacity-100 disabled:opacity-0 sm:flex"
            disabled={idx === 0}
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(Math.min(images.length - 1, idx + 1))}
            className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 shadow transition-opacity group-hover/carousel:opacity-100 disabled:opacity-0 sm:flex"
            disabled={idx === images.length - 1}
          >
            <ArrowIcon className="h-4 w-4" />
          </button>

          {/* dots */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-4 bg-cream" : "w-1.5 bg-cream/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

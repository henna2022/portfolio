"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/asset";

// 아토 얼굴 칩 — ato.webp 를 얼굴 중심으로 크게 크롭하고 눈만 오버레이한다.
// 눈동자는 커서를 따라 굴러가고(rAF lerp), 깜빡임·호버 위글은 CSS 가 담당.
// (Statement 본문과 에러 페이지 마스코트가 공유)
export function AtoChip() {
  const chipRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const chip = chipRef.current;
    if (!chip) return;

    const eyes = Array.from(chip.querySelectorAll<HTMLElement>(".ato-eye"));
    const pupils = eyes.map((e) => e.querySelector<HTMLElement>(".ato-pupil"));
    if (!eyes.length) return;

    let px = 0;
    let py = 0;
    let hasPointer = false;
    let raf = 0;
    let onScreen = true;
    const cur = eyes.map(() => ({ x: 0, y: 0 }));

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      hasPointer = true;
    };
    const onLeave = () => {
      hasPointer = false;
    };

    const frame = () => {
      eyes.forEach((eye, i) => {
        const p = pupils[i];
        if (!p) return;
        let tx = 0;
        let ty = 0;
        if (hasPointer) {
          const r = eye.getBoundingClientRect();
          if (r.width > 0) {
            const dx = px - (r.left + r.width / 2);
            const dy = py - (r.top + r.height / 2);
            const d = Math.hypot(dx, dy) || 1;
            // 이동 반경을 눈 크기에 비례해 제한 — 동공이 흰자를 벗어나지 않게
            const k = Math.min(r.width * 0.24, d) / d;
            tx = dx * k;
            ty = dy * k;
          }
        }
        cur[i].x += (tx - cur[i].x) * 0.15;
        cur[i].y += (ty - cur[i].y) * 0.15;
        p.style.transform = `translate(-50%,-50%) translate(${cur[i].x.toFixed(2)}px,${cur[i].y.toFixed(2)}px)`;
      });
      raf = requestAnimationFrame(frame);
    };

    // 화면 밖일 때는 루프를 돌지 않는다
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowOn = entry.isIntersecting;
        if (nowOn && !onScreen) {
          addEventListener("pointermove", onMove, { passive: true });
          addEventListener("pointerleave", onLeave);
          raf = requestAnimationFrame(frame);
        } else if (!nowOn && onScreen) {
          cancelAnimationFrame(raf);
          removeEventListener("pointermove", onMove);
          removeEventListener("pointerleave", onLeave);
        }
        onScreen = nowOn;
      },
      { threshold: 0 },
    );
    io.observe(chip);

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <span ref={chipRef} className="ato-chip" aria-hidden>
      <span className="ato-crop">
        <img
          src={assetPath("/hero/ato.webp")}
          alt=""
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
        />
        <span className="ato-eye ato-eye-l">
          <span className="ato-pupil" />
          <span className="ato-lid" />
        </span>
        <span className="ato-eye ato-eye-r">
          <span className="ato-pupil" />
          <span className="ato-lid" />
        </span>
      </span>
    </span>
  );
}

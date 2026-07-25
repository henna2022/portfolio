"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { statement, type StatementToken } from "@/lib/data";
import { assetPath } from "@/lib/asset";

// 스크롤 진행도 10~85% 구간에 단어를 순서대로 매핑 (portfolio_v2 와 동일한 배분).
const FILL_START = 0.1;
const FILL_END = 0.85;

function Word({
  token,
  index,
  total,
  progress,
  still,
}: {
  token: Extract<StatementToken, { t: "w" }>;
  index: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const span = FILL_END - FILL_START;
  const start = FILL_START + (index / total) * span;
  const end = FILL_START + ((index + 1.2) / total) * span;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  // 필 단어는 점등과 무관하게 항상 반전 — 문장의 앵커 역할.
  // (회전이 필요해 inline-block, 나머지는 inline 이라 줄바꿈이 자연스럽다)
  if (token.pill) {
    return (
      <span className="inline-block -rotate-[1.5deg] rounded-full bg-ink px-[0.34em] pb-[0.08em] pt-[0.02em] leading-[1.15] text-cream">
        {token.w}
      </span>
    );
  }

  return (
    <motion.span
      style={still ? undefined : { opacity }}
      className={token.italic ? "font-serif-it" : undefined}
    >
      {token.w}
    </motion.span>
  );
}

// 아토 얼굴 칩 — ato.webp 를 얼굴 중심으로 크게 크롭하고 눈만 오버레이한다.
// 눈동자는 커서를 따라 굴러가고(rAF lerp), 깜빡임·호버 위글은 CSS 가 담당.
function AtoChip() {
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

    // 220vh 섹션이라 칩이 화면 밖일 때가 대부분 — 보일 때만 루프를 돈다
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

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = statement.filter(
    (tk): tk is Extract<StatementToken, { t: "w" }> => tk.t === "w",
  );
  const total = words.length;
  let wi = 0;

  return (
    <section
      ref={ref}
      id="statement"
      aria-label="Statement"
      // 220vh 트랙 위에서 문장이 sticky 로 머무는 동안 단어가 차오른다.
      // reduced-motion 에서는 트랙을 접고 전부 점등된 상태로 한 번에 보여준다.
      className={reduced ? "py-28" : "h-[220vh]"}
    >
      <div
        className={
          reduced
            ? "flex items-center justify-center px-6"
            : "sticky top-0 flex h-svh items-center justify-center px-6 sm:px-12"
        }
      >
        <p className="font-display max-w-[1000px] text-center text-[clamp(1.9rem,5.2vw,4.2rem)] font-bold leading-[1.32] tracking-[-0.02em] text-ink">
          {/* 토큰 사이에 실제 공백 문자를 넣어 복사·스크린리더 낭독이 정상 동작하게 한다 */}
          {statement.map((token, i) => (
            <span key={i}>
              {token.t === "chip" ? (
                <AtoChip />
              ) : (
                <Word
                  token={token}
                  index={wi++}
                  total={total}
                  progress={scrollYProgress}
                  still={!!reduced}
                />
              )}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

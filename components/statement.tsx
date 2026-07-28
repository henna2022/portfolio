"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { statement, type StatementToken } from "@/lib/data";
import { statementKo } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";
import { AtoChip } from "./ato-chip";

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

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { lang } = useI18n();
  const tokens = lang === "ko" ? statementKo : statement;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = tokens.filter(
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
          {tokens.map((token, i) => (
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

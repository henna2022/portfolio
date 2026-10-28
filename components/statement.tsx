"use client";

import { statement, type StatementToken } from "@/lib/data";
import { statementKo } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";

function Word({ token }: { token: Extract<StatementToken, { t: "w" }> }) {
  // 기존 강조 단어의 반전·기울기는 유지
  if (token.pill) {
    return (
      <span className="inline-block -rotate-[1.5deg] rounded-full bg-ink px-[0.34em] pb-[0.08em] pt-[0.02em] leading-[1.15] text-cream">
        {token.w}
      </span>
    );
  }

  return <span>{token.w}</span>;
}

export function Statement() {
  const { lang } = useI18n();
  const tokens = lang === "ko" ? statementKo : statement;

  return (
    <section
      id="statement"
      aria-label="Statement"
      className="py-16 sm:py-24"
    >
      <div className="flex items-center justify-center px-6 sm:px-12">
        <p className="font-display max-w-[1000px] text-center text-[clamp(1.9rem,5.2vw,4.2rem)] font-bold leading-[1.32] tracking-[-0.02em] text-ink">
          {/* 토큰 사이에 실제 공백 문자를 넣어 복사·스크린리더 낭독이 정상 동작하게 한다 */}
          {tokens.map((token, i) => (
            <span key={i}>
              <Word token={token} />{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

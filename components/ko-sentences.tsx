"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  lang: "ko" | "en";
  text: string;
  children?: (sentence: string) => ReactNode;
};

// 마침표 뒤에 빈칸이 오는 곳마다 나눈다(「개발·운영.」 같은 개조식 끝도 포함, 2026.11 같은 숫자는 그대로).
// Keep whitespace and reopen emphasis if a sentence boundary falls inside it.
function splitSentences(text: string) {
  let bold = false;
  const sentences = text.match(/[\s\S]*?\.(?:\*\*)?\s+|[\s\S]+$/g) ?? [text];
  return sentences.map((sentence) => {
    const prefix = bold ? "**" : "";
    if ((sentence.match(/\*\*/g)?.length ?? 0) % 2) bold = !bold;
    return `${prefix}${sentence}${bold ? "**" : ""}`;
  });
}

export function KoSentences({ lang, text, children }: Props) {
  // English keeps the original text and renderer without extra DOM or measuring.
  if (lang !== "ko") return <>{children ? children(text) : text}</>;
  return <MeasuredSentences key={text} text={text} render={children} />;
}

function MeasuredSentences({ text, render }: { text: string; render?: Props["children"] }) {
  const probe = useRef<HTMLSpanElement>(null);
  const [multiline, setMultiline] = useState(false);
  // 측정용 사본은 마운트 뒤에만 그려 정적 HTML에 같은 문단이 두 번 실리지 않게 한다.
  const [mounted, setMounted] = useState(false);
  const sentences = splitSentences(text);

  useLayoutEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    const node = probe.current;
    if (!node) return;
    const measure = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(node).lineHeight);
      if (node.clientWidth > 0 && lineHeight > 0) {
        setMultiline(Math.round(node.getBoundingClientRect().height / lineHeight) >= 2);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <span className={`ko-sentences${multiline ? " ko-sentences-multiline" : ""}`}>
      {sentences.map((sentence, index) => (
        <span className="ko-sentence" key={index}>{render ? render(sentence) : sentence}</span>
      ))}
      {/* The inline probe stays independent of the visible sentence layout. */}
      {mounted ? (
        <span ref={probe} className="ko-sentences-probe" aria-hidden="true">
          {sentences.map((sentence, index) => (
            <span key={index}>{render ? render(sentence) : sentence}</span>
          ))}
        </span>
      ) : null}
    </span>
  );
}

"use client";

import { status, type StatusKind } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";

export function Dot({ kind }: { kind: StatusKind }) {
  return <i className={`dot dot--${kind}`} aria-hidden="true" />;
}

// 라벨 첫 줄: 상태 점 + 상태 문구
export function StatusLine({
  slug,
  className = "label__status",
  id,
}: {
  slug: string;
  className?: string;
  id?: string;
}) {
  const { lang } = useI18n();
  const s = status[slug];
  if (!s) return null;
  return (
    <p className={className} id={id}>
      <Dot kind={s.kind} />
      <span>{lang === "ko" ? s.ko : s.en}</span>
    </p>
  );
}

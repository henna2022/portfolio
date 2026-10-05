"use client";

// 본문 렌더러.
// - data.ts 의 **강조** 표기만 굵게 그린다 (마크다운 전체가 아님).
// - 한국어에서 두 줄 넘는 문단은 문장마다 새 줄에서 시작하게 한다
//   (한글 조판 규칙: 문장이 줄 중간에서 시작하지 않게). DOM 을 직접 고치지 않고
//   React 가 문장 단위 span 을 그리므로 언어 전환에도 안전하다.
import { Fragment } from "react";
import { useI18n, type Lang } from "./lang-provider";
import type { ProseSegment } from "@/lib/data";

type Piece = { text: string; b?: boolean };

// 어절 안에서 줄이 끊기지 않게 단어 결합자(U+2060)를 넣는다.
// - "15-student", "Auto-Recovery": 붙임표 뒤
// - "배포·운영": 가운뎃점 양쪽 (lang=ko 에서 크롬은 · 앞뒤를 끊을 수 있는 자리로 본다)
// - ")를", "35%로": 닫는 괄호·% 와 조사 사이
// - "활동(2024년": 단어에 붙은 여는 괄호 앞
const WJ = "\u2060";
export const nbHyphen = (t: string) =>
  t
    .replace(/(?<=[A-Za-z0-9])-(?=[A-Za-z])/g, "-" + WJ)
    .replace(/(?<=\S)·(?=\S)/g, WJ + "·" + WJ)
    .replace(/([)\]%])(?=[가-힣])/g, "$1" + WJ)
    .replace(/(?<=[^\s(])\((?=\S)/g, WJ + "(");

// 문장 끝: "다." "요." (공백이 없어도 끊는다. data-ko 에 공백 누락 문장이 있다),
// 명사형 종결("…플랫폼. ")은 뒤에 공백이 올 때만 ("Next.js", "2026.03" 은 그대로),
// ? ! 는 뒤에 공백이나 끝이 올 때만 ('나도 복원가!'처럼 따옴표 안 제목에서 끊지 않게)
const KO_END = /(다\.|요\.|[가-힣)]\.(?=\s)|[?!](?=\s|$))(\s*)/g;

function toPieces(text: string): Piece[] {
  const pieces: Piece[] = nbHyphen(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? { text: part.slice(2, -2), b: true }
        : { text: part },
    );
  // 굵은 구간 경계에서도 ")이", "%로" 가 끊기지 않게
  for (let i = 0; i < pieces.length - 1; i++) {
    if (/[)\]%]$/.test(pieces[i].text) && /^[가-힣]/.test(pieces[i + 1].text)) pieces[i].text += WJ;
  }
  return pieces;
}

function splitSentences(input: Piece[]): Piece[][] {
  // 굵은 조각이 "…다"로 끝나고 마침표가 다음 조각 첫 글자면, 마침표를 앞 조각으로 옮겨 문장 끝을 잡는다
  const pieces = input.map((p) => ({ ...p }));
  for (let i = 0; i < pieces.length - 1; i++) {
    if (/[다요]$/.test(pieces[i].text) && /^[.?!]/.test(pieces[i + 1].text)) {
      pieces[i].text += pieces[i + 1].text[0];
      pieces[i + 1].text = pieces[i + 1].text.slice(1);
    }
  }
  const sentences: Piece[][] = [];
  let cur: Piece[] = [];
  for (const p of pieces) {
    let last = 0;
    KO_END.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = KO_END.exec(p.text))) {
      const end = m.index + m[1].length;
      const chunk = p.text.slice(last, end);
      if (chunk) cur.push({ text: chunk, b: p.b });
      // 굵은 구간 안에서 문장이 끝나도 닫는 ** 뒤에서 끊긴 것처럼 처리
      sentences.push(cur);
      cur = [];
      last = end + m[2].length;
    }
    const rest = p.text.slice(last);
    if (rest) cur.push({ text: rest, b: p.b });
  }
  if (cur.some((c) => c.text.trim())) sentences.push(cur);
  return sentences.filter((s) => s.some((c) => c.text.trim()));
}

function renderPieces(pieces: Piece[]) {
  return pieces.map((p, i) =>
    p.b ? <strong key={i}>{p.text}</strong> : <Fragment key={i}>{p.text}</Fragment>,
  );
}

function Para({ pieces, lang }: { pieces: Piece[]; lang: Lang }) {
  if (lang !== "ko") return <p>{renderPieces(pieces)}</p>;
  const sents = splitSentences(pieces);
  if (sents.length < 2) return <p>{renderPieces(pieces)}</p>;
  return (
    <p>
      {sents.map((s, i) => (
        <span key={i} className="sent">
          {renderPieces(s)}
        </span>
      ))}
    </p>
  );
}

// "\n\n" 으로 나뉜 여러 문단 문자열
export function RichText({ text }: { text: string }) {
  const { lang } = useI18n();
  return (
    <>
      {text
        .split(/\n\n+/)
        .filter((t) => t.trim())
        .map((para, i) => (
          <Para key={`${lang}-${i}`} pieces={toPieces(para)} lang={lang} />
        ))}
    </>
  );
}

// 한 줄짜리. 문장 분리는 하지 않는다.
export function Inline({ text }: { text: string }) {
  return <>{renderPieces(toPieces(text))}</>;
}

// 블록 하나(p·li·dd 등). 한국어에서 문장이 둘 이상이면 문장마다 새 줄로.
type KoTag = "p" | "li" | "dd" | "span";
export function KoText({ text, as = "p", className }: { text: string; as?: KoTag; className?: string }) {
  const { lang } = useI18n();
  const Tag = as;
  const pieces = toPieces(text);
  const sents = lang === "ko" ? splitSentences(pieces) : [];
  if (sents.length < 2) return <Tag className={className}>{renderPieces(pieces)}</Tag>;
  return (
    <Tag className={className}>
      {sents.map((s, i) => (
        <span key={i} className="sent">
          {renderPieces(s)}
        </span>
      ))}
    </Tag>
  );
}

// about.prose 처럼 조각 배열로 된 문단
export function SegmentParas({ paras }: { paras: ProseSegment[][] }) {
  const { lang } = useI18n();
  return (
    <>
      {paras.map((segs, i) => (
        <Para key={`${lang}-${i}`} pieces={segs.map((s) => ({ text: s.text, b: s.b }))} lang={lang} />
      ))}
    </>
  );
}

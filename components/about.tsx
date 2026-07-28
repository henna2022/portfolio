"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { about, person, type ProseParagraph } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { ui } from "@/lib/i18n";
import { DownloadIcon } from "./icons";
import { ease, fadeUp, viewportOnce } from "@/lib/motion";

// 산문 문단 — `b: true` 조각만 굵게. 훑어봐도 핵심 문장이 먼저 잡히도록.
function Prose({ paragraph }: { paragraph: ProseParagraph }) {
  return (
    <p className="max-w-[640px] text-[15px] leading-[1.95] tracking-[-0.01em] text-muted">
      {paragraph.map((seg, i) =>
        seg.b ? (
          <strong key={i} className="font-semibold text-ink">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </p>
  );
}

// 손으로 그린 듯한 화살표 — '더 보기' 토글에서 펼침/접힘을 표시
function CurlyArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M5 8c2.2 4.6 4.6 7.4 7 7.6 2.4.2 4.9-2.4 7-7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15.4 14.3l3.6 1.3.8-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function About() {
  const [open, setOpen] = useState(false);
  const t = ui;

  // '더 보기' 패널은 프레이머 모션을 쓰지 않는다 — 부모가 variants 를 쓰고 있어서
  // 자식 motion 컴포넌트의 animate 가 variant 전파에 덮인다. 대신 내용 높이를
  // 직접 재서 CSS 트랜지션으로 펼친다(폰트 로드·리사이즈는 ResizeObserver 로 추적).
  const moreRef = useRef<HTMLDivElement>(null);
  const [moreHeight, setMoreHeight] = useState(0);

  useEffect(() => {
    const el = moreRef.current;
    if (!el) return;
    const measure = () => setMoreHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ResizeObserver 가 아직 한 번도 안 돌았으면 높이가 0 이라 눌러도 아무 일이
  // 없는 것처럼 보인다. 토글하는 순간 다시 재서 그 경우를 막는다.
  function toggle() {
    setOpen((v) => {
      if (!v) {
        const h = moreRef.current?.scrollHeight ?? 0;
        if (h > 0 && h !== moreHeight) setMoreHeight(h);
      }
      return !v;
    });
  }

  return (
    <section id="about" className="mx-auto max-w-shell px-6 py-20">
      <h2 className="sr-only">{t.nav.about}</h2>

      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.25fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
        {/* ── 좌: 초상 카드 (데스크톱에서는 스크롤을 따라 붙어 있음) ── */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto w-full max-w-[440px] rounded-4xl border border-ink/10 bg-sand/40 p-6 text-center sm:p-8 lg:sticky lg:top-28 lg:mx-0 lg:max-w-none"
        >
          <div className="relative mx-auto mb-6 w-full max-w-[300px]">
            <img
              src={assetPath(about.photo)}
              alt={person.name}
              // STATEMENT(220vh) 뒤라 확실히 폴드 아래 — 첫 화면 대역폭과 경쟁하지 않게 지연 로드
              loading="lazy"
              decoding="async"
              className="relative aspect-[1/1.05] w-full rounded-[28px] object-cover object-[center_28%] ring-1 ring-ink/10"
            />
          </div>

          <h3 className="font-display text-[26px] font-bold text-ink">
            {person.name}
          </h3>

          <p className="mx-auto mb-5 mt-3 max-w-[340px] text-[13.5px] leading-[1.75] tracking-[-0.01em] text-muted">
            {about.tagline}
          </p>

          <ul className="mx-auto mb-6 flex max-w-[340px] flex-col gap-2 text-left">
            {about.info.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12.5px] leading-[1.6] text-muted"
              >
                <span aria-hidden className="shrink-0">
                  {item.icon}
                </span>
                <span className="flex flex-col gap-[3px]">
                  {item.title ? (
                    <b className="font-bold text-ink/80">{item.title}</b>
                  ) : null}
                  {item.lines.map((line) => (
                    <span key={line} className="text-muted">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

        </motion.aside>

        {/* ── 우: 인용문 + 산문 + 더 보기 ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {t.nav.about}
          </p>

          <h3 className="font-display mb-9 mt-4 text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-[1.45] tracking-[-0.015em] text-ink">
            {about.quote.map((part, i) =>
              part.em ? (
                // 액센트 컬러 + 뒤에 깔리는 형광펜 하이라이트
                <span
                  key={i}
                  className="relative whitespace-nowrap text-lime before:absolute before:inset-x-[-1px] before:bottom-[0.02em] before:-z-10 before:h-[0.34em] before:rounded-sm before:bg-lime/20 before:content-['']"
                >
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h3>

          <div className="space-y-4">
            {about.prose.map((p, i) => (
              <Prose key={i} paragraph={p} />
            ))}

            {/* 항상 마운트해 두고 높이만 전환 — aria-controls 가 늘 유효하다 */}
            <div
              id="aboutMore"
              className="overflow-hidden transition-[height,opacity] duration-500 ease-out motion-reduce:transition-none"
              style={{ height: open ? moreHeight : 0, opacity: open ? 1 : 0 }}
              aria-hidden={!open}
            >
              <div ref={moreRef} className="space-y-4 pt-4">
                {about.proseMore.map((p, i) => (
                  <Prose key={i} paragraph={p} />
                ))}
                {/* 카드에서 내려온 부차적 이력·자격 */}
                <dl className="grid max-w-[640px] gap-x-10 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-2">
                  {about.facts.map((f) => (
                    <div key={f.k}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {f.k}
                      </dt>
                      <dd className="mt-1.5 whitespace-pre-line text-[13px] leading-[1.7] text-ink/70">
                        {f.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* 더 보기는 왼쪽, 다운로드는 오른쪽 하단 */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <motion.button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="aboutMore"
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-[18px] py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-lime hover:text-lime"
            >
              {open ? t.seeLess : t.seeMore}
              <CurlyArrow
                className={`h-[18px] w-[18px] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {/* 국문(KO) 다운로드 링크는 한국어 페이지를 만들 때 그쪽에 넣는다 —
                data.ts 의 resumeKo/cvKo 경로와 PDF 파일은 그대로 유지 중 */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={assetPath(person.resume)}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[13px] font-semibold text-lime-ink transition-transform hover:-translate-y-0.5"
              >
                <DownloadIcon /> {t.resume}
              </a>
              <a
                href={assetPath(person.cv)}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-lime/50 px-5 py-2.5 text-[13px] font-semibold text-lime transition-colors hover:bg-lime/10"
              >
                <DownloadIcon /> {t.cv}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

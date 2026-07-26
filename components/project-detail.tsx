"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { ui } from "@/lib/i18n";
import { ArrowIcon } from "./icons";
import { ImageCarousel } from "./image-carousel";
import { ease } from "@/lib/motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

type NavLink = { slug: string; title: string };

export function ProjectDetail({
  project: p,
  prev,
  next,
}: {
  project: Project;
  prev: NavLink;
  next: NavLink;
}) {
  const t = ui;

  // 갤러리를 나눠 흩어놓지 않고 슬라이드 하나로 모아 한눈에 넘겨보게 한다.
  // (이전에는 gallery[0] 만 히어로, 나머지는 아래쪽 2단 그리드로 분리돼 있었다)
  const shots = p.gallery?.length ? p.gallery : p.image ? [p.image] : [];

  return (
    <article className="mx-auto max-w-shell px-6 pb-8 pt-28">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
        {t.allWork}
      </Link>

      {/* Header */}
      <motion.header
        variants={reveal}
        initial="hidden"
        animate="show"
        className="mt-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {p.category}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {p.title}
        </h1>
        <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
          {p.overview.split("\n\n").map((para) => (
            <p key={para}>
              <Rich text={para} />
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6">
          <Meta k={t.year} v={p.year} />
          <Meta k={t.role} v={p.role} />
          <Meta k={t.focus} v={p.kicker} />
          <div className="flex gap-3 sm:ml-auto">
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
              >
                {t.live} <ArrowIcon className="h-3.5 w-3.5 text-lime" />
              </a>
            ) : null}
            {p.repo ? (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sand/60 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand"
              >
                {t.github}
              </a>
            ) : null}
          </div>
        </div>
      </motion.header>

      {/* Hero visual — 이미지가 없으면 자리만 차지하는 대체 블록을 두지 않고
          아래 Highlights 가 바로 올라오게 한다 */}
      {shots.length > 0 ? (
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-8"
        >
          {/* contain 은 프레임에 레터박스(빈 여백)를 남긴다. 상세 히어로는
              여백 없이 꽉 차게 보여주는 쪽이 나아서 항상 cover 로 채운다.
              (이미지들이 1.33~1.7 비율이라 3/2 프레임 기준 잘림은 최대 12% 정도) */}
          <ImageCarousel images={shots} alt={p.title} aspect="aspect-[3/2]" />
        </motion.div>
      ) : null}

      <div className="mt-12 grid gap-12 sm:grid-cols-[1.4fr_1fr]">
        {/* Highlights */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          <h2 className="font-display text-2xl font-semibold">
            {t.highlights}
          </h2>
          <ul className="mt-5 space-y-3.5">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                <span>
                  <Rich text={h} />
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Tech + architecture */}
        <motion.aside
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {t.stack}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sand/60 px-3 py-1.5 text-xs text-ink/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Architecture — full flow diagram if available, else text flow */}
      {p.flowImage ? (
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12"
        >
          <h2 className="font-display text-2xl font-semibold">
            {t.architecture}
          </h2>
          <p className="mt-1 text-sm text-muted">{t.architectureSub}</p>
          <div className="mx-auto mt-6 max-w-[620px] overflow-hidden rounded-3xl bg-sand/40">
            <img
              src={assetPath(p.flowImage.light)}
              alt={`${p.title} architecture flow`}
              loading="lazy"
              decoding="async"
              className="block w-full dark:hidden"
            />
            <img
              src={assetPath(p.flowImage.dark)}
              alt={`${p.title} architecture flow`}
              loading="lazy"
              decoding="async"
              className="hidden w-full dark:block"
            />
          </div>
        </motion.section>
      ) : p.flow && p.flow.length > 0 ? (
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 rounded-4xl bg-ink p-8 text-cream sm:p-10"
        >
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
            {t.architecture}
          </h3>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {p.flow.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-2xl bg-cream/10 px-4 py-3 text-sm font-medium text-cream">
                  {step}
                </span>
                {i < p.flow!.length - 1 ? (
                  <ArrowIcon className="h-4 w-4 text-lime" />
                ) : null}
              </div>
            ))}
          </div>
        </motion.section>
      ) : null}

      {/* Prev / Next */}
      <nav className="mt-16 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
        <Link
          href={`/work/${prev.slug}`}
          className="group rounded-4xl bg-sand/60 p-6 transition-colors hover:bg-sand"
        >
          <span className="text-xs text-muted">{t.previous}</span>
          <p className="font-display mt-1 text-xl font-semibold">
            {prev.title}
          </p>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group rounded-4xl bg-sand/60 p-6 text-right transition-colors hover:bg-sand"
        >
          <span className="text-xs text-muted">{t.next}</span>
          <p className="font-display mt-1 text-xl font-semibold">
            {next.title}
          </p>
        </Link>
      </nav>

      {/* 수집 고지 — 프로젝트 페이지에는 푸터가 없어 여기에 한 줄로 둔다 */}
      <p className="mt-10 text-[11px] text-muted/70">
        {t.privacyNotice}{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 transition-colors hover:text-ink"
        >
          {t.privacyLink}
        </Link>
      </p>
    </article>
  );
}

// data.ts 의 **강조** 표기만 굵게 렌더한다. 마크다운 전체를 지원하는 게 아니라
// 딱 이 표기 하나뿐 — 훑어봐도 핵심 수치·성과가 먼저 눈에 들어오게 하는 용도.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {k}
      </p>
      <p className="mt-1 text-sm text-ink/80">{v}</p>
    </div>
  );
}

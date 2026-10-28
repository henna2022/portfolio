"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { koProjectTitle, localizeProject } from "@/lib/data-ko";
import { ArrowIcon } from "./icons";
import { ImageCarousel } from "./image-carousel";
import { ease } from "@/lib/motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

type NavLink = { slug: string; title: string };

export function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: NavLink;
  next: NavLink;
}) {
  const { t, lang } = useI18n();
  const p = localizeProject(project, lang);

  // 갤러리를 나눠 흩어놓지 않고 슬라이드 하나로 모아 한눈에 넘겨보게 한다.
  // (이전에는 gallery[0] 만 히어로, 나머지는 아래쪽 2단 그리드로 분리돼 있었다)
  const shots = p.gallery?.length ? p.gallery : p.image ? [p.image] : [];

  return (
    <article className="mx-auto max-w-shell px-6 pb-8 pt-28">
      <Link
        href="/#work"
        // -my/py 상쇄: 보이는 위치는 그대로 두고 모바일 터치 타깃만 44px 로 확보
        className="-my-3 inline-flex items-center gap-2 py-3 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
        {t.allWork}
      </Link>

      {/* Header */}
      <motion.header
        variants={reveal}
        initial={false}
        animate="show"
        className="mt-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {p.category}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {p.title}
        </h1>
        <div className={shots.length > 0 ? "mt-4 flex flex-col lg:grid lg:grid-cols-[1.15fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-8" : "mt-4"}>
          <div className={`space-y-4 text-lg leading-relaxed text-muted ${shots.length > 0 ? "min-w-0 lg:row-span-2" : "max-w-prose"}`}>
            {p.overview.split("\n\n").map((para) => (
              <p key={para}>
                <Rich text={para} />
              </p>
            ))}
          </div>

          {shots.length > 0 ? (
            <div className="order-last mt-8 min-w-0 lg:order-none lg:col-start-2 lg:row-start-1 lg:mt-0">
              <ImageCarousel
                images={shots}
                alt={p.title}
                alts={p.galleryAlts}
                aspect="aspect-[3/2]"
              />
            </div>
          ) : null}

          <div className={`mt-6 flex flex-wrap content-start items-start gap-x-8 gap-y-3 pt-6 ${shots.length > 0 ? "lg:col-start-2 lg:row-start-2 lg:mt-0" : ""}`}>
            <Meta k={t.year} v={p.year} />
            <Meta k={t.role} v={p.role} />
            <Meta k={t.focus} v={p.kicker} />
            <div className="flex flex-wrap gap-3">
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink/90"
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
        </div>
      </motion.header>

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
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {p.flow.map((step, i) => (
              <div key={step} className="flex min-w-0 flex-col items-center gap-3 sm:flex-1 sm:flex-row">
                <span className="w-full min-w-0 whitespace-normal break-words rounded-2xl bg-cream/10 px-4 py-3 text-center text-sm font-medium text-cream sm:w-auto sm:flex-1 sm:text-left">
                  {step}
                </span>
                {i < p.flow!.length - 1 ? (
                  <ArrowIcon className="h-4 w-4 shrink-0 rotate-90 text-lime sm:rotate-0" />
                ) : null}
              </div>
            ))}
          </div>
        </motion.section>
      ) : null}

      {/* Prev / Next */}
      <nav className="mt-16 grid gap-4 pt-8 sm:grid-cols-2">
        <Link
          href={`/work/${prev.slug}`}
          className="group rounded-4xl bg-sand/60 p-6 transition-colors hover:bg-sand"
        >
          <span className="text-xs text-muted">{t.previous}</span>
          <p className="font-display mt-1 text-xl font-semibold">
            {lang === "ko" ? koProjectTitle(prev.slug) ?? prev.title : prev.title}
          </p>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group rounded-4xl bg-sand/60 p-6 text-right transition-colors hover:bg-sand"
        >
          <span className="text-xs text-muted">{t.next}</span>
          <p className="font-display mt-1 text-xl font-semibold">
            {lang === "ko" ? koProjectTitle(next.slug) ?? next.title : next.title}
          </p>
        </Link>
      </nav>

      {/* 수집 고지 — 프로젝트 페이지에는 푸터가 없어 여기에 한 줄로 둔다 */}
      <p className="mt-10 text-[11px] text-muted/70">
        {t.privacyNotice}{" "}
        <Link
          href="/privacy"
          // 각주급 링크지만 모바일에서 눌리기는 해야 한다 — 시각 변화 없이 터치 타깃만 확장
          className="-my-2.5 inline-block py-2.5 underline underline-offset-4 transition-colors hover:text-ink"
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

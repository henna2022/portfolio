"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { localizeProject } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { type UiStrings } from "@/lib/i18n";
import { useI18n } from "./lang-provider";
import { DownloadIcon } from "./icons";
import { ease } from "@/lib/motion";

// 표시 순서만 정해두고, 실제로 해당하는 major 프로젝트가 없는 칩은 렌더에서 뺀다.
// (프로젝트를 side 로 내리거나 카테고리를 바꾸면 여기가 조용히 빈 칩으로 남는다 —
//  눌러도 아무것도 안 나오는 필터가 생기지 않도록 데이터에서 자동으로 맞춘다)
const FILTER_ORDER = ["All", "AI", "Web", "IoT", "Ops", "Education"];

function initials(title: string) {
  return title
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function firstSentence(text: string) {
  const m = text.match(/^[^]*?[.!?](?=\s|$)/);
  return m ? m[0] : text;
}

// Major-project card: media flips between screenshot and architecture diagram
// (desktop: crossfade on hover; touch: overlay chip toggle).
function MajorCard({
  p,
  t,
}: {
  p: Project;
  t: UiStrings;
}) {
  const [showFlow, setShowFlow] = useState(false);
  // When a project has no screenshot but has an architecture diagram, the
  // diagram becomes the card cover itself — so no hover crossfade for it.
  const flowAsCover = !p.image && !!p.flowImage;
  const flow = flowAsCover ? undefined : p.flowImage;

  return (
    <Link
      href={`/work/${p.slug}`}
      className="group flex h-full cursor-pointer flex-col rounded-4xl bg-sand/70 p-5 text-ink transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Media: project image ↔ architecture diagram
          flow 다이어그램이 커버일 땐 다이어그램 비율에 맞춰 여백 없이 꽉 채움 */}
      <div
        className={`relative mb-5 overflow-hidden rounded-2xl bg-sand-deep ${
          flowAsCover ? "aspect-[68/55]" : "aspect-[16/10]"
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showFlow ? "opacity-0" : "opacity-100"
          } ${flow ? "group-hover:opacity-0" : ""}`}
        >
          {p.image ? (
            <img
              src={assetPath(p.image)}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : flowAsCover && p.flowImage ? (
            <>
              <img
                src={assetPath(p.flowImage.light)}
                alt={`${p.title} architecture`}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover dark:hidden"
              />
              <img
                src={assetPath(p.flowImage.dark)}
                alt={`${p.title} architecture`}
                loading="lazy"
                decoding="async"
                className="hidden h-full w-full object-cover dark:block"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand-deep to-sand">
              <span className="font-display text-5xl font-semibold text-ink/15">
                {initials(p.title)}
              </span>
            </div>
          )}
        </div>

        {flow ? (
          <div
            className={`absolute inset-0 bg-cream transition-opacity duration-500 ${
              showFlow ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
          >
            <img
              src={assetPath(flow.light)}
              alt={`${p.title} architecture`}
              loading="lazy"
              decoding="async"
              className="block h-full w-full object-contain p-3 dark:hidden"
            />
            <img
              src={assetPath(flow.dark)}
              alt={`${p.title} architecture`}
              loading="lazy"
              decoding="async"
              className="hidden h-full w-full object-contain p-3 dark:block"
            />
          </div>
        ) : null}

        {/* Touch/mobile flip toggle */}
        {flow ? (
          <button
            type="button"
            aria-pressed={showFlow}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowFlow((v) => !v);
            }}
            className={`absolute bottom-2 right-2 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur transition-colors sm:hidden ${
              showFlow ? "bg-ink text-cream" : "bg-cream/85 text-ink"
            }`}
          >
            {t.architecture}
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2">
        <span className="text-xs font-medium text-muted">{p.n}</span>

        <h3 className="font-display mt-1 text-2xl font-semibold">
          {p.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{p.kicker}</p>
        {/* 요약은 카드에서 가장 많이 읽히는 부분이라 본문급으로 키운다 */}
        <p className="mt-3.5 text-[15px] leading-[1.75] tracking-[-0.005em] text-ink/75 sm:text-base sm:leading-[1.75]">
          {p.desc}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sand-deep px-2.5 py-1 text-[11px] text-ink/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Always-visible CTA */}
        <div className="mt-auto pt-5">
          <span className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-transform duration-300 group-hover:scale-[1.05]">
            {t.viewProject}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Compact, clearly-secondary card for side & toy projects.
function SideCard({ p, t }: { p: Project; t: UiStrings }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group flex h-full cursor-pointer flex-col rounded-3xl bg-sand/40 p-5 text-ink transition-colors duration-300 hover:bg-sand/80"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[11px] font-medium text-muted">{p.n}</span>
        <h4 className="font-display text-lg font-semibold leading-snug">
          {p.title}
        </h4>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">
        {firstSentence(p.desc)}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sand-deep/70 px-2 py-0.5 text-[10px] text-ink/55"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* 상세 페이지로 가는 명시적 CTA (메이저 카드와 동일 패턴) */}
      <div className="mt-auto pt-4">
        <span className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-transform duration-300 group-hover:scale-[1.05]">
          {t.viewProject}
        </span>
      </div>
    </Link>
  );
}

export function SelectedWork() {
  const [filter, setFilter] = useState("All");
  const { t, lang } = useI18n();

  const localized = projects.map((p) => localizeProject(p, lang));
  const majors = localized.filter((p) => p.tier === "major");
  const sides = localized.filter((p) => p.tier === "side");
  const visibleMajors =
    filter === "All"
      ? majors
      : majors.filter((p) => p.categories.includes(filter));
  const FILTERS = FILTER_ORDER.filter(
    (f) => f === "All" || majors.some((p) => p.categories.includes(f)),
  );

  return (
    <section id="work" className="mx-auto max-w-shell px-6 py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-4xl sm:whitespace-nowrap"
        >
          {t.workHeading}
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          download
          href={assetPath("/files/Juwon_Lee_Architecture_Deck.pdf")}
          className="inline-flex items-center gap-2 rounded-full bg-sand/60 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          {t.deckButton}
        </motion.a>
      </div>

      {/* Category filter — majors only */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ink text-cream"
                  : "bg-sand/60 text-ink/70 hover:bg-sand"
              }`}
            >
              {f === "All" ? t.filterAll : f}
            </button>
          );
        })}
      </div>

      {/* Major projects */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        {visibleMajors.map((p) => (
          <motion.div
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <MajorCard p={p} t={t} />
          </motion.div>
        ))}
      </motion.div>

      {/* Side & toy projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="mb-6 mt-14"
      >
        <h3 className="font-display text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
          {t.sideProjectsHeading}
        </h3>
        <p className="mt-1 text-sm text-muted">{t.sideProjectsSub}</p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sides.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease }}
          >
            <SideCard p={p}  t={t} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

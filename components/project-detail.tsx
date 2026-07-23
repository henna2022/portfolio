"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/data";
import { projectsKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ArrowIcon } from "./icons";
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
  const { locale } = useLocale();
  const t = dict[locale];
  const koP = locale === "ko" ? projectsKo[p.slug] : undefined;

  const hero = p.gallery?.[0] ?? p.image;
  const heroContain = p.imageFit === "contain";
  const restGallery = (p.gallery ?? []).slice(1);

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
          {koP?.category ?? p.category}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {p.title}
        </h1>
        <p className="mt-4 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-muted">
          {koP?.overview ?? p.overview}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6">
          <Meta k={t.year} v={p.year} />
          <Meta k={t.role} v={koP?.role ?? p.role} />
          <Meta k={t.focus} v={koP?.kicker ?? p.kicker} />
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
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand"
              >
                {t.github}
              </a>
            ) : null}
          </div>
        </div>
      </motion.header>

      {/* Hero visual */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="mt-8 overflow-hidden rounded-4xl bg-sand-deep"
      >
        {hero ? (
          <img
            src={assetPath(hero)}
            alt={p.title}
            className={
              heroContain
                ? "mx-auto max-h-[520px] w-full object-contain p-8"
                : "max-h-[520px] w-full object-cover"
            }
          />
        ) : (
          <div className="flex aspect-[16/7] w-full items-center justify-center bg-gradient-to-br from-sand-deep to-sand">
            <span className="font-display text-6xl font-semibold text-ink/15">
              {p.title.replace(/[^A-Za-z ]/g, "").trim().split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </span>
          </div>
        )}
      </motion.div>

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
            {(koP?.highlights ?? p.highlights).map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                {h}
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
                  className="rounded-full border border-ink/12 bg-sand/60 px-3 py-1.5 text-xs text-ink/75"
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
          <div className="mx-auto mt-6 max-w-[620px] overflow-hidden rounded-3xl border border-ink/10">
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
                <span className="rounded-2xl border border-cream/15 bg-cream/10 px-4 py-3 text-sm font-medium text-cream">
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

      {/* Gallery */}
      {restGallery.length > 0 ? (
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {restGallery.map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-4xl bg-sand-deep"
            >
              <img
                src={assetPath(src)}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </div>
          ))}
        </motion.section>
      ) : null}

      {/* Prev / Next */}
      <nav className="mt-16 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
        <Link
          href={`/work/${prev.slug}`}
          className="group rounded-4xl bg-sand/60 p-6 transition-colors hover:bg-sand"
        >
          <span className="text-xs text-muted">{t.previous}</span>
          <p className="font-display mt-1 text-xl font-semibold">{prev.title}</p>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group rounded-4xl bg-sand/60 p-6 text-right transition-colors hover:bg-sand"
        >
          <span className="text-xs text-muted">{t.next}</span>
          <p className="font-display mt-1 text-xl font-semibold">{next.title}</p>
        </Link>
      </nav>
    </article>
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

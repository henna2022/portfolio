"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { projectsKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ArrowIcon } from "./icons";
import { ease } from "@/lib/motion";

const FILTERS = ["All", "AI", "Web", "Robotics", "IoT", "Education"];

function initials(title: string) {
  return title
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function CardMedia({ p }: { p: Project }) {
  const contain = p.imageFit === "contain";
  return (
    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-sand-deep">
      {p.image ? (
        <img
          src={assetPath(p.image)}
          alt={p.title}
          loading="lazy"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${
            contain ? "object-contain p-8" : "object-cover"
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand-deep to-sand">
          <span className="font-display text-5xl font-semibold text-ink/15">
            {initials(p.title)}
          </span>
        </div>
      )}
    </div>
  );
}

export function SelectedWork() {
  const [filter, setFilter] = useState("All");
  const { locale } = useLocale();
  const t = dict[locale];
  const ko = locale === "ko";
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="work" className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-6 text-2xl font-semibold tracking-[-0.02em] sm:text-4xl sm:whitespace-nowrap"
      >
        {t.workHeading}
      </motion.h2>

      {/* Category filter */}
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
                  : "border border-ink/15 text-ink/70 hover:bg-sand"
              }`}
            >
              {f === "All" ? t.filterAll : f}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2">
          {visible.map((p) => {
            const koP = ko ? projectsKo[p.slug] : undefined;
            return (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full cursor-pointer flex-col rounded-4xl bg-sand/70 p-5 text-ink transition-transform duration-300 hover:-translate-y-1.5"
              >
                <CardMedia p={p} />

                <div className="flex flex-1 flex-col px-2 pb-2">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-muted">
                      {p.n}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover:text-ink">
                      {t.view}
                      <ArrowIcon className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
                    </span>
                  </div>

                  <h3 className="font-display mt-1 text-2xl font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {koP?.kicker ?? p.kicker}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {koP?.desc ?? p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-sand-deep px-2.5 py-1 text-[11px] text-ink/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
      </motion.div>
    </section>
  );
}

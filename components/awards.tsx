"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { awards } from "@/lib/data";
import { awardsKo } from "@/lib/data-ko";
import { ImageCarousel } from "./image-carousel";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ease } from "@/lib/motion";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Awards() {
  const { locale } = useLocale();
  const t = dict[locale];
  const ko = locale === "ko";
  return (
    <section id="awards" className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-10 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        {t.awardsHeading}
      </motion.h2>

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {awards.map((a) => {
          const koA = ko ? awardsKo[a.title] : undefined;
          const hasPhotos = a.photos.length > 0;
          return (
          <motion.div
            key={a.title}
            variants={card}
            className={`flex flex-col rounded-4xl bg-sand/70 p-4 sm:p-5 ${
              hasPhotos ? "" : "sm:self-start"
            }`}
          >
            {hasPhotos ? (
              <ImageCarousel
                images={a.photos}
                alt={koA?.title ?? a.title}
                aspect="aspect-[16/10] sm:aspect-[4/3]"
              />
            ) : null}

            <div className="flex flex-1 flex-col px-2 pb-2">
              <div
                className={`flex items-start justify-between gap-3 ${
                  hasPhotos ? "mt-5" : "mt-2"
                }`}
              >
                <span className="text-xs font-medium text-muted">{a.year}</span>
                <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-lime-ink">
                  {koA?.result ?? a.result}
                </span>
              </div>

              <h3 className="font-display mt-2 text-xl font-semibold leading-snug">
                {koA?.title ?? a.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{koA?.role ?? a.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {koA?.topic ?? a.topic}
              </p>

              {a.relatedSlug || a.news ? (
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {a.relatedSlug ? (
                    <Link
                      href={`/work/${a.relatedSlug}`}
                      className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-transform duration-300 hover:scale-[1.05]"
                    >
                      {t.viewProject}
                    </Link>
                  ) : null}
                  {a.news ? (
                    <a
                      href={a.news}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-sand/60 px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:bg-sand"
                    >
                      {t.newsArticle}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

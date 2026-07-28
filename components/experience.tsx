"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { experienceKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { ease } from "@/lib/motion";
import { ArrowIcon } from "./icons";

export function Experience() {
  const { t, lang } = useI18n();
  const items = lang === "ko" ? experienceKo : experience;
  return (
    <section id="experience" className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-10 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        {t.experienceHeading}
      </motion.h2>

      <div className="space-y-3">
        {items.map((e, i) => {
          return (
          <motion.div
            key={e.org}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="rounded-4xl bg-sand/60 p-7"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_1.6fr]">
              <div>
                {/* 기관 홈페이지 — "실제로 운영 중인 곳"이라는 주장을 바로 확인시켜 준다 */}
                {"site" in e && e.site ? (
                  <a
                    href={e.site}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display group inline-flex items-start gap-1.5 text-xl font-semibold transition-colors hover:text-lime-ink"
                  >
                    {e.org}
                    <ArrowIcon className="mt-1.5 h-3.5 w-3.5 shrink-0 -rotate-45 text-muted transition-colors group-hover:text-lime-ink" />
                  </a>
                ) : (
                  <p className="font-display text-xl font-semibold">{e.org}</p>
                )}
                <p className="mt-1 text-sm text-muted">{e.role}</p>
                <p className="mt-2 text-xs text-muted">{e.period}</p>
              </div>
              <ul className="space-y-2">
                {e.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink/75"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {"gallery" in e && e.gallery ? (
              <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-3 sm:overflow-visible">
                {[0, 1, 2].map((idx) => {
                  const src = (e.gallery as string[])[idx];
                  return src ? (
                    <div
                      key={idx}
                      className="aspect-[3/4] w-40 shrink-0 snap-start overflow-hidden rounded-2xl bg-sand-deep sm:w-auto"
                    >
                      <img
                        src={assetPath(src)}
                        alt={`${e.org} on site`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="flex aspect-[3/4] w-40 shrink-0 snap-start items-center justify-center rounded-2xl bg-sand/60 text-xs text-muted sm:w-auto"
                    >
                      {t.comingSoon}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}

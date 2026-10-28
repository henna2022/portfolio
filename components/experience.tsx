"use client";

import { experience } from "@/lib/data";
import { experienceKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { ArrowIcon } from "./icons";

export function Experience() {
  const { t, lang } = useI18n();
  const items = lang === "ko" ? experienceKo : experience;
  return (
    <section id="experience" className="mx-auto max-w-shell px-6 py-16">
      <h2
        className="font-display mb-10 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        {t.experienceHeading}
      </h2>

      <div className="space-y-3">
        {items.map((e, i) => {
          return (
          <div
            // 언어와 무관한 key (awards.tsx 와 같은 이유)
            key={i}
            className="rounded-4xl bg-sand/60 p-7"
          >
            <div className="space-y-5">
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
              <div>
                <ul className="gap-x-8 lg:columns-2">
                  {e.points.map((pt) => (
                    <li
                      key={pt}
                      className="mb-3 break-inside-avoid flex max-w-[75ch] gap-2.5 text-sm leading-relaxed text-ink/75"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {/* 행사 보도 링크. 수상 섹션의 기사 버튼과 같은 모양 */}
                {"press" in e && e.press ? (
                  <a
                    href={e.press.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center rounded-full bg-sand/60 px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:bg-sand"
                  >
                    {e.press.label} ↗
                  </a>
                ) : null}
              </div>
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
          </div>
          );
        })}
      </div>
    </section>
  );
}

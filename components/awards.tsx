"use client";

import Link from "next/link";
import { awards } from "@/lib/data";
import { awardsKo } from "@/lib/data-ko";
import { ImageCarousel } from "./image-carousel";
import { useI18n } from "./lang-provider";

export function Awards() {
  const { t, lang } = useI18n();
  // 최신순 고정. 사진 있는 카드를 위로 올리면 그리드 높이는 고르게 맞지만
  // 가장 최근 수상이 아래로 밀린다 — 훑는 사람은 위 몇 개만 보므로 최신성이 먼저다.
  const ordered = [...(lang === "ko" ? awardsKo : awards)].sort(
    (a, b) => Number(b.year) - Number(a.year),
  );
  return (
    <section id="awards" className="mx-auto max-w-shell px-6 py-16">
      <h2
        className="font-display mb-10 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        {t.awardsHeading}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {ordered.map((a, i) => {
          const hasPhotos = a.photos.length > 0;
          const wide = ordered.length % 2 === 1 && i === ordered.length - 1;
          return (
          // 같은 행의 카드는 항상 같은 높이 (self-start 를 두면 본문 길이만큼 제각각이 된다)
          <div
            // 언어와 무관한 key. 제목으로 두면 KO 전환 때 카드가 새로 마운트돼 lazy 사진이 바로 내려받아진다.
            key={i}
            className={`flex flex-col rounded-4xl bg-sand/70 p-4 sm:p-5 ${wide ? "sm:col-span-2" : ""} ${wide && hasPhotos ? "sm:grid sm:grid-cols-2 sm:items-start sm:gap-6" : ""}`}
          >
            {hasPhotos ? (
              <ImageCarousel
                images={a.photos}
                alt={a.title}
                aspect="aspect-[16/10] sm:aspect-[4/3]"
              />
            ) : null}

            <div className={`flex min-w-0 flex-1 flex-col px-2 pb-2 ${wide && !hasPhotos ? "sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8" : ""}`}>
              <div
                className={`flex items-start justify-between gap-3 ${wide && !hasPhotos ? "sm:col-span-2" : ""} ${
                  hasPhotos ? `mt-5 ${wide ? "sm:mt-2" : ""}` : "mt-2"
                }`}
              >
                <span className="text-xs font-medium text-muted">{a.year}</span>
                <span className="rounded-full bg-blue-accessible dark:bg-lime px-2.5 py-1 text-[11px] font-semibold text-lime-ink">
                  {a.result}
                </span>
              </div>

              <h3 className="font-display mt-2 text-xl font-semibold leading-snug sm:col-start-1">
                {a.title}
              </h3>
              <p className="mt-1 text-xs text-muted sm:col-start-1">{a.role}</p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/70 sm:col-start-1">
                {a.topic}
              </p>

              {a.relatedSlug || a.news ? (
                <div className={`mt-auto flex flex-wrap gap-2 pt-5 ${wide && !hasPhotos ? "sm:col-start-2 sm:row-start-2 sm:row-span-3 sm:items-end sm:justify-end" : ""}`}>
                  {a.relatedSlug ? (
                    <Link
                      href={`/work/${a.relatedSlug}`}
                      className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-colors"
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
          </div>
          );
        })}
      </div>
    </section>
  );
}

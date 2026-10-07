"use client";

// 작품 상세 = 전시물 한 점의 방. 위치 표시(층 / 작품), 큰 제목과 벽 라벨,
// 큰 액자와 사진 띠, 도슨트 노트(본문), 핵심 사실, 연결 구조, 같은 층의 이전·다음 작품.
import { useState } from "react";
import Link from "next/link";
import { getProject, type Project } from "@/lib/data";
import { localizeProject } from "@/lib/data-ko";
import { img as pic } from "@/lib/img";
import { floorById, floorOf, floorPlan, siteStrings, bi, displaySrc, isTight, factGroups, withWhom, approved } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { RoomSign } from "./floor-sign";
import { Dot } from "./status";
import { status } from "@/lib/exhibit";
import { RichText, KoText, nbHyphen } from "./rich";
import { Pipeline, FlowDiagram } from "./services";
import { useLightbox } from "./lightbox";
import { altFor } from "./alt";
import { ArrowLeft, ArrowRight, ArrowUpRight, floorPicto, PersonPicto } from "./pictos";
import { GithubIcon } from "./icons";
import { InfoDesk } from "./info-desk";

export function ObjectPage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const p: Project = localizeProject(getProject(slug)!, lang);
  const fid = floorOf(slug);
  const floor = floorById(fid);
  const FloorIcon = floorPicto[fid];
  const st = status[slug];

  // 같은 층 안에서 이전·다음 (끝에서는 다음 층으로 이어진다)
  const order = [...floorPlan["4F"], ...floorPlan["3F"], ...floorPlan["2F"]];
  const idx = order.indexOf(slug);
  const prev = localizeProject(getProject(order[(idx - 1 + order.length) % order.length])!, lang);
  const next = localizeProject(getProject(order[(idx + 1) % order.length])!, lang);

  const images = Array.from(new Set([...(p.gallery ?? []), ...(p.image ? [p.image] : [])])).filter(
    (g) => !g.includes("/logo/"),
  );
  const first = p.image && images.includes(p.image) ? images.indexOf(p.image) : 0;
  const [cur, setCur] = useState(first);
  const lb = useLightbox();
  const shots = images.map((src) => ({ src, alt: altFor(p, src, lang) }));
  const curSrc = images[cur];

  return (
    <>
      <main id="main" className="object">
        <div className="shell">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs mono">
              <li>
                <Link href="/">{s.directory}</Link>
              </li>
              <li>
                <Link href={`/#${floor.anchor}`}>
                  {fid} {bi(lang, floor.name)}
                </Link>
              </li>
              <li aria-current="page" className="sr-only">
                {p.title}
              </li>
            </ol>
          </nav>

          <header className="object__head grid12">
            <div className="object__titles">
              <h1 className="object__title">{nbHyphen(p.title)}</h1>
              <KoText className="object__kicker" text={p.desc} />
            </div>
            <div className="object__card">
              <dl className="walllabel">
                {st ? (
                  <div>
                    <dt className="mono">{s.statusLabel}</dt>
                    <dd className="status">
                      <Dot kind={st.kind} />
                      {bi(lang, st)}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="mono">{s.year}</dt>
                  <dd>{p.year}</dd>
                </div>
                <div>
                  <dt className="mono">{s.category}</dt>
                  <dd>{nbHyphen(p.category)}</dd>
                </div>
                <div>
                  <dt className="mono">{s.context}</dt>
                  <dd>{nbHyphen(p.kicker)}</dd>
                </div>
                <div>
                  <dt className="mono">{s.credit}</dt>
                  <dd>{nbHyphen(p.role)}</dd>
                </div>
                {withWhom[slug] ? (
                  <div>
                    <dt className="mono">{s.withWhom}</dt>
                    <dd>{bi(lang, withWhom[slug])}</dd>
                  </div>
                ) : null}
                {approved.has(slug) ? (
                  <div>
                    <dt className="mono">{s.approval}</dt>
                    <dd>{s.approvedBy}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="mono">{s.medium}</dt>
                  <dd>{p.tags.join(", ")}</dd>
                </div>
              </dl>
              {p.href || p.repo ? (
                <div className="object__links">
                  {p.href ? (
                    <a className="btn btn--solid" href={p.href} target="_blank" rel="noreferrer">
                      {s.live}
                      <ArrowUpRight />
                    </a>
                  ) : null}
                  {p.repo ? (
                    <a className="btn btn--line" href={p.repo} target="_blank" rel="noreferrer">
                      <GithubIcon className="h-[15px] w-[15px]" />
                      {s.github}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </header>

          {images.length ? (
            <section className="object__hero" aria-label={s.moreInRoom}>
              <button
                type="button"
                className={isTight(curSrc) ? "frame frame--tight" : "frame"}
                style={{ display: "block", width: "100%", padding: undefined, cursor: "zoom-in" }}
                onClick={() => lb.open(shots, cur)}
                aria-label={`${altFor(p, curSrc, lang)} (${lang === "ko" ? "크게 보기" : "open larger"})`}
              >
                <div className="frame__window">
                  <img key={curSrc} {...pic(displaySrc(curSrc), "(max-width: 1360px) 100vw, 1264px")} alt={altFor(p, curSrc, lang)} decoding="async" />
                </div>
              </button>
              {p.galleryAlts?.[curSrc] && lang === "en" ? (
                <p className="object__caption">{p.galleryAlts[curSrc]}</p>
              ) : null}
              {images.length > 1 ? (
                <ul className="object__strip">
                  {images.map((src, i) => (
                    <li key={src}>
                      <button
                        type="button"
                        aria-pressed={i === cur}
                        aria-label={altFor(p, src, lang)}
                        onClick={() => setCur(i)}
                      >
                        <img {...pic(displaySrc(src), "132px")} alt="" loading="lazy" decoding="async" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : p.flowImage ? (
            // 화면 캡처가 없는 작품은 구조도를 큰 액자 자리에 건다
            <section className="object__hero" aria-label={s.howItConnects}>
              <FlowDiagram p={p} />
            </section>
          ) : null}

          <div className="object__body grid12">
            <div className="object__side">
              <RoomSign title={s.docentNote} other={lang === "ko" ? "Docent's note" : "도슨트 노트"} icon={<PersonPicto />} as="h2" />
            </div>
            <div className="object__text">
              <div className="prose">
                <RichText text={p.overview} />
              </div>
            </div>

            <div className="object__side">
              <RoomSign title={s.keyFacts} other={lang === "ko" ? "Key facts" : "핵심 사실"} icon={<FloorIcon />} as="h2" />
            </div>
            <div className="object__text">
              {/* 묶음이 있는 작품은 문제 · 접근 · 한계처럼 나눠 읽히게 (문장은 그대로) */}
              {(factGroups[slug] ?? [{ h: null, idx: p.highlights.map((_, i) => i) }]).map((g, gi) => (
                <div key={gi} className="facts-group">
                  {g.h ? <h3 className="facts-group__h mono">{bi(lang, g.h)}</h3> : null}
                  <ul className="facts-list">
                    {g.idx.map((i) => (
                      <KoText key={i} as="li" text={p.highlights[i]} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {p.flow?.length || (p.flowImage && images.length) ? (
              <>
                <div className="object__side">
                  <RoomSign
                    title={s.howItConnects}
                    other={lang === "ko" ? "How it connects" : "연결 구조"}
                    icon={<ArrowRight />}
                    as="h2"
                  />
                </div>
                <div className="object__text">
                  {p.flowImage && images.length ? (
                    <FlowDiagram p={p} />
                  ) : (
                    <div className="object__flow">
                      <Pipeline steps={p.flow ?? []} />
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>

          <nav className="object__nav" aria-label={lang === "ko" ? "다른 작품" : "More works"}>
            <Link href={`/work/${prev.slug}`}>
              <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ArrowLeft className="h-3 w-3" />
                {s.prevObject} · {floorOf(prev.slug)}
              </span>
              <b>{nbHyphen(prev.title)}</b>
            </Link>
            <Link href={`/work/${next.slug}`}>
              <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {s.nextObject} · {floorOf(next.slug)}
                <ArrowRight className="h-3 w-3" />
              </span>
              <b>{nbHyphen(next.title)}</b>
            </Link>
          </nav>
        </div>
      </main>
      <InfoDesk compact />
      {lb.node}
    </>
  );
}

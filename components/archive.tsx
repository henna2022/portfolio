"use client";

// 1F 경력·수상. 방 다섯 개, 채용 담당자가 먼저 찾는 순서로:
// 경력 → 검증 방법 → 수상 → 기술 → 교육·멘토링.
import { useState } from "react";
import Link from "next/link";
import { experience, activities, awards, skillGroups, getProject, type Award } from "@/lib/data";
import { experienceKo, activitiesKo, awardsKo, skillGroupsKo, koProjectTitle, localizeProject } from "@/lib/data-ko";
import { img as pic } from "@/lib/img";
import { siteStrings, methods, featuredActivities, skillOrder, bi } from "@/lib/exhibit";
import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { FloorSign, RoomSign } from "./floor-sign";
import { useLightbox, type Shot } from "./lightbox";
import { KoText } from "./rich";
import {
  ArchivePicto,
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  AwardPicto,
  TeachPicto,
  ToolsPicto,
  GearPicto,
} from "./pictos";

export function Archive() {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const ko = lang === "ko";
  const exp = ko ? experienceKo : experience;
  const acts = ko ? activitiesKo : activities;
  const aws = ko ? awardsKo : awards;
  const skills = [...(ko ? skillGroupsKo : skillGroups)].sort(
    (a, b) => skillOrder.indexOf(a.key) - skillOrder.indexOf(b.key),
  );
  const lb = useLightbox();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  const shots = (photos: string[], title: string): Shot[] =>
    photos.map((src, i) => ({
      src,
      alt: ko ? `${title} 사진 ${i + 1}` : `${title}, photo ${i + 1}`,
    }));

  const projTitle = (slug: string) => {
    const p = getProject(slug)!;
    return ko ? koProjectTitle(slug) ?? p.title : p.title;
  };

  // 닥터그린의 출발점이 된 2024년 수상 세 건은 한 묶음으로
  const grouped = aws.filter((a) => a.relatedSlug === "doctor-green");
  const single = aws.filter((a) => a.relatedSlug !== "doctor-green");
  const shownActs = featuredActivities.map((i) => acts[i]).filter(Boolean);
  const moreActs = acts.filter((_, i) => !featuredActivities.includes(i));

  const AwardPhotos = ({ a }: { a: Award }) =>
    a.photos.length ? (
      <div className="award__photos">
        {a.photos.map((ph, i) => (
          <button
            key={ph}
            type="button"
            onClick={() => lb.open(shots(a.photos, a.title), i)}
            aria-label={ko ? `${a.title} 사진 ${i + 1} 크게 보기` : `Open ${a.title} photo ${i + 1}`}
          >
            <img {...pic(ph, "140px")} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    ) : null;

  const Activity = ({ a, i }: { a: (typeof acts)[number]; i: number }) => (
    <li className="reveal" style={{ ["--delay" as string]: `${(i % 3) * 70}ms` }}>
      {a.photos.length ? (
        <button
          type="button"
          className="learn__photo"
          data-fit={a.photoFit ?? "cover"}
          onClick={() => lb.open(shots(a.photos, a.title), 0)}
          aria-label={ko ? `${a.title} 사진 크게 보기` : `Open photos of ${a.title}`}
        >
          <img
            {...pic(a.photos[0], "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 30vw")}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>
      ) : (
        <div className="learn__photo learn__photo--none" aria-hidden="true">
          <TeachPicto />
          <span>{a.title}</span>
        </div>
      )}
      <p className="learn__period mono">{a.period}</p>
      <h4 className="learn__title">{a.title}</h4>
      <p className="learn__role">{a.role}</p>
      <KoText className="learn__desc" text={a.desc} />
    </li>
  );

  return (
    <section id="archive" data-floor="1F" aria-labelledby="floor-1F">
      <div className="shell">
        <FloorSign id="1F" />

        {/* 경력: 지금 일하는 곳은 항목을 모두 펼쳐 둔다 */}
        <div id="experience" className="archive-room">
          <RoomSign title={s.chronology} other="" icon={<ArchivePicto />} />
          <ol className="chron">
            {exp.map((e, ei) => {
              const press = (e as { press?: { label: string; href: string } }).press;
              const gallery = (e as { gallery?: string[] }).gallery ?? [];
              const keep = ei === 0 ? e.points.length : 3;
              const key = `exp-${ei}`;
              return (
                <li key={e.org} className="chron__item grid12 reveal">
                  <p className="chron__period mono" style={{ margin: 0 }}>
                    {e.period}
                  </p>
                  <div className="chron__main">
                    <h4 className="chron__org">
                      <a href={e.site} target="_blank" rel="noreferrer">
                        {e.org}
                      </a>
                    </h4>
                    <p className="chron__role">{e.role}</p>
                    <ul className="chron__points">
                      {e.points.slice(0, keep).map((pt) => (
                        <KoText key={pt} as="li" text={pt} />
                      ))}
                    </ul>
                    {e.points.length > keep ? (
                      <>
                        <ul className="chron__points" id={`chron-more-${ei}`} hidden={!open[key]}>
                          {e.points.slice(keep).map((pt) => (
                            <KoText key={pt} as="li" text={pt} />
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="more-btn chron__more"
                          aria-expanded={!!open[key]}
                          aria-controls={`chron-more-${ei}`}
                          onClick={() => toggle(key)}
                        >
                          {open[key] ? s.readLess : `${s.readMore} (${e.points.length - keep})`}
                          <ArrowDown />
                        </button>
                      </>
                    ) : null}
                    {press ? (
                      <a className="textlink chron__press" href={press.href} target="_blank" rel="noreferrer">
                        {press.label}
                        <ArrowUpRight />
                      </a>
                    ) : null}
                  </div>
                  {gallery.length ? (
                    <div className="chron__media">
                      {gallery.map((g, i) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => lb.open(shots(gallery, e.org), i)}
                          aria-label={ko ? `${e.org} 사진 ${i + 1} 크게 보기` : `Open ${e.org} photo ${i + 1}`}
                        >
                          <img {...pic(g, "96px")} alt="" loading="lazy" decoding="async" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        {/* 검증 방법: 이미 쓴 문장을 방법별로 모은 색인 */}
        <div id="methods" className="archive-room">
          <RoomSign title={s.methods} other="" icon={<GearPicto />} />
          <KoText className="room-intro" text={s.methodsIntro} />
          <ul className="methods">
            {methods.map((m) => {
              const p = m.slug ? localizeProject(getProject(m.slug)!, lang) : null;
              // keys 가 있으면 본문에서 그 문장을 그대로 가져온다
              let quoted = "";
              if (p && m.keys) {
                const sents = p.overview
                  .replace(/\n+/g, " ")
                  .split(ko ? /(?<=다\.|요\.|다\*\*\.)\s*/ : /(?<=[.!?])\s+/);
                // 굵은 표시(**) 바로 뒤 마침표도 문장 끝으로 보고, 같은 문장은 한 번만
                quoted = Array.from(
                  new Set((ko ? m.keys.ko : m.keys.en).map((k) => sents.find((x) => x.includes(k))).filter(Boolean)),
                ).join(" ");
              }
              const text = quoted || (p ? p.highlights[m.idx] : exp[m.exp ?? 0]?.points[m.idx]);
              if (!text) return null;
              return (
                <li key={bi(lang, m.type)} className="methods__row reveal">
                  <span className="methods__type mono">{bi(lang, m.type)}</span>
                  <KoText className="methods__text" text={text} />
                  {p ? (
                    <Link className="methods__src" href={`/work/${p.slug}`}>
                      {projTitle(p.slug)}
                      <ArrowRight />
                    </Link>
                  ) : (
                    <a className="methods__src" href="#experience">
                      {exp[m.exp ?? 0].org}
                      <ArrowRight />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 수상 */}
        <div id="awards" className="archive-room">
          <RoomSign title={s.awards} other="" icon={<AwardPicto />} />
          <ol className="awards">
            {single.map((a) => (
              <li key={a.title} className="award grid12 reveal">
                <span className="award__year">{a.year}</span>
                <div className="award__main">
                  <span className="award__result mono">
                    <i aria-hidden="true" />
                    {a.result}
                  </span>
                  <h4 className="award__title">{a.title}</h4>
                  <KoText className="award__detail" text={a.detail} />
                  <KoText className="award__detail award__topic" text={a.topic} />
                  {a.news ? (
                    <a className="textlink" href={a.news} target="_blank" rel="noreferrer">
                      {s.coverage}
                      <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
                <AwardPhotos a={a} />
              </li>
            ))}
            {grouped.length ? (
              <li className="award grid12 reveal">
                <span className="award__year">{grouped[0].year}</span>
                <div className="award__main">
                  <h4 className="award__title">{s.awardGroup}</h4>
                  <ul className="award__group">
                    {grouped.map((a) => (
                      <li key={a.title}>
                        <span className="award__result mono">
                          <i aria-hidden="true" />
                          {a.result}
                        </span>
                        <span className="award__gtitle">{a.title}</span>
                      </li>
                    ))}
                  </ul>
                  <Link className="textlink" href="/work/doctor-green">
                    {s.related}: {projTitle("doctor-green")}
                    <ArrowRight />
                  </Link>
                </div>
                <AwardPhotos a={{ ...grouped[0], photos: grouped.flatMap((a) => a.photos) }} />
              </li>
            ) : null}
          </ol>
        </div>

        {/* 기술 */}
        <div id="skills" className="archive-room">
          <RoomSign title={s.materials} other="" icon={<ToolsPicto />} />
          <div className="materials">
            {skills.map((g) => (
              <div key={g.key} className="material reveal">
                <h4>{g.title}</h4>
                <p>{g.capability}</p>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 교육·멘토링: 세 건만 먼저, 나머지는 접어 둔다 */}
        <div id="activities" className="archive-room">
          <RoomSign title={s.learning} other="" icon={<TeachPicto />} />
          <ul className="learn">
            {shownActs.map((a, i) => (
              <Activity key={a.title + a.period} a={a} i={i} />
            ))}
          </ul>
          {/* 나머지는 한 줄씩만 (사진·설명은 경력기술서에) */}
          {moreActs.length ? (
            <div className="learn-more">
              <p className="learn-more__title mono">{s.otherTeaching}</p>
              <ul className="learn-more__list">
                {moreActs.map((a) => (
                  <li key={a.title + a.period}>
                    <span className="mono">{a.period}</span>
                    <span>
                      <b className="learn-more__name">{a.title}</b>
                      <span className="learn-more__role">{a.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a className="textlink" href={assetPath(ko ? person.cvKo : person.cv)} download>
                {s.cvForMore}
                <ArrowDown />
              </a>
            </div>
          ) : null}
        </div>
      </div>
      {lb.node}
    </section>
  );
}

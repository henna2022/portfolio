"use client";

// 들어가며. 전시 입구의 큐레이터 글처럼: 초상, 한 문단 요약, 인용, 본문.
import { useState } from "react";
import Link from "next/link";
import { about, person, experience, getProject } from "@/lib/data";
import { aboutKo, experienceKo, koProjectTitle } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { img as pic } from "@/lib/img";
import { siteStrings, proof, bi } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { RoomSign } from "./floor-sign";
import { KoText, SegmentParas } from "./rich";
import { ArchivePicto, ArrowDown, ArrowRight, DownloadPicto, PersonPicto } from "./pictos";

export function Introduction() {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const a = lang === "ko" ? aboutKo : about;
  const exp = lang === "ko" ? experienceKo : experience;
  const [more, setMore] = useState(false);

  const downloads = [
    { label: s.resumeEn, href: person.resume },
    { label: s.resumeKo, href: person.resumeKo },
    { label: s.cvEn, href: person.cv },
    { label: s.cvKo, href: person.cvKo },
  ];

  return (
    <section id="about" className="intro" aria-labelledby="intro-heading">
      {/* 운영·이용 기록: 숫자는 data.ts 본문 그대로, 칸마다 출처 이름을 달고 누르면 출처로 */}
      <div className="shell">
        <div className="proof">
          <RoomSign title={s.proofTitle} other="" icon={<ArchivePicto />} as="h2" />
          <ul className="proof__list">
            {proof.map((f) => {
              const src = f.src
                ? bi(lang, f.src)
                : lang === "ko"
                  ? koProjectTitle(f.slug!) ?? getProject(f.slug!)!.title
                  : getProject(f.slug!)!.title;
              return (
                <li key={f.v} className="reveal">
                  <Link href={f.href ?? `/work/${f.slug}`} className="proof__item">
                    <span className="proof__v">{lang === "ko" && f.vKo ? f.vKo : f.v}</span>
                    <span className="proof__l">{bi(lang, f)}</span>
                    <span className="proof__src mono">{src}</span>
                    <ArrowRight className="proof__go" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="shell grid12">
        <aside className="intro__aside">
          <RoomSign
            title={s.introduction}
            other={s.introductionOther}
            icon={<PersonPicto />}
            as="h2"
            id="intro-heading"
          />
          <figure className="frame portrait reveal" style={{ margin: 0 }}>
            <div className="frame__window">
              <img
                {...pic(a.photo, "(max-width: 900px) 140px, 30vw")}
                alt={lang === "ko" ? "이주원 프로필 사진" : "Portrait of Juwon Lee"}
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
          <div className="portrait-cap">
            <b>
              {lang === "ko" ? (
                <>
                  이주원 · <span lang="en">Juwon Lee</span>
                </>
              ) : (
                <>
                  Juwon Lee · <span lang="ko">이주원</span>
                </>
              )}
            </b>
          </div>
        </aside>

        <div className="intro__body">
          <KoText className="intro__lede reveal" text={a.tagline} />

          {/* 경력 요약 3줄: 전체는 1F 경력으로 */}
          <div className="career">
            <p className="career__title mono">{s.careerTitle}</p>
            <ol className="career__list">
              {exp.map((e) => (
                <li key={e.org}>
                  <span className="career__org">{e.org}</span>
                  <span className="career__role">{e.role}</span>
                  <span className="career__period mono">{e.period}</span>
                </li>
              ))}
            </ol>
            <a className="textlink" href="#experience">
              {s.fullExperience}
              <ArrowRight />
            </a>
          </div>

          <div className="downloads" role="group" aria-label={s.downloads}>
            {downloads.map((d) => (
              <a key={d.href} className="chip" href={assetPath(d.href)} download>
                <DownloadPicto />
                {d.label}
              </a>
            ))}
          </div>

          {/* 자기소개 본문은 접어 둔다 (대문과 리드에서 이미 한 번 말했으므로) */}
          <div className="prose">
            <div id="intro-more" hidden={!more}>
              <SegmentParas paras={a.prose} />
            </div>
            <button
              type="button"
              className="more-btn"
              aria-expanded={more}
              aria-controls="intro-more"
              onClick={() => setMore((v) => !v)}
            >
              {more ? s.readLess : s.readMore}
              <ArrowDown />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

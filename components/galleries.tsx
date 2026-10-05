"use client";

// 3F 갤러리.
// - 벽: 가로 화면 작품을 액자에 건다. 크기를 섞고(7·5 / 5·7 / 6·6) 작은 쪽을 조금 내려 걸어
//   시선이 지그재그로 흐르게 한다.
// - 진열장: 휴대폰·세로 키오스크 화면은 큰 가로 액자에 넣으면 빈 여백만 남는다. 기기 모양대로
//   잘라 유리 선반 위 물건처럼 한 줄로 놓는다.
import Link from "next/link";
import { getProject, type Project } from "@/lib/data";
import { localizeProject } from "@/lib/data-ko";
import { img as pic } from "@/lib/img";
import { galleryWall, galleryCase, siteStrings, statusLegend, bi, displaySrc, cardLine } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { FloorSign } from "./floor-sign";
import { Dot, StatusLine } from "./status";
import { ArrowRight } from "./pictos";
import { altFor } from "./alt";
import { Inline, nbHyphen } from "./rich";

// [span, 내려 걸기]. 7칸 액자는 지금 전시 중인 작품에 준다.
const HANG: Array<[number, string]> = [
  [7, "0"],
  [5, "clamp(48px, 9vh, 112px)"],
  [4, "0"],
  [4, "clamp(32px, 6vh, 72px)"],
  [4, "0"],
];

// 카드 근거 한 줄: 그 작품 highlights 중 하나 (exhibit.ts cardLine)
export function Evidence({ p }: { p: Project }) {
  const i = cardLine[p.slug];
  if (i === undefined || !p.highlights[i]) return null;
  return (
    <p className="label__evidence">
      <Inline text={p.highlights[i]} />
    </p>
  );
}

function Label({ p }: { p: Project }) {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  return (
    <div className="label">
      <h3 id={`work-${p.slug}`} className="label__title">
        {nbHyphen(p.title)}
      </h3>
      <StatusLine slug={p.slug} id={`work-st-${p.slug}`} />
      <p className="label__line">{p.category}</p>
      <Evidence p={p} />
      <span className="label__view">
        {s.viewObject}
        <ArrowRight />
      </span>
    </div>
  );
}

export function Galleries() {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const wall = galleryWall.map((slug) => localizeProject(getProject(slug)!, lang));
  const shelf = galleryCase.map((slug) => localizeProject(getProject(slug)!, lang));

  return (
    <section id="galleries" data-floor="3F" aria-labelledby="floor-3F">
      <div className="shell">
        <FloorSign id="3F">
          <span>{s.works(wall.length + shelf.length)}</span>
          {statusLegend.map((l) => (
            <span key={l.kind} className="legend">
              <Dot kind={l.kind} />
              {bi(lang, l)}
            </span>
          ))}
        </FloorSign>

        <div className="wall grid12">
          {wall.map((p, i) => {
            const [span, offset] = HANG[i % HANG.length];
            const img = p.image ?? p.gallery?.[0];
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="work reveal"
                aria-labelledby={`work-${p.slug}`}
                aria-describedby={`work-st-${p.slug}`}
                style={{ ["--span" as string]: span, ["--offset" as string]: offset }}
              >
                <figure className="frame" style={{ margin: 0 }}>
                  <div className="frame__window">
                    {img ? (
                      <img {...pic(displaySrc(img), "(max-width: 620px) 100vw, (max-width: 960px) 50vw, 46vw")} alt={altFor(p, img, lang)} loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                </figure>
                <Label p={p} />
              </Link>
            );
          })}
        </div>

        <div className="vitrine">
          <ul className="vitrine__shelf" style={{ ["--n" as string]: shelf.length }}>
            {shelf.map((p, i) => {
              const img = p.image ?? p.gallery?.[0];
              return (
                <li key={p.slug} className="reveal" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="vitrine__item"
                    aria-labelledby={`work-${p.slug}`}
                    aria-describedby={`work-st-${p.slug}`}
                  >
                    <div className="vitrine__stage">
                      {img ? (
                        <img
                          className="vitrine__obj"
                          {...pic(displaySrc(img), "(max-width: 760px) 60vw, 24vw")}
                          alt={altFor(p, img, lang)}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </div>
                    <Label p={p} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

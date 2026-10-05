"use client";

// 4F 기획전. 조명을 낮춘 어두운 층에 큰 작품 두 점. 작품마다 큰 액자, 라벨, 숫자 세 개.
import Link from "next/link";
import { getProject, type Project } from "@/lib/data";
import { localizeProject } from "@/lib/data-ko";
import { img as pic } from "@/lib/img";
import { floorPlan, figures, siteStrings, bi, displaySrc } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { FloorSign } from "./floor-sign";
import { StatusLine } from "./status";
import { ArrowRight, ArrowUpRight } from "./pictos";
import { GithubIcon } from "./icons";
import { altFor } from "./alt";
import { KoText, nbHyphen } from "./rich";

function Room({ p, flip }: { p: Project; flip: boolean }) {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const hero = p.image ?? p.gallery?.[0];
  // 로고 같은 비(非)화면 이미지는 액자에 걸지 않는다
  const thumbs = (p.gallery ?? []).filter((g) => g !== hero && !g.includes("/logo/")).slice(0, 4);
  const figs = figures[p.slug] ?? [];
  const href = `/work/${p.slug}`;

  return (
    <article className={`room grid12${flip ? " room--flip" : ""}`} aria-labelledby={`room-${p.slug}`}>
      <div className="room__media reveal">
        <Link href={href} aria-label={`${p.title}: ${s.enterRoom}`} tabIndex={-1}>
          <figure className="frame" style={{ margin: 0 }}>
            <div className="frame__window">
              {hero ? (
                <img {...pic(displaySrc(hero), "(max-width: 900px) 100vw, 56vw")} alt={altFor(p, hero, lang)} loading="lazy" decoding="async" />
              ) : null}
            </div>
          </figure>
        </Link>
        {thumbs.length ? (
          <div className="room__thumbs" aria-hidden="true">
            {thumbs.map((t) => (
              <Link key={t} href={href} tabIndex={-1}>
                <img {...pic(t, "160px")} alt="" loading="lazy" decoding="async" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      <div className="room__label label reveal" style={{ ["--delay" as string]: "120ms" }}>
        <h3 id={`room-${p.slug}`} className="label__title">
          <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
            {nbHyphen(p.title)}
          </Link>
        </h3>
        <StatusLine slug={p.slug} />
        <p className="room__kicker">
          {p.kicker} · {p.year}
        </p>
        <KoText className="room__desc" text={p.desc} />
        {figs.length ? (
          <>
          {p.slug === "doctor-green" ? <p className="figures__cap mono">{s.datasetCaption}</p> : null}
          <dl className="figures">
            {figs.map((f) => (
              <div key={f.v}>
                <dt>{lang === "ko" && f.vKo ? f.vKo : f.v}</dt>
                <dd>{bi(lang, f)}</dd>
              </div>
            ))}
          </dl>
          </>
        ) : null}
        <p className="label__medium">
          <span className="mono" style={{ marginRight: 8 }}>
            {s.medium}
          </span>
          {p.tags.join(", ")}
        </p>
        <div className="room__links">
          <Link className="btn btn--solid" href={href}>
            {s.enterRoom}
            <ArrowRight />
          </Link>
          {p.href ? (
            <a className="btn btn--line" href={p.href} target="_blank" rel="noreferrer">
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
      </div>
    </article>
  );
}

export function SpecialExhibition() {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const list = floorPlan["4F"].map((slug) => localizeProject(getProject(slug)!, lang));
  return (
    <section id="work" data-floor="4F" className="night" aria-labelledby="floor-4F">
      <div className="shell">
        <FloorSign id="4F" signal>
          <span>{s.works(list.length)}</span>
          <span>2024–2026</span>
        </FloorSign>
        {list.map((p, i) => (
          <Room key={p.slug} p={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

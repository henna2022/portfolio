"use client";

// 2F 운영 시스템. 소장품 목록(카탈로그)처럼 한 줄씩, 오른쪽 열람창에는 지금 가리킨
// 작품의 화면을 띄운다. 화면이 없는 작품(내부 전용)은 구조도나 연결 단계를 대신 보여 준다.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getProject, type Project } from "@/lib/data";
import { localizeProject } from "@/lib/data-ko";
import { img as pic } from "@/lib/img";
import { assetPath } from "@/lib/asset";
import { floorPlan, siteStrings, displaySrc, flowSrc } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { FloorSign } from "./floor-sign";
import { StatusLine } from "./status";
import { ArrowRight } from "./pictos";
import { nbHyphen } from "./rich";
import { Evidence } from "./galleries";

export function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="pipeline">
      {steps.map((st, i) => (
        <li key={st}>
          <span>{st}</span>
          {i < steps.length - 1 ? <ArrowRight /> : null}
        </li>
      ))}
    </ol>
  );
}

// 감사 끝난 구조도 SVG(새 팔레트 사본). 테마에 맞는 한 장만 보인다.
export function FlowDiagram({ p, className = "" }: { p: Project; className?: string }) {
  const { lang } = useI18n();
  if (!p.flowImage) return null;
  const alt = lang === "ko" ? `${p.title} 시스템 구조도` : `${p.title} system diagram`;
  return (
    <figure className={`frame flowfig ${className}`} style={{ margin: 0 }}>
      <img className="flowfig__light" src={assetPath(flowSrc(p.flowImage.light))} alt={alt} loading="lazy" decoding="async" />
      <img className="flowfig__dark" src={assetPath(flowSrc(p.flowImage.dark))} alt={alt} loading="lazy" decoding="async" />
    </figure>
  );
}

function Viewer({ p }: { p: Project }) {
  const img = p.image ?? p.gallery?.[0];
  return (
    <div className="viewer" aria-hidden="true">
      {img ? (
        <figure className="frame viewer__frame" style={{ margin: 0 }}>
          <div className="frame__window">
            <img key={img} {...pic(displaySrc(img), "(max-width: 900px) 1px, 30vw")} alt="" loading="lazy" decoding="async" />
          </div>
        </figure>
      ) : p.flowImage ? (
        <FlowDiagram key={p.slug} p={p} className="viewer__frame" />
      ) : p.flow ? (
        <div className="viewer__flow" key={p.slug}>
          <Pipeline steps={p.flow} />
        </div>
      ) : null}
      <div className="label">
        <p className="viewer__title">{nbHyphen(p.title)}</p>
        <StatusLine slug={p.slug} />
        <p className="label__line">{p.category}</p>
        <p className="label__medium">{p.tags.join(", ")}</p>
      </div>
    </div>
  );
}

export function Services() {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const list = floorPlan["2F"].map((slug) => localizeProject(getProject(slug)!, lang));
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const rows = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-row]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.row));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [list.length]);

  return (
    <section id="services" data-floor="2F" className="services" aria-labelledby="floor-2F">
      <div className="shell">
        <FloorSign id="2F">
          <span>{s.works(list.length)}</span>
        </FloorSign>
        <div className="catalog grid12">
          <ul className="catalog__list" ref={listRef}>
            {list.map((p, i) => {
              const img = p.image ?? p.gallery?.[0];
              return (
                <li key={p.slug} className="reveal" data-row={i} style={{ ["--delay" as string]: `${i * 40}ms` }}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="catalog__row"
                    aria-labelledby={`cat-${p.slug}`}
                    aria-describedby={`cat-st-${p.slug}`}
                    data-active={active === i}
                    data-thumb={!!img}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    {img ? (
                      <img className="catalog__thumb" {...pic(displaySrc(img), "88px")} alt="" loading="lazy" decoding="async" />
                    ) : null}
                    <div>
                      <h3 id={`cat-${p.slug}`} className="catalog__title">
                        {nbHyphen(p.title)}
                      </h3>
                      <StatusLine slug={p.slug} className="catalog__status" id={`cat-st-${p.slug}`} />
                      <Evidence p={p} />
                    </div>
                    <span className="catalog__year" aria-hidden="true">
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Viewer p={list[active]} />
        </div>
      </div>
    </section>
  );
}

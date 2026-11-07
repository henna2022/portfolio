"use client";

import Link from "next/link";
import { awards, awardProjects, type Award } from "@/lib/data";
import { awardsKo, awardProjectsKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";

// 원문에 적힌 기관 표현만 발췌한다.
function issuer(award: Award) {
  const inTitle = award.title.match(/[(（]([^()（）]+)[)）]/)?.[1];
  if (inTitle) return inTitle;
  const hosted = award.topic.match(/Hosted by .*$/)?.[0] ?? award.topic.match(/[^.]+주최[^.]*\./)?.[0];
  if (hosted) return hosted.trim();
  const inTopic = award.topic.match(/\(([^()]+)\)/)?.[1];
  if (inTopic) return inTopic;
  return award.topic.match(/Hankyong National University/)?.[0] ?? award.title.match(/^한경국립대/)?.[0] ?? "";
}

export function Awards() {
  const { t, lang } = useI18n();
  const items = lang === "ko" ? awardsKo : awards;
  const groups = lang === "ko" ? awardProjectsKo : awardProjects;
  return (
    <section id="awards" className="home-section home-shell" aria-labelledby="awards-title">
      <h2 id="awards-title" className="home-heading">{t.awardsHeading}</h2>
      {groups.map((group) => (
        <div key={group.id} className="award-group" role="group" aria-labelledby={`award-project-${group.id}`}>
          <div className="award-group-heading">
            <div>
              <h3 id={`award-project-${group.id}`} className="font-display award-project-title">{group.title}</h3>
              <p className="home-meta mt-2">{group.desc}</p>
            </div>
            {group.slug ? <Link href={`/work/${group.slug}`} className="home-link text-[15px]">{t.viewProject}</Link> : null}
          </div>
          <ul className="award-list">
            {items.filter((award) => award.project === group.id).sort((a, b) => Number(b.year) - Number(a.year)).map((award) => (
              <li key={award.title} className="award-row">
                <p className="home-meta">{award.year}</p>
                <div className="award-description">
                  <h4 className="text-lg font-semibold leading-snug">{award.title}</h4>
                  <p className="home-meta mt-2">{issuer(award)}</p>
                  <p className="mt-2">{award.result}</p>
                </div>
                {award.photos[0] ? <img src={assetPath(award.photos[0])} alt={award.title} loading="lazy" decoding="async" className="award-photo" /> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

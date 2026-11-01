"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { localizeProject } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";
import { firstSentence, projectLabel, WorkMedia } from "./work-media";

export function SelectedWork() {
  const { t, lang } = useI18n();
  return (
    <section id="work" className="home-section home-shell" aria-labelledby="work-title">
      <h2 id="work-title" className="home-heading">{t.selectedWorkHeading}</h2>
      <div className="selected-grid">
        {projects.filter((p) => p.tier === "major").map((project) => {
          const p = localizeProject(project, lang);
          return (
            <article key={p.slug} className="selected-card">
              <Link href={`/work/${p.slug}`} aria-label={`${t.view}: ${p.title}`} className="block rounded-xl">
                <WorkMedia project={p} />
              </Link>
              <div className="selected-card-copy">
                <h3 className="home-card-title"><Link href={`/work/${p.slug}`}>{p.title}</Link></h3>
                <p className="home-meta mt-2">{projectLabel(p)}</p>
                <p className="mt-4">{firstSentence(p.desc)}</p>
                <div className="selected-card-actions">
                  <Link href={`/work/${p.slug}`} className="home-link">{t.viewProject}</Link>
                  {p.href ? <a href={p.href} target="_blank" rel="noreferrer" className="home-link">{t.live} <span aria-hidden="true">↗</span></a> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

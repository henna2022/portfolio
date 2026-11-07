"use client";

import { experience, skillGroups } from "@/lib/data";
import { experienceKo, skillGroupsKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";

export function Experience() {
  const { t, lang } = useI18n();
  const jobs = lang === "ko" ? experienceKo : experience;
  const skills = lang === "ko" ? skillGroupsKo : skillGroups;
  return (
    <section id="experience" className="home-section home-shell" aria-labelledby="experience-title">
      <h2 id="experience-title" className="home-heading">{t.experienceHeading}</h2>
      <ol className="experience-list">
        {jobs.map((job) => (
          <li key={job.org} className="experience-row">
            <div className="experience-date">
              <p className="home-meta">{job.period}</p>
              <div className="experience-logo" aria-hidden="true">
                <img src={assetPath(job.logo.light)} alt="" loading="lazy" decoding="async" className="logo-light" />
                <img src={assetPath(job.logo.dark)} alt="" loading="lazy" decoding="async" className="logo-dark" />
              </div>
            </div>
            <div>
              <h3 className="home-card-title"><a href={job.site} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">{job.org} <span aria-hidden="true">↗</span></a></h3>
              <p className="home-meta mt-2">{job.role}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {job.points.slice(0, 2).map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div id="skills" className="skills-block">
        <h3 className="font-display mb-5 text-2xl font-semibold">{t.skillsHeading}</h3>
        <dl className="skills-lines">
          {skills.map((skill) => (
            <div key={skill.key}>
              <dt className="font-semibold">{skill.title}</dt>
              <dd>{skill.items.map((item) => item.replaceAll(" ", "\u00A0")).join("\u00A0· ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

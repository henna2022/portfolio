"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { activities, projects, type Project } from "@/lib/data";
import { activitiesKo, localizeProject } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { firstSentence, projectLabel, WorkMedia } from "./work-media";

const groups = [
  { id: "learning", slugs: ["raimi-art-lab", "im-a-restorer", "raimi-language-lab", "time-machine-ar", "mystery-playground-replay"] },
  { id: "software", slugs: ["raim-staff-platform", "exhibit-auto-recovery", "ai-persona-web", "raim-4cut-studio", "lidar-explainer-kiosk"] },
  { id: "teaching", slugs: [] },
] as const;
type GroupId = (typeof groups)[number]["id"];

function hashGroup(): GroupId | undefined {
  const hash = window.location.hash.slice(1);
  if (hash === "activities") return "teaching";
  return groups.find((group) => group.id === hash)?.id;
}

function ProjectRow({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <li className="work-row">
      <WorkMedia project={project} thumbnail />
      <div className="work-row-copy">
        <h4 className="font-display text-lg font-semibold leading-snug">
          <Link href={`/work/${project.slug}`} className="hover:underline underline-offset-4">{project.title}</Link>
        </h4>
        <p className="home-meta mt-1">{projectLabel(project)}</p>
        <p className="work-row-description mt-2">{firstSentence(project.desc)}</p>
        <Link href={`/work/${project.slug}`} className="home-link mt-3 inline-block text-[15px]">{t.viewProject}</Link>
      </div>
    </li>
  );
}

function GroupPanel({ children }: { children: ReactNode }) {
  const present = useIsPresent();
  const reduced = useReducedMotion();
  return (
    <motion.div className="group-panel" aria-hidden={!present}
      ref={(node) => { if (node) node.inert = !present; }}
      initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.16 }}>
      {children}
    </motion.div>
  );
}

export function WorkGroups({ photos }: { photos: Record<GroupId, ReactNode> }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<GroupId>("learning");
  const activityItems = lang === "ko" ? activitiesKo : activities;
  const localizedGroups = groups.map((group) => ({
    ...group,
    items: group.slugs.map((slug) => localizeProject(projects.find((p) => p.slug === slug)!, lang)),
  }));

  useEffect(() => {
    const syncHash = () => {
      const group = hashGroup();
      if (group) setOpen(group);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  function selectGroup(id: GroupId) {
    setOpen(id);
    // 스크롤 위치를 유지하고 주소만 바꾼다.
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <section id="make" className="home-section home-shell" aria-labelledby="make-title">
      <h2 id="make-title" className="home-heading">{t.makeHeading}</h2>
      <div className="group-grid">
        {localizedGroups.map((group) => {
          const names = group.id === "teaching" ? activityItems : group.items;
          const selected = open === group.id;
          return (
            <Fragment key={group.id}>
              <div id={group.id} className="group-anchor">
                {group.id === "teaching" ? <span id="activities" className="anchor-alias" /> : null}
                <button type="button" id={`group-${group.id}`} className="group-card"
                  aria-labelledby={`group-title-${group.id}`}
                  aria-describedby={`group-count-${group.id} group-preview-${group.id}`}
                  aria-expanded={selected} aria-controls={`work-group-panel-${group.id}`}
                  onClick={() => selectGroup(group.id)}>
                  {photos[group.id]}
                  <span className="group-card-copy">
                    <span id={`group-title-${group.id}`} className="group-title font-display">{t.workGroups[group.id]}</span>
                    <span id={`group-count-${group.id}`} className="home-meta mt-2 block">{t.itemCount.replace("{count}", String(names.length))}</span>
                    <span id={`group-preview-${group.id}`} className="home-meta mt-3 block">{names.slice(0, 2).map((item) => item.title).join(" · ")}</span>
                    <span className="group-action mt-4 flex items-center justify-between text-[15px]">
                      {selected ? t.groupOpen : t.groupBrowse}<span aria-hidden="true">{selected ? "−" : "+"}</span>
                    </span>
                  </span>
                </button>
              </div>
              {/* 모바일에서는 카드 바로 아래, 데스크톱에서는 행 전체에 배치한다. */}
              <div id={`work-group-panel-${group.id}`} className="group-panel-stage" role="region"
                aria-labelledby={`group-${group.id}`} aria-hidden={!selected}>
                <AnimatePresence initial={false}>
                  {selected ? (
                    <GroupPanel key={group.id}>
                      <h3 id={`panel-title-${group.id}`} className="font-display mb-6 text-2xl font-semibold">{t.workGroups[group.id]}</h3>
                      <ul className="work-rows">
                        {group.id === "teaching" ? activityItems.map((activity) => (
                          <li key={activity.title} className={`work-row${activity.photos.length ? "" : " work-row-text"}`}>
                            {activity.photos[0] ? <img src={assetPath(activity.photos[0])} alt="" loading="lazy" decoding="async" className="work-thumb object-cover" /> : null}
                            <div className="work-row-copy">
                              <h4 className="font-display text-lg font-semibold leading-snug">{activity.title}</h4>
                              <p className="home-meta mt-1">{activity.period}</p>
                              <p className="work-row-description mt-2">{activity.role}</p>
                            </div>
                          </li>
                        )) : group.items.map((project) => <ProjectRow key={project.slug} project={project} />)}
                      </ul>
                    </GroupPanel>
                  ) : null}
                </AnimatePresence>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

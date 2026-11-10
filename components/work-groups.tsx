"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { activities, projects, type Project } from "@/lib/data";
import { activitiesKo, localizeProject } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { firstSentence, projectLabel, WorkMedia } from "./work-media";

const groups = [
  { id: "learning", slugs: ["raimi-art-lab", "im-a-restorer", "raimi-language-lab", "time-machine-ar", "mystery-playground-replay"] },
  { id: "teaching", slugs: [] },
] as const;
type GroupId = (typeof groups)[number]["id"];

function hashGroup(): GroupId | undefined {
  const hash = window.location.hash.slice(1);
  if (hash === "activities") return "teaching";
  return groups.find((group) => group.id === hash)?.id;
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.18, delay: Math.min(index * 0.04, 0.08), ease: "easeOut" },
  }),
};

function AnimatedRow({ index, children, className = "work-row" }: { index: number; children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.li className={className} custom={index} variants={reduced ? undefined : rowVariants}>{children}</motion.li>;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n();
  return (
    <AnimatedRow index={index}>
      <WorkMedia project={project} thumbnail />
      <div className="work-row-copy">
        <h4 className="font-display text-lg font-semibold leading-snug">
          <Link href={`/work/${project.slug}`} className="hover:underline underline-offset-4">{project.title}</Link>
        </h4>
        <p className="home-meta mt-1">{projectLabel(project)}</p>
        <p className="work-row-description mt-2">{firstSentence(project.desc)}</p>
        <Link href={`/work/${project.slug}`} className="home-link mt-3 inline-block text-[15px]">{t.viewProject}</Link>
      </div>
    </AnimatedRow>
  );
}

// 모바일 아코디언: 닫히는 쪽은 바로 빠지고(화면 출렁임 방지) 여는 쪽만 펼친다.
function GroupPanel({ children, appear }: { children: ReactNode; appear: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className="group-accordion"
      initial={appear && !reduced ? { height: 0, opacity: 0 } : false}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ height: { duration: reduced ? 0 : 0.32, ease: "easeInOut" }, opacity: { duration: reduced ? 0 : 0.08 } }}>
      <div className="group-panel">{children}</div>
    </motion.div>
  );
}

function DesktopList({ group, children }: { group: GroupId; children: ReactNode }) {
  const reduced = useReducedMotion();
  // 평소에는 높이를 정하지 않는다(auto): 언어·글꼴·창 크기가 바뀌면 배치가 바로 따라가 해시 이동 위치가 어긋나지 않는다.
  // 묶음을 바꿀 때만 px 높이를 걸어 CSS 로 잇는다: 바꾸기 직전 높이로 묶고 → 새 목록 높이로 옮기고 → 끝나면 다시 auto.
  // 높이는 offsetHeight 로 잰다(getBoundingClientRect 나 framer-motion 의 "auto" 측정은 화면 값이라 페이지 zoom 안에서 20% 어긋난다).
  const viewport = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState<number | null>(null);
  const mounted = useRef(false);
  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (viewport.current) setFixed(viewport.current.offsetHeight); // 옛 목록이 아직 퇴장 중이라 바꾸기 전 높이다
    const release = window.setTimeout(() => setFixed(null), 600); // 퇴장 0.08초 + 높이 0.24초가 끝난 뒤
    return () => window.clearTimeout(release);
  }, [group]);
  // 새 목록이 붙으면 그 높이(+ 위아래 안쪽 여백 16)로 옮긴다. 평소(null)에는 건드리지 않는다
  const measure = useCallback((list: HTMLUListElement | null) => {
    if (list) setFixed((height) => (height === null ? null : list.offsetHeight + 16));
  }, []);

  return (
    <div ref={viewport} className="group-list-viewport"
      style={fixed === null ? undefined : { height: fixed, transition: reduced ? undefined : "height 0.24s ease-in-out" }}>
      {/* 퇴장 중에도 목록 높이를 유지한다. */}
      <AnimatePresence initial={false} mode="wait">
        <PanelRows key={group} measure={measure}>{children}</PanelRows>
      </AnimatePresence>
    </div>
  );
}

function PanelRows({ children, measure, appear = true }: { children: ReactNode; measure?: (node: HTMLUListElement | null) => void; appear?: boolean }) {
  const present = useIsPresent();
  const reduced = useReducedMotion();
  return (
    <motion.ul className="work-rows" aria-hidden={!present}
      ref={(node) => { if (node) node.inert = !present; measure?.(node); }}
      initial={appear ? "hidden" : false} animate="visible" exit="leaving"
      variants={{ hidden: { opacity: reduced ? 1 : 0 }, visible: { opacity: 1 }, leaving: { opacity: 0 } }}
      transition={{ duration: reduced ? 0 : 0.08 }}>
      {children}
    </motion.ul>
  );
}

export function WorkGroups({ photos }: { photos: Record<GroupId, ReactNode> }) {
  const { t, lang } = useI18n();
  const reduced = useReducedMotion();
  const pendingScroll = useRef(false);
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

  useEffect(() => {
    if (!pendingScroll.current) return;
    const timer = window.setTimeout(() => {
      pendingScroll.current = false;
      if (window.location.hash !== `#${open}`) return; // 그사이 다른 곳으로 이동했으면 두기
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const panel = document.getElementById(desktop ? "work-group-panel-desktop" : `work-group-panel-${open}`);
      const card = document.getElementById(`group-${open}`);
      if (!panel || !card) return;
      const top = panel.getBoundingClientRect().top;
      if (top < window.innerHeight - 64) return;
      const header = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const cardTarget = window.scrollY + card.getBoundingClientRect().top - header - 16;
      const panelTarget = window.scrollY + top - Math.max(header + 16, window.innerHeight * 0.3);
      // 모바일은 누른 카드가 헤더 밑으로 사라지지 않는 데까지만 올린다.
      const target = Math.max(window.scrollY, desktop ? panelTarget : Math.min(cardTarget, panelTarget));
      // 필요한 경우에만 아래로 이동한다.
      window.scrollTo({ top: target, behavior: reduced ? "instant" : "smooth" });
    }, reduced ? 0 : 380);
    return () => window.clearTimeout(timer);
  }, [open, reduced]);

  // 모바일: 위쪽 목록이 빠지면서 누른 카드가 밀려 올라가지 않게, 그리기 전에 스크롤을 맞춘다.
  const anchor = useRef<{ id: GroupId; top: number } | null>(null);
  // 사용자가 카드를 누른 뒤부터만 펼침 애니메이션을 쓴다(첫 화면·해시 복원은 바로 보여 줌).
  const [appear, setAppear] = useState(false);
  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    const card = a && document.getElementById(`group-${a.id}`);
    if (!a || !card) return;
    const delta = card.getBoundingClientRect().top - a.top;
    if (Math.abs(delta) > 0.5) window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
  }, [open]);

  function selectGroup(id: GroupId) {
    if (open === id) return;
    setAppear(true);
    const card = document.getElementById(`group-${id}`);
    if (card && !window.matchMedia("(min-width: 768px)").matches) anchor.current = { id, top: card.getBoundingClientRect().top };
    pendingScroll.current = true;
    setOpen(id);
    history.replaceState(null, "", `#${id}`);
  }

  function rows(id: GroupId) {
    return id === "teaching" ? activityItems.map((activity, index) => (
      <AnimatedRow key={activity.title} index={index} className={`work-row${activity.photos.length ? "" : " work-row-text"}`}>
        {activity.photos[0] ? <img src={assetPath(activity.photos[0])} alt="" loading="lazy" decoding="async" className="work-thumb object-cover" /> : null}
        <div className="work-row-copy">
          <h4 className="font-display text-lg font-semibold leading-snug">{activity.title}</h4>
          <p className="home-meta mt-1">{activity.period}</p>
          <p className="work-row-description mt-2">{activity.role}</p>
        </div>
      </AnimatedRow>
    )) : localizedGroups.find((group) => group.id === id)!.items.map((project, index) => <ProjectRow key={project.slug} project={project} index={index} />);
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
              <div id={group.id} className="group-anchor" data-selected={selected}>
                {group.id === "teaching" ? <span id="activities" className="anchor-alias" /> : null}
                <button type="button" id={`group-${group.id}`} className="group-card"
                  aria-labelledby={`group-title-${group.id}`}
                  aria-describedby={`group-count-${group.id} group-preview-${group.id}`}
                  aria-expanded={selected} aria-controls={`work-group-panel-${group.id} work-group-panel-desktop`}
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
              <div id={`work-group-panel-${group.id}`} className="group-panel-mobile" role="region"
                aria-labelledby={`group-title-${group.id}`} aria-hidden={!selected}>
                {selected ? (
                  <GroupPanel key={group.id} appear={appear}>
                    <PanelRows appear={appear}>{rows(group.id)}</PanelRows>
                  </GroupPanel>
                ) : null}
              </div>
            </Fragment>
          );
        })}
        <div id="work-group-panel-desktop" className="group-panel group-panel-desktop" role="region" aria-labelledby={`group-title-${open}`}>
          <DesktopList group={open}>{rows(open)}</DesktopList>
        </div>
      </div>
    </section>
  );
}

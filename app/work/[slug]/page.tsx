import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data";
import { Header } from "@/components/header";
import { ProjectDetail } from "@/components/project-detail";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProject(params.slug);
  return {
    title: p ? `${p.title} — Juwon Lee` : "Project — Juwon Lee",
    // 검색 결과 스니펫용 — 여러 문단짜리 overview 대신 한 줄 요약을 쓴다
    description: p?.desc,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === params.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <main>
      <Header />
      <ProjectDetail
        project={p}
        prev={{ slug: prev.slug, title: prev.title }}
        next={{ slug: next.slug, title: next.title }}
      />
    </main>
  );
}

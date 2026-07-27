import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data";
import { Header } from "@/components/header";
import { ProjectDetail } from "@/components/project-detail";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProject(params.slug);
  if (!p) {
    return { title: "Project — Juwon Lee" };
  }

  const title = `${p.title} — Juwon Lee`;
  // 검색 결과 스니펫용 — 여러 문단짜리 overview 대신 한 줄 요약을 쓴다
  const description = p.desc;
  const url = `${SITE_URL}/work/${p.slug}`;
  // 프로젝트별 og:image 가 있으면 절대 URL로, 없으면 기존 공용 og 커버로 폴백
  const ogImage = p.image ? `${SITE_URL}${p.image}` : `${SITE_URL}/og-cover.png`;

  return {
    title,
    description,
    // 트레일링 슬래시 없음 — 실제 서빙 형태(work/[slug].html)와 일치시킨다.
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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

  // 검색엔진용 구조화 데이터 — 프로젝트를 작품(CreativeWork)으로 기술
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.desc,
    url: `${SITE_URL}/work/${p.slug}`,
    author: {
      "@type": "Person",
      name: "Juwon Lee",
      url: `${SITE_URL}/`,
    },
    ...(p.image
      ? { image: `${SITE_URL}${p.image}` }
      : {}),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ProjectDetail
        project={p}
        prev={{ slug: prev.slug, title: prev.title }}
        next={{ slug: next.slug, title: next.title }}
      />
    </main>
  );
}

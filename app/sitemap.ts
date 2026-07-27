import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

// 정적 export 용 sitemap.xml 생성
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    // 트레일링 슬래시 없음 — 실제 서빙 형태(work/[slug].html)와 일치시킨다.
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: p.tier === "major" ? 0.8 : 0.5,
    })),
  ];
}

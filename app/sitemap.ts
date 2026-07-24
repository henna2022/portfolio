import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const BASE = "https://henna2022.github.io/portfolio";

// 정적 export 용 sitemap.xml 생성
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${BASE}/work/${p.slug}/`,
      changeFrequency: "monthly" as const,
      priority: p.tier === "major" ? 0.8 : 0.5,
    })),
  ];
}

import type { Project } from "@/lib/data";
import type { Lang } from "./lang-provider";

// 이미지 대체 텍스트. galleryAlts 에 적힌 설명이 있으면 그걸 쓰고(EN 전용),
// 없으면 "작품명, 화면 n" 꼴로 만든다.
export function altFor(p: Project, src: string, lang: Lang): string {
  const custom = p.galleryAlts?.[src];
  if (custom && lang === "en") return custom;
  const idx = (p.gallery ?? []).indexOf(src);
  const n = idx >= 0 ? idx + 1 : 1;
  return lang === "ko" ? `${p.title} 화면 ${n}` : `${p.title}, screen ${n}`;
}

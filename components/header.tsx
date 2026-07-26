"use client";

import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { ui } from "@/lib/i18n";
import { DownloadIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { SectionNav } from "./section-nav";

export function Header() {
  const t = ui;
  return (
    <header
      // 반투명 바 — 뒤의 3D 씬이 은은하게 비친다.
      // 진입 모션은 CSS(intro-down) — JS 하이드레이션을 기다리지 않아 LCP 에 안전
      className="intro-down fixed inset-x-0 top-0 z-40 border-b border-ink/5 bg-cream/40 backdrop-blur-md"
    >
      {/* Row 1 — brand + downloads + theme */}
      <div className="mx-auto flex max-w-shell items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-6">
        <a
          href={assetPath("/")}
          className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold text-ink"
        >
          {person.name}
        </a>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* 미니멀 네비에 맞춘 차분한 고스트 스타일 */}
          <a
            href={assetPath(person.cv)}
            download
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink sm:inline-flex"
          >
            <DownloadIcon /> {t.cv}
          </a>
          <a
            href={assetPath(person.resume)}
            download
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink/5 px-3 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/10 hover:text-ink sm:px-3.5"
          >
            <DownloadIcon /> {t.resume}
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Row 2 — section nav (scroll-spy + smooth-scroll) */}
      <div className="border-t border-ink/5">
        <div className="mx-auto max-w-shell px-4 py-1">
          <SectionNav />
        </div>
      </div>
    </header>
  );
}

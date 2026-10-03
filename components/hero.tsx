"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";
import { ArrowIcon } from "./icons";

// three.js 런타임은 별도 청크로 지연 로드 — 헤드라인·CTA 는 DOM 이라 먼저 그려진다.
const HeroRobot = dynamic(() => import("./hero-robot"), { ssr: false });

// 3D 청크 다운로드 실패·WebGL 런타임 오류가 나도 히어로 전체가 깨지지 않게
// 로봇 자리만 비운다.
class RobotGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Hero() {
  const { t, lang } = useI18n();
  const h = lang === "ko" ? heroKo : hero;
  return (
    <section
      id="top"
      // 첫 화면을 뷰포트 높이에 맞춰 다음 섹션(프로필 사진)이 폴드 아래로 내려가게 함.
      // min-h-[34rem]: 가로 모드 폰처럼 낮은 뷰포트에서 중앙 헤드라인과
      // 하단 고정 CTA(absolute bottom-12)가 겹치지 않게 최소 높이를 확보.
      className="relative mx-auto flex min-h-[max(100svh,38rem)] max-w-shell flex-col justify-center px-6 pb-24 pt-28 text-center"
    >
      {/* 걸어 들어와 인사하는 로봇 (시선 추적 + 클릭 리액션).
          휴대폰: 헤드라인 위 전폭 띠 / 데스크톱: 오른쪽 아래 구석.
          자리는 SSR 때부터 잡아 두어 로봇이 늦게 떠도 헤드라인이 밀리지 않는다. */}
      <div
        aria-hidden
        className="mb-2 h-36 w-full lg:absolute lg:bottom-0 lg:right-[3%] lg:mb-0 lg:h-60 lg:w-[16.5rem] xl:right-[5%] xl:h-72 xl:w-80"
      >
        <RobotGuard>
          <HeroRobot />
        </RobotGuard>
      </div>

      <h1
        // 진입 모션은 CSS(intro-up) — 하이드레이션 전에 페인트되어 LCP 에 안전
        className="intro-up font-display ko-hero-display text-balance mx-auto max-w-4xl text-[2.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink sm:text-6xl md:text-7xl"
      >
        {h.headline}
      </h1>

      <div className="intro-up-centered absolute bottom-12 left-1/2 z-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            whileTap={{ y: 3 }}
            href="#work"
            className="group inline-flex items-center gap-2 rounded-xl bg-lime px-7 py-3.5 text-sm font-semibold text-white shadow-[0_5px_0_#1d4ed8] transition-all hover:translate-y-[1px] hover:shadow-[0_4px_0_#1d4ed8]"
          >
            {t.viewWork}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            whileTap={{ y: 3 }}
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_5px_0_rgba(28,27,23,0.14)] transition-all hover:translate-y-[1px] hover:shadow-[0_4px_0_rgba(28,27,23,0.14)] dark:bg-sand-deep dark:text-cream dark:shadow-[0_5px_0_rgba(0,0,0,0.5)] dark:hover:shadow-[0_4px_0_rgba(0,0,0,0.5)]"
          >
            {t.readProfile}
          </motion.a>
        </div>
      </div>
    </section>
  );
}

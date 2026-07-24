"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { hero } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ArrowIcon } from "./icons";
import { ease } from "@/lib/motion";

// three.js 런타임은 별도 청크로 지연 로드 — 첫 화면 성능에 영향 없음
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Hero() {
  const { locale } = useLocale();
  const t = dict[locale];
  const ko = locale === "ko";
  return (
    <section
      id="top"
      // 첫 화면을 뷰포트 높이에 맞춰 다음 섹션(프로필 사진)이 폴드 아래로 내려가게 함
      className="relative mx-auto flex min-h-svh max-w-shell flex-col justify-center px-6 pb-24 pt-28 text-center"
    >
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          variants={child}
          // EN 데스크톱에서는 3D 입체 글자가 헤드라인을 대신함 —
          // DOM h1은 레이아웃 자리만 지키고(invisible) 모바일·KO에서는 그대로 표시
          className={`font-display text-balance max-w-4xl text-[2.75rem] text-ink sm:text-6xl md:text-7xl ${
            ko
              ? "font-bold leading-[1.34] tracking-[-0.01em]"
              : "font-semibold leading-[1.14] tracking-[-0.015em] lg:invisible"
          }`}
        >
          {ko ? heroKo.headline : hero.headline}
        </motion.h1>

      </motion.div>

      {/* 화면 하단 고정 CTA — 어떤 뷰포트에서도 3D 헤드라인 아래에 위치.
          (센터링은 framer의 x:-50%로 처리해 y 애니메이션과 충돌하지 않게 함) */}
      <motion.div
        initial={{ opacity: 0, x: "-50%", y: 24 }}
        animate={{ opacity: 1, x: "-50%", y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
        className="absolute bottom-12 left-1/2 z-10 flex flex-wrap items-center justify-center gap-4"
      >
          {/* 3D 슬랩 CTA: 바닥 원근에 맞춰 눕힌 입체 블럭 (rotateX + 두꺼운 밑단) */}
          <motion.a
            whileTap={{ y: 3 }}
            href="#work"
            className="group inline-flex origin-bottom items-center gap-2 rounded-xl bg-lime px-7 py-3.5 text-sm font-semibold text-white shadow-[0_9px_0_#1d4ed8,0_14px_18px_rgba(28,27,23,0.18)] transition-all [transform:perspective(640px)_rotateX(28deg)] hover:translate-y-[2px] hover:shadow-[0_7px_0_#1d4ed8,0_11px_14px_rgba(28,27,23,0.18)]"
          >
            {t.viewWork}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            whileTap={{ y: 3 }}
            href="#about"
            className="inline-flex origin-bottom items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_9px_0_rgba(28,27,23,0.18),0_14px_18px_rgba(28,27,23,0.14)] transition-all [transform:perspective(640px)_rotateX(28deg)] hover:translate-y-[2px] hover:shadow-[0_7px_0_rgba(28,27,23,0.18),0_11px_14px_rgba(28,27,23,0.14)] dark:bg-sand-deep dark:text-cream dark:shadow-[0_9px_0_rgba(0,0,0,0.55),0_14px_18px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_7px_0_rgba(0,0,0,0.55),0_11px_14px_rgba(0,0,0,0.35)]"
          >
            {t.readProfile}
          </motion.a>
      </motion.div>

      {/* 3D 씬: 타일 바닥 + 땅에서 올라오는 입체 헤드라인 + 블럭 타고 등장하는 로봇 */}
      <HeroScene showText={!ko} />
    </section>
  );
}

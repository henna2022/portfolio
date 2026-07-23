"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { hero, person } from "@/lib/data";
import { heroKo, personKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ArrowIcon, GridIcon } from "./icons";
import { ease } from "@/lib/motion";

// three.js 런타임은 별도 청크로 지연 로드 — 첫 화면 성능에 영향 없음
const HeroRobot = dynamic(() => import("./hero-robot"), { ssr: false });

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
      className="relative mx-auto max-w-shell px-6 pb-16 pt-36 text-center sm:pt-40"
    >
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div
          variants={child}
          className="mb-6 flex items-center gap-3 rounded-full bg-sand/60 py-1.5 pl-1.5 pr-4"
        >
          <img
            src={assetPath(person.photo)}
            alt="Juwon Lee"
            className="h-9 w-9 rounded-full object-cover object-center"
          />
          <span className="text-sm font-medium text-ink/80">
            Juwon Lee · {(ko ? personKo.role : person.role).split(" · ")[0]}
          </span>
        </motion.div>

        <motion.span
          variants={child}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-sand/60 px-4 py-1.5 text-xs font-medium tracking-wide text-ink/70"
        >
          <GridIcon />
          {hero.badge}
        </motion.span>

        <motion.h1
          variants={child}
          className={`font-display text-balance max-w-4xl text-[2.75rem] text-ink sm:text-6xl md:text-7xl ${
            ko
              ? "font-bold leading-[1.34] tracking-[-0.01em]"
              : "font-semibold leading-[1.14] tracking-[-0.015em]"
          }`}
        >
          {ko ? heroKo.headline : hero.headline}
        </motion.h1>

        <motion.p
          variants={child}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {ko ? heroKo.sub : hero.sub}
        </motion.p>

        <motion.div
          variants={child}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream"
          >
            {t.viewWork}
            <ArrowIcon className="text-lime transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#about"
            className="inline-flex items-center gap-2 rounded-full bg-sand/60 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-sand"
          >
            {t.readProfile}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* 걸어 들어와 인사하는 로봇 (데스크톱 전용, 시선 추적 + 클릭 리액션) */}
      <HeroRobot />
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { hero } from "@/lib/data";
import { ui } from "@/lib/i18n";
import { ArrowIcon } from "./icons";
import { ease } from "@/lib/motion";

// three.js 런타임은 별도 청크로 지연 로드 — 첫 화면 성능에 영향 없음.
// 아래 useDesktopScene 게이트가 통과할 때만 <HeroScene> 을 마운트하므로,
// dynamic import 자체(three.js/drei 청크 다운로드)가 모바일/터치 기기에서는
// 아예 트리거되지 않는다.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

// 데스크톱(넓은 화면 + 마우스 호버) + WebGL 지원 여부를 클라이언트에서만 판정.
// SSR/최초 렌더에서는 null(false) 을 반환해 하이드레이션 불일치를 피한다.
function useDesktopScene() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (hover: hover)");
    const probe = document.createElement("canvas");
    const hasGL = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    const update = () => setReady(mq.matches && hasGL);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ready;
}

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Hero() {
  const t = ui;
  const desktopScene = useDesktopScene();
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
        // 장식용 헤드라인 래퍼 — 투명하지만 z-10 로 canvas 위에 떠서 3D 버튼의
        // 상단 히트영역을 가로챘다(호버 데드존). 상호작용 대상이 아니므로 이벤트 통과.
        className="pointer-events-none relative z-10 flex flex-col items-center"
      >
        <motion.h1
          variants={child}
          // 데스크톱에서는 3D 입체 글자가 헤드라인을 대신함 —
          // DOM h1은 레이아웃 자리만 지키고(invisible) 모바일에서는 그대로 표시
          className="font-display text-balance max-w-4xl text-[2.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink sm:text-6xl md:text-7xl lg:invisible"
        >
          {hero.headline}
        </motion.h1>
      </motion.div>

      {/* 모바일 전용 CTA — 데스크톱에서는 3D 씬이 벽면 버튼을 렌더링 */}
      <motion.div
        initial={{ opacity: 0, x: "-50%", y: 24 }}
        animate={{ opacity: 1, x: "-50%", y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
        className="absolute bottom-12 left-1/2 z-10 lg:hidden"
      >
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
      </motion.div>

      {/* 3D 씬: 과학관 방 코너 + 벽걸이 헤드라인·버튼 + 로봇.
          데스크톱 + WebGL 확인 전에는 마운트하지 않아 모바일은 three.js 청크를
          다운로드조차 하지 않는다 (모바일 CTA 는 위 DOM 버튼이 담당). */}
      {desktopScene ? <HeroScene showText /> : null}
    </section>
  );
}

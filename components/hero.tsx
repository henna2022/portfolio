"use client";

import { Component, type ReactNode, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";
import { ArrowIcon } from "./icons";

// three.js 런타임은 별도 청크로 지연 로드 — 첫 화면 성능에 영향 없음.
// 아래 useDesktopScene 게이트가 통과할 때만 <HeroScene> 을 마운트하므로,
// dynamic import 자체(three.js/drei 청크 다운로드)가 모바일/터치 기기에서는
// 아예 트리거되지 않는다.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

// 3D 청크 다운로드 실패처럼 <HeroScene> 이 마운트되기도 전에 터지는 경우까지 덮는
// 바깥 경계. hero-scene.tsx 안의 SceneBoundary 는 씬이 이미 마운트된 뒤의 런타임
// 오류만 잡으므로, 청크 로드 실패는 여기서 받아 히어로를 DOM 폴백으로 되돌린다.
class SceneGuard extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  // null 을 돌려주면 자식을 그대로 다시 렌더해 같은 에러가 재발한다 —
  // failed 로 끊어 두고 부모의 상태 갱신을 기다린다.
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

export function Hero() {
  const { t, lang } = useI18n();
  const h = lang === "ko" ? heroKo : hero;
  const gateOpen = useDesktopScene();
  // 씬이 실제로 살아 있을 때만 DOM 헤드라인/CTA 를 숨긴다. three.js 가 던지면
  // sceneFailed 로 되돌아와 DOM 이 다시 보인다 — CSS 숨김과 JS 마운트가 어긋나
  // 첫 화면이 통째로 비는 조합(아이패드 가로·WebGL 차단 PC)을 막는 장치.
  const [sceneFailed, setSceneFailed] = useState(false);
  const onSceneError = useCallback(() => setSceneFailed(true), []);
  const desktopScene = gateOpen && !sceneFailed;
  return (
    <section
      id="top"
      // 첫 화면을 뷰포트 높이에 맞춰 다음 섹션(프로필 사진)이 폴드 아래로 내려가게 함.
      // min-h-[34rem]: 가로 모드 폰처럼 낮은 뷰포트에서 중앙 헤드라인과
      // 하단 고정 CTA(absolute bottom-12)가 겹치지 않게 최소 높이를 확보.
      className="relative mx-auto flex min-h-[max(100svh,38rem)] max-w-shell flex-col justify-center px-6 pb-24 pt-28 text-center"
    >
      <div
        // 장식용 헤드라인 래퍼 — 투명하지만 z-10 로 canvas 위에 떠서 3D 버튼의
        // 상단 히트영역을 가로챘다(호버 데드존). 상호작용 대상이 아니므로 이벤트 통과.
        className="pointer-events-none relative z-10 flex flex-col items-center"
      >
        <h1
          // 데스크톱에서는 3D 입체 글자가 헤드라인을 대신함 —
          // DOM h1은 레이아웃 자리만 지키고(invisible) 모바일에서는 그대로 표시.
          // 진입 모션은 CSS(intro-up) — 하이드레이션 전에 페인트되어 LCP 에 안전
          // lg:invisible 은 씬이 실제로 뜰 때만 붙인다(desktopScene). 순수 CSS 로
          // 두면 1024px 이상인데 씬이 없는 기기에서 헤드라인이 사라진다.
          className={
            "intro-up font-display ko-hero-display text-balance max-w-4xl text-[2.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink sm:text-6xl md:text-7xl" +
            (desktopScene ? " lg:invisible" : "")
          }
        >
          {h.headline}
        </h1>
      </div>

      {/* 모바일 전용 CTA — 데스크톱에서는 3D 씬이 벽면 버튼을 렌더링.
          씬이 안 뜨는 데스크톱(아이패드 가로·WebGL 차단)에서는 이 CTA 가 유일한
          진입 동선이므로 lg:hidden 도 desktopScene 에 묶는다. */}
      <div
        className={
          "intro-up-centered absolute bottom-12 left-1/2 z-10" +
          (desktopScene ? " lg:hidden" : "")
        }
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
      </div>

      {/* 3D 씬: 과학관 방 코너 + 벽걸이 헤드라인·버튼 + 로봇.
          데스크톱 + WebGL 확인 전에는 마운트하지 않아 모바일은 three.js 청크를
          다운로드조차 하지 않는다 (모바일 CTA 는 위 DOM 버튼이 담당). */}
      {/* KO 도 EN 과 같은 3D 벽 팝업 — 페이퍼로지 서브셋 타입페이스 사용 */}
      {desktopScene ? (
        <SceneGuard onFail={onSceneError}>
          <HeroScene showText ko={lang === "ko"} onSceneError={onSceneError} />
        </SceneGuard>
      ) : null}
    </section>
  );
}

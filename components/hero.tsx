"use client";

import { Component, type ReactNode, type CSSProperties, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";
import { ArrowIcon } from "./icons";
import { assetPath } from "@/lib/asset";

// Load each scene only after the WebGL gate has resolved.
const HeroRobot = dynamic(() => import("./hero-robot"), { ssr: false });

class RobotGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

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

// WebGL 지원 여부만 클라이언트에서 판정 — 화면 크기나 입력 방식은 무관.
// SSR/최초 렌더에서는 null(false) 을 반환해 하이드레이션 불일치를 피한다.
function useDesktopScene() {
  const [ready, setReady] = useState<boolean | null>(null);
  useEffect(() => {
    const probe = document.createElement("canvas");
    const hasGL = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    // 로봇·책상 GLB 와 draco 디코더를 3D 청크와 동시에 받기 시작한다. 그대로 두면 청크를 평가한 뒤
    // GLB, GLB 를 받은 뒤 draco 순으로 차례차례 내려와 로봇이 늦게 뜬다. (three 의 fetch 와 같은 cors 모드)
    if (hasGL)
      for (const f of ["/robot.glb", "/props/desk.glb", "/draco/draco_wasm_wrapper.js", "/draco/draco_decoder.wasm"]) {
        const href = assetPath(f);
        // 홈으로 돌아올 때마다 같은 링크가 쌓이지 않게
        if (!document.head.querySelector(`link[rel="preload"][href="${href}"]`))
          document.head.append(Object.assign(document.createElement("link"), { rel: "preload", as: "fetch", crossOrigin: "anonymous", href }));
      }
    setReady(hasGL);
  }, []);
  return ready;
}

export function Hero() {
  const { t, lang } = useI18n();
  const h = lang === "ko" ? heroKo : hero;
  const gateOpen = useDesktopScene();
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (orientation: landscape)");
    const update = () => setCompact(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // 씬이 실제로 살아 있을 때만 DOM 헤드라인/CTA 를 숨긴다. three.js 가 던지면
  // sceneFailed 로 되돌아와 DOM 이 다시 보인다 — CSS 숨김과 JS 마운트가 어긋나
  // 첫 화면이 통째로 비는 조합(아이패드 가로·WebGL 차단 PC)을 막는 장치.
  const [sceneFailed, setSceneFailed] = useState(false);
  const onSceneError = useCallback(() => setSceneFailed(true), []);
  const desktopScene = gateOpen === true && !sceneFailed;
  const [headlineLanguage, setHeadlineLanguage] = useState<string | null>(null);
  const onHeadlineShown = useCallback(() => setHeadlineLanguage(lang), [lang]);
  useEffect(() => { if (!desktopScene) setHeadlineLanguage(null); }, [desktopScene]);
  // 3D 제목이 한 번 올라온 뒤에는 언어를 바꿔도 DOM 제목을 다시 띄우지 않는다
  // (방은 그대로고 벽 제목만 새로 올라오므로, 다시 띄우면 두 제목이 겹친다)
  const headlineShown = desktopScene && headlineLanguage !== null;
  return (
    <section
      id="top"
      // 첫 화면을 뷰포트 높이에 맞춰 다음 섹션(프로필 사진)이 폴드 아래로 내려가게 함.
      // 38rem: 가로 모드 폰처럼 낮은 뷰포트에서 중앙 헤드라인과
      // 하단 고정 CTA(absolute bottom-12)가 겹치지 않게 최소 높이를 확보.
      // 3D 방일 때는 빼서 캔버스가 화면 높이를 넘지 않게 한다. 넘으면 가로 폰에서 로봇이 폴드 아래로 내려간다.
      className={"relative mx-auto flex max-w-shell flex-col justify-center px-6 pb-24 pt-28 text-center " +
        (desktopScene ? "min-h-[100svh]" : "min-h-[max(100svh,38rem)]")}
    >
      {!desktopScene ? (
        <div aria-hidden className="mb-2 h-36 w-full">
          {gateOpen !== null ? <RobotGuard><HeroRobot /></RobotGuard> : null}
        </div>
      ) : null}
      <div
        // 장식용 헤드라인 래퍼 — 투명하지만 z-10 로 canvas 위에 떠서 3D 버튼의
        // 상단 히트영역을 가로챘다(호버 데드존). 상호작용 대상이 아니므로 이벤트 통과.
        className={"pointer-events-none z-10 flex flex-col items-center" +
          (desktopScene && compact ? " absolute inset-x-6 top-28" : " relative")}
      >
        <h1
          // Keep the semantic heading after the wall text finishes its entrance.
          className={
            "intro-up font-display ko-hero-display text-balance max-w-4xl text-[2.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink sm:text-6xl md:text-7xl" +
            (headlineShown ? " text-transparent" : "") +
            (desktopScene && compact ? " !text-[clamp(1.75rem,5vw,3.5rem)]" : "")
          }
        >
          {h.headline}
        </h1>
      </div>

      {/* DOM links remain accessible and reappear when keyboard focused. */}
      <div
        className={
          "intro-up absolute inset-x-0 bottom-12 z-10 flex justify-center px-6" +
          (headlineShown && !compact ? " pointer-events-none opacity-0 focus-within:pointer-events-auto focus-within:opacity-100" : "")
        }
        style={{ "--intro-delay": "0.6s", ...(headlineShown ? { animation: "none" } : {}) } as CSSProperties}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            whileTap={{ y: 3 }}
            href="#work"
            className="group inline-flex whitespace-nowrap items-center gap-2 rounded-xl bg-lime px-7 py-3.5 text-sm font-semibold text-white shadow-[0_5px_0_#1d4ed8] transition-all hover:translate-y-[1px] hover:shadow-[0_4px_0_#1d4ed8]"
          >
            {t.viewWork}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            whileTap={{ y: 3 }}
            href="#about"
            className="inline-flex whitespace-nowrap items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_5px_0_rgba(28,27,23,0.14)] transition-all hover:translate-y-[1px] hover:shadow-[0_4px_0_rgba(28,27,23,0.14)] dark:bg-sand-deep dark:shadow-[0_5px_0_rgba(0,0,0,0.5)] dark:hover:shadow-[0_4px_0_rgba(0,0,0,0.5)]"
          >
            {t.readProfile}
          </motion.a>
        </div>
      </div>

      {desktopScene ? (
        <SceneGuard onFail={onSceneError}>
          <HeroScene compact={compact} showText={true} ko={lang === "ko"} onSceneError={onSceneError} onHeadlineShown={onHeadlineShown} />
        </SceneGuard>
      ) : null}
    </section>
  );
}

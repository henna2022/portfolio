"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AtoChip } from "./ato-chip";

// 에러 페이지 공용 레이아웃 — 코드별 설명 + 5초 카운트다운 후 홈으로 이동.
// 마스코트: 404·502 는 3D 로봇(WebGL 미지원 시 아토로 폴백), 401·402 는 아토.
const ErrorRobot = dynamic(() => import("./error-robot"), { ssr: false });

const REDIRECT_SECONDS = 5;

export type ErrorCode = "404" | "401" | "402" | "500" | "502";

const COPY: Record<ErrorCode, { title: string; description: string; mascot: "robot" | "ato" }> = {
  "404": {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or may have been moved.",
    mascot: "robot",
  },
  "401": {
    title: "Unauthorized",
    description: "You need permission to view this page.",
    mascot: "ato",
  },
  "402": {
    title: "Payment required",
    description: "Access to this page requires payment.",
    mascot: "ato",
  },
  "500": {
    title: "Something went wrong",
    description: "An unexpected error occurred while showing this page.",
    mascot: "robot",
  },
  "502": {
    title: "Bad gateway",
    description: "The server received an invalid response. This is usually temporary.",
    mascot: "robot",
  },
};

// 히어로 씬과 같은 게이트 — 데스크톱 + WebGL 일 때만 3D 로봇을 띄운다.
// 모바일에서는 robot.glb/three.js 청크를 받지 않고 아토가 대신 인사한다.
// (SSR·최초 렌더에서는 null 을 반환해 하이드레이션 불일치를 피한다)
function useRobotCapable() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (hover: hover)");
    const probe = document.createElement("canvas");
    const hasGL = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    const update = () => setOk(mq.matches && hasGL);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

export function ErrorPage({ code }: { code: ErrorCode }) {
  const { title, description, mascot } = COPY[code];
  const router = useRouter();
  const robotCapable = useRobotCapable();
  const [left, setLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const t = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (left <= 0) router.replace("/");
  }, [left, router]);

  const showRobot = mascot === "robot" && robotCapable === true;
  const showAto = mascot === "ato" || robotCapable === false;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center text-ink">
      {/* 마스코트 + 인사 말풍선 */}
      <div className="relative flex items-end justify-center">
        <span className="error-bubble font-display absolute -top-5 left-1/2 z-10 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream">
          Hi there!
        </span>
        {showRobot ? (
          // 카메라를 물린 만큼 캔버스 위아래에 빈 공간이 생긴다 —
          // 음수 마진으로 걷어내 말풍선·에러 코드와의 간격을 유지한다.
          <div className="-my-9 h-64 w-64 sm:h-72 sm:w-72">
            <ErrorRobot />
          </div>
        ) : null}
        {showAto ? (
          <span className="error-ato" style={{ fontSize: "clamp(64px, 12vw, 96px)" }}>
            <AtoChip />
          </span>
        ) : null}
      </div>

      <p className="font-display mt-4 text-[5rem] font-semibold leading-none tracking-[-0.015em] sm:text-[7rem]">
        {code}
      </p>
      <p className="font-display mt-4 text-xl font-semibold sm:text-2xl">{title}</p>
      <p className="mt-2 max-w-md text-base text-muted">{description}</p>

      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        Taking you back home in{" "}
        <span className="font-semibold tabular-nums text-ink">{Math.max(left, 0)}s</span>
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
      >
        Back to home now
      </Link>
    </main>
  );
}

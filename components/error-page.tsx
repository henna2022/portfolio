"use client";

// 에러 페이지 = 닫힌 전시실 앞 안내판. 코드가 적힌 층 표지, 안내 문구, 5초 뒤 층별 안내로.
// 로비와 같은 도슨트 로봇이 걸어 들어와 손을 흔든다(WebGL 이 없으면 로봇 없이 안내판만).
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useI18n } from "./lang-provider";
import { ArrowRight } from "./pictos";

const DocentRobot = dynamic(() => import("./docent-robot"), { ssr: false });

class RobotGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const REDIRECT_SECONDS = 5;

export type ErrorCode = "404" | "401" | "402" | "500" | "502";

type Bi = { en: string; ko: string };
const COPY: Record<ErrorCode, { title: Bi; description: Bi }> = {
  "404": {
    title: { en: "This room is closed.", ko: "이 전시실은 닫혀 있어요." },
    description: {
      en: "The page you're looking for doesn't exist or may have been moved.",
      ko: "찾는 페이지가 없거나 다른 곳으로 옮겨졌을 수 있습니다.",
    },
  },
  "401": {
    title: { en: "Staff only.", ko: "직원 전용 구역입니다." },
    description: { en: "You need permission to view this page.", ko: "이 페이지를 보려면 권한이 필요합니다." },
  },
  "402": {
    title: { en: "Ticket required.", ko: "입장권이 필요합니다." },
    description: { en: "Access to this page requires payment.", ko: "이 페이지는 결제가 필요합니다." },
  },
  "500": {
    title: { en: "This room failed to open.", ko: "전시실을 여는 중에 문제가 생겼어요." },
    description: {
      en: "An unexpected error occurred while showing this page. Reload, or go back to the floor guide.",
      ko: "페이지를 보여 주는 중 예기치 못한 오류가 났습니다. 새로고침하거나 층별 안내로 돌아가 주세요.",
    },
  },
  "502": {
    title: { en: "Temporarily closed.", ko: "잠시 닫혀 있어요." },
    description: {
      en: "The server received an invalid response. This is usually temporary.",
      ko: "서버가 잘못된 응답을 받았습니다. 보통 잠깐이면 풀립니다.",
    },
  },
};

export function ErrorPage({ code }: { code: ErrorCode }) {
  const { lang } = useI18n();
  const ko = lang === "ko";
  const { title, description } = COPY[code];
  const router = useRouter();
  const [left, setLeft] = useState(REDIRECT_SECONDS);
  const stage = useRef<HTMLDivElement>(null);
  const [targetPx, setTargetPx] = useState(0);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (left <= 0) router.replace("/");
  }, [left, router]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setTargetPx(el.getBoundingClientRect().width * 0.28);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <main id="main" className="errorpage">
      <div className="shell errorpage__inner">
        <header className="floorsign errorpage__sign">
          <div className="floorsign__tile is-in" aria-hidden="true">
            <span className="floorsign__num errorpage__code">{code}</span>
            <span className="floorsign__name">
              {ko ? "안내" : "Notice"}
              <small>{ko ? "Notice" : "안내"}</small>
            </span>
          </div>
          <div>
            <h1 className="floorsign__title">{ko ? title.ko : title.en}</h1>
            <p className="floorsign__intro">{ko ? description.ko : description.en}</p>
            <p className="floorsign__meta mono" role="status" aria-live="polite">
              {ko
                ? `${Math.max(left, 0)}초 뒤 층별 안내로 돌아갑니다`
                : `Back to the floor guide in ${Math.max(left, 0)}s`}
            </p>
            <div className="room__links">
              <Link className="btn btn--solid" href="/">
                {ko ? "층별 안내로" : "Floor guide"}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </header>

        <div className="errorpage__stage" ref={stage} aria-hidden="true">
          {targetPx > 0 ? (
            <RobotGuard>
              <DocentRobot targetPx={targetPx} onArrive={() => setArrived(true)} />
            </RobotGuard>
          ) : null}
          {arrived ? (
            <p className="speech" style={{ left: "calc(28% + 60px)", bottom: "62%" }}>
              {ko ? "제가 안내해 드릴게요." : "Let me walk you back."}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}

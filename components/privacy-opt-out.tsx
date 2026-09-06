"use client";

import { useEffect, useState } from "react";

// public/analytics.js 가 로드 시점에 읽는 플래그와 같은 키를 쓴다.
// (?notrack=1 로 들어오는 것과 정확히 동일한 상태를 만든다)
const KEY = "pf_notrack";

export function PrivacyOptOut() {
  // null = 아직 브라우저 저장소를 읽기 전 (SSG 출력과 첫 렌더를 일치시키기 위함)
  const [optedOut, setOptedOut] = useState<boolean | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    try {
      setOptedOut(localStorage.getItem(KEY) === "1");
    } catch {
      setBlocked(true);
    }
  }, []);

  function toggle() {
    try {
      const next = !optedOut;
      if (next) localStorage.setItem(KEY, "1");
      else localStorage.removeItem(KEY);
      setOptedOut(next);
    } catch {
      setBlocked(true);
    }
  }

  if (blocked) {
    return (
      <p className="text-sm text-muted">
        This browser blocks local storage, so the opt-out switch cannot be
        saved, visit statistics are most likely already not being recorded.
        <br />
        이 브라우저는 로컬 저장소를 차단하고 있어 설정을 저장할 수 없습니다.
        (이 경우 방문 기록도 대부분 수집되지 않습니다.)
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        {optedOut === null
          ? "Checking this browser's setting… / 설정을 확인하는 중…"
          : optedOut
            ? "Visit statistics are OFF in this browser. / 이 브라우저에서는 방문 통계를 수집하지 않습니다."
            : "Visit statistics are ON in this browser. / 이 브라우저에서는 방문 통계가 수집됩니다."}
      </p>
      <button
        type="button"
        onClick={toggle}
        disabled={optedOut === null}
        aria-pressed={optedOut === true}
        className="shrink-0 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-40 sm:self-auto"
      >
        {optedOut
          ? "Turn statistics back on / 수집 재개"
          : "Stop collecting on this browser / 수집 중단"}
      </button>
    </div>
  );
}

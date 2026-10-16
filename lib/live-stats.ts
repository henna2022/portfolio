"use client";

// 4F 숫자 칸을 운영 중인 사이트의 실시간 합계로 바꾼다. 못 받으면(오프라인·CSP·서버 다운)
// exhibit.ts 의 정적 숫자가 그대로 남는다. 받는 값은 개인정보 없는 합계뿐이다.
import { useEffect, useState } from "react";

type Fig = { v: string; vKo?: string; en: string; ko: string };
type PublicStats = { bookings: number; people: number; visits: number; countries: number; searchSocialPct: number };

// 예약 사이트 /api/public-stats (5분 캐시). 예약은 누적, 방문은 2026-10-15 오픈부터. 예약이 0건이면 정적 숫자를 쓴다.
const sources: Record<string, { url: string; toFigures: (s: PublicStats | null) => Fig[] | null }> = {
  "raim-en": {
    url: "https://visitseoulraim.com/api/public-stats",
    toFigures: (s) => {
      if (!(s && s.bookings >= 1)) return null;
      const n = (x: number) => Number(x).toLocaleString("en-US");
      return [
        { v: n(s.bookings), en: `bookings so far · ${n(s.people)} people`, ko: `누적 예약 · ${n(s.people)}명` },
        { v: n(s.visits), en: `site visits since opening · ${n(s.countries)} countries`, ko: `오픈 후 사이트 방문 · ${n(s.countries)}개국` },
        { v: `${s.searchSocialPct}%`, en: "of visits from search or social media", ko: "검색·SNS 유입" },
      ];
    },
  },
};

export const liveCaption = { en: "Live from the booking site · updated every 5 minutes", ko: "예약 사이트 실시간 집계 · 5분마다 갱신" };

export function useLiveFigures(slug: string): Fig[] | null {
  const [figs, setFigs] = useState<Fig[] | null>(null);
  useEffect(() => {
    const src = sources[slug];
    if (!src) return;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 6000);
    fetch(src.url, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => setFigs(src.toFigures(s)))
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      ctl.abort();
    };
  }, [slug]);
  return figs;
}

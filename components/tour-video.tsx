"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";

type Tour = NonNullable<Project["tour"]>;

// 첫 장면 그림은 영상과 같은 경로의 .jpg
const posterOf = (video: string) => assetPath(video.replace(/\.mp4$/, ".jpg"));
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

// 홈 카드 표지. 화면에 들어왔을 때만 받아서 소리 없이 반복하고,
// 동작 줄이기를 켠 사람에게는 첫 장면만 보인다. 누구나 단추로 멈출 수 있다.
// 멈춤 단추는 링크 밖 형제로 둔다(링크 안에는 단추를 넣을 수 없다).
export function CoverVideo({ src, href, label }: { src: string; href: string; label: string }) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  // null = 아직 모름(서버 렌더). 동작 줄이기 설정을 읽은 뒤에 정한다.
  const [playing, setPlaying] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!reduce.matches);
    // 보는 중에 동작 줄이기를 켜면 바로 멈춘다. 다시 끄면 단추로 직접 튼다
    const onChange = () => {
      if (reduce.matches) setPlaying(false);
    };
    reduce.addEventListener("change", onChange);
    return () => reduce.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || playing === null) return;
    if (!playing) {
      el.pause();
      return;
    }
    el.muted = true; // React 는 muted 속성을 서버 마크업에 싣지 않는다. 자동 재생 정책은 이 값을 본다
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 자동 재생을 막는 환경(아이폰 저전력 모드 등)에서는 단추를 「재생」 상태로 돌려 둔다
        // 이미 단추로 튼 영상은 다시 건드리지 않는다(동작 밖 play() 는 그런 환경에서 거절된다)
        if (!entry.isIntersecting) el.pause();
        else if (el.paused) el.play().catch((error) => error.name === "NotAllowedError" && setPlaying(false));
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playing, src]);

  return (
    <div className="cover-video">
      <Link href={href} aria-label={label} className="rounded-xl">
        <div className="work-cover">
          <video ref={video} src={assetPath(src)} poster={posterOf(src)} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        </div>
      </Link>
      <button
        type="button"
        className="cover-video-toggle"
        aria-label={playing ? t.pauseVideo : t.playVideo}
        onClick={() => {
          // 켤 때는 누른 그 순간에 재생을 건다(자동 재생이 막힌 환경은 사용자 동작 안에서만 허용한다)
          if (!playing) video.current?.play().catch(() => {});
          setPlaying(!playing);
        }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M5 3l8 5-8 5z" />}
        </svg>
      </button>
    </div>
  );
}

// 상세 「둘러보기」: 영상(브라우저 기본 조작 단추)과 장 목록. 장을 누르면 그 시각으로 옮겨 재생한다.
export function TourSection({ tour, label }: { tour: Tour; label: string }) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(-1);

  function jump(at: number) {
    const el = video.current;
    if (!el) return;
    el.currentTime = at;
    el.play().catch(() => {});
    // 휴대폰에서는 목록이 영상 아래에 있어 영상이 화면 밖일 수 있다. 보이는 데까지만 올린다
    el.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <section className="mt-12" aria-labelledby="tour-title">
      <h2 id="tour-title" className="font-display text-2xl font-semibold">
        {t.tour}
      </h2>
      <p className="mt-1 text-sm text-muted">{tour.note}</p>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <video
          ref={video}
          src={assetPath(tour.video)}
          poster={posterOf(tour.video)}
          controls
          muted
          playsInline
          preload="none"
          aria-label={`${label}: ${t.tour}`}
          onTimeUpdate={(e) => {
            const now = e.currentTarget.currentTime;
            setCurrent(tour.chapters.reduce((found, chapter, i) => (now >= chapter.at - 0.5 ? i : found), -1));
          }}
          // 상자를 그림(8:7)보다 길게 잡고 그림을 위에 붙인다: 브라우저 기본 조작 막대가 그림 아래 띠에 놓여 구운 자막을 가리지 않는다.
          //   띠 색은 영상 제목 장과 같은 청록.
          // zoom 되돌리기: 사파리는 페이지 zoom 안에서 기본 조작 막대를 엉뚱한 자리에 그린다(상자 크기는 그대로).
          // max-h: 가로로 넓고 낮은 창에서 영상이 화면보다 길어지지 않게. scroll-mt: 붙어 있는 머리줄 아래로
          className="aspect-[8/9] max-h-[80svh] w-full scroll-mt-24 rounded-2xl bg-[#0C3A45] object-top [zoom:calc(1/var(--page-zoom))] sm:aspect-square lg:col-start-2 lg:row-start-1"
        />
        <ol className="min-w-0 space-y-1 lg:col-start-1 lg:row-start-1">
          {tour.chapters.map((chapter, i) => (
            <li key={chapter.at}>
              <button
                type="button"
                onClick={() => jump(chapter.at)}
                aria-current={i === current ? "true" : undefined}
                // 국문 단추는 기본이 한 줄(nowrap)이라 문장이 들어가는 이 단추만 줄바꿈을 푼다
                className="group flex w-full gap-4 whitespace-normal rounded-xl px-4 py-3 text-left transition-colors hover:bg-sand/60 aria-[current=true]:bg-sand/60"
              >
                {/* 재생 중인 장은 시각을 진하게: 마우스를 올린 줄(바탕만 같음)과 구분된다 */}
                <span className="w-9 shrink-0 text-sm leading-[1.6] tabular-nums text-muted group-aria-[current=true]:font-semibold group-aria-[current=true]:text-ink">{clock(chapter.at)}</span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-ink">{chapter.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">{chapter.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

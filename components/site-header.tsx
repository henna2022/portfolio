"use client";

// 헤더 = 엘리베이터 버튼 패널. 지금 보고 있는 층의 버튼에 불이 들어오고,
// 데스크톱에서는 옆 표시창이 층 이름을 위아래로 굴려 보여 준다.
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { KO_ENABLED } from "@/lib/i18n";
import { floors, siteStrings, bi, type FloorId } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { ArrowDown, DownloadPicto } from "./pictos";
import { SunIcon, MoonIcon } from "./icons";

const ORDER: FloorId[] = ["4F", "3F", "2F", "1F", "INFO"];

function ThemeButton({ label }: { label: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={label}
      aria-pressed={dark}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        // 브라우저 상단 바 색도 고른 테마를 따라가게
        document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
          m.setAttribute("content", next ? "#111110" : "#F3F1EC");
          m.removeAttribute("media");
        });
        try {
          localStorage.setItem("theme", next ? "dark" : "light");
        } catch {}
      }}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

// home: 홈에서는 스크롤 위치로 층을 정한다. 상세 페이지에서는 그 작품의 층에 고정.
export function SiteHeader({ fixedFloor }: { fixedFloor?: FloorId }) {
  const { lang, setLang } = useI18n();
  const s = siteStrings(lang);
  const [current, setCurrent] = useState<FloorId | null>(fixedFloor ?? null);
  const [dir, setDir] = useState<"down" | "up">("down");
  const [scrolled, setScrolled] = useState(false);
  const prev = useRef<FloorId | null>(fixedFloor ?? null);
  const nav = useRef<HTMLElement>(null);
  const home = !fixedFloor;

  // 휴대폰: 가로로 넘기는 층 버튼 줄에서 지금 층 버튼이 늘 보이게
  useEffect(() => {
    const el = nav.current;
    const btn = el?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!el || !btn || el.scrollWidth <= el.clientWidth) return;
    const left = el.scrollLeft + btn.getBoundingClientRect().left - el.getBoundingClientRect().left - 16;
    el.scrollTo({ left, behavior: "smooth" });
  }, [current]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-floor]"));
    let raf = 0;
    const pick = () => {
      // 화면 위에서 40% 지점을 지나간 마지막 층
      const line = window.innerHeight * 0.4;
      let found: FloorId | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) found = el.dataset.floor as FloorId;
      }
      if (found !== prev.current) {
        const a = prev.current ? ORDER.indexOf(prev.current) : -1;
        const b = found ? ORDER.indexOf(found) : -1;
        setDir(b >= a ? "down" : "up");
        prev.current = found;
        setCurrent(found);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [home]);

  const cur = current ? floors.find((f) => f.id === current)! : null;
  const href = (anchor: string) => (home ? `#${anchor}` : `${assetPath("/")}#${anchor}`);

  return (
    <header className="site-header" data-scrolled={scrolled || !home}>
      <div className="shell site-header__inner">
        <a className="wordmark" href={home ? "#top" : assetPath("/")}>
          <b>Juwon Lee</b>
          <span lang="ko">이주원</span>
        </a>

        <nav className="elevator" aria-label={s.elevator} ref={nav}>
          <div className="elevator__display" aria-hidden="true">
            <span className="elevator__arrow" data-dir={dir}>
              <ArrowDown />
            </span>
            <div className="elevator__readout">
              <span className="elevator__line" data-dir={dir} key={`${current}-${lang}`}>
                {cur ? (
                  <>
                    <b>{cur.id === "INFO" ? "i" : cur.id}</b>
                    {bi(lang, cur.name)}
                  </>
                ) : (
                  <>
                    <b>L</b>
                    {s.lobby}
                  </>
                )}
              </span>
            </div>
          </div>
          <ul className="elevator__buttons">
            {floors.map((f) => (
              <li key={f.id}>
                {/* 층 번호는 떼고 이름만 (본인 요청 2026-10-05) */}
                <a
                  className="elevator__btn"
                  href={href(f.anchor)}
                  aria-current={current === f.id ? "true" : undefined}
                >
                  <span className="elevator__lbl">{bi(lang, f.short)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hdr-actions">
          <a
            className="hdr-link"
            href={assetPath(lang === "ko" ? person.resumeKo : person.resume)}
            download
          >
            <DownloadPicto />
            {s.resume}
          </a>
          {KO_ENABLED ? (
            <>
              <div className="lang-seg" role="group" aria-label="Language">
                {(["en", "ko"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={lang === l}
                    onClick={() => setLang(l)}
                  >
                    {l === "ko" ? "KO" : "EN"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="icon-btn lang-one"
                aria-label={s.langSwitch}
                onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              >
                {lang === "ko" ? "EN" : "한"}
              </button>
            </>
          ) : null}
          <ThemeButton label={s.themeSwitch} />
        </div>
      </div>
    </header>
  );
}

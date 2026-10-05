"use client";

// 로비(첫 화면). 벽에는 건물 이름처럼 큰 이름, 바닥선 위에는 걸어 들어와 인사하는
// 도슨트 로봇과 층별 안내 입간판. 이름·문구·안내판은 DOM 이라 로봇보다 먼저 그려진다.
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { hero } from "@/lib/data";
import { heroKo } from "@/lib/data-ko";
import { floors, siteStrings, bi, biOther, glance, jobLine } from "@/lib/exhibit";
import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useI18n } from "./lang-provider";
import { floorPicto, ArrowDown, ArrowRight, DownloadPicto } from "./pictos";
import { KoText, nbHyphen } from "./rich";
import { LobbyName } from "./lobby-name";

const DocentRobot = dynamic(() => import("./docent-robot"), { ssr: false });

// three.js 청크가 실패해도 로비는 멀쩡하게 남는다
class RobotGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Lobby() {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const h = lang === "ko" ? heroKo : hero;
  const stage = useRef<HTMLDivElement>(null);
  const [targetPx, setTargetPx] = useState(0);
  const [trackW, setTrackW] = useState<number | null>(null);

  // 로봇이 멈출 자리 = 무대 가운데 (휴대폰 띠에서는 오른쪽 2/3 지점)
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    // 데스크톱: 캔버스를 무대 왼쪽부터 화면 오른쪽 끝까지 늘려 로봇이 걸어 들어올 길을 만든다
    const measure = () => {
      const r = el.getBoundingClientRect();
      const narrow = window.innerWidth <= 860;
      setTrackW(narrow ? r.width : document.documentElement.clientWidth - r.left);
      setTargetPx(narrow ? r.width * 0.66 : r.width * 0.5);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);


  return (
    <section id="top" className="lobby" aria-labelledby="lobby-name">
      <div className="shell lobby__wall">
        <LobbyName text={lang === "ko" ? "이주원" : "Juwon Lee"} hangul={lang === "ko"} />
        {/* 실제 직함·소속을 먼저, 둘째 줄은 직무 분야 (본인 지정: 교육 기획 · 개발) */}
        <p className="lobby__byline">
          <span className="lobby__job">{bi(lang, jobLine.title)}</span>
          <span className="lobby__jobmeta">{bi(lang, jobLine.meta)}</span>
        </p>
        <p className="lobby__role">
          <span>{s.role}</span>
          <i aria-hidden="true" />
          <span>
            <span lang={lang === "ko" ? "en" : "ko"}>{lang === "ko" ? "Juwon Lee" : "이주원"}</span> · {lang === "ko" ? "서울" : "Seoul"}
          </span>
        </p>
        <dl className="lobby__glance">
          {glance.map((g) => (
            <div key={g.k.en}>
              <dt className="mono">{bi(lang, g.k)}</dt>
              <dd>{nbHyphen(bi(lang, g.v))}</dd>
            </div>
          ))}
        </dl>

        <div className="lobby__floor">
          <div className="lobby__copy">
            <p className="lobby__headline">{nbHyphen(h.headline)}</p>
            <KoText className="lobby__sub" text={h.sub} />
            <div className="lobby__cta">
              <a className="btn btn--solid" href={assetPath(lang === "ko" ? person.resumeKo : person.resume)} download>
                <DownloadPicto />
                {s.resumePdf}
              </a>
              <a className="btn btn--line" href="#contact">
                {s.contactCta}
                <ArrowRight />
              </a>
            </div>
          </div>

          <div className="lobby__stage" ref={stage} aria-hidden="true">
            <div className="robot-track" style={trackW ? { width: trackW } : undefined}>
              {targetPx > 0 ? (
                <RobotGuard>
                  {/* 말풍선은 대문이 난잡해 보여 뺐다 (본인 요청 2026-10-05). 눌러서 반응하는 동작은 그대로 */}
                  <DocentRobot targetPx={targetPx} />
                </RobotGuard>
              ) : null}
            </div>
          </div>

          <div className="lobby__stand">
            <nav className="dirsign" aria-label={s.floorGuide}>
              <div className="dirsign__head">
                <strong>{s.floorGuide}</strong>
                {lang === "en" ? <span lang="ko">{s.floorGuideOther}</span> : null}
              </div>
              <ul className="dirsign__list">
                {floors.map((f) => {
                  const Picto = floorPicto[f.id];
                  return (
                    <li key={f.id}>
                      <a className="dirsign__row" href={`#${f.anchor}`}>
                        <span className="dirsign__floor">
                          {f.id === "INFO" ? (
                            <Picto className="dirsign__picto" />
                          ) : (
                            <>
                              {f.code}
                              <small>F</small>
                            </>
                          )}
                        </span>
                        <span className="dirsign__name">
                          {bi(lang, f.name)}
                          <small>
                            {lang === "en" ? (
                              <>
                                <span lang="ko">{biOther(lang, f.name)}</span> ·{" "}
                              </>
                            ) : null}
                            {bi(lang, f.sub)}
                          </small>
                        </span>
                        {f.id === "INFO" ? <span /> : <Picto className="dirsign__picto" />}
                        <ArrowDown className="dirsign__arrow" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="dirsign__posts" aria-hidden="true">
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

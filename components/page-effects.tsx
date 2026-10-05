"use client";

// 화면 전역 효과 두 가지. 레이아웃에 한 번만 붙인다.
// 1) .reveal 요소가 화면에 들어오면 .is-in 을 붙인다 (새로 그려진 요소도 MutationObserver 로 잡는다).
// 2) 한국어 모드에서 문단·문장의 마지막 줄이 한두 어절만 넘어가면 자간을 조금씩 줄여
//    한 줄로 붙인다(-0.01 ~ -0.05em). 안 되면 window.koTailReport 에 남긴다.
//    글자는 건드리지 않고 style.letterSpacing 만 바꾸므로 React 렌더와 충돌하지 않는다.
import { useEffect } from "react";

// 제목(h1~h3)은 text-wrap: balance 로 처리하고 여기서는 본문 블록만 본다
const TAIL_SEL = "main p:not(.mono), main li, main dd, main .sent";

function lineBoxes(el: Element) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0.5);
  if (!rects.length) return [];
  const lh = parseFloat(getComputedStyle(el).lineHeight) || rects[0].height;
  const lines: { top: number; left: number; right: number }[] = [];
  for (const r of rects) {
    const hit = lines.find((l) => Math.abs(l.top - r.top) < lh * 0.4);
    if (hit) {
      hit.left = Math.min(hit.left, r.left);
      hit.right = Math.max(hit.right, r.right);
    } else lines.push({ top: r.top, left: r.left, right: r.right });
  }
  return lines.sort((a, b) => a.top - b.top);
}

// 마지막 줄에 걸친 어절 수 (text node 를 어절 단위 Range 로 재서 센다)
function wordsOnLine(el: Element, top: number, tol: number) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let count = 0;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.textContent || "";
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      range.setStart(n, m.index);
      range.setEnd(n, m.index + m[0].length);
      const r = range.getClientRects();
      if (Array.from(r).some((x) => Math.abs(x.top - top) < tol)) count++;
    }
  }
  return count;
}

function hasTail(el: HTMLElement) {
  const lines = lineBoxes(el);
  if (lines.length < 2) return { tail: false, count: lines.length };
  const width = el.getBoundingClientRect().width;
  const last = lines[lines.length - 1];
  const cs = getComputedStyle(el);
  const fs = parseFloat(cs.fontSize) || 16;
  const lh = parseFloat(cs.lineHeight) || fs * 1.5;
  const lastW = last.right - last.left;
  if (lastW < Math.max(width * 0.22, fs * 3.2)) return { tail: true, count: lines.length };
  // 한두 어절만 내려간 줄도 꼬리로 본다 (줄 폭이 45% 넘으면 제외)
  const tail = lastW < width * 0.45 && wordsOnLine(el, last.top, lh * 0.4) <= 2;
  return { tail, count: lines.length };
}

function fixTails() {
  const report: string[] = [];
  const els = Array.from(document.querySelectorAll<HTMLElement>(TAIL_SEL));
  for (const el of els) {
    if (el.dataset.tailSet) {
      el.style.letterSpacing = "";
      delete el.dataset.tailSet;
    }
  }
  if (!document.documentElement.classList.contains("lang-ko")) return;
  for (const el of els) {
    // 문장 span 을 가진 문단은 문장 단위로 따로 본다
    if (el.querySelector(":scope > .sent")) continue;
    // 인라인이 아닌 자식을 가진 컨테이너(카드 li, 칩, 제목+작은 글)는 건너뛴다
    if (
      Array.from(el.children).some(
        (c) => !c.classList.contains("sr-only") && getComputedStyle(c).display !== "inline",
      )
    )
      continue;
    if (getComputedStyle(el).whiteSpace.startsWith("pre")) continue;
    if (!el.offsetParent) continue;
    const first = hasTail(el);
    if (!first.tail) continue;
    const base = parseFloat(getComputedStyle(el).letterSpacing) || 0;
    const fs = parseFloat(getComputedStyle(el).fontSize) || 16;
    let fixed = false;
    for (const step of [0.01, 0.02, 0.03, 0.04, 0.05]) {
      // 자간은 -0.05em 아래로 내리지 않는다
      const ls = Math.max(base / fs - step, -0.05);
      if (ls >= base / fs - 0.001) break;
      el.style.letterSpacing = `${ls}em`;
      el.dataset.tailSet = "1";
      const now = hasTail(el);
      if (now.count < first.count || !now.tail) {
        fixed = true;
        break;
      }
    }
    if (!fixed) {
      el.style.letterSpacing = "";
      delete el.dataset.tailSet;
      report.push((el.textContent || "").trim().slice(0, 60));
    }
  }
  (window as unknown as { koTailReport?: string[] }).koTailReport = report;
}

export function PageEffects() {
  useEffect(() => {
    // ── reveal ──
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            // 층 표지 타일은 clip-path 로 숨겨져 있어 자기 자신은 교차 0 이다. 부모를 보고 타일에 붙인다.
            e.target.querySelector(":scope > .floorsign__tile")?.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const watch = (root: ParentNode) => {
      root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
      root
        .querySelectorAll(".floorsign__tile:not(.is-in)")
        .forEach((el) => el.parentElement && io.observe(el.parentElement));
    };
    watch(document);

    // ── 운영 중 점의 맥박: 화면에 보이는 점만 움직인다 ──
    const dotIo = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("is-live", e.isIntersecting);
    });
    const watchDots = (root: ParentNode) =>
      root.querySelectorAll(".dot--on").forEach((el) => dotIo.observe(el));
    watchDots(document);

    // ── tails ──
    // 스크롤 중에 끼어들지 않게 브라우저가 한가할 때 돌린다
    let raf = 0;
    let idle = 0;
    const ric: (cb: () => void) => number =
      (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback?.bind(window) ?? ((cb) => window.setTimeout(cb, 120));
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        idle = ric(fixTails);
      });
    };
    // 헤더 표시창·로봇 말풍선·2F 열람창처럼 자주 바뀌는 곳은 무시하고,
    // 본문 문단이 새로 그려졌을 때(페이지 이동 등)만 다시 잰다
    const NOISY = ".site-header, .lobby__stage, .viewer, .errorpage__stage, .lightbox";
    const mo = new MutationObserver((muts) => {
      let content = false;
      for (const m of muts) {
        const t = m.target instanceof Element ? m.target : m.target.parentElement;
        if (t?.closest(NOISY)) continue;
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          watch(n.parentNode || n);
          watchDots(n);
          if (n.matches("p, li, dd, .sent") || n.querySelector("p, li, dd")) content = true;
        });
      }
      if (content) schedule();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const htmlMo = new MutationObserver(schedule);
    htmlMo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(schedule, 160);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(schedule);
    schedule();

    return () => {
      io.disconnect();
      dotIo.disconnect();
      mo.disconnect();
      htmlMo.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      (window as unknown as { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(idle);
    };
  }, []);
  return null;
}

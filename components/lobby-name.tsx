"use client";

// 대문 이름 타이포 모션.
// 1) 켜지기: 글자가 가늘고 좁은 상태에서 굵고 넓게 펴지며 파란 빛이 번졌다 꺼진다(간판 불 켜지듯).
// 2) 렌즈: 커서 가까운 글자는 넓고 굵어지며 파랗게 빛나고, 나머지는 그만큼 좁아져 단어 전체 폭은
//    거의 그대로다(넘치지 않게). 터치 기기에서는 켜진 뒤 빛이 한 번 저절로 훑고 지나간다.
// Archivo 는 폭(wdth)·굵기(wght) 축이 있고, 한글(프리텐다드)은 굵기 축만 쓴다.
// 동작 줄이기 설정이면 둘 다 하지 않는다.
import { useEffect, useRef } from "react";

const BASE_W = 112;
const BASE_G = 800;
const MAX_W = 125;
const MIN_W = 82;
const LENS_W = 26; // 렌즈 세기 (폭)
const LENS_G = 100; // 렌즈 세기 (굵기)

export function LobbyName({ text, hangul }: { text: string; hangul: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const chars = Array.from(text);

  useEffect(() => {
    const h1 = ref.current;
    if (!h1) return;
    const letters = Array.from(h1.querySelectorAll<HTMLSpanElement>(".nm-ch"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      h1.dataset.state = "live";
      return;
    }

    // 현재값(부드럽게 따라가는 값)과 목표값, 마지막으로 쓴 값(같으면 다시 쓰지 않는다)
    const cur = letters.map(() => ({ w: BASE_W, g: BASE_G, glow: 0 }));
    const written = letters.map(() => "");
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (!onScreen) pointer = null;
    });
    io.observe(h1);
    let centers: number[] = [];
    let slopes: number[] = [];
    let box = { top: 0, bottom: 0, left: 0, right: 0 };
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let live = false;
    let sweep: { t0: number } | null = null;

    // 글자마다 폭이 wdth 에 얼마나 민감한지(기울기)를 한 번 재 둔다 → 폭 보존 계산에 쓴다
    const calibrate = () => {
      const measure = (w: number) =>
        letters.map((el) => {
          el.style.fontVariationSettings = `"wdth" ${w}, "wght" ${BASE_G}`;
          return el.getBoundingClientRect().width;
        });
      const lo = measure(90);
      const hi = measure(120);
      slopes = lo.map((v, i) => Math.max(0.0001, (hi[i] - v) / 30));
      letters.forEach((el) => (el.style.fontVariationSettings = `"wdth" ${BASE_W}, "wght" ${BASE_G}`));
      const rects = letters.map((el) => el.getBoundingClientRect());
      centers = rects.map((r) => r.left + r.width / 2 + window.scrollX);
      const r = h1.getBoundingClientRect();
      box = {
        top: r.top + window.scrollY,
        bottom: r.bottom + window.scrollY,
        left: r.left + window.scrollX,
        right: r.right + window.scrollX,
      };
    };

    const sigma = () => {
      const span = box.right - box.left;
      return Math.max(40, (span / Math.max(1, letters.length)) * 1.05);
    };

    const targets = () => {
      let px: number | null = null;
      let vy = 0;
      if (sweep) {
        const t = (performance.now() - sweep.t0) / 1800;
        if (t >= 1) sweep = null;
        else {
          const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          px = box.left - 80 + (box.right - box.left + 160) * e;
          vy = 1;
        }
      }
      if (px === null && pointer) {
        px = pointer.x;
        const h = box.bottom - box.top;
        const dy = Math.max(0, Math.abs(pointer.y - (box.top + box.bottom) / 2) - h / 2);
        vy = Math.max(0, 1 - dy / (h * 1.6));
      }
      const s = sigma();
      const g = centers.map((c) => (px === null ? 0 : Math.exp(-((px - c) ** 2) / (2 * s * s)) * vy));
      // 폭 보존: 기울기 가중 평균만큼 빼서 늘어난 만큼 다른 글자가 줄어든다
      const sw = slopes.reduce((a, b) => a + b, 0);
      const mean = sw ? g.reduce((a, v, i) => a + v * slopes[i], 0) / sw : 0;
      return g.map((v) => ({
        w: hangul ? BASE_W : Math.min(MAX_W, Math.max(MIN_W, BASE_W + LENS_W * (v - mean))),
        g: Math.min(900, BASE_G + LENS_G * v * (hangul ? 1 : 1)),
        glow: v,
      }));
    };

    const frame = () => {
      raf = 0;
      const tg = targets();
      let moving = false;
      tg.forEach((t, i) => {
        const c = cur[i];
        c.w += (t.w - c.w) * 0.16;
        c.g += (t.g - c.g) * 0.16;
        c.glow += (t.glow - c.glow) * 0.16;
        if (Math.abs(t.w - c.w) > 0.05 || Math.abs(t.g - c.g) > 0.5 || Math.abs(t.glow - c.glow) > 0.003) moving = true;
        const el = letters[i];
        const fvs = `"wdth" ${c.w.toFixed(1)}, "wght" ${c.g.toFixed(0)}`;
        const glow = c.glow.toFixed(2);
        const key = fvs + glow;
        if (key !== written[i]) {
          written[i] = key;
          el.style.fontVariationSettings = fvs;
          el.style.setProperty("--glow", glow);
        }
      });
      if (moving || sweep) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (live && !raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (!onScreen) return;
      pointer = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };
    const onResize = () => {
      if (!live) return;
      calibrate();
      kick();
    };

    // 켜지기 애니메이션이 끝나면 렌즈를 켠다
    const last = letters[letters.length - 1];
    const start = () => {
      if (live) return;
      live = true;
      h1.dataset.state = "live";
      calibrate();
      if (!matchMedia("(hover: hover)").matches) {
        sweep = { t0: performance.now() };
      }
      kick();
    };
    last?.addEventListener("animationend", start, { once: true });
    const fallback = window.setTimeout(start, 4500);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [text, hangul]);

  return (
    <h1 ref={ref} id="lobby-name" className="lobby__name" aria-label={text} data-state="intro" key={text}>
      <span aria-hidden="true">
        {chars.map((c, i) =>
          c === " " ? (
            <span key={i} className="nm-sp">
              {" "}
            </span>
          ) : (
            <span key={i} className="nm-ch" style={{ ["--i" as string]: i }}>
              {c}
            </span>
          ),
        )}
      </span>
    </h1>
  );
}

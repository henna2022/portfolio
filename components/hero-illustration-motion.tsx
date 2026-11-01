"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero-illustration-motion.module.css";

const codeLines = [
  ["if", " (dry) water()"],
  ["model.train", "(photos)"],
  ["book", "({ seats: 10 })"],
  ["kiosk.lang", ' = "en"'],
  ["face.toShapes", "()"],
  ["<Mission", " id={6} />"],
] as const;

export function HeroIllustrationMotion() {
  const layer = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const target = layer.current;
    if (!target) return;

    let inView = false;
    const syncPlayback = () => setPlaying(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(target);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <div ref={layer} aria-hidden="true" className={styles.layer} data-playing={playing}>
      {codeLines.map(([keyword, rest], index) => (
        <div key={index} className={`${styles.item} ${styles.code}`}
          style={{ animationDelay: `${800 + index * 3300}ms` }}>
          <code><span className={styles.keyword}>{keyword}</span>{rest}</code>
        </div>
      ))}
    </div>
  );
}

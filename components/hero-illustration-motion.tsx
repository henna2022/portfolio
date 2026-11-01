"use client";

import styles from "./hero-illustration-motion.module.css";

const codeLines = [
  ["if", " (dry) water()"],
  ["model.train", "(photos)"],
  ["book", "({ seats: 10 })"],
  ["kiosk.lang", ' = "en"'],
  ["face.toShapes", "()"],
  ["<Mission", " id={6} />"],
] as const;

export function HeroIllustrationMotion({ playing }: { playing: boolean }) {
  return (
    <div aria-hidden="true" className={styles.layer} data-playing={playing}>
      {codeLines.map(([keyword, rest], index) => (
        <div key={index} className={`${styles.item} ${styles.code}`}
          style={{ animationDelay: `${800 + index * 3300}ms` }}>
          <code><span className={styles.keyword}>{keyword}</span>{rest}</code>
        </div>
      ))}
    </div>
  );
}

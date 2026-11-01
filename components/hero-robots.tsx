"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset";
import { HeroIllustrationMotion } from "./hero-illustration-motion";
import styles from "./hero-robots.module.css";

export function HeroRobots({ label }: { label: string }) {
  const scene = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const target = scene.current;
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
    <div ref={scene} role="img" aria-label={label} className={styles.scene} data-playing={playing}>
      <div aria-hidden="true" className={`${styles.shadow} ${styles.deskShadow}`} />
      <img src={assetPath("/illustration/robots/desk.webp")} alt="" aria-hidden="true"
        width={900} height={558} loading="eager" decoding="async" className={styles.desk} />
      <div aria-hidden="true" className={styles.seed}>
        <div className={`${styles.shadow} ${styles.seedShadow} ${styles.animated}`} />
        <div className={`${styles.seedBody} ${styles.animated}`}>
          {(["hold", "cheer", "wave"] as const).map((pose) => (
            <img key={pose} src={assetPath(`/illustration/robots/seed-${pose}.webp`)} alt="" aria-hidden="true"
              width={417} height={640} loading="eager" decoding="async"
              className={`${styles.pose} ${styles[`seed_${pose}`]} ${styles.animated}`} />
          ))}
        </div>
      </div>
      <div aria-hidden="true" className={`${styles.wheelTravel} ${styles.animated}`}>
        <div className={`${styles.shadow} ${styles.wheelShadow} ${styles.animated}`} />
        <div className={`${styles.wheelBody} ${styles.animated}`}>
          {(["mug", "idle", "wave"] as const).map((pose) => (
            <img key={pose} src={assetPath(`/illustration/robots/wheel-${pose}.webp`)} alt="" aria-hidden="true"
              width={584} height={640} loading="eager" decoding="async"
              className={`${styles.pose} ${styles[`wheel_${pose}`]} ${styles.animated}`} />
          ))}
        </div>
      </div>
      <HeroIllustrationMotion playing={playing} />
    </div>
  );
}

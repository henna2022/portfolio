"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// 동작 줄이기를 켠 사용자에게는 부드러운 스크롤을 끄고, framer-motion 효과도 줄인다.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {reduced ? children : (
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}

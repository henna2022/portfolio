import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ease } from "@/lib/motion";

export function SkillsDrag() {
  const { locale } = useLocale();
  const t = dict[locale];
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  // Touch devices use native horizontal swipe; mouse gets drag-to-scroll.
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || !ref.current) return;
    ref.current.scrollLeft =
      drag.current.startLeft - (e.clientX - drag.current.startX);
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    ref.current?.releasePointerCapture?.(e.pointerId);
  }

  return (
    <section id="skills" className="mx-auto max-w-shell px-6 py-16">
      <div className="mb-6 flex items-end justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
        >
          {t.skillsHeading}
        </motion.h2>
        <span className="hidden text-xs text-muted sm:block">
          {t.swipeHint}
        </span>
      </div>

      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ touchAction: "pan-x" }}
        className="no-scrollbar flex cursor-grab gap-3 overflow-x-auto pb-1 active:cursor-grabbing"
      >
        {skills.map((s) => (
          <span
            key={s}
            className="font-display shrink-0 select-none whitespace-nowrap rounded-full border border-ink/15 bg-sand/60 px-5 py-3 text-lg font-medium text-ink/80"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

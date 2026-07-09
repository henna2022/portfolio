"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const stack = ["Next.js", "YOLOv8", "ESP32", "Supabase", "Python"];

export function InfoBand() {
  return (
    <section className="mx-auto max-w-shell px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
        className="grid gap-8 rounded-4xl bg-ink p-8 text-cream sm:grid-cols-3 sm:p-10"
      >
        <div className="flex flex-col justify-between gap-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
            Focus
          </p>
          <p className="font-display text-xl font-medium leading-snug">
            AI education, robotics, and full-stack products that reach real
            users.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-cream/15 px-3 py-1.5 text-xs text-cream/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
            Currently
          </p>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-medium text-lime-ink">
              <span className="h-2 w-2 rounded-full bg-lime-ink" />
              Open to new opportunities
            </span>
            <p className="mt-3 text-sm text-cream/50">
              AI &amp; Robotics Educator @ Seoul Robot &amp; AI Science Museum
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

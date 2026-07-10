"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ease } from "@/lib/motion";

const stack = ["Next.js", "YOLOv8", "ESP32", "Supabase", "Python"];

export function InfoBand() {
  const { locale } = useLocale();
  const t = dict[locale];
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
            {t.infoFocus}
          </p>
          <p className="font-display text-xl font-medium leading-snug">
            {t.infoFocusText}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
            {t.infoStack}
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
            {t.infoCurrently}
          </p>
          <p className="text-sm text-cream/50">{t.infoCurrentlyText}</p>
        </div>
      </motion.div>
    </section>
  );
}

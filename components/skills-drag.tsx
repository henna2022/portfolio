"use client";

import { motion, type Variants } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { skillGroupsKo } from "@/lib/data-ko";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ease } from "@/lib/motion";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function SkillsDrag() {
  const { locale } = useLocale();
  const t = dict[locale];
  const ko = locale === "ko";

  return (
    <section id="skills" className="mx-auto max-w-shell px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="mb-8"
      >
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          {t.skillsHeading}
        </h2>
        <p className="mt-2 text-sm text-muted">{t.stackHint}</p>
      </motion.div>

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {skillGroups.map((g) => {
          const koG = ko ? skillGroupsKo[g.key] : undefined;
          return (
            <motion.div
              key={g.key}
              variants={card}
              className="flex flex-col rounded-4xl bg-sand/70 p-6"
            >
              <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
                {koG?.title ?? g.title}
              </h3>
              <p className="mt-2 text-lg leading-snug text-ink/80">
                {koG?.capability ?? g.capability}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-sand-deep px-2.5 py-1 text-[11px] text-ink/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

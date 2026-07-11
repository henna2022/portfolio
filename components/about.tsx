"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { about } from "@/lib/data";
import { aboutBioKo, aboutFactsKo } from "@/lib/data-ko";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ease } from "@/lib/motion";

function Word({
  word,
  strong,
  index,
  total,
  progress,
}: {
  word: string;
  strong: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 5) / total);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={strong ? "font-semibold text-ink" : "text-ink/35"}
    >
      {word}{" "}
    </motion.span>
  );
}

export function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const t = dict[locale];
  const ko = locale === "ko";

  const bio = ko ? aboutBioKo : about.bio;
  const facts = ko ? aboutFactsKo : about.facts;

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.55"],
  });

  // continuous word index across all blocks
  let counter = 0;
  const blocks = bio.map((block) =>
    block.map((word) => ({ ...word, i: counter++ })),
  );
  const total = counter;

  return (
    <section id="about" className="mx-auto max-w-shell px-6 py-20 text-center">
      <h2 className="sr-only">{t.nav.about}</h2>
      {/* Photo with ambient glow */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease }}
        className="relative mx-auto w-fit"
      >
        <div
          aria-hidden
          className="absolute -inset-8 rounded-[3rem] bg-lime/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -inset-3 rounded-[2.4rem] bg-lime/15 blur-2xl"
        />
        <img
          src={assetPath(about.photo)}
          alt="Juwon Lee"
          className="relative h-64 w-64 rounded-[2rem] object-cover object-[center_28%] shadow-[0_30px_60px_-20px_rgba(34,33,30,0.35)] sm:h-72 sm:w-72"
        />
      </motion.div>

      {/* Impact bio — words fill from light to ink on scroll */}
      <div
        ref={textRef}
        className="font-display mx-auto mt-14 max-w-3xl space-y-6 text-2xl font-medium leading-[1.4] tracking-[-0.01em] sm:text-[28px] sm:leading-[1.4]"
      >
        {blocks.map((block, bi) => (
          <p key={bi}>
            {block.map((word) => (
              <Word
                key={word.i}
                word={word.w}
                strong={word.s}
                index={word.i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </p>
        ))}
      </div>

      {/* See more → reveals facts */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream"
      >
        {open ? t.seeLess : t.seeMore}
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="facts"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <dl className="mx-auto mt-10 grid max-w-2xl gap-x-10 gap-y-6 border-t border-ink/10 pt-8 text-left sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-sm text-ink/80">{f.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

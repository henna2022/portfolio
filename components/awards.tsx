"use client";

import { motion, type Variants } from "framer-motion";
import { awards } from "@/lib/data";
import { ImageCarousel } from "./image-carousel";
import { ease } from "@/lib/motion";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Awards() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-10 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        Awards
      </motion.h2>

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {awards.map((a) => (
          <motion.div
            key={a.title}
            variants={card}
            className="flex flex-col rounded-4xl bg-sand/70 p-5"
          >
            <ImageCarousel images={a.photos} alt={a.title} />

            <div className="flex flex-1 flex-col px-2 pb-2">
              <div className="mt-5 flex items-start justify-between gap-3">
                <span className="text-xs font-medium text-muted">{a.year}</span>
                <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-lime-ink">
                  {a.result}
                </span>
              </div>

              <h3 className="font-display mt-1 text-xl font-semibold leading-snug">
                {a.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{a.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {a.topic}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

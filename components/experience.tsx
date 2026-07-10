"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { ease } from "@/lib/motion";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-10 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        Experience
      </motion.h2>

      <div className="space-y-3">
        {experience.map((e, i) => (
          <motion.div
            key={e.org}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="rounded-4xl bg-sand/60 p-7"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="font-display text-xl font-semibold">{e.org}</p>
                <p className="mt-1 text-sm text-muted">{e.role}</p>
                <p className="mt-2 text-xs text-muted">{e.period}</p>
              </div>
              <ul className="space-y-2">
                {e.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink/75"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {"gallery" in e && e.gallery ? (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((idx) => {
                  const src = (e.gallery as string[])[idx];
                  return src ? (
                    <div
                      key={idx}
                      className="aspect-[3/4] overflow-hidden rounded-2xl bg-sand-deep"
                    >
                      <img
                        src={assetPath(src)}
                        alt={`${e.org} — on site`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-sand/40 text-xs text-muted"
                    >
                      Coming soon
                    </div>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

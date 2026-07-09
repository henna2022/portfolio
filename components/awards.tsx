"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { awards } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { ArrowIcon } from "./icons";
import { ease } from "@/lib/motion";

export function Awards() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-8 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        Awards
      </motion.h2>

      <div className="border-t border-ink/10">
        {awards.map((a, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              className="border-b border-ink/10"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="font-display w-14 shrink-0 text-sm text-muted">
                  {a.year}
                </span>
                <span className="font-display flex-1 text-lg font-medium">
                  {a.title}
                </span>
                <span className="hidden shrink-0 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-lime-ink sm:block">
                  {a.result}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="shrink-0 text-muted group-hover:text-ink"
                >
                  <ArrowIcon className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-8 pl-0 sm:grid-cols-[1.3fr_1fr] sm:pl-[4.5rem]">
                      <dl className="space-y-4 self-center">
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Result
                          </dt>
                          <dd className="mt-1 text-sm text-ink/80">{a.result}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Role
                          </dt>
                          <dd className="mt-1 text-sm text-ink/80">{a.role}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Topic
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink/80">
                            {a.topic}
                          </dd>
                        </div>
                      </dl>

                      {a.photo ? (
                        <div className="overflow-hidden rounded-2xl bg-sand-deep">
                          <img
                            src={assetPath(a.photo)}
                            alt={`${a.title} — competition`}
                            loading="lazy"
                            className="h-full max-h-72 w-full object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

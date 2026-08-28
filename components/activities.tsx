"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { activities } from "@/lib/data";
import { activitiesKo } from "@/lib/data-ko";
import { ImageCarousel } from "./image-carousel";
import { useI18n } from "./lang-provider";
import { ArrowIcon } from "./icons";
import { ease } from "@/lib/motion";

export function Activities() {
  const [open, setOpen] = useState<number | null>(null);
  const { t, lang } = useI18n();
  const items = lang === "ko" ? activitiesKo : activities;

  return (
    <section id="activities" className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-8 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        {t.activitiesHeading}
      </motion.h2>

      <div className="border-t border-ink/10">
        {items.map((a, i) => {
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
                className="group -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-2xl px-3 py-5 text-left transition-colors hover:bg-sand/40"
              >
                <span className="grid flex-1 grid-cols-[1fr] items-baseline gap-x-6 gap-y-1 sm:grid-cols-[150px_1fr_auto]">
                  <span className="font-display order-2 text-xs text-muted sm:order-1 sm:text-sm">
                    {a.period}
                  </span>
                  <span className="font-display order-1 text-lg font-medium sm:order-2">
                    {a.title}
                  </span>
                  <span className="order-3 text-sm text-muted sm:text-right">
                    {a.role}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sand/60 px-3 py-1.5 text-xs font-medium text-ink/70 transition-colors group-hover:bg-sand group-hover:text-ink">
                  {isOpen ? t.seeLess : t.seeMore}
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="inline-flex"
                  >
                    <ArrowIcon className="h-3 w-3" />
                  </motion.span>
                </span>
              </button>

              {/* Body stays mounted (so it prerenders into the static HTML)
                  and animates height 0 <-> auto, matching the old awards
                  accordion's expand/collapse. */}
              <motion.div
                initial={false}
                animate={
                  isOpen
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.4, ease }}
                style={{ height: 0, opacity: 0 }}
                aria-hidden={!isOpen}
                className="overflow-hidden"
              >
                <div className="grid gap-6 pb-8 pl-0 sm:grid-cols-[1.3fr_1fr] sm:pl-[174px]">
                  <p className="max-w-prose self-center text-sm leading-relaxed text-ink/80">
                    {a.desc}
                  </p>

                  {a.photos.length > 0 ? (
                    <ImageCarousel images={a.photos} alt={a.title} fit={a.photoFit} />
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

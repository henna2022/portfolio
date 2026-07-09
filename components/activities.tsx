"use client";

import { motion } from "framer-motion";
import { activities } from "@/lib/data";
import { ease } from "@/lib/motion";

export function Activities() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-display mb-8 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
      >
        Activities
      </motion.h2>

      <div className="border-t border-ink/10">
        {activities.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease }}
            className="grid grid-cols-[1fr] items-baseline gap-x-6 gap-y-1 border-b border-ink/10 py-5 sm:grid-cols-[150px_1fr_auto]"
          >
            <span className="font-display order-2 text-xs text-muted sm:order-1 sm:text-sm">
              {a.period}
            </span>
            <span className="font-display order-1 text-lg font-medium sm:order-2">
              {a.title}
            </span>
            <span className="order-3 text-sm text-muted sm:text-right">
              {a.role}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

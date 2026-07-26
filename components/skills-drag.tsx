"use client";

import { motion, type Variants } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { ui } from "@/lib/i18n";
import { ease } from "@/lib/motion";
import { assetPath } from "@/lib/asset";

// Simple Icons (monochrome) downloaded into /public/icons. Items missing
// here (e.g. YOLOv8, Sensors, Slack — no icon on the CDN) render text-only.
const chipIcons: Record<string, string> = {
  "Next.js": "nextdotjs.svg",
  React: "react.svg",
  TypeScript: "typescript.svg",
  JavaScript: "javascript.svg",
  Supabase: "supabase.svg",
  "Firebase / Firestore": "firebase.svg",
  Flask: "flask.svg",
  Tailwind: "tailwindcss.svg",
  Vercel: "vercel.svg",
  Python: "python.svg",
  "Arduino · C++": "arduino.svg",
  MicroPython: "micropython.svg",
  Notion: "notion.svg",
  Roboflow: "roboflow.svg",
  ESP32: "espressif.svg",
};

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function SkillsDrag() {
  const t = ui;

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
      </motion.div>

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {skillGroups.map((g) => {
          return (
            <motion.div
              key={g.key}
              variants={card}
              className="flex flex-col rounded-4xl bg-sand/70 p-6"
            >
              {/* Group titles stay in English in both locales (design decision) */}
              <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
                {g.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {g.items.map((s) => {
                  const icon = chipIcons[s];
                  const iconUrl = icon
                    ? `url(${assetPath(`/icons/${icon}`)})`
                    : undefined;
                  return (
                    <span
                      key={s}
                      className="inline-flex items-center gap-2 rounded-full bg-sand-deep px-3 py-1.5 text-xs text-ink/70"
                    >
                      {iconUrl ? (
                        <span
                          aria-hidden
                          className="h-3.5 w-3.5 shrink-0 bg-current"
                          style={{
                            WebkitMaskImage: iconUrl,
                            maskImage: iconUrl,
                            WebkitMaskSize: "contain",
                            maskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                            maskPosition: "center",
                          }}
                        />
                      ) : null}
                      {s}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

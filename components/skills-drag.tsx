"use client";

import { motion, type Variants } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { skillGroupsKo } from "@/lib/data-ko";
import { useI18n } from "./lang-provider";
import { ease } from "@/lib/motion";
import { assetPath } from "@/lib/asset";

// Simple Icons (monochrome) downloaded into /public/icons. Items missing
// here (e.g. MobileNet v2, Sensors, Slack — no icon on the CDN) render text-only.
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
  "Arduino / C++": "arduino.svg",
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
  const { t, lang } = useI18n();
  const groups = lang === "ko" ? skillGroupsKo : skillGroups;

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
        {groups.map((g) => {
          return (
            <motion.div
              key={g.key}
              variants={card}
              className="flex flex-col rounded-4xl bg-sand/70 p-6"
            >
              {/* 제목·한 줄 소개는 로케일별로 갈리고(data-ko.ts 의 오버라이드),
                  칩(items)은 고유명사가 많아 두 언어 모두 영문을 쓴다 */}
              <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
                {g.title}
              </h3>
              {/* 칩만 나열하면 "왜 이렇게 묶였는지"가 안 보인다 —
                  그룹마다 무엇을 하는지 한 줄로 먼저 말한다 */}
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {g.capability}
              </p>
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

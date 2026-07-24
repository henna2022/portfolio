"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { ArrowIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import { ease } from "@/lib/motion";

const socials = [
  { label: "GitHub", href: person.github, Icon: GithubIcon },
  { label: "LinkedIn", href: person.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${person.email}`, Icon: MailIcon },
];

export function Contact() {
  const [today, setToday] = useState("");
  const { locale } = useLocale();
  const t = dict[locale];

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    );
  }, [locale]);

  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden bg-ink text-cream"
    >
      <div className="mx-auto max-w-shell px-6 pt-16">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease }}
        >
          <img
            src={assetPath(person.photoSm)}
            alt="Juwon Lee"
            loading="lazy"
            decoding="async"
            className="h-14 w-14 rounded-2xl object-cover object-[center_28%]"
          />
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            {t.contactHeading}
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              {t.getInTouch} <ArrowIcon />
            </a>
            <a
              href={`mailto:${person.email}`}
              className="text-sm text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              {person.email}
            </a>
          </div>
        </motion.div>

        {/* Divider + row */}
        <div className="mt-14 flex flex-col gap-6 border-t border-cream/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-cream/50">
            <span>{t.footerCopyright}</span>
            {today ? <span>{today}</span> : null}
          </div>
        </div>
      </div>

      {/* Giant faded name */}
      <div className="pointer-events-none select-none px-6">
        <p className="font-display translate-y-[12%] whitespace-nowrap text-[18vw] font-bold leading-[0.8] tracking-[-0.03em] text-cream/10">
          {person.name}
        </p>
      </div>
    </footer>
  );
}

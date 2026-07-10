"use client";

import { motion } from "framer-motion";
import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { useLocale } from "@/lib/locale";
import { dict } from "@/lib/i18n";
import { DownloadIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { SectionNav } from "./section-nav";
import { ease } from "@/lib/motion";

export function Header() {
  const { locale } = useLocale();
  const t = dict[locale];
  const ko = locale === "ko";
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink/5 bg-cream/70 backdrop-blur-md"
    >
      {/* Row 1 — brand + downloads + theme */}
      <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-6 py-2.5">
        <a
          href={assetPath("/")}
          className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold text-ink"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          {person.name}
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={assetPath(ko ? person.cvKo : person.cv)}
            download
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand sm:inline-flex"
          >
            <DownloadIcon /> {t.cv}
          </a>
          <a
            href={assetPath(ko ? person.resumeKo : person.resume)}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
          >
            <DownloadIcon /> {t.resume}
          </a>
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Row 2 — section nav (scroll-spy + smooth-scroll) */}
      <div className="border-t border-ink/5">
        <div className="mx-auto max-w-shell px-4 py-1.5">
          <SectionNav />
        </div>
      </div>
    </motion.header>
  );
}

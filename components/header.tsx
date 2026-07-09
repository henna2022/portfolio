"use client";

import { motion } from "framer-motion";
import { person, nav } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { DownloadIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { ease } from "@/lib/motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink/5 bg-cream/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-3">
        <a
          href={assetPath("/")}
          className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          {person.name}
        </a>

        <nav className="hidden items-center gap-8 text-sm text-ink/60 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={assetPath(n.href)}
              className="transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={assetPath(person.cv)}
            download
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand sm:inline-flex"
          >
            <DownloadIcon /> CV
          </a>
          <a
            href={assetPath(person.resume)}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
          >
            <DownloadIcon /> Resume
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}

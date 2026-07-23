"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/60 text-ink transition-colors hover:bg-sand"
    >
      {mounted && dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

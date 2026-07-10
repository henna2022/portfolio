"use client";

import { useLocale, type Locale } from "@/lib/locale";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ko", label: "KO" },
];

// Compact EN / KO switch chip, same visual language as the header pills.
export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex h-9 items-center rounded-full border border-ink/15 p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLocale(o.value)}
          aria-pressed={locale === o.value}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            locale === o.value
              ? "bg-ink text-cream"
              : "text-ink/55 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

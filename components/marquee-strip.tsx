import { marqueeWords } from "@/lib/data";

export function MarqueeStrip() {
  return (
    <div className="marquee-mask overflow-hidden border-y border-ink/10 bg-cream py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {marqueeWords.map((w) => (
              <span
                key={w}
                className="font-display mx-6 flex items-center gap-6 text-xl font-medium text-ink/75"
              >
                {w} <span className="text-lime">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

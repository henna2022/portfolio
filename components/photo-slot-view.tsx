"use client";

import { assetPath } from "@/lib/asset";
import { uiKo } from "@/lib/i18n";
import type { photoSlots } from "@/lib/photos";
import { useI18n } from "./lang-provider";

export function PhotoSlotView({ slot, exists, priority }: {
  slot: (typeof photoSlots)[number]; exists: boolean; priority: boolean;
}) {
  const { lang } = useI18n();
  const file = `/photos/${slot.name}.jpg`;
  return (
    <div className="photo-slot" style={{ aspectRatio: slot.aspectRatio.replace(":", "/") }}>
      {exists ? (
        <img src={assetPath(file)} alt={slot.alt[lang]} loading={priority ? "eager" : "lazy"}
          decoding="async" className="h-full w-full object-cover" />
      ) : (
        <div className="photo-placeholder" lang="ko">
          <span>{uiKo.photoLabel} {slot.number} {slot.description}</span>
          <span>{slot.aspectRatio === "4:3" ? uiKo.photoLandscape : uiKo.photoPortrait} {slot.aspectRatio} · {slot.minimumSize} {uiKo.photoMinimum}</span>
          <span className="photo-path">public{file}</span>
        </div>
      )}
    </div>
  );
}

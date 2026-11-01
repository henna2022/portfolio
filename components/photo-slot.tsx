import { existsSync } from "node:fs";
import path from "node:path";
import { photoSlots, type PhotoName } from "@/lib/photos";
import { PhotoSlotView } from "./photo-slot-view";

// 개발 중 새 사진도 새로고침으로 반영한다.
export function PhotoSlot({ name, priority = false }: { name: PhotoName; priority?: boolean }) {
  const slot = photoSlots.find((photo) => photo.name === name)!;
  const exists = existsSync(path.join(process.cwd(), "public", "photos", `${name}.jpg`));
  return <PhotoSlotView slot={slot} exists={exists} priority={priority} />;
}

"use client";

// 층 첫머리. 왼쪽은 엘리베이터에서 내리면 보이는 층 표지(숫자 + 픽토그램 + 층 이름),
// 오른쪽은 그 층의 전시 제목과 설명.
import type { ReactNode } from "react";
import { floorById, bi, biOther, type FloorId } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { floorPicto } from "./pictos";
import { RichText } from "./rich";

export function FloorTile({ id, signal }: { id: FloorId; signal?: boolean }) {
  const { lang } = useI18n();
  const f = floorById(id);
  const Picto = floorPicto[id];
  return (
    <div className="floorsign__tile" data-signal={signal ? "" : undefined} aria-hidden="true">
      <div className="floorsign__top">
        {id === "INFO" ? (
          <Picto className="floorsign__num floorsign__num--picto" />
        ) : (
          <>
            <span className="floorsign__num">
              {f.code}
              <small>F</small>
            </span>
            <Picto className="floorsign__picto" />
          </>
        )}
      </div>
      <span className="floorsign__name">
        {bi(lang, f.name)}
        {lang === "en" ? <small lang="ko">{biOther(lang, f.name)}</small> : null}
      </span>
    </div>
  );
}

export function FloorSign({
  id,
  signal,
  children,
}: {
  id: FloorId;
  signal?: boolean;
  children?: ReactNode;
}) {
  const { lang } = useI18n();
  const f = floorById(id);
  return (
    <header className="floorsign">
      <FloorTile id={id} signal={signal} />
      <div className="reveal">
        <h2 className="floorsign__title" id={`floor-${id}`}>
          <span className="sr-only">
            {f.id} {bi(lang, f.name)}.{" "}
          </span>
          {bi(lang, f.title)}
        </h2>
        {bi(lang, f.intro) ? (
          <div className="floorsign__intro">
            <RichText text={bi(lang, f.intro)} />
          </div>
        ) : null}
        {children ? <div className="floorsign__meta mono">{children}</div> : null}
      </div>
    </header>
  );
}

export function RoomSign({
  title,
  other,
  icon,
  as: As = "h3",
  id,
}: {
  title: string;
  other: string;
  icon: ReactNode;
  as?: "h2" | "h3";
  id?: string;
}) {
  return (
    <div className="roomsign">
      <span className="roomsign__tile" aria-hidden="true">
        {icon}
      </span>
      {/* 방 이름은 지금 언어 하나만 (두 언어 병기는 층 표지에만 둔다: 읽는 부담을 줄이려고) */}
      <As className="roomsign__name" id={id} data-other={other || undefined}>
        {title}
      </As>
    </div>
  );
}

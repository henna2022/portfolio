"use client";

// 사진 크게 보기. 네이티브 <dialog>.showModal() 이라 포커스가 안에 갇히고 배경은 inert 가 된다.
// Esc 로 닫고 ←/→ 로 넘긴다. 닫으면 연 버튼으로 포커스를 돌려준다.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { img as pic } from "@/lib/img";
import { siteStrings } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { ArrowLeft, ArrowRight, CloseIcon } from "./pictos";

export type Shot = { src: string; alt: string };

export function useLightbox() {
  const [state, setState] = useState<{ shots: Shot[]; i: number } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((shots: Shot[], i: number) => {
    opener.current = document.activeElement as HTMLElement;
    setState({ shots, i });
  }, []);
  const close = useCallback(() => {
    const el = opener.current;
    setState(null);
    requestAnimationFrame(() => el?.focus());
  }, []);
  const node = state ? (
    <Lightbox shots={state.shots} index={state.i} onIndex={(i) => setState({ ...state, i })} onClose={close} />
  ) : null;
  return { open, node };
}

function Lightbox({
  shots,
  index,
  onIndex,
  onClose,
}: {
  shots: Shot[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { lang } = useI18n();
  const s = siteStrings(lang);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = shots.length;
  const idx = useRef(index);
  idx.current = index;
  const go = (d: number) => onIndex((idx.current + d + n) % n);

  // 여는 순간 한 번만: 모달로 열고 닫기 버튼에 포커스
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (!d.open) d.showModal();
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    d.addEventListener("cancel", onCancel);
    return () => {
      d.removeEventListener("cancel", onCancel);
      document.body.style.overflow = prevOverflow;
      if (d.open) d.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (n < 2) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const shot = shots[index];
  return createPortal(
    <dialog ref={dialog} className="lightbox" aria-label={shot.alt} onKeyDown={onKeyDown}>
      <div className="lightbox__bar">
        <span className="mono" aria-live="polite">
          {index + 1} {s.of} {n}
        </span>
        <button ref={closeBtn} type="button" className="lb-btn" onClick={onClose} aria-label={s.close}>
          <CloseIcon />
        </button>
      </div>
      <div className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img {...pic(shot.src, "100vw")} alt={shot.alt} />
      </div>
      <div className="lightbox__foot">
        <p style={{ margin: 0, maxWidth: "70ch" }}>{shot.alt}</p>
        {n > 1 ? (
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="lb-btn" onClick={() => go(-1)} aria-label={s.prevObject}>
              <ArrowLeft />
            </button>
            <button type="button" className="lb-btn" onClick={() => go(1)} aria-label={s.nextObject}>
              <ArrowRight />
            </button>
          </div>
        ) : null}
      </div>
    </dialog>,
    document.body,
  );
}

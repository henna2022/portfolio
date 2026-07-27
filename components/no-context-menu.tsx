"use client";

import { useEffect } from "react";

// 사이트 전역 우클릭(컨텍스트 메뉴) 차단 — 이미지 무단 저장 억제가 목적.
// 이미지 드래그(드래그해서 저장/복사)도 함께 막지만, 텍스트 선택·복사는
// 건드리지 않는다(과잉 차단 금지). 루트 레이아웃에 마운트되는 순수 사이드
// 이펙트 컴포넌트라 화면에는 아무것도 렌더하지 않는다.
export function NoContextMenu() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    // 이미지만 드래그 저장을 막는다 — 텍스트 드래그 선택은 통과시킨다.
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}

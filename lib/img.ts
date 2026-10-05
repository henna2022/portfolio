// 사진은 public/img 에 미리 만들어 둔 WebP(480/960/1600px)로 내보낸다.
// 원본 경로(data.ts 의 /portfolio_images/...)를 받아 src·srcSet·sizes 를 돌려준다.
// 브라우저가 칸 크기에 맞는 파일만 받아 디코딩하므로 스크롤할 때 버벅임이 줄어든다.
// 변환본이 없는 경로는 원본을 그대로 쓴다. 변환: scratch 스크립트(README 참고), 목록은 img-manifest.json.
import manifest from "./img-manifest.json";
import { assetPath } from "./asset";

const widths = manifest as Record<string, number[]>;

export function img(src: string, sizes: string) {
  const ws = widths[src];
  if (!ws?.length) return { src: assetPath(src) };
  const base = src.replace("/portfolio_images/", "/img/").replace(/\.[a-z0-9]+$/i, "");
  const url = (w: number) => assetPath(`${base}-${w}.webp`);
  return {
    src: url(ws[Math.min(1, ws.length - 1)]),
    srcSet: ws.map((w) => `${url(w)} ${w}w`).join(", "),
    sizes,
  };
}

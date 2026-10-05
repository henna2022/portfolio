// 안내 사인용 픽토그램. 24 그리드, 면(fill) 위주, currentColor.
import type { FloorId } from "@/lib/exhibit";

type P = { className?: string };

const svg = (className: string | undefined, children: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {children}
  </svg>
);

// 톱니 8개 기어 경로를 한 번만 계산한다
const GEAR = (() => {
  const cx = 12;
  const cy = 12;
  const teeth = 8;
  const rOut = 10.4;
  const rIn = 8.2;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const step = (Math.PI * 2) / teeth;
    const seq = [
      [rIn, a0 - step * 0.32],
      [rOut, a0 - step * 0.18],
      [rOut, a0 + step * 0.18],
      [rIn, a0 + step * 0.32],
    ];
    for (const [r, a] of seq) {
      pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
    }
  }
  return `M${pts.join("L")}Z M12 8.4a3.6 3.6 0 1 0 0 7.2a3.6 3.6 0 1 0 0-7.2Z`;
})();

export function StarPicto({ className }: P) {
  return svg(className, <path d="M12 2.2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.1l-6.1 3.5 1.5-6.8-5.2-4.6 6.9-.7z" />);
}

export function SproutPicto({ className }: P) {
  return svg(
    className,
    <>
      <path d="M11 22v-9.2h2V22z" />
      <path d="M12 14C12 9.3 8.5 6.1 3.6 6.1 3.6 10.8 7.1 14 12 14z" />
      <path d="M12 12.6c0-5 3.6-8.4 8.8-8.4 0 5.2-3.7 8.4-8.8 8.4z" />
      <rect x="5" y="20.4" width="14" height="1.8" rx="0.9" />
    </>,
  );
}

export function FramePicto({ className }: P) {
  return svg(
    className,
    <>
      <path fillRule="evenodd" d="M2.5 4h19v16h-19zM4.8 6.3v11.4h14.4V6.3z" />
      <path d="M6.3 16.4l3.7-5 2.6 3.2 2-2.6 3.1 4.4z" />
      <circle cx="15.6" cy="9.3" r="1.55" />
    </>,
  );
}

export function GearPicto({ className }: P) {
  return svg(className, <path fillRule="evenodd" d={GEAR} />);
}

export function ArchivePicto({ className }: P) {
  return svg(
    className,
    <>
      <rect x="2.5" y="3.5" width="19" height="4.6" rx="0.6" />
      <path fillRule="evenodd" d="M3.8 9.3h16.4v11.2H3.8zM8.8 11.6v2.2h6.4v-2.2z" />
    </>,
  );
}

export function InfoPicto({ className }: P) {
  return svg(
    className,
    <path
      fillRule="evenodd"
      d="M12 1.8a10.2 10.2 0 1 1 0 20.4 10.2 10.2 0 0 1 0-20.4zM10.7 10h2.6v8h-2.6zM12 5.3a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z"
    />,
  );
}

export function PersonPicto({ className }: P) {
  return svg(
    className,
    <>
      <circle cx="12" cy="5.2" r="2.7" />
      <path d="M7.4 9.6h9.2l-1.2 7.2h-1.8L13 22h-2l-.6-5.2H8.6z" />
    </>,
  );
}

export function TeachPicto({ className }: P) {
  return svg(
    className,
    <>
      <path d="M12 3 1.5 8.2 12 13.4l8.2-4.1v6.1h1.6V8.2z" />
      <path d="M5.6 12.1v4.3c1.6 1.8 3.8 2.8 6.4 2.8s4.8-1 6.4-2.8v-4.3L12 15.3z" />
    </>,
  );
}

export function AwardPicto({ className }: P) {
  return svg(
    className,
    <>
      <path d="M7.6 2.5h8.8l-2.6 6.2h-3.6z" />
      <path
        fillRule="evenodd"
        d="M12 8.6a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2zm0 2.8 1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z"
      />
    </>,
  );
}

export function ToolsPicto({ className }: P) {
  return svg(
    className,
    <>
      <path d="M3 5.4 5.4 3l5.4 5.4-2.4 2.4z" />
      <path d="M14.7 2.6a5 5 0 0 0-4.6 6.8L2.6 16.9a2 2 0 0 0 0 2.8l1.7 1.7a2 2 0 0 0 2.8 0l7.5-7.5a5 5 0 0 0 6.8-4.6l-3 3-3.3-.9-.9-3.3z" />
    </>,
  );
}

export function ArrowDown({ className }: P) {
  return svg(className, <path d="M10.4 2.5h3.2v13l4.7-4.7 2.3 2.3-8.6 8.6-8.6-8.6 2.3-2.3 4.7 4.7z" />);
}

export function ArrowRight({ className }: P) {
  return svg(className, <path d="M2.5 13.6v-3.2h13l-4.7-4.7 2.3-2.3 8.6 8.6-8.6 8.6-2.3-2.3 4.7-4.7z" />);
}

export function ArrowUpRight({ className }: P) {
  return svg(className, <path d="M7.3 4.2h12.5v12.5h-3.2V9.7L6.4 19.9l-2.3-2.3L14.3 7.4H7.3z" />);
}

export function ArrowLeft({ className }: P) {
  return svg(className, <path d="M21.5 10.4v3.2h-13l4.7 4.7-2.3 2.3-8.6-8.6 8.6-8.6 2.3 2.3-4.7 4.7z" />);
}

export function DownloadPicto({ className }: P) {
  return svg(
    className,
    <>
      <path d="M10.5 2.5h3v10l3.6-3.6 2.1 2.1L12 18.2 4.8 11l2.1-2.1 3.6 3.6z" />
      <rect x="3.5" y="19.3" width="17" height="2.4" rx="0.6" />
    </>,
  );
}

export function CloseIcon({ className }: P) {
  return svg(className, <path d="M5.2 3.1 12 9.9l6.8-6.8 2.1 2.1-6.8 6.8 6.8 6.8-2.1 2.1-6.8-6.8-6.8 6.8-2.1-2.1 6.8-6.8-6.8-6.8z" />);
}

export const floorPicto: Record<FloorId, (p: P) => JSX.Element> = {
  "4F": StarPicto,
  "3F": FramePicto,
  "2F": GearPicto,
  "1F": ArchivePicto,
  INFO: InfoPicto,
};

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/components/lang-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { ConsoleSignature } from "@/components/console-signature";
import { NoContextMenu } from "@/components/no-context-menu";
import { SITE_URL } from "@/lib/seo";
import { KO_ENABLED } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// General Sans 를 셀프호스팅한다. fontshare 를 쓰면 api.fontshare.com 에서 CSS 를
// 받고(실측 830ms) 다시 cdn.fontshare.com 으로 폰트를 받으러 가느라 외부 호스트
// 두 곳의 DNS·TLS 핸드셰이크가 크리티컬 패스에 얹힌다. 같은 도메인 파일로 두면
// next/font 가 <head> 에 preload 를 자동으로 넣어 문서와 같은 커넥션에서 병렬로 받는다.
const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// ── 한국어 모드 전용 폰트 (모두 셀프호스팅 — QA의 서드파티 리소스 금지 준수) ──
// 프리텐다드: 단일 가변 파일(2MB)은 KO 전환 시 수 초짜리 다운로드가 됐다.
// 공식 다이내믹 서브셋(유니코드 범위별 92개 woff2)으로 교체 — 브라우저가
// 화면에 실제 등장한 글리프 범위만 병렬로 받아 초기 로드가 수십 KB 로 준다.
// (public/fonts/pretendard/ 의 CSS 를 <head> 에서 링크; EN 모드에선 KO 폰트
// 규칙이 적용되지 않아 아무 서브셋도 받지 않는다)
// 페이퍼로지는 더 이상 텍스트에 쓰지 않는다(한국어는 프리텐다드로 통일).
// 3D 히어로 씬만 public/fonts/paperlogy-hero.* 를 직접 읽으므로 여기서는 로드하지 않는다.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Juwon Lee | AI Product Engineer",
  description:
    "Portfolio of Juwon Lee, an AI product engineer who takes ML-backed products from dataset to deployed interface, planned, shipped, and operated end to end on exhibition floors, in classrooms, and on real hardware.",
  openGraph: {
    title: "Juwon Lee | AI Product Engineer",
    description:
      "Portfolio of Juwon Lee, an AI product engineer who takes ML-backed products from dataset to deployed interface, planned, shipped, and operated end to end on exhibition floors, in classrooms, and on real hardware.",
    url: `${SITE_URL}/`,
    images: ["/og-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-cover.png"],
  },
  // Google Search Console 소유 확인
  verification: {
    google: "qX4iEJyGQeDXkw49wZEMiWYnfIyzF4HZgBR7tBcvUMw",
  },
};

// Runs before paint: applies saved theme, or the OS preference on first visit.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

// Runs before paint: applies the saved language so KO fonts/class are ready
// before hydration (analytics.js 도 이 클래스를 읽어 lang 을 기록한다).
// KO 비활성화 중에는 저장값을 즉시 지워, 이전에 KO 를 골라 둔 방문자가 첫 페인트에서
// 한글 폰트 클래스를 잠깐 뒤집어쓰는 일이 없게 한다.
const langScript = KO_ENABLED
  ? `
(function () {
  try {
    if (localStorage.getItem('pf_lang') === 'ko') {
      document.documentElement.lang = 'ko';
      document.documentElement.classList.add('lang-ko');
    }
  } catch (e) {}
})();
`
  : `
(function () {
  try { localStorage.removeItem('pf_lang'); } catch (e) {}
})();
`;

// 검색엔진용 구조화 데이터 (Person) — 검색 결과에 인물 정보로 노출될 수 있음
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juwon Lee",
  alternateName: "이주원",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/portfolio_images/profile/juwonlee.jpg`,
  jobTitle: "AI Product Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Seoul Robot & AI Science Museum",
  },
  sameAs: [
    "https://github.com/henna2022",
    "https://www.linkedin.com/in/juwon-lee-677b702b3/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${generalSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        {/* 프리텐다드 다이내믹 서브셋 — unicode-range 로 쪼개져 있어 브라우저가
            KO 모드에서 실제 쓰인 범위만 병렬 로드한다 (EN 모드에선 0바이트).
            KO 비활성화 중에는 CSS 자체를 안 붙인다 — 서브셋은 0바이트여도 이
            스타일시트는 렌더 블로킹이라 EN 방문자에게 순수 손해였다. */}
        {KO_ENABLED ? (
          <link
            rel="stylesheet"
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/fonts/pretendard/pretendardvariable-dynamic-subset.css`}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ConsoleSignature />
        <NoContextMenu />
        <LangProvider>
          <SmoothScroll>
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </LangProvider>
        {/* (제거) Cloudflare Web Analytics — 아래 자체 통계와 수집 항목이 겹치는
            서드파티 비콘이었다. 이 사이트는 GitHub Pages 라 Cloudflare 뒤에 있지도
            않아 순수 JS 비콘이었고, 차단 DNS·광고 차단기를 쓰는 방문자에게는
            cloudflareinsights.com 이 0.0.0.0 으로 널라우팅되어 콘솔에
            ERR_CONNECTION_REFUSED 만 남겼다. */}
        {/* 자체 방문 통계 (Supabase) — 프로덕션에서만 수집해 dev 방문이 섞이지 않게 함 */}
        {process.env.NODE_ENV === "production" ? (
          <>
            <script src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/supabase-config.js`} defer />
            <script src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/analytics.js`} defer />
          </>
        ) : null}
      </body>
    </html>
  );
}

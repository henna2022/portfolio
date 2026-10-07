import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/lang-provider";
import { PageEffects } from "@/components/page-effects";
import { ConsoleSignature } from "@/components/console-signature";
import { NoContextMenu } from "@/components/no-context-menu";
import { SITE_URL } from "@/lib/seo";
import { KO_ENABLED } from "@/lib/i18n";

// 안내 사인용 디스플레이 서체. 폭(wdth) 축까지 받아 이름·층 숫자는 넓게 쓴다.
// next/font 가 빌드 때 받아 같은 도메인에서 서빙한다(서드파티 요청 없음).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
// 상태·연도 같은 라벨용. 아주 적게 쓴다.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

// 본문은 라틴·한글 모두 프리텐다드(다이내믹 서브셋, public/fonts/pretendard).

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Juwon Lee | Education Planning & Development",
  description:
    "Portfolio of Juwon Lee, an education R&D developer at the Seoul Robot & AI Science Museum who plans education programs and builds the AI exhibits, classroom tools and staff systems behind them, end to end, and runs them on exhibition floors, in classrooms and on real hardware.",
  openGraph: {
    title: "Juwon Lee | Education Planning & Development",
    description:
      "Portfolio of Juwon Lee, an education R&D developer at the Seoul Robot & AI Science Museum who plans education programs and builds the AI exhibits, classroom tools and staff systems behind them, end to end, and runs them on exhibition floors, in classrooms and on real hardware.",
    url: `${SITE_URL}/`,
    images: ["/og-cover-2026-10.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-cover-2026-10.png"],
  },
  // Google Search Console 소유 확인
  verification: {
    google: "qX4iEJyGQeDXkw49wZEMiWYnfIyzF4HZgBR7tBcvUMw",
  },
};

// Runs before paint: applies saved theme, or the OS preference on first visit.
const themeScript = `
(function () {
  document.documentElement.classList.add('js');
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
    localStorage.removeItem('pf_lang');
    if (sessionStorage.getItem('pf_lang') === 'ko') {
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
  jobTitle: "Education R&D Developer",
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
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        {/* 프리텐다드 다이내믹 서브셋 — unicode-range 로 쪼개져 있어 브라우저가
            KO 모드에서 실제 쓰인 범위만 병렬 로드한다 (EN 모드에선 0바이트).
            KO 비활성화 중에는 CSS 자체를 안 붙인다 — 서브셋은 0바이트여도 이
            스타일시트는 렌더 블로킹이라 EN 방문자에게 순수 손해였다. */}
        <meta name="theme-color" content="#F3F1EC" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111110" media="(prefers-color-scheme: dark)" />
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
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
          <PageEffects />
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

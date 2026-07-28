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
// 프리텐다드: KO 모드의 본문·헤딩 전체. 가변 폰트 1파일로 전 웨이트 커버.
const pretendard = localFont({
  src: [{ path: "../public/fonts/PretendardVariable.woff2", weight: "45 920", style: "normal" }],
  variable: "--font-pretendard",
  display: "swap",
  // EN 이 기본이라 첫 페인트 크리티컬 패스가 아님 — preload 로 EN 방문자의
  // 대역폭(2MB)을 낭비하지 않는다. KO 전환 시 swap 으로 로드된다.
  preload: false,
});
// 페이퍼로지: KO 모드의 대문(히어로 헤드라인) 전용.
const paperlogy = localFont({
  src: [
    { path: "../public/fonts/Paperlogy-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Paperlogy-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-paperlogy",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Juwon Lee | AI Product Engineer",
  description:
    "Portfolio of Juwon Lee, an AI product engineer building systems end to end, from sensor to shipped product.",
  openGraph: {
    title: "Juwon Lee | AI Product Engineer",
    description:
      "Portfolio of Juwon Lee, an AI product engineer building systems end to end, from sensor to shipped product.",
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
const langScript = `
(function () {
  try {
    if (localStorage.getItem('pf_lang') === 'ko') {
      document.documentElement.lang = 'ko';
      document.documentElement.classList.add('lang-ko');
    }
  } catch (e) {}
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
      className={`${inter.variable} ${generalSans.variable} ${pretendard.variable} ${paperlogy.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
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

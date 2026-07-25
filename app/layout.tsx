import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { ConsoleSignature } from "@/components/console-signature";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://henna2022.github.io/portfolio"),
  title: "Juwon Lee | Applied AI & IoT Product Engineer",
  description:
    "Portfolio of Juwon Lee, an applied AI and IoT product engineer building systems end to end, from sensor to shipped product.",
  openGraph: {
    title: "Juwon Lee | Applied AI & IoT Product Engineer",
    description:
      "Portfolio of Juwon Lee, an applied AI and IoT product engineer building systems end to end, from sensor to shipped product.",
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

// 검색엔진용 구조화 데이터 (Person) — 검색 결과에 인물 정보로 노출될 수 있음
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juwon Lee",
  alternateName: "이주원",
  url: "https://henna2022.github.io/portfolio/",
  image: "https://henna2022.github.io/portfolio/portfolio_images/profile/juwonlee.jpg",
  jobTitle: "Applied AI · IoT Product Engineer · Educator",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* General Sans — @import 대신 <head> 의 <link> 로 두어 프리로드 스캐너가
            HTML 파싱 즉시 받아오게 한다(globals.css 다운로드와 병렬). 폰트 파일은
            cdn.fontshare.com 에 있어 두 호스트 모두 preconnect 로 핸드셰이크를 미리 연다. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f%5B%5D=general-sans@400,500,600,700&display=swap"
        />
        <link
          rel="preconnect"
          href="https://static.cloudflareinsights.com"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ConsoleSignature />
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "94a926a0e02c413797b19cb641a11f32"}'
        />
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

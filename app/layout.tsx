import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { ConsoleSignature } from "@/components/console-signature";
import { LocaleProvider } from "@/lib/locale";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://henna2022.github.io/portfolio"),
  title: "Juwon Lee — AI & Robotics Educator",
  description:
    "Portfolio of Juwon Lee — AI & Robotics educator and full-stack developer building interactive learning experiences.",
  openGraph: {
    title: "Juwon Lee — AI & Robotics Educator",
    description:
      "Portfolio of Juwon Lee — AI & Robotics educator and full-stack developer building interactive learning experiences.",
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

// Runs before paint: applies the saved locale so the Korean font and
// html.lang are ready before hydration (default is English).
// Dev-only — production is English-only until the KO copy is reworked.
const localeScript = `
(function () {
  try {
    if (localStorage.getItem('locale') === 'ko') {
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
  url: "https://henna2022.github.io/portfolio/",
  image: "https://henna2022.github.io/portfolio/portfolio_images/profile/juwonlee.jpg",
  jobTitle: "AI & Robotics Educator · Full-Stack Developer",
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
        <link
          rel="preconnect"
          href="https://static.cloudflareinsights.com"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {process.env.NODE_ENV === "development" ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: localeScript }} />
            {/* Pretendard is only needed for the dev-only Korean mode —
                production is EN-only, so don't ship the webfont CSS there. */}
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
            />
            <style
              dangerouslySetInnerHTML={{
                __html: `
/* Korean locale — Pretendard everywhere (General Sans has no Hangul) */
html.lang-ko body {
  font-family: "Pretendard Variable", Pretendard, -apple-system, sans-serif;
  word-break: keep-all; /* don't split Korean words mid-syllable across lines */
}
html.lang-ko .font-display {
  font-family: "Pretendard Variable", Pretendard, sans-serif;
}`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        <ConsoleSignature />
        <LocaleProvider>
          <SmoothScroll>
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </LocaleProvider>
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

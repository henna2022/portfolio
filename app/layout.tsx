import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { LocaleProvider } from "@/lib/locale";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfoliojuwonlee211.vercel.app"),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {process.env.NODE_ENV === "development" ? (
          <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        ) : null}
      </head>
      <body>
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
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { Lobby } from "@/components/lobby";
import { Introduction } from "@/components/introduction";
import { SpecialExhibition } from "@/components/special-exhibition";
import { Galleries } from "@/components/galleries";
import { Services } from "@/components/services";
import { Archive } from "@/components/archive";
import { InfoDesk } from "@/components/info-desk";

// 루트 레이아웃의 openGraph 는 자식이 정의하면 통째로 대체되므로(부분 병합 안 됨),
// title/description 은 layout.tsx 와 동일하게 두고 canonical·og:url 만 추가한다.
export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Juwon Lee | Education Planning & Development",
    description:
      "Portfolio of Juwon Lee, an education R&D developer at the Seoul Robot & AI Science Museum who plans education programs and builds the AI exhibits, classroom tools and staff systems behind them, end to end, and runs them on exhibition floors, in classrooms and on real hardware.",
    url: `${SITE_URL}/`,
    images: ["/og-cover-2026-10.png"],
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Lobby />
        <Introduction />
        <SpecialExhibition />
        <Galleries />
        <Services />
        <Archive />
      </main>
      <InfoDesk />
    </>
  );
}

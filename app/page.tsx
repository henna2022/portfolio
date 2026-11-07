import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { Header } from "@/components/header";
import { SkyHero } from "@/components/sky-hero";
import { PhotoSlot } from "@/components/photo-slot";
import { WorkGroups } from "@/components/work-groups";
import { About } from "@/components/about";
import { SelectedWork } from "@/components/selected-work";
import { Experience } from "@/components/experience";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";

// 루트 레이아웃의 openGraph 는 자식이 정의하면 통째로 대체되므로(부분 병합 안 됨),
// title/description 은 layout.tsx 와 동일하게 두고 canonical·og:url 만 추가한다.
export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Juwon Lee | Education Planning & Development",
    description:
      "Portfolio of Juwon Lee, an education R&D developer at the Seoul Robot & AI Museum who plans education programs and builds the AI exhibits, classroom tools and staff systems behind them, and runs them on exhibition floors, in classrooms and on real hardware.",
    url: `${SITE_URL}/`,
    images: ["/og-cover-2026-11.png"],
  },
};

export default function Home() {
  return (
    <main id="main" className="home-page">
      <Header />
      <SkyHero />
      <SelectedWork />
      <WorkGroups photos={{
        learning: <PhotoSlot name="group-learning" />,
        teaching: <PhotoSlot name="group-teaching" />,
      }} />
      <Experience />
      <About photo={<PhotoSlot name="about-tour" />} />
      <Awards />
      <Contact />
    </main>
  );
}

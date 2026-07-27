import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Statement } from "@/components/statement";
import { About } from "@/components/about";
import { SelectedWork } from "@/components/selected-work";
import { MarqueeStrip } from "@/components/marquee-strip";
import { SkillsDrag } from "@/components/skills-drag";
import { Experience } from "@/components/experience";
import { Activities } from "@/components/activities";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";

// 루트 레이아웃의 openGraph 는 자식이 정의하면 통째로 대체되므로(부분 병합 안 됨),
// title/description 은 layout.tsx 와 동일하게 두고 canonical·og:url 만 추가한다.
export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Juwon Lee | AI Product Engineer",
    description:
      "Portfolio of Juwon Lee, an AI product engineer building systems end to end, from sensor to shipped product.",
    url: `${SITE_URL}/`,
    images: ["/og-cover.png"],
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Statement />
      <About />
      <SelectedWork />
      <MarqueeStrip />
      <SkillsDrag />
      <Experience />
      <Activities />
      <Awards />
      <Contact />
    </main>
  );
}

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { SelectedWork } from "@/components/selected-work";
import { MarqueeStrip } from "@/components/marquee-strip";
import { SkillsDrag } from "@/components/skills-drag";
import { Experience } from "@/components/experience";
import { Activities } from "@/components/activities";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
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

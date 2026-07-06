import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { LogoMarquee } from "@/components/site/logo-marquee";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { About } from "@/components/site/about";
import { Testimonials } from "@/components/site/testimonials";
import { FAQ } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { CursorSpotlight, ScrollProgress, SmoothScroll } from "@/components/site/motion-providers";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <LogoMarquee />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

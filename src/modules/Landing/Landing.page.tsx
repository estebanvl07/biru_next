import { useResize } from "~/lib/hooks/useResize";
import { Header } from "../components/Header";
import { Spotlight } from "../components/ui/spotLight";
import { HeroSection, Footer } from "./components";
import Features from "./components/Features/Features";
import Presentation from "./components/Presentation/Presentation";
import Inprovements from "./components/Inprovements/Inprovements";
import Problem from "./components/Problem";
import WorkingSection from "./components/Working";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";

export const Landing = () => {
  return (
    <>
      <div className="absolute top-0 h-full w-full overflow-hidden">
        <Spotlight smallWidth={320} />
      </div>
      <Header />
      <div className="relative space-y-20">
        <HeroSection />
        <Presentation
          thumbnailAlt="Video de Presentación de Biru"
          videoSrc="https://www.youtube.com/watch?v=N3sAUKkjxts"
          thumbnailSrc="/thumbnail.png"
          animationStyle={"fade"}
          className="mx-auto max-w-5xl px-4"
        />
        <Problem />
        <div className=" rounded-t-xl bg-default-100 bg-[url('/background-content.webp')] py-20 pt-20 md:space-y-44 dark:bg-default-100/40">
          <Features />
        </div>
        <WorkingSection />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <FAQ />
        <div>
          <CTA />
          <Footer />
        </div>
      </div>
    </>
  );
};

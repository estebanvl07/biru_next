import { Chip } from "@nextui-org/react";
import { Header } from "../components/Header";
import { HeroSection, Advantages, Explore, Footer } from "./components";
import Features from "./components/Features/Features";
import SlideComponents from "./components/SlideComponents/SlideComponents";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Inprovements from "./components/Inprovements/Inprovements";

export const Landing = () => {
  return (
    <div className="relative flex flex-col items-center gap-6 overflow-x-hidden bg-gradient-to-r from-zinc-100 to-zinc-100 dark:from-default-50 dark:via-default-100 dark:to-default-50">
      <div className="absolute -top-20 left-[50%] h-[50dvh] w-[100dvh] -translate-x-[50%] rounded-full bg-slate-100 blur-3xl dark:bg-zinc-700/30" />

      <Header />
      <HeroSection />
      <SlideComponents />
      <motion.div
        initial={{
          width: "32rem",
        }}
        whileInView={{
          width: "100%",
        }}
        className="rounded-t-xl bg-default-200 bg-[url('/background-content.webp')] dark:bg-default-100/40"
      >
        <Features />
        <Advantages />
        <Inprovements />
        <Explore />
        <Footer />
      </motion.div>
    </div>
  );
};

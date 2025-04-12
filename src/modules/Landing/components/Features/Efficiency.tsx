import React from "react";
import { Card } from "~/modules/components";
import { GlowingEffect } from "~/modules/components/ui/GlowingEffect";
import { motion } from "framer-motion";
import { FlickeringGrid } from "~/modules/components/ui/FlickeringGrid";
const Efficiency = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className="group relative order-1 col-span-4 row-span-2 h-[310px] flex-col overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm hover:bg-purple-100 md:col-span-2 dark:bg-default-200/30 dark:hover:bg-purple-600/10"
    >
      <div className="fade-bottom relative flex h-full w-full flex-col px-6 py-4">
        <div className="absolute top-2 -z-0 hidden h-full w-full dark:block" />
        <div className="fade-x fade-y absolute -z-10 h-full w-full opacity-50">
          <FlickeringGrid squareSize={4} color="#60A5FA" />
        </div>
        <div className="w-fulldark:block absolute top-2 -z-0 hidden h-full" />
        <h2>Eficiencia</h2>
        <p>
          Mantén tus finanzas en orden con una plataforma rápida y eficiente.
        </p>
        <div className="absolute left-16 top-24 w-[44rem] shadow-2xl transition-all group-hover:left-10 md:top-20 dark:shadow-black">
          <video
            className="w-full rounded-xl border dark:border-white/10"
            autoPlay
            muted
            playsInline
            loop
            preload="none"
          >
            <source src="/biru-video.mp4" />
          </video>
        </div>
      </div>
    </motion.div>
  );
};

export default Efficiency;

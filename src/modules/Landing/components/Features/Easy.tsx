import React from "react";
import { Card } from "~/modules/components";
import MobileVideo from "./MobileVideo";
import { GlowingEffect } from "~/modules/components/ui/GlowingEffect";
import { motion } from "framer-motion";
import { FlickeringGrid } from "~/modules/components/ui/FlickeringGrid";

const Easy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="group order-4  col-span-4 row-span-1 h-48 overflow-hidden rounded-xl bg-white/80 px-8 transition-colors hover:bg-indigo-200/40  md:order-5 md:col-span-2 dark:bg-default-200/30 dark:hover:bg-indigo-500/20"
    >
      <div className="fade-bottom relative flex h-full  flex-row items-center justify-between  py-4">
        <div className="fade-x absolute -z-10 h-full w-full opacity-50">
          <FlickeringGrid squareSize={4} color="#60A5FA" />
        </div>

        <aside className="flex-1">
          <h2 className="mb-2">Facil Manéjo</h2>
          <p>
            Lleva el control de tus finanzas de forma simple y eficiente, sin
            importar si estás en tu computadora o móvil.
          </p>
        </aside>
        <div className="relative flex h-full flex-1 justify-end">
          <MobileVideo />
        </div>
      </div>
    </motion.div>
  );
};

export default Easy;

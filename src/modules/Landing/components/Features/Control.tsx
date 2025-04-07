import React from "react";
import PieChart from "~/modules/Charts/pieChart";
import { motion } from "framer-motion";
import { FlickeringGrid } from "~/modules/components/ui/FlickeringGrid";
const Control = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className=" group relative order-2 col-span-2 row-span-2 h-56 flex-col overflow-hidden rounded-xl bg-white/80  backdrop-blur-sm transition-colors hover:bg-sky-100 md:order-3 md:col-span-1 dark:bg-default-200/30 hover:dark:bg-sky-700/20"
    >
      <div className="fade-bottom relative flex h-full w-full flex-col px-6 py-4">
        <div className="absolute top-2 -z-0 hidden h-full w-full dark:block" />
        <div className="fade-x absolute -z-10 h-full w-full opacity-50">
          <FlickeringGrid squareSize={4} color="#60A5FA" />
        </div>
        <h2>Control</h2>
        <p>Control absoluto de tu dinero</p>
        <div className="absolute left-16 top-[90px] z-10 flex h-56 w-56 flex-col items-center justify-center rounded-lg border bg-white px-4 py-8 shadow-2xl transition-all group-hover:left-20 dark:border-white/10 dark:bg-default-200 dark:shadow-black/60">
          <PieChart
            series={[100450, 580300, 324234]}
            keys={["Comida", "Arriendo", "Servicios"]}
            position="bottom"
            plotTextSize="10px"
            heightChart="220"
            showLegend={false}
            showToolBar={false}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Control;

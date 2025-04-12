import React from "react";
import { LineChart } from "~/modules/Charts";
import { Card } from "~/modules/components";
import { GlowingEffect } from "~/modules/components/ui/GlowingEffect";
import Ripple from "~/modules/components/ui/Ripple";
import { motion } from "framer-motion";
import { FlickeringGrid } from "~/modules/components/ui/FlickeringGrid";

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative order-5 col-span-4 row-span-3 h-80 flex-col overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm transition-colors hover:bg-red-50 md:order-3 md:col-span-2 md:h-auto dark:bg-default-200/30 dark:hover:bg-red-500/10"
    >
      <div className="fade-bottom relative flex h-full flex-col px-6 py-4">
        <div className="fade-x fade-y absolute -z-10 h-full w-full opacity-50">
          <Ripple />
        </div>
        <h2>Análisis</h2>
        <p>
          Visualiza el movimiento de tu dinero y crea estrategias efectivas para
          aumentar tus ingresos.
        </p>
        <div className="absolute -bottom-4 left-[75px] h-56 w-full rounded-lg border bg-white/50 dark:border-white/20  dark:bg-default-200/50" />
        <div className="absolute -bottom-12 left-14 h-56 w-56 rounded-lg border bg-white/30 dark:border-white/10 dark:bg-default-200/30" />
        <div className="absolute -bottom-8 left-24 z-10 flex h-56 w-full flex-col items-start rounded-xl border bg-white px-6 py-5 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black/60">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <h5 className="text-base">Balance de cuenta</h5>
          <p className="text-4xl font-semibold">$ 557.450</p>
          <div className="w-full">
            <LineChart
              series={[
                {
                  data: [20000, 34000, 105000, 87000, 358000, 545000, 245000],
                  name: "Balance",
                  color: "#3E1FE9",
                },
              ]}
              widthChart="100%"
              heightChart="100"
              showXAxis={false}
              showYAxis={false}
              showGrid={false}
              bottomBorder={false}
              showToolBar={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;

import React from "react";
import PieChart from "~/modules/Charts/pieChart";
import { Card } from "~/modules/components";

const Control = () => {
  return (
    <Card className="relative order-2 col-span-2 row-span-2 h-56 flex-col overflow-hidden bg-white/80 backdrop-blur-sm md:order-3 md:col-span-1 dark:bg-default-200/30">
      <div className="absolute top-2 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />

      <h2>Control</h2>
      <p>Control absoluto de tu dinero</p>
      <div className="absolute left-12 top-28 h-36 w-36 rounded-lg border dark:border-white/20" />
      <div className="absolute left-8 top-32 h-36 w-36 rounded-lg border dark:border-white/10" />
      <div className="absolute left-16 top-[90px] z-10 flex h-56 w-56 flex-col items-center justify-center rounded-lg border bg-white px-4 py-8 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black/60">
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
    </Card>
  );
};

export default Control;

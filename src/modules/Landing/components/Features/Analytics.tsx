import React from "react";
import { LineChart } from "~/modules/Charts";
import { Card } from "~/modules/components";

const Analytics = () => {
  return (
    <Card className="order-5 col-span-4 row-span-3 h-80 flex-col overflow-hidden bg-white/80 backdrop-blur-sm md:order-3 md:col-span-2 md:h-auto dark:bg-default-200/30">
      <div className="absolute top-2 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />

      <h2>Análisis</h2>
      <p>
        Visualiza el movimiento de tu dinero y crea estrategias efectivas para
        aumentar tus ingresos.
      </p>
      <div className="absolute -bottom-4 left-[75px] h-56 w-full rounded-lg border bg-white/50 dark:border-white/20  dark:bg-default-200/50" />
      <div className="absolute -bottom-12 left-14 h-56 w-56 rounded-lg border bg-white/30 dark:border-white/10 dark:bg-default-200/30" />
      <div className="absolute -bottom-8 left-24 z-10 flex h-56 w-full flex-col items-start rounded-xl border bg-white px-6 py-5 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black/60">
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
            heightChart="120"
            showXAxis={false}
            showYAxis={false}
            showGrid={false}
            bottomBorder={false}
            showToolBar={false}
          />
        </div>
      </div>
    </Card>
  );
};

export default Analytics;

import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});
import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import { useTheme } from "~/lib/hooks";
import { ChartProps } from "~/types/chart.types";
import { useThemeContext } from "~/lib/context/Theme.context";

const HeatMap = ({
  series,
  keys,
  heightChart = "250",
  widthChart = "100%",
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showToolTip = true,
  showGrid = true,
  showToolBar = true,
  offsetX = 0,
  offsetY,
  bottomBorder = true,
}: ChartProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  if (!series) return;

  return (
    <Chart
      options={{
        chart: {
          type: "heatmap",
          toolbar: {
            show: showToolBar,
          },
          offsetX,
          offsetY,
        },

        plotOptions: {
          heatmap: {
            enableShades: true,
            distributed: true,
          },
        },
        legend: {
          show: showLegend,
          position: "top",
          horizontalAlign: "left",
          markers: {
            size: 6,
            shape: "circle",
            offsetX: -3,
          },
          offsetX: -28,
          fontSize: "14",

          fontFamily: FONT_FAMILY,
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        stroke: {
          show: true,
          width: 4,
          colors: ["transparent"],
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          custom: (props) => {
            const config = props.w;
            const currentValue = props.series[props.seriesIndex][
              props.dataPointIndex
            ] as number;
            const currentLabelMonth =
              config.globals.labels[props.dataPointIndex];
            const title = config.globals.seriesNames[props.seriesIndex];

            if (title === "Ingresos") {
              return `
                     <div  class="bg-white px-4 py-2 flex flex-col dark:bg-slate-950">
                         <span class="text-black font-semibold">
                         ${currentLabelMonth}
                         </span>
 
                         <div class="flex gap-8 w-full justify-between">
 
                             <div class="flex gap-2 items-center">
                                 <div class="w-3 h-3 bg-primary rounded-full"></div>
                                 ${title}
                             </div>
                             <span class="font-semibold">
                                 $ ${currentValue.toLocaleString()}
                             </span>
 
                         </div>
 
                     </div>
                     `;
            }
            return `
               <div  class="bg-white px-4 py-2 flex flex-col dark:bg-slate-950 border dark:border-white/10">
                         <span class="text-black font-semibold">
                         ${currentLabelMonth}
                         </span>
 
                         <div class="flex gap-8 w-full justify-between">
 
                             <div class="flex gap-2 items-center">
                                 <div class="w-3 h-3 bg-indigo-300 rounded-full"></div>
                                 ${title}
                             </div>
                             <span class="font-semibold">
                                 $ ${currentValue.toLocaleString()}
                             </span>
 
                         </div>
 
                     </div>
                 `;
          },
        },
        noData: {
          text: "Sin datos para mostrar",
        },
        grid: {
          show: showGrid,
          borderColor: isDark ? "#1e293b" : "#e5e7eb",
          padding: {
            top: 0,
            left: 0,
          },
        },
        yaxis: {
          labels: {
            show: showYAxis,
            align: "left",
            padding: 15,
            style: {
              fontFamily: FONT_FAMILY,
              colors: isDark ? "#64748b" : "#000",
              fontWeight: 600,
              fontSize: "13",
            },
          },
        },
        xaxis: {
          axisBorder: {
            show: bottomBorder,
          },
          axisTicks: {
            show: bottomBorder,
          },
          categories: keys ? keys : [],
          labels: {
            show: showXAxis,
            style: {
              colors: isDark ? "#f3f4f6" : "#000",
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
            },
          },
        },
      }}
      type="heatmap"
      series={series}
      width={widthChart}
      height={heightChart}
    />
  );
};

export default HeatMap;

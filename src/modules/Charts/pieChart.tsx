import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import { useThemeContext } from "~/lib/context/Theme.context";
import { ChartProps } from "~/types/chart.types";

import { FONT_FAMILY } from "~/lib/constants/config";
import { useResize } from "~/lib/hooks/useResize";
import { color } from "framer-motion";

const PieChart = ({
  series,
  keys,
  heightChart = "600",
  position,
  offsetX,
  offsetY,
  showToolBar = true,
}: ChartProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const { isMobile } = useResize();

  if (Array.isArray(series) && series?.length === 0) return;

  return (
    <Chart
      options={{
        chart: {
          toolbar: {
            show: showToolBar,
          },
          offsetX,
          offsetY,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              labels: {
                name: {
                  fontFamily: "Montserrat",
                  color: isDark ? "#fff" : "#000",
                },
                value: {
                  fontFamily: "Montserrat",
                  formatter(val: string) {
                    const valInt = parseInt(val);
                    return `$ ${valInt.toLocaleString()}`;
                  },
                  color: isDark ? "#fff" : "#000",
                },
                show: true,
              },
            },
          },
        },
        tooltip: {
          custom: (props) => {
            const currentValue = `${props.series[props.seriesIndex]}`;
            return `
                <div  class="arrow_box bg-white px-6 py-2 flex flex-col justify-center items-center dark:bg-slate-950 border dark:border-white/10">
                <span class="text-black dark:text-white/60">${
                  keys ? keys[props.seriesIndex] : ""
                }</span>
                <span class="text-black font-semibold text-base dark:text-white">
                  $ ${Number(currentValue).toLocaleString()}
                </span>

                </div>
                `;
          },
        },
        stroke: {
          width: 4,
          colors: [isDark ? "#0f172a" : "#f8fafc"],
          curve: "straight",
          lineCap: "square",
        },
        dataLabels: {
          formatter: (val, options) => {
            return "";
          },
        },
        legend: {
          fontFamily: FONT_FAMILY,
          position: position || isMobile ? "bottom" : "right",
          labels: {
            colors: !isDark ? "#1e293b" : "#e5e7eb",
          },
        },
        labels: keys as string[],
      }}
      series={series}
      type="donut"
      width="100%"
      height={isMobile ? "350" : heightChart}
    />
  );
};

export default PieChart;

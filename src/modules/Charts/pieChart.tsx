import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import { useThemeContext } from "~/lib/context/Theme.context";
import { ChartProps, Series } from "~/types/chart.types";

import { FONT_FAMILY } from "~/lib/constants/config";
import { useResize } from "~/lib/hooks/useResize";
import { color } from "framer-motion";

const PieChart = ({
  series,
  keys,
  heightChart = "600",
  widthChart = "100%",
  position,
  offsetX,
  plotTextSize = "16px",
  offsetY,
  showToolBar = true,
  showLegend = true,
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
                  fontSize: plotTextSize,
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
                <div  class=" bg-white px-4 py-1.5 flex flex-col justify-center items-center dark:bg-default-300/30 backdrop-blur-lg border dark:border-white/10">
                <span class="text-xs text-foreground-700">${
                  keys ? keys[props.seriesIndex] : ""
                }</span>
                <span class="text-black font-semibold text-sm dark:text-white">
                  $ ${Number(currentValue).toLocaleString()}
                </span>
                </div>
                `;
          },
        },
        markers: {
          size: 6,
        },
        stroke: {
          width: 6,
          colors: [isDark ? "#262626" : "#fff"],
          curve: "stepline",
          lineCap: "butt",
        },
        dataLabels: {
          formatter: (val, options) => {
            return "";
          },
        },
        legend: {
          show: showLegend,
          fontFamily: FONT_FAMILY,
          fontSize: "13.5px",
          position: position || isMobile ? "bottom" : "right",
          labels: {
            colors: !isDark ? "#1e293b" : "#e5e7eb",
          },
        },
        labels: keys as string[],
      }}
      series={series}
      type="donut"
      width={widthChart}
      height={heightChart}
    />
  );
};

export default PieChart;

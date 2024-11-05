import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import type { ChartProps } from "~/types/chart.types";
import { useThemeContext } from "~/lib/context/Theme.context";

// TODO: refactorize component
const LineChart = ({
  series,
  titleChart,
  keys,
  heightChart = "120px",
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  widthChart = "100%",
  showToolTip = true,
  hasZoom = true,
  curve = "smooth",
  showGrid = true,
  bottomBorder = true,
  showToolBar = true,
  offsetX = 0,
  offsetY,
  hasformatNumber = true,
}: ChartProps) => {
  const { theme } = useThemeContext();

  const isDark = theme === "dark";

  if (!series) return;

  return (
    <Chart
      options={{
        chart: {
          type: "area",
          stacked: true,
          toolbar: {
            show: showToolBar,
            tools: {
              download: false,
            },
          },
          zoom: {
            enabled: hasZoom,
          },
          offsetX,
          offsetY,
        },
        legend: {
          show: showLegend,
          position: "bottom",
          horizontalAlign: "right",
          offsetX: 0,
          offsetY: 0,
        },
        stroke: {
          curve,
          width: 2.6,
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: Array.isArray(series) && series?.length !== 0 && showToolTip,
          shared: false,
          custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
            return `
                <div class="bg-white px-6 py-2 flex flex-col justify-center dark:border-white/10 items-center dark:bg-default-200 backdrop-blur-xl">
                  <span class="text-xs">${
                    w.globals.initialSeries[seriesIndex].name
                  }</span>
                  <span class="font-semibold text-base">$ ${series[seriesIndex][
                    dataPointIndex
                  ]?.toLocaleString()}</span>
                  
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
          strokeDashArray: 4,
        },
        yaxis: {
          show: showYAxis,
          axisBorder: {
            show: false,
          },
          labels: {
            // align: "right",
            // align: "left",
            padding: 15,
            show: true,
            formatter: (val) => {
              return parseAmount(val) ?? val;
            },
            style: {
              colors: isDark ? "#a1a1aa" : "#000",
              fontFamily: FONT_FAMILY,
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
          categories: keys ?? [],
          labels: {
            show: showXAxis,
            style: {
              colors: isDark ? "#a1a1aa" : "#000",
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
            },
          },
        },
      }}
      series={series}
      type="area"
      width={widthChart}
      height={heightChart}
    />
  );
};

export default LineChart;

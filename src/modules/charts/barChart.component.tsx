const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import type { Series } from "~/types/root.types";
import dynamic from "next/dynamic";
import { useTheme } from "~/lib/hooks";

interface LineChartProps {
  series: Series[] | undefined;
  keys?: string[];
  titleChart?: string;
  heightChart?: string;
  showToolBar?: boolean;
  showLegend?: boolean;
  showToolTip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  offsetX?: number;
  offsetY?: number;
  showGrid?: boolean;
  hasformatNumber?: boolean;
}

// TODO: refactorize component
const BarChart = ({
  series,
  titleChart,
  keys,
  heightChart = "120",
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showToolTip = true,
  showGrid = true,
  showToolBar = true,
  offsetX = 0,
  offsetY,
  hasformatNumber = true,
}: LineChartProps) => {
  // TODO: darkmdoe pending
  const { isDark } = useTheme();

  if (!series) return;

  return (
    <Chart
      options={{
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: showToolBar,
            tools: {
              download: false,
            },
          },
          offsetX,
          offsetY,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            borderRadiusApplication: "end",
            borderRadius: 6,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          markers: {
            radius: 100,
            width: 12,
            height: 12,
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
          enabled: Array.isArray(series) && series?.length !== 0 && showToolTip,
          shared: false,
          custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
            return `
                  <div class="bg-white px-6 py-2 flex flex-col justify-center border-[1px] dark:border-white/10 items-center dark:bg-slate-900">
                    <span class="text-xs">${
                      w.globals.initialSeries[seriesIndex].name
                    }</span>
                    <span class="font-semibold text-base">$ ${series[
                      seriesIndex
                    ][dataPointIndex]?.toLocaleString()}</span>
                    
                  </div>
                `;
          },
        },
        noData: {
          text: "Sin datos para mostrar",
        },
        grid: {
          xaxis: {},
          borderColor: isDark ? "#1e293b" : "#e5e7eb",
          padding: {
            top: 0,
            left: 0,
          },
        },
        yaxis: {
          show: true,
          labels: {
            align: "left",
            padding: 15,
            formatter: (val, opt) => parseAmount(val) ?? val,
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
            show: false,
          },
          categories: keys ? keys : [],
          labels: {
            style: {
              fontFamily: FONT_FAMILY,
              colors: isDark ? "#f3f4f6" : "#000",
              fontWeight: 600,
            },
          },
        },
      }}
      series={series}
      type="bar"
      width="100%"
      height={heightChart}
    />
  );
};

export default BarChart;

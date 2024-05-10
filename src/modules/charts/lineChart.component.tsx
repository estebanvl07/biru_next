const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import type { Series } from "~/types/root.types";
import dynamic from "next/dynamic";

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
const LineChart = ({
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
  const isDark = false;

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
          curve: "smooth",
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
          enabled: series?.length !== 0 && showToolTip,
          shared: false,
          custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
            return `
                <div class="arrow_box bg-white px-6 py-2 flex flex-col justify-center items-center dark:bg-slate-950/90 backdrop-blur-lg">
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
          // padding: {
          //   top: 0,
          // },
        },
        yaxis: {
          show: showYAxis,
          axisBorder: {
            show: true,
          },
          labels: {
            show: true,
            formatter: (val) => {
              return parseAmount(val) ?? val;
            },
            style: {
              colors: isDark ? "#64748b" : "#000",
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
              fontSize: "13",
            },
          },
        },
        xaxis: {
          categories: keys ?? [],
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
      series={series}
      type="area"
      width="100%"
      height={heightChart}
    />
  );
};

export default LineChart;

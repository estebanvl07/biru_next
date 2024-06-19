import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import React, { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import { getTransactionsByMonths } from "~/modules/Transactions/hook/useHandlerTransactions.hook";

import { useThemeContext } from "~/lib/context/themeContext";
import { useFilterContext } from "~/lib/context/filterContext";
import { useTransactions } from "~/modules/Transactions/hook";
import { BarChart } from "~/modules/Charts";

const initialValues = {
  color: "",
  name: "",
  data: [],
};

const AnnualBalance = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [incomeTransactions, setIncomeTransactions] = useState<{
    color?: string;
    name: string;
    data: number[];
  }>(initialValues);
  const [egressTransactions, setEgressTransactions] = useState<{
    color?: string;
    name: string;
    data: number[];
  }>(initialValues);

  const { filter, rangeDate } = useFilterContext();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const { transactions } = useTransactions({
    filter,
    ...rangeDate,
  });
  const { transactionsByMonth, months } = getTransactionsByMonths(transactions);

  useEffect(() => {
    if (!transactionsByMonth) return;

    const incomeValues = transactionsByMonth.map((serie) => serie.income);
    const egressValues = transactionsByMonth.map((serie) => serie.egress);

    setIncomeTransactions({
      color: "#3E1FE9",
      name: "Ingresos",
      data: incomeValues,
    });

    setEgressTransactions({
      color: "#a5b4fc",
      name: "Egresos",
      data: egressValues,
    });

    // month labels
    const labels = transactionsByMonth.map((serie) => serie.month);
    setLabels(labels);
  }, [transactionsByMonth]);

  return (
    <div className="h-full">
      <Card className="h-full flex-col !px-6">
        <h3 className="">Balance anual</h3>
        <BarChart
          keys={months}
          series={[incomeTransactions, egressTransactions] as any}
          showGrid={false}
        />
        {/* <Chart
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              offsetX: 0,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "50%",
                borderRadiusApplication: "end",
                borderRadius: 6,
              },
            },
            dataLabels: {
              enabled: false,
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
              categories: months ? months : [],
              labels: {
                style: {
                  fontFamily: FONT_FAMILY,
                  colors: isDark ? "#f3f4f6" : "#000",
                  fontWeight: 600,
                },
              },
            },
            grid: {
              xaxis: {},
              borderColor: isDark ? "#1e293b" : "#e5e7eb",
              padding: {
                top: 0,
                left: 0,
              },
            },
            fill: {
              opacity: 1,
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
          }}
          type="bar"
          series={[incomeTransactions, egressTransactions] as any}
          width="100%"
          height={250}
        /> */}
      </Card>
    </div>
  );
};

export default AnnualBalance;

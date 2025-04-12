import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import React, { useEffect, useState } from "react";
import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import { getTransactionsByMonths } from "~/modules/Transactions/hook/useHandlerTransactions.hook";

import { useThemeContext } from "~/lib/context/Theme.context";
import { useFilterContext } from "~/lib/context/Filter.context";
import { useTransactions } from "~/modules/Transactions/hook";
import { BarChart } from "~/modules/Charts";
import { Button, CardBody, CardHeader, Card } from "@heroui/react";
import clsx from "clsx";
import { Series } from "~/types/chart.types";

const initialValues = {
  color: "",
  name: "",
  data: [],
};

const chartConfig = {
  income: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Gastos",
    color: "hsl(var(--chart-2))",
  },
} satisfies any;

const AnnualBalance = () => {
  const [activeChart, setActiveChart] = React.useState<"income" | "expenses">(
    "income",
  );
  const [labels, setLabels] = useState<string[]>([]);
  const [incomeTransactions, setIncomeTransactions] =
    useState<Series>(initialValues);
  const [egressTransactions, setEgressTransactions] =
    useState<Series>(initialValues);

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

  const total = React.useMemo(
    () => ({
      income: incomeTransactions.data.reduce((acc, curr) => acc + curr, 0),
      expenses: egressTransactions.data.reduce((acc, curr) => acc + curr, 0),
    }),
    [incomeTransactions, egressTransactions],
  );

  const currentSeries = React.useMemo(
    () =>
      activeChart === "income" ? [incomeTransactions] : [egressTransactions],
    [activeChart],
  );

  return (
    <div className="h-full">
      <Card className="w-full border border-divider shadow-sm">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-divider p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <h3 className="text-2xl font-semibold">Bar Chart - Interactive</h3>
            <p>Showing total visitors for the last 3 months</p>
          </div>
          <div className="flex">
            {/* } {["income", "expenses"].map((key) => {
              const chart = key;
              return (
                <button
                  key={chart}
                  className={clsx(
                    "relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-divider px-6 py-4 text-left transition-colors duration-500 even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6",
                    {
                      "bg-default-50": activeChart === chart,
                    },
                  )}
                  onClick={() => setActiveChart(chart as any)}
                >
                  <span className="text-muted-foreground text-xs">
                    {chartConfig[chart]!.label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })} */}
          </div>
        </CardHeader>
        <CardBody className="px-2 sm:p-6">
          <BarChart
            keys={months}
            showYAxis={false}
            showToolBar={false}
            showLegend={false}
            series={currentSeries as any}
          />
        </CardBody>
      </Card>
      {/* <Card className="h-full flex-col !px-6"></Card> */}
    </div>
  );
};

export default AnnualBalance;

import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import { Card } from "~/modules/components";

import { FONT_FAMILY } from "~/lib/constants/config";

import type { ITransaction } from "~/types/transactions";
import { ICategory } from "~/types/category";
import dynamic from "next/dynamic";

// TODO: refatorize component
const PieChartAmountByCategoires = () => {
  const [chartLabels, setChartLabels] = useState<(string | undefined)[]>([""]);
  const [chartSeries, setChartSeries] = useState<number[]>([0]);

  const transactions = [] as ITransaction[];
  const categories = [] as ICategory[];

  useEffect(() => {
    return;
    if (!transactions) return;

    // grouping transactions by category
    const groupedTransactions: Record<number, ITransaction[]> =
      transactions.reduce(
        (acc, transaction) => {
          const { categoryId } = transaction;
          if (!acc[categoryId]) {
            acc[categoryId] = [];
          }
          acc[categoryId].push(transaction);
          return acc;
        },
        {} as Record<number, ITransaction[]>,
      );

    // names of categories
    if (groupedTransactions) {
      const getCategoryIdKeys = Object.keys(groupedTransactions); // get month number
      const getTransactions = Object.values(groupedTransactions); // get transactions month

      if (!categories) return;

      const transactionsSeries = getTransactions.map((groupTr) => {
        const groupOfAmounts = groupTr.map(
          (transactions) => transactions.amount,
        );

        const amountOfCategory = groupOfAmounts.reduce(
          (amount, currentAmount) => amount + currentAmount,
          0,
        );

        return amountOfCategory;
      });

      // get name of the categorires
      const nameOfCategories = getCategoryIdKeys.map((key: string) => {
        const hasCategory = categories.find(
          (category) => category.id === Number(key),
        );
        return hasCategory?.name;
      });

      const names = Object.values(nameOfCategories);

      setChartSeries(transactionsSeries);
      setChartLabels(names);
    }
  }, [transactions]);

  return (
    <Card className="h-full flex-col !px-6">
      <header className="mb-4 flex items-center justify-between gap-8">
        <h3>Categorías</h3>
        <button>filtrar</button>
      </header>
      <main className="my-auto w-full">
        <Chart
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              offsetX: 0,
              offsetY: 0,
            },
            plotOptions: {
              pie: {
                expandOnClick: false,
                donut: {
                  labels: {
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
                <span class="text-black">${
                  chartLabels[props.seriesIndex]
                }</span>
                <span class="text-black font-semibold text-base">
                  $ ${Number(currentValue).toLocaleString()}
                </span>
                
                </div>
                `;
              },
            },
            stroke: {
              width: 2,
              // colors: 'transparent',
              curve: "smooth",
              lineCap: "round",
            },
            dataLabels: {
              formatter: (val, options) => {
                return "";
              },
            },
            legend: {
              fontFamily: FONT_FAMILY,
            },
            labels: chartLabels as string[],
          }}
          series={chartSeries}
          type="donut"
          width="100%"
          height={220}
        />
      </main>
    </Card>
  );
};

export default PieChartAmountByCategoires;

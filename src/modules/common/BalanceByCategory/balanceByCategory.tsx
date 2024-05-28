import { useEffect, useState } from "react";

import { Card, Empty } from "~/modules/components";

import { FONT_FAMILY } from "~/lib/constants/config";

import dynamic from "next/dynamic";
import { useTransactions } from "../../transactions/hook/useTransactions.hook";
import { Transaction } from "@prisma/client";
import { useThemeContext } from "~/lib/context/themeContext";
import { useCategory } from "../../category/hook/category.hook";
import { Spinner } from "@nextui-org/spinner";

// TODO: refatorize component
const PieChartAmountByCategoires = () => {
  const [chartLabels, setChartLabels] = useState<(string | undefined)[]>([""]);
  const [chartSeries, setChartSeries] = useState<number[]>([0]);

  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const { categories, isLoading } = useCategory();

  const { transactions } = useTransactions();

  useEffect(() => {
    if (!transactions) return;

    // grouping transactions by category
    const groupedTransactions: Record<number, Transaction[]> =
      transactions.reduce(
        (acc, transaction) => {
          const { categoryId } = transaction;

          if (!acc[categoryId as number]) {
            acc[categoryId as number] = [];
          }
          acc[categoryId as number]!.push(transaction);
          return acc;
        },
        {} as Record<number, Transaction[]>,
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Spinner />
            <span>Cargando...</span>
          </div>
        ) : (
          <>
            {!isLoading && chartSeries.length === 0 ? (
              <Empty description="No encontramos datos" />
            ) : (
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
                  chartLabels[props.seriesIndex]
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
                  },
                  labels: chartLabels as string[],
                }}
                series={chartSeries}
                type="donut"
                width="100%"
                height={220}
              />
            )}
          </>
        )}
      </main>
    </Card>
  );
};

export default PieChartAmountByCategoires;

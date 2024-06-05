import { useEffect, useState } from "react";

import { Card, Empty } from "~/modules/components";
import { Spinner } from "@nextui-org/spinner";
import PieChart from "~/modules/Charts/pieChart";

import { useCategory } from "../../Category/hook/category.hook";
import { useTransactions } from "../../Transactions/hook/useTransactions.hook";
import { useFilterContext } from "~/lib/context/filterContext";

import type { Transaction } from "@prisma/client";

const PieChartAmountByCategoires = () => {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<number[]>([]);

  const { categories } = useCategory();
  const { filter, rangeDate } = useFilterContext();

  const { transactions, isLoading } = useTransactions({
    filter,
    ...rangeDate,
  });

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
        if (key === "null") {
          return "Sin categoría";
        }
        return hasCategory?.name;
      });

      setChartSeries(transactionsSeries);
      setChartLabels(nameOfCategories as string[]);
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
            {chartSeries?.length === 0 ? (
              <Empty description="No encontramos datos" />
            ) : (
              <PieChart
                series={chartSeries}
                keys={chartLabels}
                heightChart="230"
                showToolBar={false}
              />
            )}
          </>
        )}
      </main>
    </Card>
  );
};

export default PieChartAmountByCategoires;

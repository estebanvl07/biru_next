import { useEffect, useState } from "react";

import { Empty } from "~/modules/components";
import { Spinner } from "@heroui/spinner";
import PieChart from "~/modules/Charts/pieChart";

import { useCategory } from "../../Category/hook/category.hook";
import { useTransactions } from "../../Transactions/hook/useTransactions.hook";
import { useFilterContext } from "~/lib/context/Filter.context";

import type { Transaction } from "@prisma/client";
import { Card, CardBody, CardHeader } from "@heroui/react";

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
    <Card className="h-full border border-divider px-4 py-2 shadow-sm">
      <CardHeader className="pb-0">
        <h3>Categorías</h3>
      </CardHeader>
      <CardBody className="flex w-full flex-grow">
        <p>Mira el detalle de tus gastos por categoría</p>
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
                position="bottom"
                heightChart="340"
                showToolBar={false}
              />
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default PieChartAmountByCategoires;

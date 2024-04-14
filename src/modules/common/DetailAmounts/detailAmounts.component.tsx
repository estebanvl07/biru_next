"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

import CardDetailAmount from "./CardDetailAmount";

import { getPercent } from "~/lib/helpers";
import { useTransactions } from "~/lib/hooks/useTransactions";
import { Series } from "~/types/root.types";

type DetailAmountProps = {
  className?: string;
  cardClassName?: string;
};

const initialValues = {
  color: "#a2a2a2",
  name: "",
  data: [],
};

const DetailAmounts = ({ className, cardClassName }: DetailAmountProps) => {
  const [flowsMoney, setFlowsMoney] = useState<{
    incomePercentParsed: string;
    egressPercentParsed: string;
  }>();

  const [incomeTransactions, setIncomeTransactions] =
    useState<Series>(initialValues);
  const [egressTransactions, setEgressTransactions] =
    useState<Series>(initialValues);

  const { dashboardInfo: balance, loading } = {
    dashboardInfo: {} as any,
    loading: false,
  };
  const { seriesTransaction, filterByMonth } = useTransactions();

  useEffect(() => {
    filterByMonth();
  }, []);

  // useEffect(() => {
  //   return;
  //   if (!seriesTransaction) return;

  //   // get transaction last index because is last month
  //   const transactionsLastMonth =
  //     seriesTransaction[seriesTransaction.length - 1].transactions;

  //   if (!transactionsLastMonth) return;

  //   // separate incomes and egress
  //   const incomeTr = transactionsLastMonth.filter((tr) => tr.type === 1);
  //   const egressTr = transactionsLastMonth.filter((tr) => tr.type === 2);

  //   // get alone amounts
  //   const incomes = incomeTr.map((tr) => tr.amount);
  //   const egress = egressTr.map((tr) => tr.amount);

  //   // set series for chart
  //   setIncomeTransactions({
  //     color: "#22c55e",
  //     name: "Ingresos",
  //     data: [0, ...incomes.reverse()],
  //   });

  //   setEgressTransactions({
  //     color: "#ef4444",
  //     name: "Egresos",
  //     data: [0, ...egress.reverse()],
  //   });
  // }, [seriesTransaction]);

  // useEffect(() => {
  //   if (balance) {
  //     // parse of values of the card
  //     const incomePercentParsed = getPercent(
  //       balance?.totalIncome ?? 0,
  //       balance?.totalIncome + balance?.totalExpenses,
  //     );
  //     const egressPercentParsed = getPercent(
  //       balance?.totalExpenses ?? 0,
  //       balance?.totalIncome + balance?.totalExpenses,
  //     );
  //     setFlowsMoney({ incomePercentParsed, egressPercentParsed });
  //   }
  // }, [balance]);

  return (
    <div
      className={clsx(
        "flex gap-3 md:h-full md:bg-transparent lg:flex-col",
        className,
      )}
    >
      {loading ? (
        <>
          {/* <LoaderSkeleton skeletonType="Amount" />
          <LoaderSkeleton skeletonType="Amount" /> */}
        </>
      ) : (
        <>
          <CardDetailAmount
            title="Ingresos"
            amount={balance?.totalIncome ?? 0}
            percent={flowsMoney?.incomePercentParsed ?? "0%"}
            icon="iconamoon:trend-up-light"
            color="text-green-500"
            series={[incomeTransactions]}
            cardClassName={cardClassName}
          />
          <CardDetailAmount
            title="Egresos"
            amount={balance?.totalExpenses ?? 0}
            percent={flowsMoney?.egressPercentParsed ?? "0%"}
            icon="iconamoon:trend-down-light"
            color="text-red-500"
            series={[egressTransactions]}
            cardClassName={cardClassName}
          />
        </>
      )}
    </div>
  );
};

export default DetailAmounts;

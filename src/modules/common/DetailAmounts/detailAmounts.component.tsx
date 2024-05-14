"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

import CardDetailAmount from "./CardDetailAmount";

import { getPercent } from "~/lib/helpers";
// import { useTransactions } from "~/lib/hooks/useTransactions";
import { Series } from "~/types/root.types";
import { Card } from "~/modules/components";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { getTransactionsByMonths } from "~/modules/transactions/hook/useHandlerTransactions.hook";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const [income, setIncome] = useState(0);
  const [egress, setEgress] = useState(0);
  const [flowsMoney, setFlowsMoney] = useState<{
    incomePercentParsed: string;
    egressPercentParsed: string;
  }>();
  const [incomeTransactions, setIncomeTransactions] =
    useState<Series>(initialValues);
  const [egressTransactions, setEgressTransactions] =
    useState<Series>(initialValues);

  const { account } = useCurrentAccount();
  const { transactionsByMonth } = getTransactionsByMonths();
  // const { seriesTransaction, filterByMonth } = useTransactions();

  useEffect(() => {
    if (!transactionsByMonth) return;

    // get transaction last index because is last month
    const transactionsLastMonth =
      transactionsByMonth[transactionsByMonth.length - 1]?.transactions;

    // console.log(transactionsLastMonth);

    if (!transactionsLastMonth) return;

    // separate incomes and egress
    const incomeTr = transactionsLastMonth.filter((tr) => tr.type === 1);
    const egressTr = transactionsLastMonth.filter((tr) => tr.type === 2);

    // get alone amounts
    const incomes = incomeTr.map((tr) => tr.amount);
    const egress = egressTr.map((tr) => tr.amount);

    const amountIncome = incomes.reduce((acc, val) => acc + val, 0);
    const amountEgress = egress.reduce((acc, val) => acc + val, 0);

    setIncome(amountIncome);
    setEgress(amountEgress);

    // set series for chart
    setIncomeTransactions({
      color: "#22c55e",
      name: "Ingresos",
      data: [...incomes.reverse()],
    });

    setEgressTransactions({
      color: "#ef4444",
      name: "Egresos",
      data: [...egress.reverse()],
    });
  }, [transactionsByMonth]);

  return (
    <section className={clsx("flex h-full w-full flex-col gap-2", className)}>
      {/* <Card className="flex flex-col justify-between lg:flex-auto">
        <div className="mb-2 grid h-10 w-10 place-content-center rounded-full bg-slate-100 dark:border-none dark:bg-slate-800">
          <Icon
            icon="material-symbols:account-balance-outline"
            className="text-primary dark:text-white"
            width={20}
          />
        </div>
        <article>
          <h4 className="font-medium">Balance total</h4>
          <h2 className="font-semibold">
            $ {account.balance?.toLocaleString()}
          </h2>
        </article>
      </Card> */}
      <CardDetailAmount
        title="Ingreso"
        amount={income}
        color="text-green-500"
        series={[incomeTransactions]}
        icon="iconamoon:trend-up-light"
        percent={flowsMoney?.incomePercentParsed ?? "0%"}
        redirectHref={`/account/${params?.acc}/transactions/new?type=1`}
      />
      <CardDetailAmount
        title="Egreso"
        amount={egress}
        color="text-red-500"
        series={[egressTransactions]}
        icon="iconamoon:trend-down-light"
        percent={flowsMoney?.egressPercentParsed ?? "0%"}
        redirectHref={`/account/${params?.acc}/transactions/new?type=2`}
      />
    </section>
  );
};

export default DetailAmounts;

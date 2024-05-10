"use client";
import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";

import type { Series } from "~/types/root.types";
import type { IAccount } from "~/types/account";
import { useCurrentAccount } from "~/modules/account/hooks";
import {
  getMonths,
  useTransactions,
} from "~/modules/transactions/hook/useTransactions.hook";

// TODO: filter by options
const CardBalanceAccount = () => {
  const [serie, setSerie] = useState<Series[]>();
  const [date, setDate] = useState<{ from: string; to: string }>();
  const { account } = useCurrentAccount();
  const desktopMediQuery = true;

  const { transactions } = useTransactions();
  const months = getMonths(transactions);

  const accountSelected = [] as IAccount[];

  const setChartSeries = () => {
    if (!transactions) return setSerie([]);

    // setKeys(months ?? []);
    setSerie([
      {
        name: "Balance",
        color: "#3E1FE9",
        data: transactions.map((tr) => tr.amount),
      },
    ]);

    // const lastIndex = transactions.length - 1;

    // setDate({
    //   from: transactions[lastIndex]?.createdAt,
    //   to: transactions[0]?.createdAt,
    // });

    // const transactionAmounts = transactions.map(
    //   (transaction) => transaction.amount,
    // );

    // transactionAmounts.reverse();

    // setSerie([
    //   {
    //     name: "Balance",
    //     data: transactionAmounts,
    //     color: "#3E1FE9",
    //   },
    // ]);
  };

  useEffect(() => {
    if (!account) return;
    setChartSeries();
  }, [account, transactions]);

  return (
    <Card className="flex h-full !w-full flex-col md:px-2 md:pr-4">
      <header className="mb-2 flex flex-col items-center justify-between px-2 md:flex-row md:px-4">
        <div className="flex w-full flex-col items-start justify-center">
          <h3 className="font-normal">Balance</h3>
          <h2 className="text-3xl">
            $ {account?.balance?.toLocaleString() ?? "0.00"}
          </h2>

          {date?.from ? (
            <span className="text text-sm">
              {date?.from} - {date?.to}
            </span>
          ) : (
            <span className="text-sm"> </span>
          )}
        </div>
        {/* <ChartsFilterList filterbyType={() => {}} /> */}
      </header>
      {serie && (
        <LineChart
          series={serie}
          // keys={months}
          heightChart="210"
          showToolTip={transactions?.length === 0 ? false : true}
          offsetX={-10}
          showLegend={false}
          showGrid={true}
          showYAxis={
            transactions?.length === 0 ? false : true && desktopMediQuery
          }
          showToolBar={false}
          showXAxis={false}
          hasformatNumber={false}
        />
      )}
    </Card>
  );
};

export default CardBalanceAccount;

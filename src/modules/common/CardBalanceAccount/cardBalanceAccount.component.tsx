"use client";
import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";

import type { Series } from "~/types/root.types";
import { IAccount } from "~/types/account";
import { ITransaction } from "~/types/transactions";

// TODO: filter by options
const CardBalanceAccount = () => {
  const [serie, setSerie] = useState<Series[]>();
  const [keys, setKeys] = useState<string[]>([]);
  const [date, setDate] = useState<{ from: string; to: string }>();

  const desktopMediQuery = true;

  const transactions = [] as ITransaction[];
  const accountSelected = [] as IAccount[];

  const setChartSeries = () => {
    if (!transactions)
      return setSerie([
        {
          name: "Balance",
          color: "#3E1FE9",
          data: [],
        },
      ]);

    const lastIndex = transactions.length - 1;

    // setDate({
    //   from: transactions[lastIndex]?.createdAt,
    //   to: transactions[0]?.createdAt,
    // });

    const transactionAmounts = transactions.map(
      (transaction) => transaction.amount,
    );

    transactionAmounts.reverse();

    setSerie([
      {
        name: "Balance",
        data: transactionAmounts,
        color: "#3E1FE9",
      },
    ]);
    setKeys([]);
  };

  // useEffect(() => {
  //   if (!accountSelected) return;
  //   if (!transactions) {
  //     // dispatch(getTransactions());
  //     return;
  //   }

  //   setChartSeries();
  // }, [transactions, accountSelected]);

  return (
    <Card className="flex h-full !w-full flex-col md:px-2 md:pr-4">
      <header className="mb-2 flex flex-col items-center justify-between px-2 md:flex-row md:px-4">
        <div className="flex w-full flex-col items-start justify-center">
          <h3>Transacciones</h3>
          {date?.from ? (
            <span className="text text-sm">
              {date?.from} - {date?.to}
            </span>
          ) : (
            <span className="text-sm"> Sin transacciones </span>
          )}
        </div>
        {/* <ChartsFilterList filterbyType={() => {}} /> */}
      </header>
      {serie && (
        <LineChart
          series={serie}
          keys={keys}
          heightChart="210"
          offsetX={-10}
          showLegend={false}
          showGrid={false}
          showYAxis={desktopMediQuery}
          showXAxis={false}
          hasformatNumber={false}
        />
      )}
    </Card>
  );
};

export default CardBalanceAccount;

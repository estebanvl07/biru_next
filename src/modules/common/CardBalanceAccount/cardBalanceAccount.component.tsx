"use client";
import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";

import type { Series } from "~/types/root.types";
import { IAccount } from "~/types/account";
import { ITransaction } from "~/types/transactions";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";

// TODO: filter by options
const CardBalanceAccount = () => {
  const params = useParams();
  const [serie, setSerie] = useState<Series[]>();
  const [keys, setKeys] = useState<string[]>([]);
  const [date, setDate] = useState<{ from: string; to: string }>();
  const { data: account } = api.userAccount.getOne.useQuery({
    id: Number(params?.acc),
  });

  const desktopMediQuery = true;

  const transactions = [] as ITransaction[];
  const accountSelected = [] as IAccount[];

  const setChartSeries = () => {
    if (!transactions && account)
      console.log(account.balance, typeof account.balance);
    return setSerie([
      {
        name: "Balance",
        color: "#3E1FE9",
        data: [0, account?.balance as number],
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

  useEffect(() => {
    if (!account) return;
    setChartSeries();
  }, [account]);

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

"use client";
import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";

import type { Series } from "~/types/root.types";
import type { IAccount } from "~/types/account";
import { useCurrentAccount } from "~/modules/Account/hooks";
import {
  getMonths,
  useTransactions,
} from "~/modules/transactions/hook/useTransactions.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Empty } from "~/modules/components/molecules";
import { useParams } from "next/navigation";
import ChartsFilterList from "~/modules/charts/chartsFilterList.component";

// TODO: filter by options
const CardBalanceAccount = () => {
  const params = useParams();
  const [serie, setSerie] = useState<Series[]>();
  const [date, setDate] = useState<{ from: string; to: string }>();
  const { account } = useCurrentAccount();
  const desktopMediQuery = true;

  const { transactions } = useTransactions();
  // const months = getMonths(transactions);

  const accountSelected = [] as IAccount[];

  const setChartSeries = () => {
    if (!transactions) return setSerie([]);
    setSerie([
      {
        name: "Balance",
        color: "#3E1FE9",
        data: transactions.map((tr) => tr.amount),
      },
    ]);
  };

  useEffect(() => {
    if (!account) return;
    setChartSeries();
  }, [account, transactions]);

  return (
    <Card className="flex h-full !w-full flex-col">
      <header className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full flex-col items-start justify-center">
          <h3>Balance</h3>
          {transactions && transactions.length > 0 && (
            <>
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
            </>
          )}
        </div>
        {/* <ChartsFilterList filterbyType={() => {}} /> */}
      </header>
      <section className="block">
        {transactions && transactions.length > 0 ? (
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
        ) : (
          <Empty
            href={`/account/${params?.acc}/transactions/new`}
            buttonText="Crear Transacción"
          />
        )}
      </section>
    </Card>
  );
};

export default CardBalanceAccount;

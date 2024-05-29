"use client";
import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";

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
// import ChartsFilterList from "~/modules/charts/chartsFilterList.component";
import { useResize } from "~/lib/hooks/useResize";
import { useFilterContext } from "~/lib/context/filterContext";
import { Series } from "~/types/chart.types";
import { api } from "~/utils/api";

// TODO: filter by options
const CardBalanceAccount = () => {
  const params = useParams();
  const [serie, setSerie] = useState<Series[]>();
  const [date, setDate] = useState<{ from: string; to: string }>();
  const { account } = useCurrentAccount();
  const { isDesktop } = useResize();
  const { filter, rangeDate } = useFilterContext();

  const { transactions, isLoading } = useTransactions({
    filter,
    ...rangeDate,
  });

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
    if (!account && !isLoading) return;
    setChartSeries();
  }, [account, transactions]);

  return (
    <Card className="flex h-full !w-full flex-col">
      <header className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full flex-col items-start justify-center">
          <h3>Transacciones</h3>
          {transactions && transactions.length > 0 && (
            <>
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
      <section className="block h-full w-full">
        {serie && serie[0]!?.data.length > 0 ? (
          <LineChart
            series={serie}
            // keys={months}
            heightChart="210"
            showToolTip={transactions?.length === 0 ? false : true}
            offsetX={-10}
            showLegend={true}
            showGrid={true}
            showYAxis={transactions?.length === 0 ? false : true}
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

import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";

import { useCurrentAccount } from "~/modules/Account/hooks";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { Empty } from "~/modules/components/molecules";
import { useParams } from "next/navigation";

import { useFilterContext } from "~/lib/context/filterContext";
import { Series } from "~/types/chart.types";
import ChartsFilterList from "~/modules/charts/chartsFilterList";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FILTERS, TransactionIncludes } from "~/types/transactions";

// TODO: filter by options
const CardBalanceAccount = ({ defaultFilter }: { defaultFilter?: FILTERS }) => {
  const params = useParams();
  const [currentFilter, setCurrentFilter] = useState<FILTERS | undefined>(
    defaultFilter,
  );
  const [serie, setSerie] = useState<Series[]>();
  const [date, setDate] = useState<{ from: string; to: string }>();
  const { account } = useCurrentAccount();
  const { filter, rangeDate } = useFilterContext();

  const { transactions, isLoading } = useTransactions({
    filter: currentFilter || filter,
    ...rangeDate,
  });

  const sortTransactionsByDate = (
    transactions: TransactionIncludes[],
  ): TransactionIncludes[] => {
    return [...transactions].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  };

  const setChartSeries = () => {
    if (!transactions) return setSerie([]);

    const myTransaction = sortTransactionsByDate(transactions as any);

    const history: number[] = [];
    let amountBalanceIterator = 0;

    for (let i = 0; i < myTransaction.length; i++) {
      if (myTransaction[i]!.type === 1) {
        amountBalanceIterator += myTransaction[i]!.amount;
      } else {
        amountBalanceIterator -= myTransaction[i]!.amount;
      }
      history.push(amountBalanceIterator);
    }

    setSerie([
      {
        name: "Balance",
        color: "#3E1FE9",
        data: history,
      },
    ]);
  };

  useEffect(() => {
    if (!account && !isLoading) return;
    if (Array.isArray(transactions) && transactions.length > 0) {
      const length = transactions.length;

      const lastTransaction = transactions[length - 1];
      const firstTransaction = transactions[0];

      const fromDate = lastTransaction
        ? new Date(lastTransaction.date || lastTransaction.createdAt)
        : null;
      const toDate = firstTransaction
        ? new Date(firstTransaction.date || firstTransaction.createdAt)
        : null;

      setDate({
        from: fromDate ? format(fromDate, "PPP", { locale: es }) : "",
        to: toDate ? format(toDate, "PPP", { locale: es }) : "",
      });
    }
    setChartSeries();
  }, [account, transactions]);

  return (
    <Card className="flex h-full !w-full flex-col">
      <header className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full flex-col items-start justify-center">
          <h3>Balance de cuenta</h3>
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
        <ChartsFilterList
          filterbyType={(opt) => {
            if (opt === 0) {
              return setCurrentFilter(undefined);
            }
            setCurrentFilter(opt);
          }}
        />
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

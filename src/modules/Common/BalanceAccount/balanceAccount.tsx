import { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/Charts";

import { useCurrentAccount } from "~/modules/Account/hooks";
import {
  getMonths,
  useTransactions,
} from "~/modules/Transactions/hook/useTransactions.hook";
import { Empty } from "~/modules/components/molecules";
import { useParams } from "next/navigation";

import { useFilterContext } from "~/lib/context/Filter.context";
import { ChartProps, Series } from "~/types/chart.types";
import ChartsFilterList from "~/modules/Charts/chartsFilterList";
import { format } from "date-fns";
import { es, is } from "date-fns/locale";
import { FILTERS, TransactionIncludes } from "~/types/transactions";
import { useResize } from "~/lib/hooks/useResize";
import clsx from "clsx";
import { BASIC_DATE } from "~/lib/constants/config";
import { useTransactionSeries } from "~/modules/Transactions/hook/useTransactionSeries";

interface Props {
  defaultFilter?: FILTERS;
  showHeader?: boolean;
  className?: string;
  chartOptions?: Omit<ChartProps, "series" | "keys">;
  hideWhenEmpty?: boolean;
}

const defaultChartProps = {
  heightChart: "100%",
  // showToolTip: transactions?.length === 0 ? false : true,
  offsetX: -10,
  showLegend: true,
  showGrid: true,
  // showYAxis: transactions?.length === 0 ? false : true,
  showToolBar: false,
  showXAxis: true,
  hasformatNumber: false,
};

// TODO: filter by options
const BalanceAccount = ({
  defaultFilter,
  showHeader = true,
  className,
  hideWhenEmpty = false,
  chartOptions = defaultChartProps,
}: Props) => {
  const params = useParams();
  const { isMobile } = useResize();

  const [currentFilter, setCurrentFilter] = useState<FILTERS | undefined>(
    defaultFilter,
  );

  const { filter, rangeDate } = useFilterContext();

  const { transactions, isLoading } = useTransactions({
    filter: currentFilter || filter,
    ...rangeDate,
  });

  const { months, series, date } = useTransactionSeries(transactions as any);

  if (isMobile && hideWhenEmpty && transactions?.length === 0) return null;

  return (
    <Card className={clsx("flex h-full !w-full flex-col", className)}>
      {showHeader && (
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
      )}
      <section className="block h-full w-full">
        {series && series[0]!?.data.length > 0 ? (
          <LineChart
            keys={months}
            series={series}
            heightChart="100%"
            showXAxis={!isMobile}
            showYAxis={!isMobile}
            {...chartOptions}
          />
        ) : (
          <Empty
            className="py-6"
            href={`/account/${params?.acc}/transactions/new`}
            buttonText="Crear Transacción"
          />
        )}
      </section>
    </Card>
  );
};

export default BalanceAccount;

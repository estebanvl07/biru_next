import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});

import React, { useEffect, useState } from "react";
import { Card } from "~/modules/components";
import { parseAmount } from "~/lib/helpers";

import { FONT_FAMILY } from "~/lib/constants/config";
import { getTransactionsByMonths } from "~/modules/Transactions/hook/useHandlerTransactions.hook";

import { useThemeContext } from "~/lib/context/Theme.context";
import { useFilterContext } from "~/lib/context/Filter.context";
import { useTransactions } from "~/modules/Transactions/hook";
import { BarChart } from "~/modules/Charts";

const initialValues = {
  color: "",
  name: "",
  data: [],
};

const AnnualBalance = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [incomeTransactions, setIncomeTransactions] = useState<{
    color?: string;
    name: string;
    data: number[];
  }>(initialValues);
  const [egressTransactions, setEgressTransactions] = useState<{
    color?: string;
    name: string;
    data: number[];
  }>(initialValues);

  const { filter, rangeDate } = useFilterContext();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const { transactions } = useTransactions({
    filter,
    ...rangeDate,
  });
  const { transactionsByMonth, months } = getTransactionsByMonths(transactions);

  useEffect(() => {
    if (!transactionsByMonth) return;

    const incomeValues = transactionsByMonth.map((serie) => serie.income);
    const egressValues = transactionsByMonth.map((serie) => serie.egress);

    setIncomeTransactions({
      color: "#3E1FE9",
      name: "Ingresos",
      data: incomeValues,
    });

    setEgressTransactions({
      color: "#a5b4fc",
      name: "Egresos",
      data: egressValues,
    });

    // month labels
    const labels = transactionsByMonth.map((serie) => serie.month);
    setLabels(labels);
  }, [transactionsByMonth]);

  return (
    <div className="h-full">
      <Card className="h-full flex-col !px-6">
        <h3 className="">Balance anual</h3>
        <BarChart
          keys={months}
          series={[incomeTransactions, egressTransactions] as any}
          showGrid={false}
        />
      </Card>
    </div>
  );
};

export default AnnualBalance;

import { format, getMonth, getYear, getDay, getWeek, getDate } from "date-fns";
import { useEffect, useState } from "react";
import _ from "lodash";

import type { TransactionIncludes as Transaction } from "~/types/transactions";
import type { Series } from "~/types/chart.types";
import {
  BASIC_DATE,
  DATE_FORMAT_TRANS,
  DEFAULT_DATES,
  TODAY_DATE,
} from "~/lib/constants/config";
import { es } from "date-fns/locale";

export const useTransactionSeries = (transactions: Transaction[]) => {
  const [months, setMonths] = useState<string[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [date, setDate] = useState<{ from: string; to: string }>();

  useEffect(() => {
    if (!transactions || transactions.length === 0) return setSeries([]);
    setChartSeries();
  }, [transactions]);

  const sortTransactionsByDate = (
    transactions: Transaction[],
  ): Transaction[] => {
    return transactions.sort((a, b) => {
      const dateA = new Date(a.date ?? a.createdAt).getTime();
      const dateB = new Date(b.date ?? b.createdAt).getTime();
      return dateA - dateB;
    });
  };

  const setChartSeries = () => {
    if (!transactions || transactions.length === 0) return setSeries([]);

    const myTransaction = sortTransactionsByDate(transactions);

    let granularity: "month" | "week" | "day" = "month";

    // obtiene la fecha de la primera transaccion y de la ultima
    const firstDate = new Date(
      myTransaction[0]!.date ?? myTransaction[0]!.createdAt,
    );
    const lastDate = new Date(
      myTransaction[myTransaction.length - 1]!.date ??
        myTransaction[myTransaction.length - 1]!.createdAt,
    );

    setDate({
      from: format(firstDate, DEFAULT_DATES, { locale: es }),
      to: format(lastDate, DEFAULT_DATES, { locale: es }),
    });

    // si las transacciones son del mismo mes
    if (
      getMonth(firstDate) === getMonth(lastDate) &&
      getYear(firstDate) === getYear(lastDate)
    ) {
      granularity = "week";
      // si las transacciones son del misma semana
      if (
        getWeek(firstDate) === getWeek(lastDate) &&
        getDay(firstDate) === getDay(lastDate) &&
        getYear(firstDate) === getYear(lastDate)
      ) {
        granularity = "day";
      }
    }

    const groupedTransactions = _.groupBy(
      myTransaction,
      (tran: Transaction) => {
        const date = new Date(tran.date ?? tran.createdAt);
        switch (granularity) {
          case "day":
            return format(date, TODAY_DATE);
          case "month":
            return format(date, "yyyy-MM");
          case "week":
            return format(date, BASIC_DATE);
        }
      },
    );

    const sortedGroups =
      granularity === "week"
        ? Object.keys(groupedTransactions)
        : Object.keys(groupedTransactions).sort();
    const history: number[] = [];
    let amountBalanceIterator = 0;

    for (const group of sortedGroups) {
      const groupTransactions = groupedTransactions[group];
      let groupSum = 0;

      for (const tran of groupTransactions!) {
        if (
          (tran.type === 1 && tran.transferType === 1) ||
          tran.goal?.type === 1
        ) {
          groupSum += tran.amount;
        } else {
          groupSum -= tran.amount;
        }
      }

      amountBalanceIterator += groupSum;
      history.push(amountBalanceIterator);
    }

    let formattedGroups: string[] = [];

    sortedGroups.map((group) => {
      if (granularity === "month") {
        const date = new Date(group);
        // Asegúrate de usar la fecha correctamente en UTC
        const adjustedDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000,
        );
        formattedGroups = [...formattedGroups, format(adjustedDate, "MMM yyy")];
        return;
      }
      formattedGroups.push(group);
    });

    setMonths(formattedGroups ?? []);
    setSeries([
      {
        name: "Balance",
        color: "#3E1FE9",
        data: history,
      },
    ]);
  };

  return { months, series, date } as const;
};

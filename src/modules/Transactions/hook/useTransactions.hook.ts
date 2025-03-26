import { useCallback, useEffect, useMemo, useState } from "react";

import { getQueryKey } from "@trpc/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { months } from "~/lib/resource/months";

import { api } from "~/utils/api";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { es } from "date-fns/locale";
import { useParams } from "next/navigation";

import {
  FILTERS,
  FilterOptions,
  TransactionIncludes,
} from "~/types/transactions";
import { getPercent } from "~/lib/helpers";

interface FilterByTypeProps {
  type: 1 | 2;
  options: FilterOptions;
}

export const useTransactions = (options: Omit<FilterOptions, "bookId">) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const bookId = String(params?.bookId);
  const transactionKey = useMemo(() => {
    return getQueryKey(
      api.transaction.getTransactions,
      {
        bookId: bookId!,
        filter: options?.filter ?? FILTERS.none,
        startDate: options?.startDate,
        endDate: options?.endDate,
      },
      "query",
    );
  }, [bookId, options]);

  const hasTransactionsCached = useMemo(() => {
    const transactionCache = queryClient.getQueryData(transactionKey);
    return Boolean(transactionCache);
  }, [transactionKey, queryClient]);

  const { data, isLoading } = api.transaction.getTransactions.useQuery(
    {
      bookId: bookId!,
      filter: options?.filter ?? FILTERS.none,
      startDate: options?.startDate,
      endDate: options?.endDate,
    },
    {
      enabled: !!bookId && !hasTransactionsCached,
    },
  );

  return { transactions: data!, isLoading };
};

export const useFilterByType = ({ type, options }: FilterByTypeProps) => {
  const { transactions, isLoading } = useTransactions({
    filter: options.filter,
    startDate: options?.startDate,
    endDate: options?.endDate,
  });

  const [transactionFiltered, serTransactionFiltered] =
    useState<TransactionIncludes[]>();
  const [amounts, setAmount] = useState<number[]>();
  const [noData, setNoData] = useState<boolean>(false);
  const [totalAmounts, setTotalAmounts] = useState<{
    income: number;
    egress: number;
  }>();
  const [percents, setPercents] = useState<{
    income: string;
    egress: string;
  }>();

  useMemo(() => {
    if (!transactions) return;
    const icomesFilterd = transactions.filter(
      ({ type, transferType, ...tran }) => {
        if (transferType === 1 && type === 1) return true;
        if (tran.goal?.type === 1) return true;
        return false;
      },
    );
    const egressFiltered = transactions.filter(
      ({ type, transferType, ...tran }) => {
        if (transferType === 1 && type === 2) return true;
        if (tran.goal?.type === 2) return true;
        return false;
      },
    );

    if (type === 1) {
      setAmount(icomesFilterd.map(({ amount }) => amount));
    } else {
      setAmount(egressFiltered.map(({ amount }) => amount));
    }

    const income = icomesFilterd.reduce((acc, { amount }) => acc + amount, 0);
    const egress = egressFiltered.reduce((acc, { amount }) => acc + amount, 0);

    const total = income + egress;

    serTransactionFiltered(
      type === 1 ? (icomesFilterd as any) : (egressFiltered as any),
    );
    setPercents({
      income: getPercent(income!, total),
      egress: getPercent(egress!, total),
    });
    setTotalAmounts({
      income,
      egress,
    });
    setNoData(transactions.length >= 1);
  }, [transactions]);

  return {
    transactionFiltered,
    totalAmounts,
    amounts,
    percents,
    noData,
    isLoading,
  };
};

export const getMonths = (transactions: Transaction[]) => {
  const data = useMemo(() => {
    if (!transactions) return;

    const indexMonths = new Set();

    transactions?.forEach((objeto) => {
      const m = objeto.createdAt.getMonth() + 1;
      indexMonths.add(m);
    });

    const monthsArr = Array.from(indexMonths);
    let monthsNames = monthsArr.map((month) => months[Number(month)]);

    monthsNames.sort((a, b) => {
      return (
        monthsArr.indexOf(
          Object.keys(months).find((key) => months[Number(key)] === a),
        ) -
        monthsArr.indexOf(
          Object.keys(months).find((key) => months[Number(key)] === b),
        )
      );
    });

    return monthsNames ?? [];
  }, [transactions]);

  return data;
};

export const formatterTransactions = (
  transactions: TransactionIncludes[],
): TransactionIncludes[] => {
  const formatted = transactions?.map((tr: TransactionIncludes) => {
    return {
      ...tr,
      createdAt: format(String(tr.createdAt), DATE_FORMAT_TRANS, {
        locale: es,
      }) as any,
      updatedAt: format(String(tr.updatedAt), DATE_FORMAT_TRANS, {
        locale: es,
      }) as any,
    };
  });
  return formatted as TransactionIncludes[];
};

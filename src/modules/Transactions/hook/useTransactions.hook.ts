import { useMemo } from "react";

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

export const useTransactions = (options: FilterOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const accountId = params?.acc ? String(params?.acc) : undefined;

  const hasTransactionsCached = useMemo(() => {
    const transactionsKey = getQueryKey(
      api.transaction.getTransactions,
      {
        accountId: Number(accountId),
        filter: options?.filter ?? FILTERS.none,
        startDate: options?.startDate,
        endDate: options?.endDate,
      },
      "query",
    );

    const transactionCache = queryClient.getQueryData(transactionsKey);
    return Boolean(transactionCache);
  }, [options]);

  const { data, isLoading } = api.transaction.getTransactions.useQuery(
    {
      accountId: Number(accountId) as any,
      filter: options?.filter ?? FILTERS.none,
      startDate: options?.startDate,
      endDate: options?.endDate,
    },
    {
      enabled: !!accountId && !hasTransactionsCached,
    },
  );

  return { transactions: data!, isLoading };
};

export const getMonths = (transactions: Transaction[]) => {
  const data = useMemo(() => {
    const indexMonths = new Set();

    transactions.forEach((objeto) => {
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

    return monthsNames;
  }, []);

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

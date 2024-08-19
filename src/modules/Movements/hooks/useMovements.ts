import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useMovements = () => {
  const queryClient = useQueryClient();

  const movementsKey = useMemo(() => {
    return getQueryKey(api.transaction.getTransactions, {}, "query");
  }, []);

  const hasMovementsCache = useMemo(() => {
    const transactionCache = queryClient.getQueryData(movementsKey);
    return Boolean(transactionCache);
  }, [movementsKey, queryClient]);

  const { data, isLoading } = api.movements.getAll.useQuery(undefined, {
    enabled: !hasMovementsCache,
  });

  return { transactions: data!, isLoading };
};

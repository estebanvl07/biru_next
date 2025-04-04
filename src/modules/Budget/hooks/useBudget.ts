import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useCurrentMonthBudget = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ bookId: string }>();
  const bookId = String(params?.bookId);

  const key = useMemo(() => {
    return getQueryKey(api.budget.getCurrentBudget, bookId, "query");
  }, [bookId]);

  const hasCached = useMemo(() => {
    const cache = queryClient.getQueryData(key);
    return Boolean(cache);
  }, [key, queryClient]);

  const invalidateBudget = () => {
    queryClient.invalidateQueries({ queryKey: key });
  };

  const { data: budget, isLoading } = api.budget.getCurrentBudget.useQuery(
    bookId,
    {
      enabled: !hasCached && !!bookId,
    },
  );

  return { budget, isLoading, invalidateBudget };
};

export const useExpensesCurrentMonth = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ bookId: string }>();
  const bookId = String(params?.bookId);

  const key = useMemo(() => {
    return getQueryKey(api.budget.getExepensesCurrentMonth, bookId, "query");
  }, [bookId]);

  const hasCached = useMemo(() => {
    const cache = queryClient.getQueryData(key);
    return Boolean(cache);
  }, [key, queryClient]);

  const {
    data: expenses,
    isLoading,
    refetch,
  } = api.budget.getExepensesCurrentMonth.useQuery(bookId, {
    enabled: !!bookId && !hasCached,
  });

  const invalidateExpenses = async ({
    hasRefetch,
  }: {
    hasRefetch?: boolean;
  }) => {
    queryClient.removeQueries({ queryKey: key });
    await queryClient.invalidateQueries({ queryKey: key });
    hasRefetch && refetch();
  };

  return { expenses, isLoading, invalidateExpenses };
};

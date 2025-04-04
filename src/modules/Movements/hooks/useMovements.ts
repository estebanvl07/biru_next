import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useMovements = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const bookId = String(params?.bookId);

  const movementsKey = useMemo(() => {
    return getQueryKey(api.movements.getAll, bookId, "query");
  }, [bookId]);

  const hasMovementsCache = useMemo(() => {
    const transactionCache = queryClient.getQueryData(movementsKey);
    return Boolean(transactionCache);
  }, [movementsKey, queryClient]);

  const { data, isLoading } = api.movements.getAll.useQuery(bookId, {
    enabled: !!bookId && !hasMovementsCache,
  });

  const invalidateMovements = async () => {
    queryClient.removeQueries({ queryKey: movementsKey });
    await queryClient.invalidateQueries({ queryKey: movementsKey });
  };

  return { movements: data!, isLoading, invalidateMovements };
};

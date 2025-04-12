import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useCategory = () => {
  const queryClient = useQueryClient();

  const categoryKey = useMemo(() => {
    return getQueryKey(api.category.getAll, undefined, "query");
  }, []);

  const dataCache = useMemo(() => {
    const categoryCache = queryClient.getQueryData(categoryKey);
    return Boolean(categoryCache);
  }, []);

  const { data: categories = [], isLoading } = api.category.getAll.useQuery(
    undefined,
    {
      enabled: !dataCache,
    },
  );

  const invalidate = async () => {
    queryClient.removeQueries({ queryKey: categoryKey });
    await queryClient.invalidateQueries({ queryKey: categoryKey });
  };

  return { categories, isLoading, invalidate };
};

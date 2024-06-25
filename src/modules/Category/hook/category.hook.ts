import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useCategory = () => {
  const queryClient = useQueryClient();
  const hasCategory = useMemo(() => {
    const categoryKey = getQueryKey(api.category.getAll, undefined, "query");
    const categoryCache = queryClient.getQueryData(categoryKey);
    return Boolean(categoryCache);
  }, []);

  const { data: categories = [], isLoading } = api.category.getAll.useQuery(
    undefined,
    {
      enabled: !hasCategory,
    },
  );

  return { categories, isLoading };
};

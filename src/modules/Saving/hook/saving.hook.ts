import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useSavings = () => {
  const queryClient = useQueryClient();
  const hasSaving = useMemo(() => {
    const savingKey = getQueryKey(api.saving.getSavings, undefined, "query");
    const savingCache = queryClient.getQueryData(savingKey);
    return Boolean(savingCache);
  }, []);

  const { data: savings = [], isLoading } = api.saving.getSavings.useQuery(
    undefined,
    {
      enabled: !hasSaving,
    },
  );

  return { savings, isLoading };
};

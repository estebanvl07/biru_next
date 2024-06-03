import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useGoals = () => {
  const queryClient = useQueryClient();
  const hasGoals = useMemo(() => {
    const goalsKey = getQueryKey(api.goals.getGoals, undefined, "query");
    const goalsCache = queryClient.getQueryData(goalsKey);
    return Boolean(goalsCache);
  }, []);

  const { data: goals = [], isLoading } = api.goals.getGoals.useQuery(
    undefined,
    {
      enabled: !hasGoals,
    },
  );

  return { goals: goals, isLoading };
};

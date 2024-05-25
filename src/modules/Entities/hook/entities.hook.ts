import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useEntity = () => {
  const queryClient = useQueryClient();
  const hasEntities = useMemo(() => {
    const entitiesKey = getQueryKey(api.entity.getEntities, undefined, "query");
    const entitiesCache = queryClient.getQueryData(entitiesKey);
    return Boolean(entitiesCache);
  }, []);

  const { data: entities = [], isLoading } = api.entity.getEntities.useQuery(
    undefined,
    {
      enabled: !hasEntities,
    },
  );

  return { entities, isLoading };
};

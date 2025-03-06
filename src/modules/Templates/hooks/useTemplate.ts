import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { TemplatesIncludes } from "~/types/templates/templates";
import { api } from "~/utils/api";

export const useTemplate = () => {
  const queryClient = useQueryClient();
  const hasTemplates = useMemo(() => {
    const templatesKey = getQueryKey(
      api.templates.getTemplates,
      undefined,
      "query",
    );
    const templatesCache = queryClient.getQueryData(templatesKey);
    return Boolean(templatesCache);
  }, []);

  const { data: templates = [], isLoading } =
    api.templates.getTemplates.useQuery(undefined, {
      enabled: !hasTemplates,
    });

  return { templates, isLoading };
};

import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { TemplatesIncludes } from "~/types/templates/templates";
import { api } from "~/utils/api";

export const useTemplate = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const bookId = String(params?.bookId);

  const key = useMemo(() => {
    return getQueryKey(api.templates.getTemplates, bookId, "query");
  }, [bookId]);

  const hasTemplates = useMemo(() => {
    const templatesCache = queryClient.getQueryData(key);
    return Boolean(templatesCache);
  }, [key, queryClient]);

  const {
    data: templates = [],
    isLoading,
    refetch,
  } = api.templates.getTemplates.useQuery(bookId, {
    enabled: !!bookId && !hasTemplates,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: key });
    await refetch();
  };

  return { templates, isLoading, invalidate };
};

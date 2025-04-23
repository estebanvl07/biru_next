import { Notifications } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useNotification = ({ take }: { take?: number }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const bookId = String(params?.bookId);

  const notificationKey = useMemo(() => {
    return getQueryKey(api.notifications.getAll, { bookId, take }, "query");
  }, [bookId]);

  const hasNotificationsCached = useMemo(() => {
    const notificationsCache = queryClient.getQueryData(notificationKey);
    return Boolean(notificationsCache);
  }, [notificationKey, queryClient]);

  const { data, isLoading, refetch } = api.notifications.getAll.useQuery(
    { bookId, take },
    { enabled: !!bookId && !hasNotificationsCached },
  );

  const invalidate = async () => {
    queryClient.removeQueries({ queryKey: notificationKey });
    await queryClient.invalidateQueries({ queryKey: notificationKey });
    refetch();
  };

  const updateNotificationCache = (
    updater: (prev: Notifications[] | undefined) => Notifications[] | undefined,
  ) => {
    queryClient.setQueryData(notificationKey, updater);
  };

  return {
    isLoading,
    invalidate,
    notifications: data!,
    updateNotificationCache,
    refetch,
  };
};

import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { api } from "~/utils/api"

export const useNotification = () => {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    
    const notificationKey = useMemo(() => {
        return getQueryKey(
            api.notifications.getAll,
            undefined,
            "query"
        )
    }, [session])

    const hasNotificationsCached = useMemo(() => {
        const notificationsCache = queryClient.getQueryData(notificationKey);
        return Boolean(notificationsCache);
      }, [notificationKey, queryClient]);

    const { data, isLoading } = api.notifications.getAll.useQuery(undefined, { enabled: Boolean(session?.user) && !hasNotificationsCached })
    
    return {
        notifications: data!, isLoading
    }
}
import { toast } from "sonner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNotification } from "~/lib/hooks/useNotification";
import { useWebSocket } from "~/lib/hooks/useWebSocket";
import { WS_EVENTS } from "~/server/ws/events";

export const NotificationListener = () => {
  const { refetch } = useNotification({});

  useWebSocket({
    [WS_EVENTS.NOTIFICATION_NEW]: (notification) => {
      refetch();
      toast.info(
        <div className="flex flex-row items-start gap-x-2">
          <Icon icon="flowbite:bell-outline" width={24} />
          <div className="flex h-fit flex-col font-montserrat">
            <h4 className="text-sm font-semibold">{notification.title}</h4>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: notification.message }}
            />
          </div>
          ,
        </div>,
      );
    },
  });

  return null;
};

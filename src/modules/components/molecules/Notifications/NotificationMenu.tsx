import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import { motion } from "framer-motion";
import { Badge } from "@heroui/badge";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
} from "@heroui/react";
import { useNotification } from "~/lib/hooks/useNotification";
import { Notifications } from "@prisma/client";
import NotificationItem from "./NotificationItem";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { api } from "~/utils/api";
import { useParams } from "next/navigation";
import { EventsType } from "~/server/ws/events";
import { useResize } from "~/lib/hooks/useResize";
import CustomDrawer from "../CustomDrawer";

const NotificationMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { notifications, isLoading, updateNotificationCache } = useNotification(
    { take: 60 },
  );

  const params = useParams();
  const { isMobile } = useResize();

  const { mutate: markAllAsRead } = api.notifications.markAllAsRead.useMutation(
    {
      onSuccess: () => {
        updateNotificationCache((prev) => {
          if (!prev) return prev;
          return prev.map((not) =>
            not.isRead ? not : { ...not, isRead: true },
          );
        });
      },
    },
  );

  const { mutate: markAsRead } = api.notifications.onRead.useMutation({
    onSuccess: ({ id }) => {
      updateNotificationCache((prev) => {
        if (!prev) return prev;
        return prev.map((not) =>
          not.id === id ? { ...not, isRead: true } : not,
        );
      });
    },
  });

  const element = useOutsideClick<HTMLDivElement>(() => onHideMenu());

  const onHideMenu = () => {
    setShowMenu(false);
  };

  const unseen = notifications?.filter((not) => !not.isRead) || [];
  const seen = notifications?.filter((not) => not.isRead) || [];

  const renderList = (data: Notifications[]) => {
    if (!data || data.length === 0)
      return (
        <div className="col-span-3 flex h-full w-full flex-col items-center justify-center py-10">
          <h3>Sin notificaciones</h3>
          <p>Aun no tienes notificaciones creadas</p>
        </div>
      );

    return (
      <ul className="flex flex-col text-foreground-600 dark:text-foreground-300">
        {data?.map((notification) => {
          const event = notification.type as EventsType;
          const metadata = notification.metadata as Record<string, unknown>;

          const handleRead = () => {
            markAsRead({
              id: notification.id,
              bookId: notification?.bookId ?? String(params?.bookId),
            });
          };

          if (event === "MOVEMENT_EXPIRED") {
            return (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleRead}
                actions={[
                  {
                    label: "Realizar",
                    href: `/movements/new/ocurrence/${metadata.movementId}`,
                    color: "primary",
                  },
                  {
                    label: "Ver Movimiento",
                    href: `/movements/${metadata.movementId}`,
                    color: "default",
                  },
                ]}
              />
            );
          }

          return (
            <NotificationItem
              onRead={handleRead}
              key={notification.id}
              notification={notification}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <div ref={!isMobile ? element : undefined} className="relative">
      <Badge
        content={unseen?.length}
        color="danger"
        classNames={{
          badge: unseen?.length === 0 && "hidden",
        }}
      >
        <Button
          variant="bordered"
          className="border border-divider"
          onPress={() => setShowMenu(!showMenu)}
          isIconOnly
        >
          <Icon icon="flowbite:bell-outline" width={24} />
        </Button>
      </Badge>

      <MenuContent isOpen={showMenu} onClose={onHideMenu}>
        <header className="md:mb-3md:py-0 sticky top-0 z-10 flex items-center  justify-between bg-white px-4 py-4 dark:bg-default-100">
          <aside className="flex items-center gap-2">
            <button className="p-2" onClick={onHideMenu}>
              <ArrowLeft width={20} />
            </button>
            <h2 className="whitespace-nowrap text-xl font-semibold md:text-2xl">
              Notificaciones
            </h2>
          </aside>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="bordered" isIconOnly>
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="font-montserrat">
              <DropdownItem
                key="mark-all-as-read"
                onPress={() => markAllAsRead(String(params?.bookId))}
              >
                Marcar todas como leidas
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </header>
        <Tabs
          fullWidth
          classNames={{
            tabList: "dark:bg-slate-950/50 mx-4 mb-2",
            panel:
              "md:max-h-[57vh] scrollbar-hide md:scrollbar-auto overflow-y-auto",
          }}
        >
          <Tab
            key="all"
            title={
              <div className="flex items-center gap-2">
                <span>Todos </span>
                {notifications?.length > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-white">
                    <span className="tracking-normal">
                      {notifications.length}
                    </span>
                  </div>
                )}
              </div>
            }
          >
            {renderList(notifications)}
          </Tab>
          <Tab
            key="unseen"
            title={
              <div className="flex items-center gap-2">
                <span>No leídas</span>
                {unseen?.length > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-white">
                    <span className="tracking-normal">{unseen.length}</span>
                  </div>
                )}
              </div>
            }
          >
            {renderList(unseen)}
          </Tab>
          <Tab
            key="seen"
            title={
              <div className="flex items-center gap-2">
                <span>leídas</span>
                {seen?.length > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-white">
                    <span className="tracking-normal">{seen.length}</span>
                  </div>
                )}
              </div>
            }
          >
            {renderList(seen)}
          </Tab>
        </Tabs>
        <footer className="mt-2 flex items-center justify-between px-4">
          <Button className="" fullWidth color="primary">
            Ver Todas las Notificaciones
          </Button>
        </footer>
      </MenuContent>
    </div>
  );
};

const MenuContent = ({
  onClose,
  isOpen,
  children,
}: {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  const { isDesktop } = useResize();
  if (isDesktop && !isOpen) return null;

  return (
    <>
      {isDesktop ? (
        <motion.div
          layout
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="absolute -right-4 top-12 h-fit w-[26rem] overflow-y-auto rounded-xl border bg-white px-2 py-4 shadow-2xl backdrop-blur-xl transition-all scrollbar-hide dark:border-white/10 dark:bg-default-100"
        >
          {children}
        </motion.div>
      ) : (
        <CustomDrawer
          placement="right"
          backdrop="transparent"
          classNames={{
            header: "hidden",
            body: "px-0 pt-2",
          }}
          radius="none"
          isOpen={isOpen}
          onClose={onClose}
        >
          {children}
        </CustomDrawer>
      )}
    </>
  );
};

export default NotificationMenu;

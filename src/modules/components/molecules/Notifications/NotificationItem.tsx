import { Avatar, Button, ButtonProps } from "@heroui/react";
import { Notifications } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";

interface NotificationItemProps {
  notification: Notifications;
  onRead?: () => void;
  actions?: {
    label: string;
    href?: string;
    onPress?: () => void;
    variant?: ButtonProps["variant"];
    color?: ButtonProps["color"];
  }[];
}

const NotificationItem = ({
  notification,
  onRead,
  actions,
}: NotificationItemProps) => {
  const { message, title, link, isRead, createdAt } = notification;

  const router = useRouter();
  const params = useParams();

  // const getName = () => {};

  return (
    <div
      onClick={() => {
        onRead?.();
        link && router.push(`${DASHBOARD_MAIN_PATH}/${params?.bookId}${link}`);
      }}
      className="flex cursor-pointer items-start justify-between gap-4 rounded-lg px-4 py-3 hover:bg-default-100 dark:hover:bg-default-200"
    >
      <aside>
        <Avatar color="primary" name="Vac" size="md" />
      </aside>
      <div className="flex-grow">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: message }} />
        <span className="whitespace-nowrap text-xs">
          {format(createdAt, "dd MMM yyyy")} &bull;{" "}
          {format(createdAt, "HH:mm a")}
        </span>
        {actions && actions.length > 0 && (
          <div className="mt-2 flex gap-x-2">
            {actions.map(
              ({ label, onPress, variant, color = "default", href }, index) => (
                <Button
                  key={index}
                  as={href ? Link : Button}
                  size="sm"
                  variant={variant}
                  color={color}
                  href={
                    href && `${DASHBOARD_MAIN_PATH}/${params?.bookId}${href}`
                  }
                  onPress={onPress}
                >
                  {label}
                </Button>
              ),
            )}
          </div>
        )}
      </div>
      {!isRead && (
        <aside className="flex h-full flex-col items-center justify-between gap-4">
          <span className="block h-3 w-3 rounded-full bg-primary"></span>
        </aside>
      )}
    </div>
  );
};

export default NotificationItem;

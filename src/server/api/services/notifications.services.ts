import type { Notifications, PrismaClient } from "@prisma/client";
import { EventsType } from "~/server/ws/events";

export type CreateNotificationInput = {
  bookId: string;
  userId: string;
  type: EventsType;
  title: string;
  message: string;
  metadata?: Record<string, any>;
  link?: string;
  externalId?: string;
};

export const getNotifications = async (
  db: PrismaClient,
  userId: string,
  bookId: string,
  take: number,
) => {
  return db.notifications.findMany({
    where: { userId, bookId },
    orderBy: { createdAt: "desc" },
    take,
  });
};

export const markAllAsRead = async (
  db: PrismaClient,
  userId: string,
  bookId: string,
) => {
  return db.notifications.updateMany({
    where: { userId, bookId },
    data: { isRead: true },
  });
};

export const markAsRead = async (
  db: PrismaClient,
  id: string,
  bookId: string,
  userId: string,
) => {
  return db.notifications.update({
    where: { id, bookId, userId },
    data: { isRead: true },
  });
};

export const createNotification = async (
  db: PrismaClient,
  data: CreateNotificationInput,
) => {
  return db.notifications.create({
    data: {
      ...data,
      isRead: false,
    },
  });
};

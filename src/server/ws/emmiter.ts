import { getIO } from "../socket";
import { WS_EVENTS } from "./events";
import type { Notifications } from "@prisma/client";

// Utilidad genérica para emitir notificaciones
const emit = (event: keyof typeof WS_EVENTS, notification: Notifications) => {
  const io = getIO();
  if (!io) return;
  io.emit(WS_EVENTS[event], notification);
};

export const emitNotification = (notification: Notifications) =>
  emit("NOTIFICATION_NEW", notification);

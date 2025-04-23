const notificationModule = {
  transaction: "transaction",
  movement: "movement",
  goal: "goal",
  budget: "budget",
  user: "user",
} as const;

const notificationType = {
  created: "created",
  edited: "edited",
  nearDeadline: "nearDeadline",
  expired: "expired",
  executed: "executed",
  success: "success",
  progress: "progress",
  completed: "completed",
  error: "error",
  lastDay: "lastDay",
} as const;

export type NotificationModule =
  (typeof notificationModule)[keyof typeof notificationModule];

export type NotificationExternalType =
  (typeof notificationType)[keyof typeof notificationType];

export const setExternalId = (
  moduleName: NotificationModule,
  id: string | number,
  type: NotificationExternalType,
) => {
  return `${moduleName}-${id}-${type}`;
};

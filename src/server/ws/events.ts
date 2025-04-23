export const WS_EVENTS = {
  TRANSACTION_NEW: "transaction:new",
  TRANSACTION_UPDATE: "transaction:update",
  TRANSACTION_NEAR_DEADLINE: "transaction:nearDeadline",
  TRANSACTION_SUCCESS: "transaction:success",
  TRANSACTION_EXPIRED: "transaction:expired",
  TRANSACTION_LAST_DAY: "transaction:lastDay",
  NOTIFICATION_NEW: "notification:new",

  MOVEMENT_LAST_DAY: "movement:lastDay",
  MOVEMENT_NEAR_DEADLINE: "movement:nearDeadline",
  MOVEMENT_SUCCESS: "movement:success",
  MOVEMENT_EXPIRED: "movement:expired",
} as const;

export type WSEvent = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];
export type EventsType = keyof typeof WS_EVENTS;

import { MovementsIncludes } from "~/types/movements";
import { formatDatesOfTransactions } from "./formatDatesOfTransactions";

export const formatDatesOfMovements = (movements: MovementsIncludes[]) => {
  return movements?.map((mov: MovementsIncludes) => {
    return {
      ...mov,
      createdAt: mov?.createdAt.toISOString(),
      updatedAt: mov?.updatedAt.toISOString(),
      next_ocurrence: mov?.next_ocurrence.toISOString() || null,
      last_ocurrence: mov?.last_ocurrence?.toDateString() || null,
      reminder_date: mov.reminder_date?.toISOString() || null,
      entity: mov?.entity
        ? {
            ...mov.entity,
            createdAt: mov?.entity.createdAt.toISOString(),
            updateAt: mov?.entity.updateAt.toISOString(),
          }
        : null,
      category: mov?.category
        ? {
            ...mov.category,
            createdAt: mov?.category.createdAt.toISOString(),
            updatedAt: mov?.category.updatedAt.toISOString(),
          }
        : null,
      transactions: mov.transactions
        ? formatDatesOfTransactions(mov.transactions as any)
        : null,
    };
  });
};

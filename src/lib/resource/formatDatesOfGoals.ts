import { GoalsIncludes } from "~/types/goal/goal.types";
import { formatDatesOfTransactions } from "./formatDatesOfTransactions"

export const formatDatesOfGoals = (
  goals: GoalsIncludes[],
) => {
  if (!goals) return []
  return goals.map((goal: GoalsIncludes) => {
    return {
        ...goal,
        goalDate: goal?.goalDate ? goal?.goalDate.toISOString() : null,
        createdAt: goal?.createdAt.toISOString(),
        updatedAt: goal?.updatedAt.toISOString(),
        entity: goal?.entity ? {
          ...goal.entity,
          createdAt: goal.entity.createdAt?.toISOString(),
          updateAt: goal.entity.updateAt?.toISOString()
         } : null,
        transactions: goal?.transactions
          ? formatDatesOfTransactions(goal.transactions as any)
          : null,
    };
  });
};

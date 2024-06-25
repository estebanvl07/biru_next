import { TransactionIncludes } from "~/types/transactions";

export const formatDatesOfTransactions = (
  transactions: TransactionIncludes[],
) => {
  return transactions.map((transaction: TransactionIncludes) => {
    return {
      ...transaction,
      date: transaction?.date?.toISOString() || null,
      createdAt: transaction?.createdAt.toISOString(),
      updatedAt: transaction?.updatedAt.toISOString(),
      entity: transaction?.entity
        ? {
            ...transaction.entity,
            createdAt: transaction?.entity.createdAt.toISOString(),
            updateAt: transaction?.entity.updateAt.toISOString(),
          }
        : null,
      category: transaction?.category
        ? {
            ...transaction.category,
            createdAt: transaction?.category.createdAt.toISOString(),
            updatedAt: transaction?.category.updatedAt.toISOString(),
          }
        : null,
      goal: transaction?.goal
        ? {
            ...transaction.goal,
            goalDate: transaction?.goal?.goalDate
              ? transaction.goal.goalDate?.toISOString()
              : null,
            createdAt: transaction?.goal.createdAt.toISOString(),
            updatedAt: transaction?.goal.updatedAt.toISOString(),
          }
        : null,
      userAccount: transaction?.userAccount
        ? {
            createdAt: transaction?.userAccount.createdAt.toISOString(),
            updatedAt: transaction?.userAccount.updatedAt.toISOString(),
          }
        : null,
    };
  });
};

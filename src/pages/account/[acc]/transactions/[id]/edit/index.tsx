import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [transaction] = await helper.transaction.getTransactionById.fetch({
    id: Number(id),
  });

  console.log(transaction);

  const formatted = {
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
          goalDate: transaction?.goal
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

  return {
    props: {
      transaction: formatted,
    },
  };
};

const EditTransactionPage = ({
  transaction,
}: {
  transaction: TransactionIncludes;
}) => {
  const router = useRouter();
  const query = router.query;

  console.log(transaction);

  return (
    <DashboardLayout
      title="Detalle de transacción"
      headDescription="Editar una transacción"
    >
      <TransactionForm
        mode="edit"
        type={transaction.transferType === 1 ? "transfer" : "goal"}
        transactionDefault={transaction}
      />
    </DashboardLayout>
  );
};

export default EditTransactionPage;

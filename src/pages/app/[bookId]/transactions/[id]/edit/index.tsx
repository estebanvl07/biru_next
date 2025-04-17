import { GetServerSideProps } from "next";
import React from "react";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const transaction = await helper.transaction.getTransactionById.fetch({
    id: Number(id),
    bookId: bookId! as string,
  });

  return {
    props: {
      data: JSON.stringify(transaction),
    },
  };
};

const EditTransactionPage = ({ data }: { data: string }) => {
  const transaction = JSON.parse(data) as TransactionIncludes;

  return (
    <DashboardLayout
      title="Editar transacción"
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

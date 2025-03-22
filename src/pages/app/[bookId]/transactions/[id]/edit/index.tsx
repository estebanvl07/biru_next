import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";
import { Card } from "~/modules/components";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const transaction = await helper.transaction.getTransactionById.fetch({
    id: Number(id),
  });

  const [tr] = formatDatesOfTransactions(transaction as any);

  return {
    props: {
      transaction: tr,
    },
  };
};

const EditTransactionPage = ({
  transaction,
}: {
  transaction: TransactionIncludes;
}) => {
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

import DashboardLayout from "~/modules/Layouts/Dashboard";

import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { GetServerSideProps } from "next";
import NotFound from "~/modules/components/404";
import DetailTransaction, {
  ActivityContent,
} from "~/modules/Transactions/DetailTransaction";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

const DetailTransactionPage = ({ data: transactionData }: { data: string }) => {
  const transaction = JSON.parse(transactionData) as TransactionIncludes;

  return (
    <DashboardLayout
      title="Detalle de transacción"
      subtitle={"Conoce a detalle las transacciones realizadas"}
      headDescription="detalle de transacción"
      activityContent={<ActivityContent transactionData={transaction} />}
    >
      {transaction ? (
        <DetailTransaction transactionData={transaction} />
      ) : (
        <NotFound />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const data = await helper.transaction.getTransactionById.fetch({
    id: Number(id),
    bookId: String(bookId),
  });

  return {
    props: {
      data: JSON.stringify(data),
    },
  };
};

export default DetailTransactionPage;

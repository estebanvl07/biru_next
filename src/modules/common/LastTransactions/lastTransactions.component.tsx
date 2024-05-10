import clsx from "clsx";
import { FC } from "react";

import { Card } from "~/modules/components";
import { ListTransactions } from "~/modules/common";
// import { ListTransaction } from ""

import type { ITransaction } from "~/types/transactions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";

interface LastTransactionsProps {
  transactions?: ITransaction[];
  showHeader?: boolean;
  transactionsMaxLength?: number;
  cardClassName?: string;
  loading?: boolean;
}

const LastTransactions: FC<LastTransactionsProps> = ({
  showHeader = true,
  cardClassName,
}) => {
  const params = useParams<{ acc: string }>();

  const { transactions } = useTransactions();
  // const { data: transactions, isLoading } =
  //   api.transaction.getTransactions.useQuery({
  //     accountId: params?.acc,
  //   });

  return (
    <Card className={clsx("flex !h-full flex-col rounded-xl", cardClassName)}>
      {showHeader && (
        <div className="mb-4 flex items-center justify-between md:px-2">
          <h2 className="text-xl font-semibold">Transacciones</h2>
          <Link
            href={{
              pathname: "/account/[acc]/transactions",
              query: { acc: params?.acc },
            }}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            Ver todas
          </Link>
        </div>
      )}
      {false ? (
        <p>Cargando...</p>
      ) : (
        // <LoaderSkeleton skeletonType="ListItem" />
        <ListTransactions
          maxLength={transactions?.length}
          data={transactions}
          emptyText="No se encontraron transacciones"
        />
      )}
    </Card>
  );
};

export default LastTransactions;

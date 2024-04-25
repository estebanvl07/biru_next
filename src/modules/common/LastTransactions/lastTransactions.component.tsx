import clsx from "clsx";
import { FC } from "react";

import { Card } from "~/modules/components";
import { ListTransactions } from "~/modules/common";
// import { ListTransaction } from ""

import type { ITransaction } from "~/types/transactions";
import Link from "next/link";
import { useParams } from "next/navigation";

interface LastTransactionsProps {
  transactions?: ITransaction[];
  showHeader?: boolean;
  transactionsMaxLength?: number;
  cardClassName?: string;
  loading?: boolean;
}

const LastTransactions: FC<LastTransactionsProps> = ({
  showHeader = true,
  transactions,
  transactionsMaxLength,
  cardClassName,
  loading,
}) => {
  const params = useParams<{ acc: string }>();
  const { transactions: LastTransactions, loading: isLoading } = {
    transactions: [] as ITransaction[],
    loading: false,
  };

  return (
    <Card className={clsx("flex !h-full flex-col rounded-xl", cardClassName)}>
      {showHeader && (
        <div className="mb-4 flex items-center justify-between md:px-2">
          <h2 className="text-xl font-semibold">Transacciones</h2>
          <Link
            href={{
              pathname: "account/[acc]/transactions",
              query: { acc: params?.acc },
            }}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            Ver todas
          </Link>
        </div>
      )}
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        // <LoaderSkeleton skeletonType="ListItem" />
        <ListTransactions
          maxLength={transactionsMaxLength}
          data={transactions ? transactions : LastTransactions}
          emptyText="No se encontraron transacciones"
        />
      )}
    </Card>
  );
};

export default LastTransactions;

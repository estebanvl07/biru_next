import clsx from "clsx";
import { FC } from "react";

import { Card } from "~/modules/components";
import { ListTransactions } from "~/modules/common";
// import { ListTransaction } from ""

import type { ITransaction } from "~/types/transactions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import {
  useTransactions,
  formatterTransactions,
} from "~/modules/transactions/hook/useTransactions.hook";
import { LoaderSkeleton } from "~/modules/Loaders";

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
  transactionsMaxLength,
}) => {
  const params = useParams<{ acc: string }>();

  const { transactions, isLoading } = useTransactions();
  const formatted = formatterTransactions(transactions);
  return (
    <Card
      className={clsx("flex !h-full flex-col rounded-xl !px-4", cardClassName)}
    >
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
      {isLoading ? (
        <LoaderSkeleton skeletonType="ListItem" />
      ) : (
        // <LoaderSkeleton skeletonType="ListItem" />
        <ListTransactions
          maxLength={transactionsMaxLength}
          data={formatted}
          emptyText="No se encontraron transacciones"
        />
      )}
    </Card>
  );
};

export default LastTransactions;

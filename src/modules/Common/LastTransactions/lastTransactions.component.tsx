import clsx from "clsx";
import { FC, useCallback } from "react";

import { Table } from "~/modules/components";
import { ListTransactions } from "~/modules/Common";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useTransactions,
  formatterTransactions,
} from "~/modules/Transactions/hook/useTransactions.hook";
import { LoaderSkeleton } from "~/modules/Loaders";

import type { TransactionIncludes } from "~/types/transactions";
import { Card, CardHeader } from "@heroui/react";

interface LastTransactionsProps {
  transactions?: TransactionIncludes[] | undefined;
  showHeader?: boolean;
  transactionsMaxLength?: number;
  cardClassName?: string;
  loading?: boolean;
}

const LastTransactions: FC<LastTransactionsProps> = ({
  showHeader = true,
  cardClassName,
  transactionsMaxLength,
  transactions: transactionsDefault,
}) => {
  const params = useParams<{ acc: string }>();

  const { transactions, isLoading } = useTransactions({});
  const formatted = formatterTransactions(transactions as any);

  return (
    <Card
      className={clsx(
        "flex flex-col border-none border-divider px-0 py-2 shadow-none md:border md:px-4 md:shadow-sm",
        cardClassName,
      )}
    >
      {showHeader && (
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-semibold">Últimas Transacciones</h3>
          <Link
            href={{
              pathname: "/account/[acc]/transactions",
              query: { acc: params?.acc },
            }}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            Ver todas
          </Link>
        </CardHeader>
      )}
      {isLoading ? (
        <LoaderSkeleton skeletonType="ListItem" />
      ) : (
        <ListTransactions data={formatted} maxLength={transactionsMaxLength} />
      )}
    </Card>
  );
};

export default LastTransactions;

import clsx from "clsx";
import { FC } from "react";

import { Card } from "~/modules/components";
import { ListTransactions } from "~/modules/Common";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useTransactions,
  formatterTransactions,
} from "~/modules/Transactions/hook/useTransactions.hook";
import { LoaderSkeleton } from "~/modules/Loaders";

import type { TransactionIncludes } from "~/types/transactions";

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
        "flex !h-fit flex-col !px-0 py-4",
        cardClassName,
      )}
    >
      {showHeader && (
        <div className="px-content mb-4 flex items-center justify-between md:px-6">
          <h3>Últimas Transacciones</h3>
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
        <ListTransactions
          maxLength={transactionsMaxLength}
          data={
            transactionsDefault
              ? formatterTransactions(transactionsDefault)
              : formatted
          }
        />
      )}
    </Card>
  );
};

export default LastTransactions;

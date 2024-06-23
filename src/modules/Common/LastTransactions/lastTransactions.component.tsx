import clsx from "clsx";
import { FC, useCallback } from "react";

import { Card, Table } from "~/modules/components";
import { ListTransactions } from "~/modules/Common";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useTransactions,
  formatterTransactions,
} from "~/modules/Transactions/hook/useTransactions.hook";
import { LoaderSkeleton } from "~/modules/Loaders";

import type { TransactionIncludes } from "~/types/transactions";
import { Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";

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

  const renderCell = useCallback(
    (transaction: TransactionIncludes, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionIncludes];

      const getName = (): string => {
        const defaultName =
          transaction.type === 1 ? "Ingresos Varios" : "Gastos Varios";

        if (transaction.transferType === 2 && transaction.goal) {
          return transaction.goal.name;
        }

        return (
          transaction.category?.name || transaction.description || defaultName
        );
      };

      const getIcon = (): string => {
        const typeIcon =
          transaction.type === 1
            ? "iconamoon:arrow-bottom-left-1"
            : "iconamoon:arrow-top-right-1";

        if (transaction.transferType === 2 && transaction.goal) {
          return (transaction.goal.icon as string) || typeIcon;
        }
        if (transaction.category) {
          return transaction.category?.icon ?? typeIcon;
        }

        return typeIcon;
      };

      switch (columnKey) {
        case "description":
          return (
            <div className="flex items-center gap-2">
              <div className="flex !h-10 !min-w-10 items-center justify-center whitespace-nowrap rounded-full bg-primary text-xl text-white">
                {transaction.entityId ? (
                  <Avatar
                    src={
                      transaction.entity?.avatar
                        ? (transaction.entity.avatar as string)
                        : undefined
                    }
                    color="primary"
                    name={transaction.entity?.name}
                  />
                ) : (
                  <>
                    {transaction.recipient ? (
                      transaction.recipient.split("")[0]
                    ) : (
                      <Icon icon={getIcon()} />
                    )}
                  </>
                )}
              </div>
              <aside>
                <h4 className="whitespace-nowrap text-lg font-semibold">
                  {getName()}
                </h4>
                <p className="!text-xs">{`${format(transaction.date ?? transaction.createdAt, DATE_FORMAT_TRANS)}`}</p>
              </aside>
            </div>
          );
        case "amount":
          return (
            <h3
              className={clsx({
                "text-green-600": transaction.type === 1,
                "text-red-600": transaction.type === 2,
              })}
            >
              $ {transaction.amount.toLocaleString()}
            </h3>
          );
        default:
          return cellValue;
      }
    },
    [params],
  );

  return (
    <Card className={clsx("flex !h-fit flex-col !px-0 py-4", cardClassName)}>
      {showHeader && (
        <div className="mb-4 flex items-center justify-between px-content md:px-6">
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
        <Table
          headerConfig={{}}
          columns={[
            { uid: "description", name: "Transacción" },
            { uid: "amount", name: "Monto", align: "end" },
          ]}
          data={transactions ?? []}
          renderCell={renderCell}
          hasTopContent={false}
          hasBottomContent={false}
        />
      )}
    </Card>
  );
};

export default LastTransactions;

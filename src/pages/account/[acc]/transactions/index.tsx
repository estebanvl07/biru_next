import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { Table } from "~/modules/components";

import { columns } from "~/modules/transactions/table";
import { Avatar, Chip } from "@nextui-org/react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { capitalize } from "~/modules/components/molecules/Table/utils";

import { TransactionIncludes } from "~/types/transactions";

import { useResize } from "~/lib/hooks/useResize";
import MobileTransactionPage from "~/modules/transactions/MobileTransactionPage";
import Actions from "~/modules/components/molecules/Table/Actions";
import { useRouter } from "next/router";

const TransactionPage = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const params = useParams<{ acc: string }>();

  const { size } = useResize();
  const isMobile = Boolean(size && size <= 768);

  const { transactions, isLoading } = useTransactions({});

  console.log(transactions);

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
          transaction.type === 1 ? "ph:trend-up" : "ph:trend-down";

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
                  <span className="text-sm">$</span>{" "}
                  {transaction.amount.toLocaleString()}
                </h4>
                <p className="!text-xs">{getName()}</p>
              </aside>
            </div>
          );
        case "category":
          return (
            transaction.category?.name ?? (
              <Chip size="sm" variant="flat">
                Sin categoría
              </Chip>
            )
          );
        case "type":
          return (
            <Chip
              size="lg"
              variant="flat"
              color={transaction.type === 1 ? "success" : "danger"}
            >
              <Icon
                icon={transaction.type === 1 ? "ph:trend-up" : "ph:trend-down"}
              />
            </Chip>
          );
        case "createdAt":
          return (
            <span>
              {transaction.date ? (
                <>
                  {capitalize(format(transaction.date, "PPPP", { locale: es }))}
                </>
              ) : (
                "N/A"
              )}
            </span>
          );
        case "userAccount":
          null;
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction.id),
                  },
                })
              }
              onClickEdit={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction.id),
                  },
                })
              }
              hasDelete={false}
            />
          );
        default:
          return cellValue;
      }
    },
    [isClient, params],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DashboardLayout title="Transacciones">
      {!isMobile && isClient ? (
        <Table
          headerConfig={{
            title: "",
            keySearch: ["title"],
            redirectTo: `/account/${Number(params?.acc)}/transactions/new`,
            newButtonText: "Crear Transacción",
          }}
          columns={columns}
          filterKeys={["description", "amount"]}
          isLoading={isLoading}
          data={transactions ?? []}
          renderCell={renderCell}
        />
      ) : (
        <MobileTransactionPage transactions={transactions ?? []} />
      )}
    </DashboardLayout>
  );
};

export default TransactionPage;

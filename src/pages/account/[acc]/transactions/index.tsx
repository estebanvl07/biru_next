import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Table } from "~/modules/components";

import { columns } from "~/modules/Transactions/table";
import { Avatar, Chip } from "@nextui-org/react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "~/modules/components/molecules/Table/utils";

import { TransactionIncludes } from "~/types/transactions";

import { useResize } from "~/lib/hooks/useResize";
import MobileTransactionPage from "~/modules/Transactions/MobileTransactionPage";
import Actions from "~/modules/components/molecules/Table/Actions";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import NullChip from "~/modules/components/atoms/NullChip.component";
import Dialog from "~/modules/components/molecules/Dialog.component";
import CreateTransaction from "~/modules/Transactions/CreateTransaction";
import EditTransaction from "~/modules/Transactions/EditTransaction";
import { useTransactions } from "~/modules/Transactions/hook";

const TransactionPage = () => {
  const [showSheetCreate, setShowSheetCreate] = useState(false);
  const [showSheetEdit, setShowSheetEdit] = useState(false);
  const [transactionSelected, setTransactionSelected] =
    useState<TransactionIncludes>();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const params = useParams<{ acc: string }>();

  const { size } = useResize();
  const isMobile = Boolean(size && size <= 768);
  const { transactions, isLoading, refreshTransactions } = useTransactions();

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
                      <Icon
                        icon={getIcon()}
                        className="dark:text-primary-foreground"
                      />
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
          return transaction.category?.name ? (
            <p className="flex items-center gap-2">
              <Chip size="sm" className="bg-default-100 dark:bg-default-100">
                <Icon icon={transaction.category.icon || ""} />
              </Chip>
              {transaction.category?.name}{" "}
            </p>
          ) : (
            <NullChip text="Sin categoría" />
          );
        case "type":
          return (
            <Chip
              size="lg"
              variant="flat"
              color={transaction.type === 1 ? "success" : "danger"}
            >
              <Icon
                icon={
                  transaction.type === 1
                    ? "iconamoon:arrow-bottom-left-1"
                    : "iconamoon:arrow-top-right-1"
                }
              />
            </Chip>
          );
        case "date":
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
              onClickEdit={() => {
                setTransactionSelected(transaction);
                setShowSheetEdit(true);
              }}
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
    <DashboardLayout
      title="Transacciones"
      headDescription="Listado de tu historial de transacciones"
    >
      {!isMobile && isClient ? (
        <Table
          headerConfig={{
            title: "",
            newButtonText: "Crear Transacción",
            onNew: () => setShowSheetCreate(!showSheetCreate),
          }}
          columns={columns}
          filterKeys={["description", "amount"]}
          isLoading={isLoading}
          data={transactions ?? []}
          renderCell={renderCell}
        />
      ) : (
        <MobileTransactionPage transactions={(transactions as any) ?? []} />
      )}

      <CreateTransaction
        isOpen={showSheetCreate}
        onClose={() => setShowSheetCreate(false)}
      />
      {transactionSelected && (
        <EditTransaction
          transaction={transactionSelected}
          isOpen={showSheetEdit}
          onClose={() => setShowSheetEdit(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default TransactionPage;

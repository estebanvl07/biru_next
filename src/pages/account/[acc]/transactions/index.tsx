import { useCallback } from "react";
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
import { api } from "~/utils/api";

const TransactionPage = () => {
  const params = useParams<{ acc: string }>();
  const { transactions, isLoading } = useTransactions({});

  const { size } = useResize();

  const isMobile = Boolean(size && size <= 768);

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
                <h4 className="text-lg font-semibold">
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
            <div className="relative flex items-center gap-2">
              Menu
              {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip> */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <DashboardLayout title="Transacciones">
      {!isMobile ? (
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

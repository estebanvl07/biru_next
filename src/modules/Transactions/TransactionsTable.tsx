import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "~/modules/components";

import { columns } from "~/modules/Transactions/table";
import { Chip } from "@heroui/react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "~/modules/components/molecules/Table/utils";

import { TransactionIncludes } from "~/types/transactions";
import Actions from "~/modules/components/molecules/Table/Actions";
import { useRouter } from "next/router";
import NullChip from "~/modules/components/atoms/NullChip.component";

import {
  getTransactionStatus,
  statusColor,
  statusIcon,
} from "~/utils/transactionStatus";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { useCategory } from "~/modules/Category/hook/category.hook";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { api } from "~/utils/api";
import { toast } from "sonner";

interface TransactionsTableProps {
  transactions: TransactionIncludes[];
  isLoading?: boolean;
}

const TransactionsTable = ({
  transactions,
  isLoading = false,
}: TransactionsTableProps) => {
  const router = useRouter();
  const params = useParams<{ bookId: string }>();

  const { mutateAsync: cancelTransaction } =
    api.transaction.cancel.useMutation();

  const { categories: categoriesData } = useCategory();
  const { entities: entitiesData } = useEntity();

  const categories =
    categoriesData?.map((item) => {
      return { text: item.name, value: item.id };
    }) || [];

  const entities =
    entitiesData?.map((item) => {
      return { text: item.name, value: item.id };
    }) || [];

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

      switch (columnKey) {
        case "description":
          return (
            <aside>
              <h4 className="font-semibold">{getName()}</h4>
              <p className="max-w-md whitespace-nowrap text-xs">
                {transaction.description || "Sin descripción"}
              </p>
            </aside>
          );
        case "amount":
          return (
            <p className="font-semibold">${cellValue?.toLocaleString()}</p>
          );
        case "entityId":
          return transaction.entity?.name ? (
            <p className="flex items-center gap-2">{transaction.entity.name}</p>
          ) : (
            <NullChip />
          );
        case "category":
          return transaction.category?.name ? (
            <div className="flex items-center gap-2">
              <Chip size="sm" className="bg-default-100 dark:bg-default-100">
                <Icon icon={transaction.category.icon || ""} />
              </Chip>
              {transaction.category?.name}{" "}
            </div>
          ) : (
            <NullChip />
          );
        case "state":
          return (
            <Chip
              variant="flat"
              size="sm"
              className="gap-1 border-none capitalize"
              color={statusColor(transaction.state!) as any}
              startContent={
                <Icon icon={statusIcon(transaction.state!) || ""} width={14} />
              }
            >
              {getTransactionStatus(transaction.state!)}
            </Chip>
          );
        case "type":
          return (
            <Chip
              size="md"
              variant="dot"
              color={transaction.type === 1 ? "success" : "danger"}
              className="flex items-center gap-1 whitespace-nowrap border-none"
            >
              {transaction.type === 1 ? "Ingreso" : "Egreso"}
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
              onClickDelete={() => {
                toast("¿Estas seguro de cancelar esta transacción?", {
                  action: {
                    label: "Realizar",
                    onClick: () => {
                      toast.promise(
                        cancelTransaction({
                          id: transaction.id,
                          bookId: params?.bookId,
                        }),
                        {
                          loading: "Cancelando Transacción...",
                          success: "La transacción se ha cancelado con éxito.",
                          error: "Hubo un error, intente de nuevo",
                        },
                      );
                    },
                  },
                });
              }}
              onClickView={() =>
                router.push({
                  pathname: `${DASHBOARD_MAIN_PATH}/[bookId]/transactions/[id]`,
                  query: {
                    bookId: params?.bookId,
                    id: String(transaction.id),
                  },
                })
              }
              onClickEdit={() => {
                router.push({
                  pathname: `${DASHBOARD_MAIN_PATH}/[bookId]/transactions/[id]/edit`,
                  query: {
                    bookId: params?.bookId,
                    id: String(transaction.id),
                  },
                });
              }}
            />
          );
        default:
          return cellValue;
      }
    },
    [params, transactions],
  );

  return (
    <Table
      headerConfig={{
        title: "",
        newButtonText: "Crear Transacción",
        redirectTo: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/new`,
      }}
      filterBy={[
        {
          by: "state",
          title: "Estado",
          options: [
            {
              text: "Confirmado",
              value: 1,
            },
            {
              text: "Programado",
              value: 3,
            },
            {
              text: "Cancelado",
              value: 2,
            },
          ],
        },
        {
          by: "type",
          title: "Tipo",
          options: [
            {
              text: "Ingerso",
              value: 1,
            },
            {
              text: "Egreso",
              value: 2,
            },
          ],
        },
        {
          by: "entityId",
          title: "Entidades",
          selectionMode: "multiple",
          options: entities,
        },
        {
          by: "categoryId",
          title: "Categoría",
          options: categories,
        },
      ]}
      columns={columns}
      isLoading={isLoading}
      filterKeys={["description", "amount"]}
      checkboxesProps={{
        classNames: {
          wrapper: "!text-default-100 border border-default-300",
          label: "",
        },
      }}
      data={transactions || []}
      renderCell={renderCell}
    />
  );
};

export default TransactionsTable;

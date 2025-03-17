import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Table } from "~/modules/components";

import { columns } from "~/modules/Transactions/table";
import { Avatar, Chip } from "@heroui/react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "~/modules/components/molecules/Table/utils";

import { STATUS_TRANS, TransactionIncludes } from "~/types/transactions";

import { useResize } from "~/lib/hooks/useResize";
import MobileTransactionPage from "~/modules/Transactions/MobileTransactionPage";
import Actions from "~/modules/components/molecules/Table/Actions";
import { useRouter } from "next/router";
import NullChip from "~/modules/components/atoms/NullChip.component";
import { useTransactions } from "~/modules/Transactions/hook";
import {
  getTransactionStatus,
  statusColor,
  statusIcon,
} from "~/utils/transactionStatus";

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
  const { transactions, isLoading } = useTransactions({});

  const categories = transactions
    ?.filter((tr) => tr.category)
    .map((item) => {
      return { text: item.category!.name, value: item.category!.id };
    });

  const categoriesOfTrasactions = [
    ...new Map(categories?.map((item) => [item.value, item])).values(),
  ];

  const entities = transactions
    ?.filter((tr) => tr.entity)
    .map((item) => {
      return { text: item.entity!.name, value: item.entity!.id };
    });

  const entitiesOfTrasactions = [
    ...new Map(entities?.map((item) => [item.value, item])).values(),
  ];

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
        case "amount":
          return (
            <div className="flex items-center gap-2">
              <div className="flex !h-9 !min-w-9 items-center justify-center whitespace-nowrap rounded-full bg-primary text-xl text-white">
                {transaction.entityId ? (
                  <Avatar
                    src={
                      transaction.entity?.avatar
                        ? (transaction.entity.avatar as string)
                        : undefined
                    }
                    color="primary"
                    size="sm"
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
                router.push({
                  pathname: "/account/[acc]/transactions/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction.id),
                  },
                });
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
            redirectTo: `/account/${params?.acc}/transactions/new`,
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
              options: entitiesOfTrasactions
                ? Array.from(entitiesOfTrasactions).map(({ text, value }) => {
                    return {
                      text,
                      value,
                    };
                  })
                : [],
            },
            {
              by: "categoryId",
              title: "Categoría",
              options: categoriesOfTrasactions
                ? Array.from(categoriesOfTrasactions).map(({ text, value }) => {
                    return {
                      text,
                      value,
                    };
                  })
                : [],
            },
          ]}
          columns={columns}
          filterKeys={["description", "amount"]}
          isLoading={isLoading}
          checkboxesProps={{
            classNames: {
              wrapper: "!text-default-100 border border-default-300",
              label: "",
            },
          }}
          isStriped
          data={transactions ?? []}
          renderCell={renderCell}
        />
      ) : (
        <MobileTransactionPage transactions={(transactions as any) ?? []} />
      )}
    </DashboardLayout>
  );
};

export default TransactionPage;

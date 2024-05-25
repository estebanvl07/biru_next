import { useCallback } from "react";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { Table } from "~/modules/components";

import { columns } from "~/modules/transactions/table";
import { Avatar, Chip, CircularProgress } from "@nextui-org/react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { capitalize } from "~/modules/components/molecules/Table/utils";

import type {
  Transaction,
  Category,
  UserAccount,
  Entities,
} from "@prisma/client";
import { useResize } from "~/lib/hooks/useResize";
import { ListTransactions } from "~/modules/common";
import MobileTransactionPage from "~/modules/transactions/MobileTransactionPage";

type TransactionsIncludes = Transaction & {
  category: Category;
  userAccount: UserAccount;
  entity: Entities;
};

const TransactionPage = () => {
  const params = useParams<{ acc: string }>();
  const { transactions, isLoading } = useTransactions();
  const { size } = useResize();

  const isMobile = Boolean(size && size <= 768);

  const renderCell = useCallback(
    (transaction: TransactionsIncludes, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionsIncludes];
      switch (columnKey) {
        case "description":
          return (
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-xl text-white">
                {transaction.entityId ? (
                  <Avatar
                    src={
                      Boolean(transaction.entity?.avatar)
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
                      <Icon icon={transaction.category.icon} />
                    )}
                  </>
                )}
              </div>
              <aside>
                <h4 className="text-lg font-semibold">
                  <span className="text-sm">$</span>{" "}
                  {transaction.amount.toLocaleString()}
                </h4>
                <p className="!text-xs">
                  {transaction.description !== ""
                    ? transaction.description
                    : transaction.category.name}
                </p>
              </aside>
            </div>
          );
        case "category":
          return transaction.category.name;
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
              {capitalize(format(transaction.date, "PPPP", { locale: es }))}
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
          }}
          buttonNewLink={`/account/${Number(params?.acc)}/transactions/new`}
          buttonNewText="Crear transacción"
          columns={columns}
          filterKeys={["description", "amount"]}
          isLoading={isLoading}
          data={transactions ?? []}
          renderCell={renderCell}
          hasNew
        />
      ) : (
        <MobileTransactionPage transactions={transactions ?? []} />
      )}
    </DashboardLayout>
  );
};

export default TransactionPage;

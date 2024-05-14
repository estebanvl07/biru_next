import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";
import { Button, Card } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { Table } from "~/modules/components";

// import { users, columns } from "./data";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { useCallback, useEffect, useState } from "react";

import { columns } from "~/modules/transactions/table";
import { Avatar, Badge, Chip, User } from "@nextui-org/react";
import { Transaction, Category, UserAccount } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { capitalize } from "~/modules/components/molecules/Table/utils";

type TransactionsIncludes = Transaction & {
  category: Category;
  userAccount: UserAccount;
};

const TransactionPage = () => {
  const params = useParams<{ acc: string }>();
  const { transactions } = useTransactions();

  const renderCell = useCallback(
    (transaction: TransactionsIncludes, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionsIncludes];
      console.log(cellValue);

      switch (columnKey) {
        case "description":
          return (
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-xl text-white">
                {transaction.recipient ? (
                  transaction.recipient.split("")[0]
                ) : (
                  <Icon icon={transaction.category.icon} />
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
      <div className="mt-4">
        <Table
          headerConfig={{
            title: "",
            keySearch: ["title"],
          }}
          buttonNewLink={`/account/${Number(params?.acc)}/transactions/new`}
          buttonNewText="Crear transacción"
          columns={columns}
          filterKeys={["description", "amount"]}
          data={transactions ?? []}
          renderCell={renderCell}
          hasNew
        />
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;

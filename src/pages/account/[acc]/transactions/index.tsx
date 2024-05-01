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
import { Avatar, Badge, User } from "@nextui-org/react";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TransactionPage = () => {
  const params = useParams<{ acc: string }>();

  const { data: transactions } = api.transaction.getTransactions.useQuery({
    accountId: params?.acc,
  });

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];

      console.log("renderers");

      switch (columnKey) {
        case "description":
          return (
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-xl text-white">
                {transaction.recipient ? (
                  transaction.recipient.split("")[0]
                ) : (
                  <Icon icon="mingcute:user-3-fill" />
                )}
              </div>
              <aside>
                <h4 className="text-lg font-semibold">
                  <span className="text-sm">$</span>{" "}
                  {transaction.amount.toLocaleString()}
                </h4>
                <p className="!text-xs">{transaction.description}</p>
              </aside>
            </div>
          );
        case "type":
          return (
            <Badge color={transaction.state === 1 ? "success" : "danger"}>
              {transaction.state}
            </Badge>
          );

        case "createdAt":
          return (
            <span>{format(transaction.createdAt, "PPPP", { locale: es })}</span>
          );
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

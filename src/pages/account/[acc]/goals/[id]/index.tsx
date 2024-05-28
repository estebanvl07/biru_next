import type { GetServerSideProps } from "next";
import { Progress } from "@nextui-org/progress";
import { format } from "date-fns";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import GoalCard from "~/modules/Goals/GoalCard";
import { columns } from "~/modules/Goals/table";
import { Table } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { api } from "~/utils/api";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { Goals, Transaction } from "@prisma/client";
import { GoalsIncludes } from "~/modules/Goals/hook/goal.hook";
import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { es } from "date-fns/locale";

const DetailGoalPage = ({
  goalData,
  acc,
}: {
  goalData: GoalsIncludes;
  acc: number;
}) => {
  const { goal, saved, name, goalDate, description, state } = goalData;

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];
      switch (columnKey) {
        case "amount":
          return (
            <h4 className="text-lg font-semibold">
              <span className="text-sm">$</span> {cellValue?.toLocaleString()}
            </h4>
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
              {capitalize(
                format(transaction.createdAt, "PPPP", { locale: es }),
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
    <DashboardLayout>
      <div className="flex w-full gap-6">
        <div className="w-80 rounded-xl bg-default-50 px-6 py-4 dark:bg-default-200">
          <h3>{name}</h3>
          <p className="my-4">{description ?? "Sin descripción"}</p>
          <ul className="flex flex-col gap-2 [&>li>span]:font-semibold [&>li]:text-xs">
            <li>
              <span>Monto de Meta:</span>
              <p>$ {goal.toLocaleString()}</p>
            </li>
            <li>
              <span>Total Ahorrado:</span>
              <p>$ {saved.toLocaleString()}</p>
            </li>
            <li>
              <span>Estado:</span>
              <p>
                <Chip
                  color={
                    state === 1 ? "primary" : state === 2 ? "success" : "danger"
                  }
                  size="sm"
                  className="h-4 text-[10px] text-white"
                >
                  {state === 1
                    ? "Progreso"
                    : state === 2
                      ? "Terminado"
                      : "Cancelado"}
                </Chip>
              </p>
            </li>
            <li>
              <span>Fecha limite:</span>
              <p>
                {goalDate
                  ? capitalize(
                      format(new Date(String(goalDate)), "LLL", { locale: es }),
                    )
                  : "N/A"}
              </p>
            </li>
          </ul>
        </div>
        <aside className="flex-grow">
          <Table
            columns={columns}
            data={goalData.transactions ?? []}
            renderCell={renderCell}
            headerConfig={{
              keySearch: ["amount"],
              redirectTo: `/account/${acc}/transactions/new?transferType=2&goal=${goalData.id}`,
            }}
          />
        </aside>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, acc } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [goal] = await helper.goals.getGoalById.fetch({ id: Number(id) });

  const transactionSerialize = goal?.transactions.map((trans) => {
    return {
      ...trans,
      date: trans?.date ? trans?.date.toISOString() : null,
      createdAt: trans?.createdAt.toISOString(),
      updatedAt: trans?.updatedAt.toISOString(),
    };
  });

  const goalData = {
    ...goal,
    goalDate: goal?.goalDate ? goal?.goalDate.toISOString() : null,
    createdAt: goal?.createdAt.toISOString(),
    updatedAt: goal?.updatedAt.toISOString(),
    transactions: transactionSerialize,
  };

  return {
    props:
      {
        goalData,
        acc,
      } ?? {},
  };
};

export default DetailGoalPage;

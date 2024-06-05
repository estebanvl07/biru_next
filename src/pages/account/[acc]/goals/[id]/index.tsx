import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { es } from "date-fns/locale";
import { format } from "date-fns";

import type { GetServerSideProps } from "next";
import { Transaction } from "@prisma/client";

import Actions from "~/modules/components/molecules/Table/Actions";
import { columns } from "~/modules/Goals/table";
import { Card, Table } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { Button, Chip, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useResize } from "~/lib/hooks/useResize";
import { LastTransactions } from "~/modules/common";
import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";
import { getPercent } from "~/lib/helpers";

const DetailGoalPage = ({
  goalData,
  acc,
}: {
  goalData: GoalsIncludes;
  acc: number;
}) => {
  const router = useRouter();
  const params = useParams();
  const { isMobile } = useResize();
  const [isClient, setIsClient] = useState(false);
  const { goal, saved, name, goalDate, description, state, id } = goalData;

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];
      switch (columnKey) {
        case "amount":
          return (
            <div className="flex flex-col text-lg font-semibold">
              <h4 className="text-lg">$ {cellValue?.toLocaleString()}</h4>
              <span className="text-xs font-normal">
                {transaction.description || "sin descripción"}
              </span>
            </div>
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
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction?.id),
                  },
                })
              }
              onClickEdit={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction?.id),
                    goal: id,
                  },
                })
              }
              onClickDelete={() => {}}
            />
          );
        default:
          return cellValue;
      }
    },
    [params, isClient],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DashboardLayout title="Detalle de Meta" headDescription="Detalles de Meta">
      <div className="flex w-full flex-col gap-6">
        <Card className="flex flex-col">
          <header className="mb-4 flex flex-row items-center justify-between">
            <h3>Información de Meta</h3>
            <Button
              as={Link}
              href={`/account/${params?.acc}/goals/${id}/edit`}
              color="primary"
              size="sm"
              isIconOnly={isMobile}
              className="sm:w-fit"
            >
              <Icon icon="akar-icons:edit" width={18} />
              {!isMobile && "Editar Meta"}
            </Button>
          </header>
          <ul className="mb-2 grid w-full grid-cols-2 gap-2 sm:grid-cols-4 [&>li>span]:font-semibold [&>li]:text-xs">
            <li>
              <span>Nombre:</span>
              <p>{name}</p>
            </li>
            <li>
              <span>Descripción:</span>
              <p>{description || "N/A"}</p>
            </li>
            <li>
              <span>Monto de Meta:</span>
              <p>$ {goal.toLocaleString()}</p>
            </li>
            <li>
              <span>Total Ahorrado:</span>
              <p>$ {saved.toLocaleString()}</p>
            </li>
            <li>
              <span>Faltante:</span>
              <p>$ {Number(goal - saved).toLocaleString()}</p>
            </li>
            <li>
              <span>Progreso:</span>
              <p>$ {getPercent(saved, goal)}</p>
            </li>
            <li>
              <span>Estado:</span>
              <div>
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
              </div>
            </li>
            <li>
              <span>Fecha limite:</span>
              <p>
                {goalDate
                  ? capitalize(
                      format(new Date(String(goalDate)), "PPP", { locale: es }),
                    )
                  : "N/A"}
              </p>
            </li>
          </ul>
        </Card>
        {!isMobile ? (
          <Table
            columns={columns}
            data={goalData.transactions ?? []}
            renderCell={renderCell}
            filterKeys={["amount"]}
            headerConfig={{
              redirectTo: `/account/${acc}/transactions/new?transferType=2&goal=${goalData.id}`,
            }}
          />
        ) : (
          <LastTransactions
            transactions={goalData.transactions as any}
            showHeader={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, acc } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [goal] = await helper.goals.getGoalById.fetch({ id: Number(id) });

  const goalData = {
    ...goal,
    goalDate: goal?.goalDate ? goal?.goalDate.toISOString() : null,
    createdAt: goal?.createdAt.toISOString(),
    updatedAt: goal?.updatedAt.toISOString(),
    transactions: goal?.transactions
      ? formatDatesOfTransactions(goal.transactions as any)
      : null,
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

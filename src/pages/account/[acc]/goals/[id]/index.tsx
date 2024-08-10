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
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { Button, Chip, Link, User } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useResize } from "~/lib/hooks/useResize";
import { ListTransactions } from "~/modules/Common";
import { formatDatesOfGoals } from "~/lib/resource/formatDatesOfGoals";
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
  const { goal, saved, name, goalDate, description, state, id, entity } = goalData;

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
                format(transaction.createdAt, "PPPP", { locale: es })
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
    [params, isClient]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DashboardLayout title="Detalle de Meta" headDescription="Detalles de Meta">
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <header className="mb-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <h2>{name}</h2>
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
            </div>
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
            <hr className="dark:border-white/10" />
            <ul className="mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-2 [&>li>p]:font-semibold [&>li]:gap-2 [&>li]:flex [$>li]:items-center [&>li]:text-sm">
              {
                entity && 
                <li>
                  <span>Destinatario:</span>
                  <p>{capitalize(entity.name)}</p>
                </li>
              }
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
                <p>{getPercent(saved, goal)}</p>
              </li>
              <li>
                <span>Fecha limite:</span>
                <p>
                  {goalDate
                    ? capitalize(
                        format(new Date(String(goalDate)), "PPP", { locale: es })
                      )
                    : "N/A"}
                </p>
              </li>
            </ul>
          </div>
          <h2 className="my-4 font-normal">Movimientos de Meta</h2>
        {!isMobile ? (
          <Table
            columns={columns}
            data={goalData.transactions ?? []}
            renderCell={renderCell}
            filterKeys={["amount"]}
            headerConfig={{
              redirectTo: `/account/${acc}/transactions/new?transferType=2&goal=${goalData.id}&entity=${goalData.entityId}`,
            }}
          />
        ) : (
          <ListTransactions data={goalData.transactions as any} />
        )}
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, acc } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const goal = await helper.goals.getGoalById.fetch({ id: Number(id) });

  const [goalData] = formatDatesOfGoals(goal)

  return {
    props:
      {
        goalData,
        acc,
      } ?? {},
  };
};

export default DetailGoalPage;

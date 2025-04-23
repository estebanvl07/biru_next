import { useParams, useSearchParams } from "next/navigation";
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
import { Table } from "~/modules/components";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useResize } from "~/lib/hooks/useResize";
import { ListTransactions } from "~/modules/Common";
import { formatDatesOfGoals } from "~/lib/resource/formatDatesOfGoals";
import { getPercent } from "~/lib/helpers";
import DetailView from "~/modules/components/molecules/DetailView";
import EditTransaction from "~/modules/Transactions/EditTransaction";
import { useOnActive } from "~/lib/hooks";
import CreateTransaction from "~/modules/Transactions/CreateTransaction";
import useShowForm from "~/lib/hooks/useShowForm";
import { TransactionIncludes } from "~/types/transactions";
import EditGoal from "~/modules/Goals/EditGoal";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";

const DetailGoalPage = ({ goalData }: { goalData: GoalsIncludes }) => {
  const {
    data,
    onChageData,
    showCreate,
    showEdit,
    onShowCreate,
    onShowEdit,
    onCloseCreate,
    onCloseEdit,
  } = useShowForm<TransactionIncludes>({});

  const {
    showEdit: showEditgoal,
    onCloseEdit: onCloseEditGoal,
    onShowEdit: onShowEditGoal,
    data: defaultGoal,
  } = useShowForm<GoalsIncludes>({ defaultData: goalData });

  const { mutateAsync: cancelTransaction } =
    api.transaction.cancel.useMutation();

  const router = useRouter();
  const params = useParams();
  const bookId = String(params?.bookId);

  const { isMobile } = useResize();
  const [isClient, setIsClient] = useState(false);
  const { goal, saved, name, goalDate, description, state, id, entity } =
    goalData;

  const renderCell = useCallback(
    (transaction: TransactionIncludes, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionIncludes];
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
              size="md"
              variant="dot"
              color={transaction.type === 1 ? "success" : "danger"}
              className="flex items-center gap-1 whitespace-nowrap border-none"
            >
              {transaction.type === 1 ? "Ingreso" : "Egreso"}
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
                  pathname: `${DASHBOARD_MAIN_PATH}/${bookId}/transactions/[id]`,
                  query: {
                    id: String(transaction?.id),
                  },
                })
              }
              onClickEdit={() => {
                onChageData(transaction);
                onShowEdit();
              }}
              onClickDelete={() => {
                toast("¿Estas seguro de cancelar esta transacción?", {
                  action: {
                    label: "Realizar",
                    onClick: () => {
                      toast.promise(
                        cancelTransaction({
                          id: transaction.id,
                          bookId: String(params?.bookId),
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
      <DetailView
        topContent={
          <div className="flex items-center justify-between">
            <aside>
              <h2>{goalData.name}</h2>
              <p>{goalData.description || "Sin descripción"}</p>
            </aside>
            <Button
              color="primary"
              isIconOnly={isMobile}
              className="sm:w-fit"
              onPress={() => onShowEditGoal()}
            >
              <Icon icon="akar-icons:edit" width={18} />
              {!isMobile && "Editar Meta"}
            </Button>
          </div>
        }
        tabs={[
          {
            title: "Transacciones Relacionadas",
            children: (
              <>
                {!isMobile ? (
                  <Table
                    columns={columns}
                    data={goalData.transactions ?? []}
                    renderCell={renderCell}
                    filterKeys={["amount"]}
                    headerConfig={{
                      hasNew: true,
                      onNew: () => {
                        onShowCreate();
                      },
                    }}
                  />
                ) : (
                  <ListTransactions data={goalData.transactions as any} />
                )}
              </>
            ),
          },
          {
            title: "Detalle",
            children: (
              <ul className="[$>li]:items-center grid w-full grid-cols-1 gap-2 sm:grid-cols-2 [&>li>p]:font-semibold [&>li]:flex [&>li]:gap-2 [&>li]:text-sm">
                {entity && (
                  <li>
                    <span>Destinatario:</span>
                    <p>{capitalize(entity.name)}</p>
                  </li>
                )}
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
                          format(new Date(String(goalDate)), "PPP", {
                            locale: es,
                          }),
                        )
                      : "N/A"}
                  </p>
                </li>
              </ul>
            ),
          },
        ]}
      />
      {defaultGoal && (
        <EditGoal
          isOpen={showEditgoal}
          onClose={onCloseEditGoal}
          data={defaultGoal}
        />
      )}
      <CreateTransaction
        isOpen={showCreate}
        options={{
          transferType: "goal",
          onlyForm: true,
          defaultGoal: defaultGoal,
        }}
        onClose={onCloseCreate}
      />
      {data && (
        <EditTransaction
          transaction={data}
          options={{
            transferType: "goals",
            defaultGoal: defaultGoal,
          }}
          isOpen={showEdit}
          onClose={onCloseEdit}
        />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const goal = await helper.goals.getGoalById.fetch({
    id: Number(id),
    bookId: String(bookId),
  });

  const [goalData] = formatDatesOfGoals(goal as any);

  return {
    props: {
      goalData,
    },
  };
};

export default DetailGoalPage;

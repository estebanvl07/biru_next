import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Button, Chip, User } from "@heroui/react";
import clsx from "clsx";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useResize } from "~/lib/hooks/useResize";
import { formatDatesOfMovements } from "~/lib/resource/formatDatesOfMovements";
import { ListTransactions } from "~/modules/Common";
import { Table } from "~/modules/components";
import DetailView from "~/modules/components/molecules/DetailView";
import Actions from "~/modules/components/molecules/Table/Actions";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { detailColumns } from "~/modules/Entities/table";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { MovementsIncludes } from "~/types/movements";
import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

interface MovementDetailProps {
  movement: MovementsIncludes;
  acc: number;
}

const MovementDetail = ({ movement, acc }: MovementDetailProps) => {
  const {
    transactions,
    amount,
    status,
    next_ocurrence,
    last_ocurrence,
    entity,
    category,
    frecuency,
    description,
    type,
  } = movement;

  const params = useParams();
  const router = useRouter();
  const { isMobile } = useResize();

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
                <h4 className="whitespace-nowrap text-lg font-semibold">
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
                icon={
                  transaction.type === 1
                    ? "iconamoon:arrow-bottom-left-1"
                    : "iconamoon:arrow-top-right-1"
                }
              />
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
              onClickEdit={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction.id),
                  },
                })
              }
              hasDelete={false}
            />
          );
        default:
          return cellValue;
      }
    },
    [transactions, params],
  );

  return (
    <DashboardLayout title="Detalle de Movimiento">
      <DetailView
        topContent={
          <header className="flex flex-row items-center justify-between">
            <User
              name={clsx({
                [`${movement.name}`]: !movement.entity,
                [`${movement.entity?.name}`]: movement.entity,
              })}
              classNames={{
                name: "text-xl font-semibold",
              }}
              description={movement.description || "Sin descripción"}
              avatarProps={{
                size: "md",
                color: "primary",
              }}
            />
            <Button
              as={Link}
              href={`/account/${params?.acc}/entities/${movement.id}/edit`}
              color="primary"
              isIconOnly={isMobile}
              className="sm:w-fit"
            >
              <Icon icon="akar-icons:edit" width={18} />
              {!isMobile && "Editar Movimiento"}
            </Button>
          </header>
        }
        tabs={[
          {
            title: "Transacciones Realizadas",
            children: (
              <>
                {isMobile ? (
                  <ListTransactions data={transactions as any} />
                ) : (
                  <Table
                    headerConfig={{
                      hasNew: true,
                      newButtonText: "Crear Ocurrencia",
                      redirectTo: `/account/${params?.acc}/movements/new/ocurrence/${movement.id}`,
                    }}
                    filterKeys={["name", "amount"]}
                    columns={detailColumns}
                    renderCell={renderCell}
                    data={transactions ?? []}
                  />
                )}
              </>
            ),
          },
          {
            title: "Detalle",
            children: (
              <ul className=" mb-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 [&>li>p]:font-medium [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li]:text-sm">
                <li>
                  <span>Monto de Movimiento: </span>
                  <p>$ {amount.toLocaleString()}</p>
                </li>
                <li>
                  <span>Descripción: </span>
                  <p>{description || "N/A"}</p>
                </li>
                <li>
                  <span>Entidad: </span>
                  <p>{entity?.name || "N/A"}</p>
                </li>
                <li>
                  <span>Categoría: </span>
                  <p>{category?.name || "N/A"}</p>
                </li>
                <li>
                  <span>Tipo: </span>
                  <p>{type === 1 ? "Ingreso" : "Egreso"}</p>
                </li>
                <li>
                  <span>Siguiente ocurrencia: </span>
                  <p>{format(next_ocurrence, "PPPP", { locale: es })}</p>
                </li>
                <li>
                  <span>Última ocurrencia: </span>
                  <p
                    className={clsx({
                      "text-xs font-normal italic text-default-400":
                        !last_ocurrence,
                    })}
                  >
                    {last_ocurrence
                      ? format(last_ocurrence, "PPPP", { locale: es })
                      : "Sin ocurrencias"}
                  </p>
                </li>
              </ul>
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, acc } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const movements = await helper.movements.getMovementById.fetch(Number(id));

  const [movement] = formatDatesOfMovements([movements] as any);

  return {
    props: {
      movement,
      acc,
    },
  };
};

export default MovementDetail;

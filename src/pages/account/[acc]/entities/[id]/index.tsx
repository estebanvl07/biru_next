import React, { useCallback, useState } from "react";
import { GetServerSideProps } from "next";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Chip } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { detailColumns } from "~/modules/Entities/table";
import { Table } from "~/modules/components";
import Actions from "~/modules/components/molecules/Table/Actions";
import DashboardLayout from "~/modules/Layouts/Dashboard";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

import type { EntityIncludes } from "~/types/entities/entity.types";
import type { Transaction } from "@prisma/client";
import { useResize } from "~/lib/hooks/useResize";
import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";
import Link from "next/link";
import { ListTransactions } from "~/modules/Common";
import DetailView from "~/modules/components/molecules/DetailView";
import { TransactionIncludes } from "~/types/transactions";
import useShowForm from "~/lib/hooks/useShowForm";
import CreateTransaction from "~/modules/Transactions/CreateTransaction";
import EditTransaction from "~/modules/Transactions/EditTransaction";
import EditEntity from "~/modules/Entities/EditEntity";

const DetailEntityPage = ({ entity }: { entity: EntityIncludes }) => {
  const router = useRouter();
  const params = useParams();
  const {
    onShowCreate,
    onShowEdit,
    showCreate,
    onCloseCreate,
    onCloseEdit,
    showEdit,
    onChageData,
    data,
  } = useShowForm<TransactionIncludes>({});

  const {
    showEdit: EntityFormShow,
    onShowEdit: onEntityFormShow,
    onCloseEdit: onEntityFormClose,
    data: defaultEntity,
  } = useShowForm<EntityIncludes>({ defaultData: entity });

  const { isMobile } = useResize();

  const renderCell = useCallback(
    (transaction: TransactionIncludes, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionIncludes];
      switch (columnKey) {
        case "amount":
          return (
            <User
              name={`$ ${transaction.amount.toLocaleString()}`}
              classNames={{
                name: "font-semibold text-lg",
                description: "dark:text-slate-400",
              }}
              description={
                transaction.date
                  ? format(String(transaction.date), "PPP", { locale: es })
                  : "N/A"
              }
              avatarProps={{
                src: entity.avatar ?? undefined,
                name: entity.name,
                color: "primary",
              }}
              suppressHydrationWarning={true}
            />
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
                width={18}
              />
            </Chip>
          );
        case "actions":
          return (
            <Actions
              onClickView={() => {
                onChageData(transaction);
                onShowCreate();
              }}
              onClickEdit={() => {
                onChageData(transaction);
                onShowEdit();
              }}
              onClickDelete={() => console.log("delete")}
            />
          );
        default:
          return (
            <span>
              {typeof cellValue === "string" && cellValue === ""
                ? "N/A"
                : String(cellValue)}
            </span>
          );
      }
    },
    [],
  );

  return (
    <DashboardLayout title="Detalle de Entidad">
      <DetailView
        topContent={
          <header className="flex flex-row items-center justify-between">
            <User
              name={entity.name}
              classNames={{
                name: "text-xl font-semibold",
              }}
              description={entity.description || "Sin descripción"}
              avatarProps={{
                size: "lg",
                color: "primary",
              }}
            />
            <Button
              color="primary"
              isIconOnly={isMobile}
              onClick={() => {
                onEntityFormShow();
              }}
              className="sm:w-fit"
            >
              <Icon icon="akar-icons:edit" width={18} />
              {!isMobile && "Editar Entidad"}
            </Button>
          </header>
        }
        tabs={[
          {
            title: "Transacciones Relacionadas",
            children: (
              <div className="w-full md:min-w-[32rem]">
                {isMobile ? (
                  <ListTransactions data={entity.transactions as any} />
                ) : (
                  <Table
                    headerConfig={{
                      hasNew: true,
                      newButtonText: "Nueva Transacción",
                      onNew() {
                        onShowCreate();
                      },
                    }}
                    footerConfig={{
                      navButtons: false,
                    }}
                    filterKeys={["amount", "description", "reference"]}
                    columns={detailColumns}
                    data={entity.transactions}
                    renderCell={renderCell}
                  />
                )}
              </div>
            ),
          },
          {
            title: "Detalle",
            children: (
              <ul className=" [&>li]:gap-2p mb-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 [&>li>p]:font-medium [&>li]:flex [&>li]:items-start [&>li]:gap-2 [&>li]:text-sm">
                <li>
                  <span>Referencia: </span>
                  <p>{entity.reference || "N/A"}</p>
                </li>
                <li>
                  <span>Descripción: </span>
                  <p>{entity.description || "N/A"}</p>
                </li>
                <li>
                  <span>Tipo: </span>
                  <p>{entity.type === 1 ? "Ingreso" : "Egreso"}</p>
                </li>
              </ul>
            ),
          },
        ]}
      />
      <CreateTransaction
        isOpen={showCreate}
        onClose={() => onCloseCreate()}
        options={{
          defaultEntity: entity,
        }}
      />
      {data && (
        <EditTransaction
          transaction={data}
          isOpen={showEdit}
          onClose={onCloseEdit}
        />
      )}
      {defaultEntity && (
        <EditEntity
          isOpen={EntityFormShow}
          onClose={onEntityFormClose}
          entity={defaultEntity}
        />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [entity] = await helper.entity.getEntityById.fetch({ id: Number(id) });

  const transactionSerialize = formatDatesOfTransactions(
    entity?.transactions as any,
  );

  const entityData = {
    ...entity,
    createdAt: entity?.createdAt.toISOString(),
    updateAt: entity?.updateAt.toISOString(),
    transactions: transactionSerialize,
  };

  return {
    props: {
      entity: entityData,
    },
  };
};

export default DetailEntityPage;

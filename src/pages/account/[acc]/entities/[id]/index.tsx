import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { GetServerSideProps } from "next";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { detailColumns } from "~/modules/Entities/table";
import { Card, Table } from "~/modules/components";
import Actions from "~/modules/components/molecules/Table/Actions";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { EntityIncludes } from "~/types/entities/entity.types";
import { api } from "~/utils/api";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

const DetailEntityPage = ({ entity }: { entity: EntityIncludes }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const params = useParams();

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];
      switch (columnKey) {
        case "amount":
          return (
            <User
              name={transaction.amount.toLocaleString()}
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
                icon={transaction.type === 1 ? "ph:trend-up" : "ph:trend-down"}
              />
            </Chip>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push(
                  `/account/${params?.acc}/transactions/${transaction.id}`,
                )
              }
              onClickEdit={() =>
                router.push(
                  `/account/${params?.acc}/transactions/${transaction.id}/edit`,
                )
              }
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <DashboardLayout title="Detalle de Entidad">
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col">
            <ul className="grid w-full grid-cols-4 gap-2 [&>li>p]:text-default-500 [&>li>span]:font-medium [&>li]:flex [&>li]:flex-col [&>li]:items-start">
              <li>
                <span>Nombre</span>
                <p>{entity.name}</p>
              </li>
              <li>
                <span>Referencia</span>
                <p>{entity.reference || "N/A"}</p>
              </li>
              <li>
                <span>Descripción</span>
                <p>{entity.description || "N/A"}</p>
              </li>
              <li>
                <span>Tipo</span>
                <p>{entity.type === 1 ? "Ingreso" : "Egreso"}</p>
              </li>
            </ul>
          </Card>
          <div className="w-full min-w-[32rem]">
            {isClient && (
              <Table
                headerConfig={{
                  keySearch: ["amount", "reference"],
                  hasNew: false,
                }}
                footerConfig={{
                  navButtons: false,
                }}
                columns={detailColumns}
                data={entity.transactions}
                renderCell={renderCell}
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [entity] = await helper.entity.getEntityById.fetch({ id: Number(id) });

  const transactionSerialize = entity?.transactions.map((trans) => {
    return {
      ...trans,
      date: trans?.date?.toISOString(),
      createdAt: trans?.createdAt.toISOString(),
      updatedAt: trans?.updatedAt.toISOString(),
    };
  });

  const entityData = {
    ...entity,
    createdAt: entity?.createdAt.toISOString(),
    updateAt: entity?.updateAt.toISOString(),
    transactions: transactionSerialize,
  };

  return {
    props:
      {
        entity: entityData,
      } ?? {},
  };
};

export default DetailEntityPage;

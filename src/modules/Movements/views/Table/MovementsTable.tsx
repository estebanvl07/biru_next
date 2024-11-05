import React, { useCallback } from "react";
import { Table } from "~/modules/components";
import { columns } from "./table";
import { api } from "~/utils/api";
import { useParams } from "next/navigation";
import { MovementsIncludes } from "~/types/movements";
import { Avatar, Chip, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import Actions from "~/modules/components/molecules/Table/Actions";
import { capitalize } from "lodash";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/router";
import Link from "next/link";

const MovementsTable = () => {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = api.movements.getAll.useQuery();

  const renderCell = useCallback(
    (movement: MovementsIncludes, columnKey: React.Key) => {
      const cellValue = movement[columnKey as keyof MovementsIncludes];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <div className="flex !h-10 !min-w-10 items-center justify-center whitespace-nowrap rounded-full bg-primary text-xl text-white">
                <Avatar
                  color="primary"
                  name={clsx({
                    [`${movement.name}`]: !movement.entityId,
                    [`${movement.entity?.name}`]: movement.entityId,
                  })}
                />
              </div>
              <aside>
                <h4 className="whitespace-nowrap font-semibold">
                  {movement.name}
                </h4>
                <p className="!text-xs">
                  {movement.description || "Sin descripción"}
                </p>
              </aside>
            </div>
          );
        case "categoryId":
          return (
            <>
              {movement.category ? (
                <Chip
                  size="lg"
                  variant="flat"
                  classNames={{
                    content: "flex items-center gap-2",
                  }}
                  color={movement.categoryId ? "warning" : "default"}
                >
                  {movement.category && (
                    <Icon icon={movement.category.icon ?? ""} width={20} />
                  )}
                  <span className="text-sm">{movement.category.name}</span>
                </Chip>
              ) : (
                <p>Sin categoría</p>
              )}
            </>
          );
        case "type":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={movement.type === 1 ? "success" : "danger"}
            >
              <Icon
                icon={
                  movement.type === 1
                    ? "iconamoon:arrow-bottom-left-1"
                    : "iconamoon:arrow-top-right-1"
                }
              />
            </Chip>
          );
        case "next_ocurrence":
          return (
            <p>
              {capitalize(
                format(movement.next_ocurrence, "PPPP", { locale: es }),
              )}
            </p>
          );
        case "status":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={movement.status ? "success" : "default"}
            >
              {movement.status ? "Activo" : "Incativo"}
            </Chip>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/movements/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(movement.id),
                  },
                })
              }
              onClickEdit={() =>
                router.push({
                  pathname: "/account/[acc]/movements/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(movement.id),
                  },
                })
              }
              hasDelete={false}
            >
              <Tooltip content={"Crear ocurrencia"} className="font-montserrat">
                <Link
                  href={`/account/${params?.acc}/movements/new/ocurrence/${movement.id}`}
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                >
                  <Icon icon="ic:round-plus" width={24} />
                </Link>
              </Tooltip>
            </Actions>
          );
        default:
          return cellValue;
      }
    },
    [data],
  );

  return (
    <Table
      headerConfig={{
        hasNew: true,
        newButtonText: "Crear Movimiento",
        redirectTo: `/account/${params?.acc}/movements/new`,
      }}
      filterKeys={["name", "amount"]}
      columns={columns}
      isLoading={isLoading}
      renderCell={renderCell}
      data={data ?? []}
    />
  );
};

export default MovementsTable;

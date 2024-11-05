import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { Card, Table } from "~/modules/components";
import { format } from "date-fns";

import MobileEntityPage from "~/modules/Entities/MobileEntityContent";
import { useResize } from "~/lib/hooks/useResize";
import { es } from "date-fns/locale";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import { columns } from "~/modules/Entities/table";
import { Entities } from "@prisma/client";
import { Chip, User } from "@nextui-org/react";
import Actions from "~/modules/components/molecules/Table/Actions";

import { api } from "~/utils/api";
import clsx from "clsx";
import useShowForm from "~/lib/hooks/useShowForm";
import { EntityIncludes } from "~/types/entities/entity.types";
import CreateEntity from "~/modules/Entities/CreateEntity";
import EditEntity from "~/modules/Entities/EditEntity";

export default function EntitiesPage() {
  const router = useRouter();
  const params = useParams();
  const { size } = useResize();
  const {
    data,
    onChageData,
    onShowCreate,
    onShowEdit,
    showEdit,
    showCreate,
    onCloseCreate,
    onCloseEdit,
  } = useShowForm<EntityIncludes>({});

  const { data: entities, isLoading } = api.entity.getEntities.useQuery(
    undefined,
    { enabled: Boolean(params?.acc) },
  );

  const isMobile = Boolean(size && size <= 768);

  const renderCell = useCallback(
    (entity: EntityIncludes, columnKey: React.Key) => {
      const cellValue = entity[columnKey as keyof EntityIncludes];
      switch (columnKey) {
        case "name":
          return (
            <User
              name={entity.name}
              description={
                entity.description !== "" ? entity.description : "N/A"
              }
              avatarProps={{
                src: entity.avatar ?? undefined,
                name: entity.name,
                color: "primary",
              }}
            />
          );
        case "reference":
          return (
            <span
              className={clsx({
                "text-xs italic opacity-80": !entity.reference,
              })}
            >
              {!entity.reference ? "Sin referencia" : entity.reference}
            </span>
          );
        case "state":
          return (
            <Chip
              variant="flat"
              size="sm"
              color={cellValue === 1 ? "success" : "default"}
            >
              {cellValue === 1 ? "Activo" : "Inactivo"}
            </Chip>
          );
        case "reference":
          return (
            <span
              className={clsx({
                "text-xs italic text-gray-500 dark:text-gray-400":
                  !entity?.reference,
              })}
            >
              {entity.reference ?? "sin referencia"}
            </span>
          );
        case "createdAt":
          return (
            <span>{format(String(cellValue), "PPP", { locale: es })}</span>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push(`/account/${params?.acc}/entities/${entity.id}`)
              }
              onClickEdit={() => {
                onChageData(entity);
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
    [entities],
  );

  return (
    <DashboardLayout title="Entidades">
      {!isMobile ? (
        <Table
          headerConfig={{
            title: "",
            onNew() {
              onShowCreate();
            },
          }}
          columns={columns}
          isLoading={isLoading}
          renderCell={renderCell}
          data={entities ?? []}
        />
      ) : (
        <MobileEntityPage entities={entities ?? []} />
      )}
      <CreateEntity isOpen={showCreate} onClose={onCloseCreate} />
      {data && (
        <EditEntity isOpen={showEdit} onClose={onCloseEdit} entity={data} />
      )}
    </DashboardLayout>
  );
}

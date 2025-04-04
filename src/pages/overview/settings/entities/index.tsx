import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { Table } from "~/modules/components";
import { format } from "date-fns";

import MobileEntityPage from "~/modules/Entities/MobileEntityContent";
import { useResize } from "~/lib/hooks/useResize";
import { es } from "date-fns/locale";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import { columns } from "~/modules/Entities/table";
import { Entities } from "@prisma/client";
import { CardBody, CardHeader, Chip, User, Card } from "@heroui/react";
import Actions from "~/modules/components/molecules/Table/Actions";

import { api } from "~/utils/api";
import clsx from "clsx";
import useShowForm from "~/lib/hooks/useShowForm";
import { EntityIncludes } from "~/types/entities/entity.types";
import CreateEntity from "~/modules/Entities/CreateEntity";
import EditEntity from "~/modules/Entities/EditEntity";
import SettingsLayout from "~/modules/Layouts/SettingsLayout";
import { useEntity } from "~/modules/Entities/hook/entities.hook";

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

  const { entities, isLoading } = useEntity();

  const isMobile = Boolean(size && size <= 768);

  const renderCell = useCallback(
    (entity: EntityIncludes, columnKey: React.Key) => {
      const cellValue = entity[columnKey as keyof EntityIncludes];
      switch (columnKey) {
        case "name":
          return (
            <div>
              <h4 className="whitespace-nowrap font-semibold">{entity.name}</h4>
              <p className="!text-xs">
                {entity.description ?? "Sin desctipción"}
              </p>
            </div>
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
        case "type":
          return (
            <Chip
              variant="dot"
              className="border-none"
              color={cellValue === 1 ? "success" : "danger"}
            >
              {cellValue === 1 ? "Ingreso" : "Egreso"}
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
    <SettingsLayout>
      <Card shadow="none" className="border border-divider ">
        <CardHeader className="flex items-center justify-between px-6 pt-4">
          <aside>
            <h2>Entidades</h2>
            <p>
              Añade tus contactos para mantener un control mas detallado de tus
              finanzas
            </p>
          </aside>
          <div
            className={clsx("w-fit", {
              hidden: isMobile,
            })}
          ></div>
        </CardHeader>
        <CardBody className="p-6">
          {!isMobile ? (
            <Table
              headerConfig={{
                hasNew: true,
                newButtonText: "Crear Entidad",
                onNew() {
                  onShowCreate();
                },
              }}
              isStriped
              filterKeys={["name", "description", "reference"]}
              filterBy={[
                {
                  by: "type",
                  title: "Tipo",
                  options: [
                    {
                      text: "Ingreso",
                      value: 1,
                    },
                    {
                      text: "Egreso",
                      value: 2,
                    },
                  ],
                },
              ]}
              columns={columns}
              isLoading={isLoading}
              renderCell={renderCell}
              data={entities ?? []}
            />
          ) : (
            <MobileEntityPage entities={entities ?? []} />
          )}
        </CardBody>
      </Card>

      <CreateEntity isOpen={showCreate} onClose={onCloseCreate} />
      {data && (
        <EditEntity isOpen={showEdit} onClose={onCloseEdit} entity={data} />
      )}
    </SettingsLayout>
  );
}

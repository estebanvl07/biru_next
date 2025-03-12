import React, { useCallback } from "react";
import CreateTemplate from "./CreateTemplate";
import { Table } from "../components";
import { columns } from "./table";
import useShowForm from "~/lib/hooks/useShowForm";
import { useTemplate } from "./hooks/useTemplate";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { TemplatesIncludes } from "~/types/templates/templates";
import { Avatar, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import Actions from "../components/molecules/Table/Actions";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { capitalize } from "../components/molecules/Table/utils";
import EditTemplate from "./EditTemplate";

const TableTemplates = () => {
  const {
    data,
    onChageData,
    showCreate,
    showEdit,
    onShowCreate,
    onShowEdit,
    onCloseEdit,
    onCloseCreate,
  } = useShowForm<TemplatesIncludes>({});

  const { templates, isLoading } = useTemplate();
  const params = useParams();
  const router = useRouter();

  const renderCell = useCallback(
    (template: TemplatesIncludes, columnKey: React.Key) => {
      const cellValue = template[columnKey as keyof TemplatesIncludes];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <div className="flex !h-10 !min-w-10 items-center justify-center whitespace-nowrap rounded-full bg-primary text-xl text-white">
                <Icon icon={template.icon ?? "ph:target"} />
              </div>
              <aside>
                <h4 className="whitespace-nowrap font-semibold">
                  {template.name}
                </h4>
                <p className="!text-xs">
                  {template.description ?? "Sin descripcion"}
                </p>
              </aside>
            </div>
          );

        case "state":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={template.state === 1 ? "success" : "danger"}
            >
              {template.state === 1 ? "Activo" : "Inactivo"}
            </Chip>
          );
        case "createdAt":
          return (
            <span>
              {template.createdAt ? (
                <>
                  {capitalize(
                    format(template.createdAt, "PPPP", { locale: es }),
                  )}
                </>
              ) : (
                "N/A"
              )}
            </span>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/templates/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(template.id),
                  },
                })
              }
              onClickEdit={() => {
                onChageData(template);
                onShowEdit();
              }}
              hasDelete={false}
            />
          );
        default:
          return cellValue;
      }
    },
    [templates],
  );

  return (
    <>
      <Table
        headerConfig={{
          newButtonText: "Crear Plantilla",
          hasNew: true,
          onNew: () => {
            onShowCreate();
          },
        }}
        columns={columns}
        data={templates}
        isLoading={isLoading}
        renderCell={renderCell}
      />
      <CreateTemplate isOpen={showCreate} onClose={onCloseCreate} />
      {data && (
        <EditTemplate data={data} isOpen={showEdit} onClose={onCloseEdit} />
      )}
    </>
  );
};

export default TableTemplates;

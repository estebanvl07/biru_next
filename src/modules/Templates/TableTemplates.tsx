import React, { useCallback } from "react";
import CreateTemplate from "./CreateTemplate";
import { Table } from "../components";
import { columns } from "./table";
import useShowForm from "~/lib/hooks/useShowForm";
import { useTemplate } from "./hooks/useTemplate";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { TemplatesIncludes } from "~/types/templates/templates";
import { Avatar, Chip, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import Actions from "../components/molecules/Table/Actions";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { capitalize } from "../components/molecules/Table/utils";
import EditTemplate from "./EditTemplate";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { PlusIcon, ShieldCheck, ShieldOff } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import { api } from "~/utils/api";

const TableTemplates = () => {
  const { templates, isLoading, invalidate } = useTemplate();
  const params = useParams();
  const router = useRouter();

  const { mutateAsync: disabledTemplateMutation } =
    api.templates.disabledTemplate.useMutation({
      onSuccess: () => {
        invalidate();
      },
    });
  const { mutateAsync: availableTemplateMutation } =
    api.templates.availableTemplate.useMutation({
      onSuccess: () => {
        invalidate();
      },
    });

  const renderCell = useCallback(
    (template: TemplatesIncludes, columnKey: React.Key) => {
      const cellValue = template[columnKey as keyof TemplatesIncludes];

      switch (columnKey) {
        case "name":
          return (
            <aside>
              <h4 className="whitespace-nowrap font-semibold">
                {template.name}
              </h4>
              <p className="!text-xs">
                {template.description ?? "Sin descripcion"}
              </p>
            </aside>
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
                  pathname: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/[id]`,
                  query: {
                    id: String(template.id),
                  },
                })
              }
              onClickEdit={() => {
                router.push({
                  pathname: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/[id]/edit`,
                  query: {
                    id: String(template.id),
                  },
                });
              }}
              hasDelete={false}
            >
              <DropdownItem
                startContent={<ShieldOff width={20} />}
                key="disabled"
                className={clsx({
                  hidden: template.state === 0,
                })}
                onPress={() => {
                  toast("¿Estas seguro de desactivar esta plantilla?", {
                    action: {
                      label: "Realizar",
                      onClick: () => {
                        toast.promise(
                          disabledTemplateMutation({
                            bookId: String(params?.bookId),
                            id: template.id,
                          }),
                          {
                            loading: "Deshabilitando Plantilla...",
                            success:
                              "La plantilla se ha deshabilitado con éxito.",
                            error: "Hubo un error, intente de nuevo",
                          },
                        );
                      },
                    },
                  });
                }}
              >
                Desactivar
              </DropdownItem>
              <DropdownItem
                startContent={<ShieldCheck width={20} />}
                key="active"
                className={clsx({
                  hidden: template.state === 1,
                })}
                onPress={() => {
                  toast("¿Desea habiitar este plantilla?", {
                    action: {
                      label: "Realizar",
                      onClick: () => {
                        toast.promise(
                          availableTemplateMutation({
                            bookId: String(params?.bookId),
                            id: template.id,
                          }),
                          {
                            loading: "Habilitando Plantilla...",
                            success: "La plantilla se ha habilitado con éxito.",
                            error: "Hubo un error, intente de nuevo",
                          },
                        );
                      },
                    },
                  });
                }}
              >
                Activar
              </DropdownItem>
              <DropdownItem
                startContent={<PlusIcon />}
                key="create"
                onPress={() => {
                  router.push({
                    pathname: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/new`,
                    query: {
                      templateId: template.id,
                    },
                  });
                }}
              >
                Crear Transacción
              </DropdownItem>
            </Actions>
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
        headerConfig={{}}
        columns={columns}
        data={templates}
        isLoading={isLoading}
        renderCell={renderCell}
      />
    </>
  );
};

export default TableTemplates;

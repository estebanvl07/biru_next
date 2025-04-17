import React, { useCallback, useState } from "react";
import DataList from "../components/molecules/DataList/DataList";
import { useParams } from "next/navigation";
import { useDisclosure } from "@heroui/modal";
import { useTemplate } from "./hooks/useTemplate";
import { TemplatesIncludes } from "~/types/templates/templates";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import CreateTemplate from "./CreateTemplate";
import {
  Edit,
  EllipsisVertical,
  Eye,
  Link,
  Plus,
  ShieldCheck,
  ShieldOff,
  Trash,
} from "lucide-react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { toast } from "sonner";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Chip } from "@heroui/react";

const TemplateList = () => {
  const [templateSelected, setTemplateSelected] = useState<TemplatesIncludes>(
    {} as TemplatesIncludes,
  );

  const router = useRouter();
  const params = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { templates, isLoading, invalidate } = useTemplate();

  const { mutateAsync: disabledTemplate } =
    api.templates.disabledTemplate.useMutation({
      onSuccess: async () => await invalidate(),
    });

  const { mutateAsync: enabledTemplate } =
    api.templates.availableTemplate.useMutation({
      onSuccess: async () => await invalidate(),
    });

  const renderContent = useCallback(
    (template: TemplatesIncludes) => {
      return (
        <>
          <aside>
            <h4 className="whitespace-nowrap font-semibold">{template.name}</h4>
            <p className="!text-xs">
              {template.description ?? "Sin descripcion"}
            </p>
          </aside>
          <aside className="flex items-center gap-4">
            <Chip
              size="sm"
              variant="flat"
              color={template.state === 1 ? "success" : "danger"}
            >
              {template.state === 1 ? "Activo" : "Inactivo"}
            </Chip>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTemplateSelected(template);
                onOpen();
              }}
            >
              <EllipsisVertical />
            </button>
          </aside>
        </>
      );
    },
    [params, templates],
  );

  return (
    <>
      <DataList
        data={templates as TemplatesIncludes[]}
        content={renderContent}
        setDataSelected={setTemplateSelected}
        isLoading={isLoading}
        onPressItem={(item) => {
          router.push(
            `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/${item.id}`,
          );
        }}
        drawerProps={{
          isOpen,
          onClose,
          onOpen,
          drawerHeaderContent: (template) => {
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
          },
          drawerBodyContent(data) {
            return (
              <Listbox
                aria-label="Opciones de transacción"
                variant="flat"
                color="default"
              >
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  aria-label="crear transacción con plantilla"
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/new?templateId=${data.id}`}
                  startContent={<Plus width={18} />}
                >
                  <span className="text-base">
                    Crear Transacción con Plantilla
                  </span>
                </ListboxItem>
                <ListboxItem
                  className={clsx("px-0 py-2 !text-lg", {
                    hidden: data.state === 0,
                  })}
                  aria-label="Ver plantilla"
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/${data.id}`}
                  startContent={<Eye width={18} />}
                >
                  <span className="text-base">Ver Plantilla</span>
                </ListboxItem>
                <ListboxItem
                  className={clsx("px-0 py-2 !text-lg", {
                    hidden: data.state === 1,
                  })}
                  aria-label="habilitar plantilla"
                  onPress={() => {
                    toast("¿Estas seguro de habilitar esta plantilla?", {
                      action: {
                        label: "Realizar",
                        onClick: () => {
                          enabledTemplate({
                            id: data.id,
                            bookId: String(params?.bookId),
                          });
                        },
                      },
                    });
                  }}
                  startContent={<ShieldCheck width={18} />}
                >
                  <span className="text-base">Habilitar Plantilla</span>
                </ListboxItem>
                <ListboxItem
                  className={clsx("px-0 py-2 !text-lg", {
                    hidden: data.state === 0,
                  })}
                  aria-label="deshabilitar plantilla"
                  onPress={() => {
                    toast("¿Estas seguro de deshabilitar esta plantilla?", {
                      action: {
                        label: "Realizar",
                        onClick: () => {
                          disabledTemplate({
                            id: data.id,
                            bookId: String(params?.bookId),
                          });
                        },
                      },
                    });
                  }}
                  startContent={<ShieldOff width={18} />}
                >
                  <span className="text-base">Deshabilitar Plantilla</span>
                </ListboxItem>
                <ListboxItem
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/${data.id}/edit`}
                  aria-label="editar plantilla"
                  className="px-0 py-2 !text-lg"
                  startContent={<Edit width={18} />}
                >
                  <span className="text-base">Editar Plantilla</span>
                </ListboxItem>
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  aria-label="Eliminar plantilla"
                  onPress={() => {
                    toast("¿Estas seguro de eliminar esta plantilla?", {
                      action: {
                        label: "Realizar",
                        onClick: () => {
                          // const cancelTransaction = api.transaction.cancel.useMutation();
                          // toast.promise(
                          //   cancelTransaction.mutateAsync({
                          //     id: data.id,
                          //     bookId: params?.bookId,
                          //   }),
                          //   {
                          //     loading: "Cancelando Transacción...",
                          //     success:
                          //       "La transacción se ha cancelado con éxito.",
                          //     error: "Hubo un error, intente de nuevo",
                          //   },
                          // );
                        },
                      },
                    });
                  }}
                  startContent={<Trash width={18} />}
                >
                  <span className="text-base">Elimiar Palantilla</span>
                </ListboxItem>
              </Listbox>
            );
          },
        }}
        dataSelected={templateSelected}
        hrefButtonNew={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/new`}
        newButtonText="Crear Plantilla"
      />
    </>
  );
};

export default TemplateList;

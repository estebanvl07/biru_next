import React, { useCallback, useState } from "react";
import { Table } from "~/modules/components";
import { columns } from "./table";
import { api } from "~/utils/api";
import { useParams } from "next/navigation";
import { MovementsIncludes } from "~/types/movements";
import {
  Avatar,
  Chip,
  DropdownItem,
  Listbox,
  ListboxItem,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import Actions from "~/modules/components/molecules/Table/Actions";
import { capitalize } from "lodash";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/router";
import Link from "next/link";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { useMovements } from "../../hooks/useMovements";
import NullChip from "~/modules/components/atoms/NullChip.component";
import { useResize } from "~/lib/hooks/useResize";
import DataList from "~/modules/components/molecules/DataList/DataList";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Edit,
  EllipsisVertical,
  Plus,
  PlusIcon,
  ShieldCheck,
  ShieldOff,
  Trash,
} from "lucide-react";
import DataListOptions from "~/modules/components/molecules/DataList/DataListOptions";
import { toast } from "sonner";

const MovementsTable = () => {
  const [movementSelected, setMovementSelected] = useState<MovementsIncludes>(
    {} as MovementsIncludes,
  );

  const params = useParams();
  const router = useRouter();
  const { isMobile } = useResize();
  const { movements, isLoading, invalidateMovements } = useMovements();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync: disableMovement } = api.movements.disable.useMutation({
    onSuccess: async () => await invalidateMovements(),
  });
  const { mutateAsync: availableMovement } =
    api.movements.available.useMutation({
      onSuccess: async () => await invalidateMovements(),
    });

  const renderCell = useCallback(
    (movement: MovementsIncludes, columnKey: React.Key) => {
      const cellValue = movement[columnKey as keyof MovementsIncludes];

      switch (columnKey) {
        case "name":
          return (
            <aside>
              <h4 className="whitespace-nowrap font-semibold">
                {movement.name}
              </h4>
              <p className="!text-xs">${movement.amount.toLocaleString()}</p>
            </aside>
          );
        case "categoryId":
          return (
            <>
              {movement.category ? (
                <span className="text-sm">{movement.category.name}</span>
              ) : (
                <NullChip text="Sin Categoría" />
              )}
            </>
          );
        case "type":
          return (
            <Chip
              variant="dot"
              color={movement.type === 1 ? "success" : "danger"}
            >
              {movement.type === 1 ? "Ingreso" : "Egreso"}
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
              color={movement.status ? "success" : "warning"}
            >
              {movement.status ? "Activo" : "Inactivo"}
            </Chip>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/[id]`,
                  query: {
                    id: String(movement.id),
                  },
                })
              }
              onClickEdit={() =>
                router.push({
                  pathname: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/[id]/edit`,
                  query: {
                    id: String(movement.id),
                  },
                })
              }
              hasDelete={false}
            >
              <DropdownItem
                startContent={<ShieldOff width={20} />}
                key="disabled"
                className={clsx({
                  hidden: movement.status === false,
                })}
                onPress={() => {
                  toast(
                    "Ya no aparecerá en tu calendario, ¿Estas seguro de desactivar este movimiento?",
                    {
                      action: {
                        label: "Realizar",
                        onClick: () => {
                          toast.promise(
                            disableMovement({
                              bookId: String(params?.bookId),
                              id: movement.id,
                            }),
                            {
                              loading: "Deshabilitando Movimiento...",
                              success:
                                "El movimiento se ha deshabilitado con éxito.",
                              error: "Hubo un error, intente de nuevo",
                            },
                          );
                        },
                      },
                    },
                  );
                }}
              >
                Desactivar
              </DropdownItem>
              <DropdownItem
                startContent={<ShieldCheck width={20} />}
                key="active"
                className={clsx({
                  hidden: movement.status === true,
                })}
                onPress={() => {
                  toast("¿Desea habiitar este movimiento?", {
                    action: {
                      label: "Realizar",
                      onClick: () => {
                        toast.promise(
                          availableMovement({
                            bookId: String(params?.bookId),
                            id: movement.id,
                          }),
                          {
                            loading: "Habilitando Movimiento...",
                            success:
                              "El movimiento se ha habilitado con éxito.",
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
              <DropdownItem startContent={<PlusIcon />} key="create">
                Crear Ocurrencia
              </DropdownItem>
            </Actions>
          );
        default:
          return cellValue;
      }
    },
    [movements],
  );

  const renderContent = useCallback(
    (movement: MovementsIncludes) => {
      const { name, type, amount, category } = movement;

      return (
        <>
          <aside className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-default-200">
              {category ? (
                <Icon icon={category?.icon ?? ""} width={24} />
              ) : type === 1 ? (
                <ArrowUpRight />
              ) : (
                <ArrowDownLeft />
              )}
            </div>
            <div>
              <h3 className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                {capitalize(name)}
              </h3>
              <p
                className={clsx("", {
                  "text-green-600": type === 1,
                  "text-red-600": type === 2,
                })}
              >
                {type === 2 && "-"} ${amount.toLocaleString()}
              </p>
            </div>
          </aside>
          <aside className="flex items-center gap-4">
            <Chip
              size="sm"
              variant="flat"
              color={movement.status ? "success" : "danger"}
            >
              {movement.status ? "Activo" : "Inactivo"}
            </Chip>
            <button
              onClick={() => {
                setMovementSelected(movement);
                onOpen();
              }}
            >
              <EllipsisVertical />
            </button>
          </aside>
        </>
      );
    },
    [movements],
  );

  return (
    <>
      {isMobile ? (
        <DataList
          data={movements as MovementsIncludes[]}
          hrefButtonNew={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/new`}
          content={renderContent}
          newButtonText="Crear Movimiento"
          drawerProps={{
            isOpen,
            onClose,
            onOpen,
            drawerHeaderContent: (movement) => (
              <div className="flex flex-col">
                <h2>{movement.name}</h2>
                <p className="m-0 text-lg">
                  ${movement.amount?.toLocaleString()}
                </p>
              </div>
            ),
            drawerBodyContent: (movement) => (
              <Listbox variant="flat" color="default">
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  startContent={<Plus width={18} />}
                >
                  <span className="text-base">Realizar Ocurrencia</span>
                </ListboxItem>
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  startContent={<Edit width={18} />}
                >
                  <span className="text-base">Editar Movimiento</span>
                </ListboxItem>
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  startContent={<Trash width={18} />}
                >
                  <span className="text-base">Desactivar Movimiento</span>
                </ListboxItem>
              </Listbox>
              // <DataListOptions data={movement} />
            ),
          }}
          dataSelected={movementSelected}
          setDataSelected={setMovementSelected}
        />
      ) : (
        <Table
          headerConfig={
            {
              // hasNew: true,
              // newButtonText: "Crear Movimiento",
              // redirectTo: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/new`,
            }
          }
          filterKeys={["name", "amount"]}
          columns={columns}
          isLoading={isLoading}
          renderCell={renderCell}
          data={movements ?? []}
        />
      )}
    </>
  );
};

export default MovementsTable;

import React, { useCallback, useState } from "react";
import { Table } from "../components";
import { columns } from "./table";
import { api } from "~/utils/api";
import Actions from "../components/molecules/Table/Actions";
import { useRouter } from "next/router";
import { capitalize } from "lodash";
import { format, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";
import NullChip from "../components/atoms/NullChip.component";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { MovementsIncludes } from "~/types/movements";
import { toast } from "sonner";
import CreateOcurrenceForm from "../Movements/CreateOcurrenceForm";
import clsx from "clsx";

const getDaysRemaining = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const UpcomingTable = () => {
  const [currentMovementSelected, setCurrentMovementSelected] =
    useState<MovementsIncludes>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading } = api.budget.getExepensesCurrentMonth.useQuery();

  const router = useRouter();
  const params = router.query;

  const onMakeMovement = (id: string) => {
    console.log(id);

    const movement = data?.find((m) => m.id === Number(id));

    if (movement) {
      toast(`¿Quieres realizar el movimiento (${movement.name})?`, {
        action: {
          label: "Crear",
          onClick: () => {
            setCurrentMovementSelected(movement as MovementsIncludes);
            onOpen();
          },
        },
      });
    }
  };

  const getDefaultsSelected = () => {
    console.log(data);

    const defaultKeys = data
      ?.filter(({ last_ocurrence, id }) => {
        if (
          last_ocurrence &&
          isSameMonth(new Date(last_ocurrence), new Date())
        ) {
          return String(id);
        }
      })
      .map((k) => String(k.id));

    return defaultKeys || [];
  };

  const defaultKeys = getDefaultsSelected();

  const categories = data
    ?.filter((tr) => tr.category)
    .map((item) => {
      return { text: item.category!.name, value: item.category!.id };
    });

  const categoriesOfTrasactions = [
    ...new Map(categories?.map((item) => [item.value, item])).values(),
  ];

  const renderCell = useCallback(
    (movement: MovementsIncludes, columnKey: React.Key) => {
      const cellValue = movement[columnKey as keyof MovementsIncludes];

      const getBadgeColor = (daysRemaining: number, isPaid: boolean) => {
        if (isPaid) return undefined;
        if (daysRemaining < 0) return "danger";
        if (daysRemaining <= 3) return "danger";
        if (daysRemaining <= 7) return "warning";
        return "default";
      };

      const getBadgeText = (daysRemaining: number, isPaid: boolean) => {
        if (isPaid) return "Pagado";
        if (daysRemaining < 0)
          return `Vencido (${Math.abs(daysRemaining)} días)`;
        if (daysRemaining === 0) return "Hoy";
        if (daysRemaining === 1) return "Mañana";
        return `${daysRemaining} días`;
      };

      const daysRemaining = getDaysRemaining(
        movement.next_ocurrence.toDateString(),
      );
      const isPay =
        movement.last_ocurrence &&
        isSameMonth(new Date(movement.last_ocurrence), new Date());
      const badgeText = getBadgeText(daysRemaining, false);
      const badgeColor = getBadgeColor(daysRemaining, false);

      switch (columnKey) {
        case "name":
          return (
            <div
              className={clsx("flex flex-col", {
                "line-through": isPay,
              })}
            >
              <h4 className="text-bases whitespace-nowrap font-semibold">
                {movement.name}
              </h4>
              <p className="!text-xs">Recurrente</p>
            </div>
          );
        case "categoryId":
          return movement.category ? (
            <p
              className={clsx("flex items-center gap-2", {
                "line-through": isPay,
              })}
            >
              {movement.category?.name}
            </p>
          ) : (
            <p
              className={clsx("flex items-center gap-2 text-xs italic", {
                "line-through": isPay,
              })}
            >
              Sin categoría
            </p>
          );
        case "next_ocurrence":
          return (
            <span>
              {movement.next_ocurrence ? (
                <div
                  className={clsx(
                    "flex items-center gap-x-2 whitespace-nowrap",
                    {
                      "line-through": isPay,
                    },
                  )}
                >
                  <Icon icon="mynaui:calendar" />
                  <span>
                    {capitalize(
                      format(
                        isPay && movement.last_ocurrence
                          ? movement.last_ocurrence
                          : movement.next_ocurrence,
                        "dd MMM",
                        { locale: es },
                      ),
                    )}
                  </span>
                </div>
              ) : (
                "N/A"
              )}
            </span>
          );
        case "last_ocurrence":
          return movement.last_ocurrence && isPay ? (
            <Chip variant="dot" color={"default"}>
              Pagado
            </Chip>
          ) : (
            <Chip color={badgeColor}>{badgeText}</Chip>
          );
        case "amount":
          return (
            <p
              className={clsx("font-semibold", {
                "line-through": isPay,
              })}
            >
              ${cellValue?.toLocaleString()}
            </p>
          );
        case "action":
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
              onClickEdit={() => {
                router.push({
                  pathname: "/account/[acc]/movements/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(movement.id),
                  },
                });
              }}
              hasDelete={false}
            />
          );
        default:
          return cellValue;
      }
    },
    [params, data],
  );

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent className="font-montserrat">
          <DrawerHeader className="flex flex-col">
            <h2>Realizar Movimiento</h2>
            <p className="text-sm font-normal">
              Registra una nueva transacción del este movimiento
            </p>
          </DrawerHeader>
          <DrawerBody>
            <CreateOcurrenceForm
              {...(currentMovementSelected as MovementsIncludes)}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Table
        headerConfig={{}}
        selectionMode="single"
        disabledKeys={defaultKeys}
        data={data || []}
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
          {
            by: "categoryId",
            title: "Categoría",
            options: categoriesOfTrasactions
              ? Array.from(categoriesOfTrasactions).map(({ text, value }) => {
                  return {
                    text,
                    value,
                  };
                })
              : [],
          },
        ]}
        onSelectionChange={(keys) => onMakeMovement(Object.values(keys)[0])}
        renderCell={renderCell}
        isLoading={isLoading}
        columns={columns}
      />
    </>
  );
};

export default UpcomingTable;

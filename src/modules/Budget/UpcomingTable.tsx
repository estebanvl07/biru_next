import React, { useCallback } from "react";
import { Table } from "../components";
import { columns } from "./table";
import { api } from "~/utils/api";
import Actions from "../components/molecules/Table/Actions";
import { useRouter } from "next/router";
import { capitalize } from "lodash";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import NullChip from "../components/atoms/NullChip.component";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip } from "@heroui/react";
import { MovementsIncludes } from "~/types/movements";

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
  const { data, isLoading } = api.budget.getExepensesCurrentMonth.useQuery();

  const router = useRouter();
  const params = router.query;

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
      const badgeText = getBadgeText(daysRemaining, false);
      const badgeColor = getBadgeColor(daysRemaining, false);

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <h4 className="text-bases whitespace-nowrap font-semibold">
                {movement.name}
              </h4>
              <p className="!text-xs">Recurrente</p>
            </div>
          );
        case "categoryId":
          return movement.category ? (
            <p className="flex items-center gap-2">{movement.category?.name}</p>
          ) : (
            <NullChip text="Sin categoría" />
          );
        // case "state":
        //   return (
        //     <Chip
        //       variant="flat"
        //       size="sm"
        //       className="gap-1 border-none capitalize"
        //       color={statusColor(transaction.state!) as any}
        //       startContent={
        //         <Icon icon={statusIcon(transaction.state!) || ""} width={14} />
        //       }
        //     >
        //       {getTransactionStatus(transaction.state!)}
        //     </Chip>
        //   );
        case "amount":
          return (
            <p className="font-semibold">${cellValue?.toLocaleString()}</p>
          );
        case "next_ocurrence":
          return (
            <span>
              {movement.next_ocurrence ? (
                <div className="flex items-center gap-x-2 whitespace-nowrap">
                  <Icon icon="mynaui:calendar" />
                  <span>
                    {capitalize(
                      format(movement.next_ocurrence, "dd MMM", { locale: es }),
                    )}
                  </span>
                </div>
              ) : (
                "N/A"
              )}
            </span>
          );
        case "last_ocurrence":
          return <Chip color={badgeColor}>{badgeText}</Chip>;
        // case "userAccount":
        //   null;
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
    [params],
  );

  return (
    <>
      <Table
        headerConfig={{}}
        selectionMode="multiple"
        data={data || []}
        renderCell={renderCell}
        isLoading={isLoading}
        columns={columns}
      />
    </>
  );
};

export default UpcomingTable;

import { Avatar, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { format, isAfter, isBefore, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { MovementsIncludes } from "~/types/movements";

const EventCard = ({
  name,
  next_ocurrence,
  last_ocurrence,
  transferType,
  amount,
  entity,
  type,
  category,
  id,
}: MovementsIncludes) => {
  const params = useParams();
  const isPay =
    last_ocurrence && isSameMonth(new Date(last_ocurrence), new Date());
  const isDefeated = isBefore(new Date(next_ocurrence), new Date());

  // TODO: add goals and saving
  const pathname = {
    goal: `#`,
    transaction: `${DASHBOARD_MAIN_PATH}/[bookId]/transactions/[id]/make`,
    movement: `${DASHBOARD_MAIN_PATH}/[bookId]/movements/new/ocurrence/[id]`,
    saving: `#`,
    default: "#",
  }[transferType || "default"];

  return (
    <Link
      className={clsx(
        "hover:bg-muted ml-1 flex cursor-pointer items-center justify-between gap-4 rounded-xl border-divider bg-default-100 px-4 py-3 shadow-sm transition-colors md:bg-white dark:bg-default-100 ",
        {
          "cursor-auto select-none border-green-500 opacity-50": isPay,
          "hover:bg-default-50 dark:hover:bg-slate-800": !isPay,
        },
      )}
      href={{
        pathname,
        query: {
          bookId: params?.bookId,
          id,
        },
      }}
    >
      <aside className="flex items-start gap-3">
        {category?.icon ? (
          <Tooltip content={category.name} className="font-montserrat">
            <Icon icon={category.icon} width={18} />
          </Tooltip>
        ) : (
          <>
            {type === 1 ? (
              <ArrowUpRight width={18} />
            ) : (
              <ArrowDownLeft width={18} />
            )}
          </>
        )}
        <div>
          <Tooltip content={name} className="font-montserrat">
            <h6 className="max-w-32  overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              {name}
            </h6>
          </Tooltip>
          <p className="text-muted-foreground text-xs">
            {format(new Date(next_ocurrence), "PPP", {
              locale: es,
            })}
          </p>
        </div>
      </aside>
      <aside>
        <p
          className={clsx("font-semibold", {
            "text-green-500": type === 1,
            "text-red-600": type === 2,
          })}
        >
          ${amount.toLocaleString()}
        </p>
        <div className="flex items-center justify-end">
          {entity && (
            <Tooltip content={entity.name} className="font-montserrat">
              <Avatar
                className="h-5 w-5 text-[9px] capitalize"
                name={entity.name.split("").slice(0, 2).join("")}
                color="primary"
                size="sm"
              />
            </Tooltip>
          )}
        </div>
      </aside>
    </Link>
  );
};

export default EventCard;

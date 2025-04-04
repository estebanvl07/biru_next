import clsx from "clsx";
import { format, isAfter, isBefore, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";
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
      href={{
        pathname,
        query: {
          bookId: params?.bookId,
          id,
        },
      }}
    >
      <div
        className={clsx(
          "hover:bg-muted ml-1 cursor-pointer border-l border-divider px-4 py-1 transition-colors ",
          {
            "cursor-auto select-none border-green-500 opacity-50": isPay,
            "border-red-500": isDefeated,
            "hover:bg-default-50 dark:hover:bg-slate-800": !isPay,
          },
        )}
      >
        <div className="flex items-center">
          <span className="font-medium">{name}</span>
        </div>
        <p className="text-muted-foreground text-sm">
          {format(new Date(next_ocurrence), "PPP", {
            locale: es,
          })}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;

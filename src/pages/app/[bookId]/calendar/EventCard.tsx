import clsx from "clsx";
import { format, isSameMonth } from "date-fns";
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
  id,
}: MovementsIncludes) => {
  const params = useParams();
  const isPay =
    last_ocurrence && isSameMonth(new Date(last_ocurrence), new Date());
  return (
    <Link
      href={{
        pathname: `${DASHBOARD_MAIN_PATH}/[bookId]/movements/[id]`,
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
            "cursor-auto select-none opacity-50": isPay,
            "hover:bg-default-50 dark:hover:bg-slate-800": !isPay,
          },
        )}
      >
        <div className="flex items-center">
          {/* <div className={`w-3 h-3 rounded-full ${tipoEvento?.color} mr-2`}></div> */}
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

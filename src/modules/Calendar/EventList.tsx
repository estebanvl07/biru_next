import React from "react";
import { isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";
import { MovementsIncludes } from "~/types/movements";
import EventCard from "./EventCard";
import clsx from "clsx";
import { useExpensesCurrentMonth } from "~/modules/Budget/hooks/useBudget";
import { useResize } from "~/lib/hooks/useResize";

interface EventListProps {
  orientation?: "vertical" | "horizontal";
}

const EventList = ({ orientation = "vertical" }: EventListProps) => {
  const { expenses: data, isLoading } = useExpensesCurrentMonth();

  const { isMobile } = useResize();

  const todayEvents =
    data?.filter((mov) => {
      const isPay =
        mov.last_ocurrence &&
        isSameMonth(new Date(mov.last_ocurrence), new Date());
      const date = isPay ? mov.last_ocurrence : mov.next_ocurrence;
      return isPay ? false : isSameDay(new Date(date!), new Date());
    }) || [];

  const expiredEvents =
    data?.filter((mov) => {
      const isPay =
        mov.last_ocurrence &&
        isSameMonth(new Date(mov.last_ocurrence), new Date());
      const date = isPay ? mov.last_ocurrence : mov.next_ocurrence;
      return isPay ? false : isBefore(new Date(date!), new Date());
    }) || [];

  const toPayEvents =
    data?.filter((mov) => {
      const isPay =
        mov.last_ocurrence &&
        isSameMonth(new Date(mov.last_ocurrence), new Date());
      return !isPay && isAfter(new Date(mov.next_ocurrence), new Date())
        ? true
        : false;
    }) || [];

  const paidEvents =
    data?.filter((mov) => {
      const isPay =
        mov.last_ocurrence &&
        isSameMonth(new Date(mov.last_ocurrence), new Date());
      return isPay;
    }) || [];

  return (
    <aside
      className={clsx("gap-4 px-4 py-3", {
        "flex flex-row": orientation === "horizontal",
        "flex flex-col": orientation === "vertical",
        "grid grid-cols-2": isMobile,
      })}
    >
      <div className="flex flex-grow flex-col gap-2  ">
        <h4 className="font-semibold">Hoy</h4>
        {todayEvents.length === 0 && (
          <span className="text-xs text-foreground-500">Sin Evententos</span>
        )}
        {todayEvents?.map((event) => (
          <EventCard key={event.id} {...(event as MovementsIncludes)} />
        ))}
      </div>
      <div className="flex flex-grow flex-col gap-2 ">
        <h4 className="font-semibold">Próximas a Pagar</h4>
        {toPayEvents.length === 0 && (
          <span className="text-xs text-foreground-500">Sin Evententos</span>
        )}
        {toPayEvents.map((event) => (
          <EventCard key={event.id} {...(event as MovementsIncludes)} />
        ))}
      </div>
      <div className="flex flex-grow flex-col gap-2 ">
        <h4 className="font-semibold">Vencidos</h4>
        {expiredEvents.length === 0 && (
          <span className="text-xs text-foreground-500">Sin Evententos</span>
        )}
        {expiredEvents?.map((event) => (
          <EventCard key={event.id} {...(event as MovementsIncludes)} />
        ))}
      </div>

      <div className="flex flex-grow flex-col gap-2 ">
        <h4 className="font-semibold">Eventos Completados</h4>
        {paidEvents.length === 0 && (
          <span className="text-xs text-foreground-500">Sin Evententos</span>
        )}
        {paidEvents.map((event) => (
          <EventCard key={event.id} {...(event as MovementsIncludes)} />
        ))}
      </div>
    </aside>
  );
};

export default EventList;

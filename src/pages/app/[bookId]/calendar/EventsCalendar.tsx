import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { api } from "~/utils/api";
import { useParams } from "next/navigation";
import { format, isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";
import { EventInput } from "@fullcalendar/core/index.js";
import { MovementsIncludes } from "~/types/movements";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import EventCard from "./EventCard";
import EventTicket from "./EventTicket";

const EventsCalendar = () => {
  const params = useParams<{ bookId: string }>();
  const { data } = api.budget.getExepensesCurrentMonth.useQuery();

  const events: EventInput[] =
    data?.map((movement) => {
      const { amount, last_ocurrence, next_ocurrence, name, type, category } =
        movement;
      const isPay =
        last_ocurrence && isSameMonth(new Date(last_ocurrence), new Date());

      return {
        title: `${name} ($${amount.toLocaleString()})`,
        start: isPay
          ? format(last_ocurrence, "y-MM-dd")
          : format(next_ocurrence, "y-MM-dd"),
        className: "bg-transparent border-transparent",
        url: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/new/ocurrence/${movement.id}`,
        extendedProps: {
          icon: category?.icon,
          movement,
          isPay,
        },
        editable: true,
        allDay: true,
      };
    }) || [];

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
    <Card className="border-none border-divider px-0 shadow-none md:px-4 md:py-2 lg:border-divider lg:px-4">
      <CardHeader className="flex flex-col items-start pt-0 md:pt-3">
        <h2>Eventos</h2>
        <p>Conoce los movimientos que tienes programado para este mes.</p>
      </CardHeader>
      <CardBody className="flex flex-col-reverse gap-6 lg:flex-row">
        <aside className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Vencidos</h4>
            {expiredEvents.length === 0 && (
              <span className="text-xs text-foreground-500">
                Sin Evententos
              </span>
            )}
            {expiredEvents?.map((event) => (
              <EventCard key={event.id} {...(event as MovementsIncludes)} />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Por Pagar</h4>
            {toPayEvents.length === 0 && (
              <span className="text-xs text-foreground-500">
                Sin Evententos
              </span>
            )}
            {toPayEvents.map((event) => (
              <EventCard key={event.id} {...(event as MovementsIncludes)} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Hoy</h4>
            {todayEvents.length === 0 && (
              <span className="text-xs text-foreground-500">
                Sin Evententos
              </span>
            )}
            {todayEvents?.map((event) => (
              <EventCard key={event.id} {...(event as MovementsIncludes)} />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Eventos Completados</h4>
            {paidEvents.length === 0 && (
              <span className="text-xs text-foreground-500">
                Sin Evententos
              </span>
            )}
            {paidEvents.map((event) => (
              <EventCard key={event.id} {...(event as MovementsIncludes)} />
            ))}
          </div>
        </aside>
        <section className="flex-grow">
          <div className="sticky top-0 w-full">
            <FullCalendar
              droppable
              events={events}
              editable={true}
              locale={esLocale}
              headerToolbar={{
                left: "title",
                end: "",
              }}
              selectable={true}
              eventClick={(event) => {
                console.log(event);
              }}
              _resize={() => true}
              initialView="dayGridMonth"
              plugins={[dayGridPlugin]}
              eventContent={EventTicket}
            />
          </div>
        </section>
      </CardBody>
    </Card>
  );
};

export default EventsCalendar;

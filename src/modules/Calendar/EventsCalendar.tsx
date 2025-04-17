import dynamic from "next/dynamic";
import React from "react";
import { api } from "~/utils/api";
import { useParams } from "next/navigation";
import { format, isSameMonth } from "date-fns";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { EventInput } from "@fullcalendar/core/index.js";

import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventList from "./EventList";
import EventTicket from "./EventTicket";

const FullCalendar = dynamic(() => import("@fullcalendar/react"));

const EventsCalendar = () => {
  const params = useParams<{ bookId: string }>();
  const { data } = api.budget.getExepensesCurrentMonth.useQuery();

  const events: EventInput[] =
    data?.map((movement) => {
      const {
        amount,
        last_ocurrence,
        next_ocurrence,
        name,
        type,
        category,
        transferType,
      } = movement;
      const isPay =
        last_ocurrence && isSameMonth(new Date(last_ocurrence), new Date());

      const url = {
        goal: `#`,
        transaction: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${movement.id}/make`,
        movement: `${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/new/ocurrence/${movement.id}`,
        saving: `#`,
        default: "#",
      }[transferType || "default"];

      return {
        title: `${name} ($${amount.toLocaleString()})`,
        start: isPay
          ? format(last_ocurrence, "y-MM-dd")
          : format(next_ocurrence, "y-MM-dd"),
        className: "bg-transparent border-transparent",
        url,
        extendedProps: {
          icon: category?.icon,
          movement,
          isPay,
        },
        editable: true,
        allDay: true,
      };
    }) || [];

  return (
    <div className="flex flex-col-reverse gap-4 px-2 xl:flex-row">
      <aside className="rounded-xl bg-default-100">
        <EventList />
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
              end: "today prev,next",
            }}
            selectable={true}
            // eventClick={(event) => {
            //   console.log(event);
            // }}
            _resize={() => true}
            initialView="dayGridMonth"
            plugins={[dayGridPlugin]}
            eventContent={EventTicket}
          />
        </div>
      </section>
    </div>
  );
};

export default EventsCalendar;

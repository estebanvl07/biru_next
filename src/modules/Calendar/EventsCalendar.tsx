import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "~/utils/api";
import {
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";

import esLocale from "@fullcalendar/core/locales/es";
import EventList from "./EventList";
import EventTicket from "./EventTicket";
import { useDisclosure } from "@heroui/modal";
import CreateEventModal from "./CreateEventModal";
import { TransactionIncludes } from "~/types/transactions";

import interactionPlugin from "@fullcalendar/interaction";
import { type DateSelectArg, EventInput } from "@fullcalendar/core/index.js";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useResize } from "~/lib/hooks/useResize";
import Modal from "../components/atoms/Modal.component";
import { Button } from "@heroui/button";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Trash,
  X,
} from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import EventSummaryCard from "./EventSummaryCard";
import { MovementsIncludes } from "~/types/movements";
import { useRouter } from "next/router";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { getCurrentBookId } from "~/lib/config/app_variables";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useLilius } from "use-lilius";
import clsx from "clsx";
import { es } from "date-fns/locale";
import EventSummaryModal from "./EventSummaryModal";
import Calendar, {
  EventsProps,
} from "../components/molecules/FullCalendar/Calendar";

const EventsCalendar = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [events, setEvents] = useState<EventsProps[]>([]);

  const params = useParams();

  const { data } = api.budget.getExepensesCurrentMonth.useQuery();

  const { mutate: disableMovement } = api.movements.disable.useMutation({
    onSuccess(data, variables, context) {
      data && onRemoveEvent(data.id);
    },
  });
  const { mutate: cancelTransaction } = api.transaction.cancel.useMutation({
    onSuccess(data, variables, context) {
      onRemoveEvent(data.id);
    },
  });

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onAddEvent = (transaction: TransactionIncludes) => {
    const { amount, date, type, category, entity, createdAt, description, id } =
      transaction;

    const name = type === 1 ? "Ingreso Activo" : "Egreso Activo";

    const event = {
      title: `${description || name} ($${amount.toLocaleString()})`,
      date: date ?? createdAt,
      movement: {
        ...transaction,
        isPaid: false,
        next_ocurrence: date,
        status: true,
        category,
        entity,
        transferType: "transaction",
        name,
      } as unknown as MovementsIncludes,
    };

    setEvents((prev) => [...prev, event]);
  };

  const onRemoveEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.movement.id !== id));
  };

  useEffect(() => {
    if (data) {
      const eventsData: EventsProps[] = data?.map((movement) => {
        const {
          amount,
          last_ocurrence,
          next_ocurrence,
          name,
          category,
          isPaid,
        } = movement;

        return {
          title: `${name} ($${amount.toLocaleString()})`,
          date: isPaid ? last_ocurrence : next_ocurrence,
          movement,
        };
      });
      setEvents(eventsData);
    }
  }, [data]);

  return (
    <div className="mt-2 flex flex-col-reverse gap-4 xl:flex-row">
      <EventList />
      <section className="flex-grow">
        <Calendar
          className="sticky top-0"
          onPressDay={() => {
            setDate(date);
            onOpen();
          }}
          events={events}
        />
      </section>
      <CreateEventModal
        isOpen={isOpen}
        onClose={onClose}
        date={date}
        onSuccess={(data) => onAddEvent(data as TransactionIncludes)}
      />
    </div>
  );
};

export default EventsCalendar;

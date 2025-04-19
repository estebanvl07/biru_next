import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "~/utils/api";
import { format } from "date-fns";

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
import { EllipsisVertical, Trash, X } from "lucide-react";
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

const FullCalendar = dynamic(() => import("@fullcalendar/react"));

const EventsCalendar = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [eventSelected, setEventSelected] = useState<MovementsIncludes>();

  const router = useRouter();
  const params = useParams();
  const bookId = String(params?.bookId);
  const { isMobile } = useResize();

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
  const {
    isOpen: summaryIsOpen,
    onOpen: summaryOnOpen,
    onClose: summaryOnClose,
  } = useDisclosure();

  const handleDateSelect = (date: Date) => {
    setDate(date);
    onOpen();
  };

  const onAddEvent = (movement: TransactionIncludes) => {
    const { amount, date, type, category, createdAt, description, id } =
      movement;

    const name = type === 1 ? "Ingreso Activo" : "Egreso Activo";

    const event = {
      title: `${description || name} ($${amount.toLocaleString()})`,
      start: format(date ?? createdAt, "y-MM-dd"),
      className: "bg-transparent border-transparent",
      extendedProps: {
        icon: category?.icon,
        movement: {
          ...movement,
          isPaid: false,
          next_ocurrence: date,
          transferType: "transaction",
          name,
        },
      },
      editable: true,
      allDay: true,
    };

    setEvents((prev) => [...prev, event]);
  };

  const onRemoveEvent = (id: number) => {
    setEvents((prev) =>
      prev.filter((e) => e?.extendedProps?.movement.id !== id),
    );
  };

  const onQuit = () => {
    if (eventSelected) {
      toast("¿Estas seguro de realizar esta acción?", {
        action: {
          label: "Realizar",
          onClick: () => {
            eventSelected.transferType === "transaction"
              ? cancelTransaction({
                  id: eventSelected.id,
                  bookId,
                })
              : disableMovement({
                  id: eventSelected.id,
                  bookId,
                });
          },
        },
      });
    }
  };

  const module_name =
    eventSelected?.transferType === "transaction"
      ? "transactions"
      : "movements";

  useEffect(() => {
    if (data) {
      const dataEvents = data?.map((movement) => {
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
          start: isPaid
            ? format(last_ocurrence as Date, "y-MM-dd")
            : format(next_ocurrence, "y-MM-dd"),
          className: "bg-transparent border-transparent",
          extendedProps: {
            icon: category?.icon,
            movement,
          },
          editable: true,
          allDay: true,
        };
      });
      setEvents(dataEvents);
    }
  }, [data]);

  return (
    <div className="mt-2 flex flex-col-reverse gap-4 xl:flex-row">
      <aside className="whitespace-nowrap rounded-xl bg-default-200/50 dark:bg-default-100">
        <EventList />
      </aside>
      <div className="flex-grow">
        <section className="w-full md:sticky md:top-0 dark:text-white/80">
          <FullCalendar
            height={isMobile ? "70vh" : "85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={isMobile ? "timeGridDay" : "dayGridMonth"}
            events={events}
            locale={esLocale}
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectMirror
            selectable={true}
            dateClick={(e) => handleDateSelect(e.date)}
            eventClick={(event) => {
              if (event.event._def.extendedProps.movement) {
                setEventSelected(event.event._def.extendedProps.movement);
                summaryOnOpen();
              }
            }}
            eventContent={EventTicket}
          />
        </section>
      </div>
      <CreateEventModal
        isOpen={isOpen}
        onClose={onClose}
        date={date}
        onSuccess={(data) => onAddEvent(data as TransactionIncludes)}
      />
      <Modal
        isOpen={summaryIsOpen}
        onClose={summaryOnClose}
        placement={isMobile ? "bottom" : "center"}
        backdrop="opaque"
        hideCloseButton
        customHeader={
          <div className="flex items-center justify-end gap-x-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="ghost" radius="full" size="sm">
                  <EllipsisVertical width={18} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="font-montserrat">
                <DropdownItem
                  key="edit"
                  onPress={() => {
                    router.push(
                      `${DASHBOARD_MAIN_PATH}/${bookId}/${module_name}/${eventSelected?.id}/edit`,
                    );
                  }}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="view"
                  onPress={() => {
                    router.push(
                      `${DASHBOARD_MAIN_PATH}/${bookId}/${module_name}/${eventSelected?.id}`,
                    );
                  }}
                >
                  Ver Movimiento
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              isIconOnly
              variant="ghost"
              onPress={summaryOnClose}
              radius="full"
              size="sm"
            >
              <X width={18} />
            </Button>
          </div>
        }
      >
        {eventSelected && <EventSummaryCard {...eventSelected} />}
      </Modal>
    </div>
  );
};

export default EventsCalendar;

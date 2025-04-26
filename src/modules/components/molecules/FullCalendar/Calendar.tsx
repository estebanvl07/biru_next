import {
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";

import EventTicket from "~/modules/Calendar/EventTicket";

import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useLilius } from "use-lilius";
import clsx from "clsx";
import { es } from "date-fns/locale";
import { useState } from "react";
import { MovementsIncludes } from "~/types/movements";

const WEEK_LABELS = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

export type EventsProps = {
  title: string;
  date: Date | null;
  movement: MovementsIncludes;
};

interface CalendarProps {
  onPressDay?: (date: Date) => void;
  events?: EventsProps[];
  className?: string;
}

const Calendar = ({ onPressDay, events, className = "" }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>();

  const {
    calendar: [month],
    inRange,
    isSelected,
    viewing,
    viewNextMonth,
    viewToday,
    viewPreviousMonth,
  } = useLilius({
    selected: [new Date()],
    weekStartsOn: 1,
    numberOfMonths: 1,
  });

  const [firstWeek] = month!;

  return (
    <div className={className}>
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="text-center text-2xl font-semibold capitalize dark:font-normal">
          {format(firstWeek![6]!, "LLLL 'De' u", { locale: es })}
        </span>
        <aside className="flex items-center gap-1">
          <Button isIconOnly onPress={viewPreviousMonth}>
            <ChevronLeft width={20} />
          </Button>
          <Button isIconOnly onPress={viewNextMonth}>
            <ChevronRight width={20} />
          </Button>
          <Button onPress={viewToday} className="ml-2">
            Hoy
          </Button>
        </aside>
      </div>
      <div className="flex h-[70vh] flex-col items-center justify-center overflow-hidden rounded-xl border border-divider md:h-[75vh]">
        <header className="flex w-full items-center justify-center">
          {firstWeek!.map((day, index) => (
            <div
              key={day.toString()}
              className={clsx(
                "flex h-full w-full items-center justify-center border-b py-2 font-semibold text-gray-800 dark:font-normal dark:text-gray-200",
                {
                  "border-r border-divider": index !== firstWeek!.length - 1,
                },
              )}
            >
              <span className="text-center">{WEEK_LABELS[getDay(day)]}</span>
            </div>
          ))}
        </header>

        {month!.map((week, index) => (
          <section
            key={index}
            className={clsx("col-span-7  grid h-full w-full grid-cols-7 ", {
              "border-b border-divider": index !== month!.length - 1,
            })}
          >
            {week.map((day, index) => (
              <div
                key={day.toISOString()}
                className={clsx(
                  "flex  min-h-14 w-full cursor-pointer select-none flex-col items-end  p-2 text-gray-800 hover:bg-primary/5 dark:bg-transparent dark:text-white dark:hover:bg-white/5",
                  {
                    "border border-gray-400": isToday(day),
                    "!border-none !bg-primary/20 !bg-opacity-90 font-semibold !text-primary":
                      isSelected(day),
                    "!bg-default-200/50 text-gray-400/40 dark:text-zinc-500":
                      !inRange(day, startOfMonth(viewing), endOfMonth(viewing)),
                    "border-r border-divider": index !== week.length - 1,
                  },
                )}
                onClick={() => {
                  setDate(day);
                  onPressDay?.(day);
                }}
              >
                <div>
                  <span className="text-center text-sm">
                    {format(day, "d")}
                  </span>
                </div>
                {events && (
                  <div className="flex w-full flex-col items-start justify-start gap-1 overflow-hidden">
                    {events.map((event, index) => {
                      const isSomeDay = isSameDay(event.date!, day);

                      if (!isSomeDay) return null;
                      return <EventTicket key={index} {...event} />;
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

import { Chip, Tooltip } from "@heroui/react";
import React from "react";

import { EventContentArg } from "@fullcalendar/core/index.js";
import clsx from "clsx";
import EventSummaryCard from "./EventSummaryCard";

const EventTicket = (eventInfo: EventContentArg) => {
  return (
    <Tooltip
      classNames={{
        content: "font-montserrat bg-transparent p-0",
      }}
      content={<EventSummaryCard {...eventInfo.event.extendedProps.movement} />}
      placement="right"
    >
      <Chip
        variant="bordered"
        size="sm"
        radius="sm"
        className={clsx("h-fit border py-1", {
          "bg-primary/10 dark:!bg-indigo-500/10 dark:text-indigo-300":
            !eventInfo.event.extendedProps.isPay,
          "border-divider bg-default-100/10":
            eventInfo.event.extendedProps.isPay,
        })}
        color={eventInfo.event.extendedProps.isPay ? "default" : "primary"}
      >
        <div
          className={clsx(
            "relative flex flex-col items-center justify-center gap-x-2",
          )}
        >
          <p
            className={clsx("w-16 overflow-hidden text-ellipsis", {
              "line-through": eventInfo.event.extendedProps.isPay,
            })}
          >
            {eventInfo.event.title}
          </p>
        </div>
      </Chip>
    </Tooltip>
  );
};

export default EventTicket;

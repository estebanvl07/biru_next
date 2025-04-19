import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import React, { useState } from "react";

import { EventContentArg } from "@fullcalendar/core/index.js";
import clsx from "clsx";
import EventSummaryCard from "./EventSummaryCard";
import { MovementsIncludes } from "~/types/movements";
import Modal from "../components/atoms/Modal.component";
import { EllipsisVertical, Trash, X } from "lucide-react";

const EventTicket = (eventInfo: EventContentArg) => {
  return (
    <div className="relative w-full">
      <Ticket
        movement={eventInfo.event.extendedProps?.movement}
        title={eventInfo.event.title}
      />
    </div>
  );
};

const Ticket = ({
  movement,
  title,
}: {
  movement: MovementsIncludes;
  title: string;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  if (!movement) return null;

  const { type } = movement;
  const isPaid = movement?.isPaid || false;
  return (
    <div className="relative w-full">
      <Chip
        variant="flat"
        size="sm"
        onClick={() => onOpen()}
        radius="sm"
        className={clsx(
          "z-0 h-fit w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap py-1",
          {
            "": !isPaid,
            "bg-default-100/10": isPaid,
          },
        )}
        color={isPaid ? "default" : type === 1 ? "success" : "danger"}
      >
        <div
          className={clsx(
            "relative flex flex-col items-center justify-center gap-x-2 ",
          )}
        >
          <p
            className={clsx("text-[11px]  md:text-xs", {
              "line-through": isPaid,
            })}
          >
            {title}
          </p>
        </div>
      </Chip>
    </div>
  );
};

export default EventTicket;

import { Chip, useDisclosure } from "@heroui/react";

import clsx from "clsx";
import type { MovementsIncludes } from "~/types/movements";

import EventSummaryModal from "./EventSummaryModal";
import { EventsProps } from "../components/molecules/FullCalendar/Calendar";

const EventTicket = ({ title, movement }: EventsProps) => {
  return (
    <div className="relative w-full">
      <Ticket movement={movement} title={title} />
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
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
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
      <EventSummaryModal
        isOpen={isOpen}
        onClose={onClose}
        eventSelected={movement}
      />
    </div>
  );
};

export default EventTicket;

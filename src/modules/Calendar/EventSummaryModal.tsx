import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Button } from "@heroui/button";
import Modal from "../components/atoms/Modal.component";
import { EllipsisVertical, X } from "lucide-react";
import { MovementsIncludes } from "~/types/movements";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import EventSummaryCard from "./EventSummaryCard";
import { useResize } from "~/lib/hooks/useResize";

const EventSummaryModal = ({
  isOpen,
  onClose,
  eventSelected,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventSelected: MovementsIncludes | undefined;
}) => {
  const router = useRouter();
  const params = useParams();
  const bookId = String(params?.bookId);

  const { isMobile } = useResize();

  const module_name =
    eventSelected?.transferType === "transaction"
      ? "transactions"
      : "movements";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
            onPress={onClose}
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
  );
};

export default EventSummaryModal;

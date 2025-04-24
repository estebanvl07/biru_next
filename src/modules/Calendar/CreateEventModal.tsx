import React from "react";
import Modal from "../components/atoms/Modal.component";
import TransactionForm from "../Transactions/TransactionForm";
import CustomDrawer from "../components/molecules/CustomDrawer";
import { useResize } from "~/lib/hooks/useResize";
import { TransactionIncludes } from "~/types/transactions";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  date?: Date;
  onSuccess?: (data: TransactionIncludes) => void;
}

const CreateEventModal = ({
  isOpen,
  onClose,
  date,
  onSuccess,
}: CreateEventModalProps) => {
  const { isMobile } = useResize();

  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Evento"
      subtitle="Completa el formulario para crear el evento"
      size={isMobile ? "full" : "md"}
    >
      <TransactionForm
        type="transfer"
        mode="create"
        onSuccess={(data) => onSuccess?.(data as TransactionIncludes)}
        defScheduleDate={date}
        defSchedule
      />
    </CustomDrawer>
  );
};

export default CreateEventModal;

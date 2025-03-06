import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import { createDialogFormProps } from "~/types/root.types";
import TemplateForm from "./TemplateForm";

const CreateTemplate = ({ isOpen, onClose }: createDialogFormProps) => {
  return (
    <Dialog
      title="Crear Plantilla"
      subtitle="Las plantillas te ayudarán a agilizar el proceso de creacion de transacciones"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TemplateForm />
    </Dialog>
  );
};

export default CreateTemplate;

import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import TemplateForm from "./TemplateForm";
import { EditDialogFormProps } from "~/types/root.types";
import { TemplatesIncludes } from "~/types/templates/templates";

const EditTemplate = ({
  data,
  isOpen,
  onClose,
  onSuccess,
}: EditDialogFormProps<TemplatesIncludes>) => {
  return (
    <Dialog
      title="Editar Plantilla"
      subtitle="Las plantillas te ayudarán a agilizar el proceso de creacion de transacciones"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TemplateForm onSuccess={onSuccess} data={data} hasEdit />
    </Dialog>
  );
};

export default EditTemplate;

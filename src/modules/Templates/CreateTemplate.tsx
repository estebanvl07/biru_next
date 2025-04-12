import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import { createDialogFormProps } from "~/types/root.types";
import TemplateForm from "./TemplateForm";
import CustomDrawer from "../components/molecules/CustomDrawer";
import { useResize } from "~/lib/hooks/useResize";

const CreateTemplate = ({ isOpen, onClose }: createDialogFormProps) => {
  const { isMobile } = useResize();

  return (
    <CustomDrawer
      size={isMobile ? "full" : "md"}
      title="Crear Plantilla"
      subtitle="Las plantillas te ayudarán a agilizar el proceso de creacion de transacciones"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TemplateForm />
    </CustomDrawer>
  );
};

export default CreateTemplate;

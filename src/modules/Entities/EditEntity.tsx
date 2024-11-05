import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import EntityForm from "./EntityForm";
import { EntityIncludes } from "~/types/entities/entity.types";

interface EditEntityProps {
  entity: EntityIncludes;
  isOpen: boolean;
  onClose: () => void;
}

const EditEntity = ({ isOpen, onClose, entity }: EditEntityProps) => {
  return (
    <Dialog
      title="Editar Entidad"
      subtitle="Añade tus contactos para mantener un control mas detallado de tus finanzas"
      isOpen={isOpen}
      onClose={onClose}
    >
      <EntityForm hasEdit entityDefault={entity} />
    </Dialog>
  );
};

export default EditEntity;

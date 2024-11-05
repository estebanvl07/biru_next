import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import CreateCategoryForm from "./CreateCategoryForm";

import { createDialogFormProps } from "~/types/root.types";

const CreateCategory = (props: createDialogFormProps) => {
  return (
    <Dialog
      {...props}
      title="Crear Categoría"
      classNames={{
        content: "h-[80vh]",
      }}
      subtitle="Crea categorías para llevar un mejor orden en tus ingresos"
    >
      <CreateCategoryForm
        onSuccess={() => {
          props.onClose();
        }}
      />
    </Dialog>
  );
};

export default CreateCategory;

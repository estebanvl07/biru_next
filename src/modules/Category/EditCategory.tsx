import React from "react";
import { CategoryIncludes } from "~/types/category/category.types";

import { EditDialogFormProps } from "~/types/root.types";
import Dialog from "../components/molecules/Dialog.component";
import CreateCategoryForm from "./CreateCategoryForm";

const EditCategory = ({
  data,
  isOpen,
  onClose,
  onSuccess,
}: EditDialogFormProps<CategoryIncludes>) => {
  return (
    <Dialog
      classNames={{
        content: "h-[60vh]",
      }}
      isOpen={isOpen}
      onClose={onClose}
      title="Actualizar Categoría"
    >
      <CreateCategoryForm
        hasEdit
        categoryDefault={data}
        onSuccess={() => {
          onSuccess && onSuccess();
          onClose();
        }}
      />
    </Dialog>
  );
};

export default EditCategory;

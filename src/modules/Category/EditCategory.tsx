import React from "react";
import { CategoryIncludes } from "~/types/category/category.types";

import { EditDialogFormProps } from "~/types/root.types";
import Dialog from "../components/molecules/Dialog.component";
import CreateCategoryForm from "./CreateCategoryForm";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { useResize } from "~/lib/hooks/useResize";

const EditCategory = ({
  data,
  isOpen,
  onClose,
  onSuccess,
}: EditDialogFormProps<CategoryIncludes>) => {
  const { isMobile } = useResize();

  return (
    <Drawer
      placement={isMobile ? "bottom" : "right"}
      size={isMobile ? "full" : "md"}
      isOpen={isOpen}
      onClose={onClose}
      title="Actualizar Categoría"
    >
      <DrawerContent className="font-montserrat">
        <DrawerHeader>
          <h2>Actualizar Categoría</h2>
        </DrawerHeader>
        <DrawerBody>
          <CreateCategoryForm
            hasEdit
            categoryDefault={data}
            onSuccess={() => {
              onSuccess && onSuccess();
              onClose();
            }}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default EditCategory;

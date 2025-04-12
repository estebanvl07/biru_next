import React from "react";
import CreateCategoryForm from "./CreateCategoryForm";

import { createDialogFormProps } from "~/types/root.types";
import { useResize } from "~/lib/hooks/useResize";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";

const CreateCategory = (props: createDialogFormProps) => {
  const { isMobile } = useResize();

  return (
    <Drawer
      placement={isMobile ? "bottom" : "right"}
      size={isMobile ? "full" : "md"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Crear Categoría"
      className="backdrop-blur-xl dark:bg-default-200/80"
    >
      <DrawerContent className="font-montserrat">
        <DrawerHeader>
          <h2>Crear Categoría</h2>
        </DrawerHeader>
        <DrawerBody>
          <CreateCategoryForm
            onSuccess={() => {
              props.onClose();
            }}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCategory;

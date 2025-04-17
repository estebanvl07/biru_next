import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  type DrawerProps,
} from "@heroui/drawer";
import React from "react";

export interface OptionsDrawerProps extends Omit<DrawerProps, "children"> {
  children?: React.ReactNode;
  header?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const DrawerOptions = ({
  header,
  children,
  isOpen,
  onClose,
}: OptionsDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} size="sm" placement="bottom" onClose={onClose}>
      <DrawerContent className="h-full font-montserrat tracking-tight">
        <DrawerBody>
          <header className="mb-2 mt-4">{header}</header>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

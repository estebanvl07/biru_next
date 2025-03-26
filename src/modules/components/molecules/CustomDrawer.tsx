import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  type DrawerProps,
} from "@heroui/drawer";
import clsx from "clsx";
import React from "react";
import { DrawerDescription, DrawerTitle } from "../atoms/Drawer.component";

interface CustomDrawerProps extends DrawerProps {
  subtitle?: string;
  footerContent?: JSX.Element;
  content?: string;
}

const CustomDrawer = ({
  isOpen,
  onClose,
  children,
  subtitle,
  title,
  footerContent,
  classNames,
  ...props
}: CustomDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...props}>
      <DrawerContent
        className={clsx("px-2 pb-4 font-montserrat", classNames?.base)}
      >
        <DrawerHeader className="flex flex-col">
          {title && <h3 className="text-2xl">{title}</h3>}
          {subtitle && <p className="text-sm font-normal">{subtitle}</p>}
        </DrawerHeader>
        <DrawerBody>
          <div className="overflow-auto">{children}</div>
        </DrawerBody>
        {footerContent && <DrawerFooter>{footerContent}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

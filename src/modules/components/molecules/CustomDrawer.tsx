import clsx from "clsx";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/modules/components/atoms/Drawer.component";
import { DialogProps } from "~/types/component/dialog";

interface CustomDrawerProps extends DialogProps {
  footerContent?: JSX.Element;
}

const CustomDrawer = ({
  isOpen,
  onClose,
  children,
  subtitle,
  title,
  footerContent,
  classNames,
}: CustomDrawerProps) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent
        className={clsx("h-[70vh] px-2 pb-4", classNames?.content)}
      >
        <DrawerHeader>
          {title && <DrawerTitle className="text-2xl">{title}</DrawerTitle>}
          {subtitle && <DrawerDescription>{subtitle}</DrawerDescription>}
        </DrawerHeader>
        <div className="overflow-auto">{children}</div>
        {footerContent && <DrawerFooter>{footerContent}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

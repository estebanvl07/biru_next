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
import { useResize } from "~/lib/hooks/useResize";

interface CustomDrawerProps extends DrawerProps {
  subtitle?: string;
  footerContent?: JSX.Element;
  content?: string;
  customHeader?: JSX.Element;
}

const CustomDrawer = ({
  isOpen,
  onClose,
  children,
  subtitle,
  title,
  footerContent,
  customHeader,
  classNames,
  ...props
}: CustomDrawerProps) => {
  const { isMobile } = useResize();

  return (
    <Drawer
      placement={isMobile ? "bottom" : "right"}
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <DrawerContent
        className={clsx("px-2 pb-4 font-montserrat", classNames?.base)}
      >
        {customHeader ? (
          <DrawerHeader className="flex flex-col">{customHeader}</DrawerHeader>
        ) : (
          <DrawerHeader className="flex flex-col">
            {title && <h3 className="text-2xl tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm font-normal">{subtitle}</p>}
          </DrawerHeader>
        )}
        <DrawerBody>
          <div className="overflow-auto">{children}</div>
        </DrawerBody>
        {footerContent && <DrawerFooter>{footerContent}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

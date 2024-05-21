import React, { useState } from "react";
import type { AlertProps } from "~/modules/components/molecules/Alert.component";

export type AlertHookProps = Omit<AlertProps, "isOpen" | "onClose">;

export const useAlert = (pr: AlertHookProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState<AlertHookProps>(pr);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    props,
    setProps,
  };
};

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, ButtonProps } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import clsx from "clsx";
import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import { useOnActive } from "~/lib/hooks";

type TypeAlerts = "success" | "warning" | "error" | "info" | "quest";

interface ButtonActionProps extends ButtonProps {
  text?: string;
}

export interface AlertProps {
  cancel?: boolean;
  confirm?: boolean;
  isOpen: boolean;
  onClose: () => void;
  type?: TypeAlerts;
  body?: React.ReactNode;
  cancelProps?: ButtonActionProps;
  confirmProps?: ButtonActionProps;
}

export const Alert = ({
  cancel,
  type,
  isOpen = true,
  onClose,
  body,
  confirm = true,
  cancelProps,
  confirmProps,
}: AlertProps) => {
  const propsAlert = {
    success: {
      icon: "mdi:checkbox-marked-circle-outline",
      color: "green-400",
      title: "¡Éxito!",
      description: "Se ha completado esta acción con éxtio",
    },
    error: {
      icon: "material-symbols:dangerous-outline",
      color: "red-500",
      title: "¡Error!",
      description: "Hubo un error, vuelve a intentarlo",
    },
    warning: {
      icon: "mi:warning",
      color: "yellow-400",
      title: "¡Cuidado!",
      description: "Ésta acción puede tener consecuencias",
    },
    info: {
      icon: "solar:info-circle-broken",
      color: "slate-400",
      title: "¿Ayuda?",
      description: "Dirigete a nuestro centro de ayudas",
    },
    quest: {
      icon: "codicon:question",
      color: "slate-400",
      title: "Confirmar Acción",
      description: "Esta seguro de realizar esta acción",
    },
  }[type ?? "success"];

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      backdrop="opaque"
      hideCloseButton
      className="font-montserrat"
    >
      <ModalContent className="py-2">
        <ModalBody className="flex flex-col items-center justify-center gap-1 pb-6 pt-4">
          <Icon
            icon={propsAlert.icon}
            className={`text-${propsAlert.color}`}
            width={80}
          />
          {body ? (
            body
          ) : (
            <>
              <h2>{propsAlert.title}</h2>
              <p>{propsAlert.description}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter className="flex flex-row items-center justify-center pt-0">
          {confirm && (
            <Button
              onClick={(e) => {
                onClose();
                confirmProps?.onClick && confirmProps?.onClick(e);
              }}
              variant={confirmProps?.variant ?? "solid"}
              className={clsx(confirmProps?.className, {
                "border-1": confirmProps?.variant === "bordered",
              })}
              color={confirmProps?.color ?? "primary"}
              {...confirmProps}
            >
              {confirmProps?.text ?? "Aceptar"}
            </Button>
          )}
          {cancel && (
            <Button
              onClick={(e) => {
                onClose();
                cancelProps?.onClick && cancelProps?.onClick(e);
              }}
              variant={cancelProps?.variant ?? "bordered"}
              className={clsx(cancelProps?.className, {
                "!border-1":
                  cancelProps?.variant === "bordered" ||
                  !Boolean(cancelProps?.variant),
              })}
              color={cancelProps?.color ?? "primary"}
              {...cancelProps}
            >
              {cancelProps?.text ?? "Cancelar"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

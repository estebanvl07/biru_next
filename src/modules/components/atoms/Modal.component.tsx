import React from "react";
import {
  Modal as ModalLayout,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ModalProps {
  children: React.ReactNode;
  backdrop?: "opaque" | "blur" | "transparent";
  isOpen: boolean;
  footerContent?: React.ReactNode;
  title?: string;
  onClose: () => void;
}

const Modal = ({
  backdrop = "blur",
  children,
  footerContent,
  title,
  onClose,
  isOpen,
}: ModalProps) => {
  return (
    <ModalLayout backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-montserrat">
              {title ?? "Crear"}
            </ModalHeader>
            <ModalBody className="font-montserrat">{children}</ModalBody>
            {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

export default Modal;

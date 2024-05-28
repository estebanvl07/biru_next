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
  size?: string;
  onClose: () => void;
}

const Modal = ({
  backdrop = "blur",
  children,
  footerContent,
  title,
  onClose,
  size,
  isOpen,
}: ModalProps) => {
  return (
    <ModalLayout
      size={(size as any) ?? "md"}
      backdrop={backdrop}
      placement="center"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mb-0 flex flex-col gap-1 pb-0 font-montserrat">
              <h2>{title ?? "Crear"}</h2>
            </ModalHeader>
            <ModalBody className="font-montserrat">{children}</ModalBody>
            {footerContent && (
              <ModalFooter className="font-monserrat">
                {footerContent}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

export default Modal;

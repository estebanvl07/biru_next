import React from "react";
import {
  Modal as ModalLayout,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  type ModalProps,
} from "@heroui/react";

interface CustomModalProps extends ModalProps {
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  customHeader?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const Modal = ({
  backdrop = "blur",
  children,
  footerContent,
  title,
  onClose,
  customHeader,
  size,
  subtitle,
  isOpen,
  ...props
}: CustomModalProps) => {
  return (
    <ModalLayout
      size={(size as any) ?? "md"}
      backdrop={backdrop}
      placement="center"
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mb-0 flex flex-col gap-1 pb-0 font-montserrat">
              {customHeader ? (
                <>{customHeader}</>
              ) : (
                <>
                  {title && <h2>{title}</h2>}
                  {subtitle && <p>{subtitle}</p>}
                </>
              )}
            </ModalHeader>
            <ModalBody className="font-montserrat">{children}</ModalBody>
            {footerContent && (
              <ModalFooter className="font-montserrat">
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

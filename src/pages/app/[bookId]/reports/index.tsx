import {
  Button,
  Card,
  CardBody,
  CardHeader,
  form,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";

const ReportsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDownload = async () => {
    try {
      const response = await fetch("/api/reports/movements");
      if (!response.ok) throw new Error("Error al generar el PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace para descargar el PDF
      const link = document.createElement("a");
      link.href = url;
      link.download = "reporte.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Liberar memoria del objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando PDF:", error);
    }
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    onDownload();
    console.log("Descargando reporte");
  };

  return (
    <DashboardLayout
      title="Reportes"
      headDescription="Descarga reportes de tu información"
    >
      <h2>Descarga tus reportes</h2>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
      <section className="mt-4 flex flex-wrap items-center  gap-4">
        <div onClick={() => onOpen()}>
          <Card className="w-full max-w-[20rem] border border-divider px-4 py-2 shadow-sm">
            <CardBody>
              <div className="flex items-center gap-x-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon icon={"heroicons:wallet-solid"} width={24} />
                </div>
                <aside>
                  <h3>Movimientos Fijos</h3>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </aside>
              </div>
            </CardBody>
          </Card>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent className="font-montserrat">
            <ModalHeader className="flex-col">
              <h2>Filtros del reporte</h2>
              <p className="text-muted text-sm font-normal">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleDownload}>
                <div>
                  <Select placeholder="Selecciona un año">
                    <SelectItem className="font-montserrat" key="1">
                      Todo
                    </SelectItem>
                    <SelectItem className="font-montserrat" key="2">
                      2025
                    </SelectItem>
                    <SelectItem className="font-montserrat" key="3">
                      Personalizado
                    </SelectItem>
                  </Select>
                </div>
                <div className="mb-2 mt-4 flex items-center gap-4">
                  <Button type="submit" color="primary" fullWidth>
                    Descargar
                  </Button>
                  <Button
                    type="submit"
                    className="border border-divider"
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default ReportsPage;

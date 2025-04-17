import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { useResize } from "~/lib/hooks/useResize";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import TableTemplates from "~/modules/Templates/TableTemplates";
import TemplateList from "~/modules/Templates/TemplateList";

const Templates = () => {
  const { isMobile } = useResize();
  const params = useParams();

  return (
    <DashboardLayout
      title="Plantillas de Transacciones"
      activityContent={
        <Button
          as={Link}
          color="primary"
          href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/templates/new`}
          startContent={<PlusIcon />}
        >
          Crear Plantilla
        </Button>
      }
    >
      {isMobile ? <TemplateList /> : <TableTemplates />}
    </DashboardLayout>
  );
};

export default Templates;

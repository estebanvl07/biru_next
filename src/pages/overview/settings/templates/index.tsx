import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import { useResize } from "~/lib/hooks/useResize";
import DataList from "~/modules/components/molecules/DataList/DataList";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import SettingsLayout from "~/modules/Layouts/SettingsLayout";
import TableTemplates from "~/modules/Templates/TableTemplates";
import TemplateList from "~/modules/Templates/TemplateList";

const TemplatesPage = () => {
  const { isMobile } = useResize();

  return (
    <SettingsLayout>
      <Card shadow="none" className="border border-divider ">
        <CardHeader className="flex items-center justify-between px-6 pt-4">
          <aside>
            <h2>Plantillas</h2>
            <p>
              Crea plantillas personalizadas para ahorrar tiempo al crear una
              transacción.
            </p>
          </aside>
        </CardHeader>
        <CardBody className="p-6">
          {isMobile ? <TemplateList /> : <TableTemplates />}
        </CardBody>
      </Card>
    </SettingsLayout>
  );
};

export default TemplatesPage;

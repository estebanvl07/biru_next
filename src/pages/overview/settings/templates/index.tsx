import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import SettingsLayout from "~/modules/Layouts/SettingsLayout";
import TableTemplates from "~/modules/Templates/TableTemplates";

const TemplatesPage = () => {
  return (
    <SettingsLayout>
      <Card shadow="none" className="border border-divider ">
        <CardHeader className="flex items-center justify-between px-6 pt-4">
          <aside>
            <h2>Plantillas</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </aside>
        </CardHeader>
        <CardBody className="p-6">
          <TableTemplates />
        </CardBody>
      </Card>
    </SettingsLayout>
  );
};

export default TemplatesPage;

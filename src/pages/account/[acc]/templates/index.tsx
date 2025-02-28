import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import TableTemplates from "~/modules/Templates/TableTemplates";

const TemplatesPage = () => {
  return (
    <DashboardLayout
      title="Plantillas"
      headDescription="Configuracion de plantillas para transacciones"
    >
      <TableTemplates />
    </DashboardLayout>
  );
};

export default TemplatesPage;

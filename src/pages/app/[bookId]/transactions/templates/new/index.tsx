import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import TemplateForm from "~/modules/Templates/TemplateForm";

const NewTransactionTemplate = () => {
  return (
    <DashboardLayout title="Crear Plantilla">
      <TemplateForm />
    </DashboardLayout>
  );
};

export default NewTransactionTemplate;

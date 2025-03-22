import { Tab, Tabs } from "@heroui/tabs";
import React from "react";
import Summary from "~/modules/Budget/Summary";
import UpcomingTable from "~/modules/Budget/UpcomingTable";
import DashboardLayout from "~/modules/Layouts/Dashboard";

const BudgetPage = () => {
  return (
    <DashboardLayout
      title="Presupuesto"
      headDescription="Presupuesto del usuario"
      serviceOptions
    >
      <Tabs>
        <Tab key="resume" title="Resumen">
          <Summary />
        </Tab>
        <Tab key="expenses" title="Gastos Planificados">
          <UpcomingTable />
        </Tab>
        <Tab key="Análisis" title="Gastos Planificados">
          Gastos
        </Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default BudgetPage;

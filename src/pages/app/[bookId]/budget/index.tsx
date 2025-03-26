import { Tab, Tabs } from "@heroui/tabs";
import { useParams } from "next/navigation";
import React from "react";
import Summary from "~/modules/Budget/Summary";
import UpcomingTable from "~/modules/Budget/UpcomingTable";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { api } from "~/utils/api";

const BudgetPage = () => {
  const params = useParams<{ bookId: string }>();
  const { data } = api.budget.getCurrentBudget.useQuery(params?.bookId);

  console.log(data);

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

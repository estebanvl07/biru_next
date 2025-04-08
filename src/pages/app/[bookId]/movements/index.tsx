import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import MovementsTable from "~/modules/Movements/views/Table/MovementsTable";

const Movements = () => {
  return (
    <DashboardLayout title="Movimientos">
      <MovementsTable />
    </DashboardLayout>
  );
};

export default Movements;

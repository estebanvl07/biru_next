import React, { useEffect, useState } from "react";
import { useResize } from "~/lib/hooks/useResize";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import MovementsTable from "~/modules/Movements/views/Table/MovementsTable";

const Movements = () => {
  return (
    <DashboardLayout title="Movimientos Fijos">
      <MovementsTable />
    </DashboardLayout>
  );
};

export default Movements;

import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import MovementsTable from "~/modules/Movements/views/Table/MovementsTable";

const Movements = () => {
  const params = useParams();

  return (
    <DashboardLayout
      activityContent={
        <Button
          as={Link}
          color="primary"
          href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/new`}
          startContent={<PlusIcon />}
        >
          Crear Movimiento
        </Button>
      }
      title="Movimientos Recurrentes"
    >
      <MovementsTable />
    </DashboardLayout>
  );
};

export default Movements;

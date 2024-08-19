import { Input } from "@nextui-org/react";
import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import CreateMovementsForm from "~/modules/Movements/CreateMovementsForm";

const NewMovement = () => {
  return (
    <DashboardLayout
      title="Crear Movimiento Fijo"
      headDescription="Crea un movimiento dijo que te recordará una transaccion que hagas todos los meses"
    >
      <CreateMovementsForm />
    </DashboardLayout>
  );
};

export default NewMovement;

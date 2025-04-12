import { Spinner } from "@heroui/spinner";
import { useParams } from "next/navigation";
import React from "react";
import { useExpensesCurrentMonth } from "~/modules/Budget/hooks/useBudget";
import NotFound from "~/modules/components/404";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import CreateOcurrenceForm from "~/modules/Movements/CreateOcurrenceForm";

const MakeTransactionSchedule = () => {
  const params = useParams();
  const { expenses, isLoading } = useExpensesCurrentMonth();

  const currentMovement = expenses?.find((ex) => ex.id === Number(params.id));

  if (!currentMovement) {
    return (
      <DashboardLayout
        title="Detalle de transacción"
        headDescription="detalle de transacción"
      >
        <NotFound />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Realizar Transacción"
      headDescription="Realizar una transacción"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!currentMovement ? (
            <NotFound />
          ) : (
            <CreateOcurrenceForm movement={currentMovement} />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default MakeTransactionSchedule;

import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import BudgetProgress from "~/modules/Budget/BudgetProgress";
import BudgetSummary from "~/modules/Budget/BudgetSummary";
import UpcomingPayments from "~/modules/Budget/UpcomingPayments";

const Summary = () => {
  return (
    <div className="space-y-4">
      <BudgetSummary />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="border border-divider p-3 shadow-sm lg:col-span-4">
          <CardHeader className="flex flex-col items-start">
            <h3 className="font-semibold">Progreso del Presupuesto</h3>
            <p>Seguimiento de gastos por categoría</p>
          </CardHeader>
          <CardBody>
            <BudgetProgress />{" "}
          </CardBody>
        </Card>
        <Card className="border border-divider p-3 shadow-sm lg:col-span-3">
          <CardHeader className="flex flex-col items-start">
            <h3 className="font-semibold">Movimientos Próximos</h3>
            <p>Gastos planificados para los próximos 7 días</p>
          </CardHeader>
          <CardBody>
            <UpcomingPayments />
          </CardBody>
          <CardFooter>
            <Button variant="bordered" className="w-full">
              Ver Todos los Gastos Planificados
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Summary;

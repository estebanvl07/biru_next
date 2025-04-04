import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentMonthBudget } from "./hooks/useBudget";

const BudgetSummary = () => {
  const { budget: data } = useCurrentMonthBudget();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        aria-label="Tarjeta de presupuesto total"
        className="border border-divider px-3 py-4 shadow-sm"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Presupuesto Total</h3>
          <Icon
            icon="prime:dollar"
            className="text-muted-foreground"
            width={18}
          />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">
            ${data?.budgetTotal.toLocaleString()}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-xs">Para este mes</span>
          </div>
        </CardBody>
      </Card>
      <Card
        aria-label="Tarjeta de gastos actuales"
        className="border border-divider px-3 py-4 shadow-sm"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Gastos Actuales</h3>
          <Icon
            icon="mynaui:arrow-down"
            className="text-danger-600"
            width={18}
          />
          {/* <DollarSignIcon className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">
            ${data?.currentExpenses.toLocaleString()}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-xs">
              32.8% del presupuesto
            </span>
          </div>
        </CardBody>
      </Card>
      <Card
        aria-label="Tarjeta de gastos planificados del mes"
        className="border border-divider px-3 py-4 shadow-sm"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Gastos Planificados</h3>
          <Icon icon="mynaui:calendar" width={18} />
          {/* <DollarSignIcon className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">
            ${data?.plannedExpenses.toLocaleString()}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-xs">
              54% del presupuesto
            </span>
          </div>
        </CardBody>
      </Card>
      <Card
        aria-label="Tarjeta de balance proyectado para fin de mes"
        className="border border-divider px-3 py-4 shadow-sm"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Balance Proyectado</h3>
          <Icon
            icon="mynaui:arrow-up"
            className="text-success-600"
            width={18}
          />
          {/* <DollarSignIcon className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">
            ${data?.proyectedBalanceSheet.toLocaleString()}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-xs">13% de ahorro</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BudgetSummary;

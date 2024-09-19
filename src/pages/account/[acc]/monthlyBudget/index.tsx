import DashboardLayout from "~/modules/Layouts/Dashboard";
import { IncomeProjections } from "~/modules/MonthlyBudget";
import BalanceProjections from "~/modules/MonthlyBudget/BalanceProjections";
import EgressProjections from "~/modules/MonthlyBudget/EgressProjections";
import IncomeTable from "~/modules/MonthlyBudget/IncomeTable";

const MonthlyBudget = () => {
  return (
    <DashboardLayout
      title="Presupuesto del Mes"
      headDescription="Mira el presupuesto estimado de tus ingresos y egresos para identificar tus proximos pasos financieros, y asi  poder tomar decisiones informadas."
    >
      <div className="flex flex-col gap-4">
        <BalanceProjections />
        <div className="flex gap-4">
          <IncomeProjections />
          <EgressProjections />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <IncomeTable />
          </div>
          <div className="w-full">
            <IncomeTable />
          </div>
        </div>
      </div>

      <ul>
        <li>Tarjeta de Ingresos</li>
        <li>Tarjeta de Egresos</li>
        <li>Movimientos previstos</li>
        <li>Valoracion de gastos (editable)</li>
        <li>Valoracion de ingresos (editable)</li>
        <li>Porcentaje ingresos y gastos de categorias</li>
        <li>Lista de deseos</li>
      </ul>
    </DashboardLayout>
  );
};

export default MonthlyBudget;

import {
  BalanceAccount,
  LastTransactions,
  AnnualBalance,
  CategoriesPercent,
  Balance,
} from "~/modules/Common";
import { PieChartAmountByCategoires } from "~/modules/Charts";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { useResize } from "~/lib/hooks/useResize";
import MobileFilter from "~/modules/Layouts/templates/dashbaord/Header/MobileFilter";
import { api } from "~/utils/api";
import { getPercent } from "~/lib/helpers";

const AnalyticsPage = () => {
  const { isMobile } = useResize();
  const { data: balance, isLoading } = api.userAccount.getBalance.useQuery();

  return (
    <DashboardLayout title="Análisis y estadisticas" hasFilter>
      {isMobile && (
        <div className="flex items-center gap-2 px-content">
          <p>Filtrar por:</p> <MobileFilter />
        </div>
      )}
      <div className="mt-2 grid grid-cols-12 gap-2 px-content md:px-0">
        <article className="col-span-12 lg:col-span-7">
          <BalanceAccount />
        </article>
        <article className="col-span-12 flex flex-col gap-2 lg:col-span-5">
          <Balance
            title="Total de Ingresos"
            amount={balance?.incomes || 0}
            isLoading={isLoading}
            color="bg-green-500/30 text-green-600"
            percent={getPercent(
              balance?.incomes || 0,
              balance?.transactonTotal || 0,
            )}
            titlePercent="De Ingresos"
          />
          <Balance
            title="Total de Engresos"
            amount={balance?.egress || 0}
            color="bg-red-500/30 text-red-600"
            percent={getPercent(
              balance?.egress || 0,
              balance?.transactonTotal || 0,
            )}
            titlePercent="De Egresos"
          />
        </article>
        <article className="col-span-12 xl:col-span-7">
          <AnnualBalance />
        </article>
        <article className="col-span-12 xl:col-span-5">
          <PieChartAmountByCategoires />
        </article>
        <article className="col-span-12 lg:col-span-6">
          <LastTransactions transactionsMaxLength={5} />
        </article>
        <article className="col-span-12 lg:col-span-6">
          <CategoriesPercent />
        </article>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;

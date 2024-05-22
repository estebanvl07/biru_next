import {
  DetailAmounts,
  CardBalanceAccount,
  LastTransactions,
  AnnualBalance,
  CategoriesPercent,
} from "~/modules/common";
import { PieChartAmountByCategoires } from "~/modules/charts";
import DashboardLayout from "~/modules/layouts/Dashboard";

const AnalyticsPage = () => {
  return (
    <DashboardLayout title="Análisis y estadisticas">
      <div className="grid grid-cols-12 gap-2">
        <article className="col-span-7">
          <CardBalanceAccount />
        </article>
        <article className="col-span-5">
          <DetailAmounts />
        </article>
        <article className="col-span-7">
          <AnnualBalance />
        </article>
        <article className="col-span-5">
          <PieChartAmountByCategoires />
        </article>
        <article className="col-span-6">
          <LastTransactions />
        </article>
        <article className="col-span-6">
          <CategoriesPercent />
        </article>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;

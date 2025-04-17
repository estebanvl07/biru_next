import SummaryCard from "~/modules/Common/Balance/Balance";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import CategoryRanking from "~/modules/Transactions/components/graphics/CategoryRanking";
import MonthlyByDay from "~/modules/Transactions/components/graphics/MonthlyByDay";
import WeekMovements from "~/modules/Transactions/components/graphics/WeekMovements";

const TransactionAnalytics = () => {
  return (
    <DashboardLayout title="Análisis de Transacciones">
      <div className="grid-col-4 grid gap-4">
        <section className="col-span-1">
          <SummaryCard
            amount={4500000}
            // percent="10% de Ingresos"
            color="success"
            icon="ph:arrow-up"
            title="Ingresos Acomulados"
          />
        </section>
        <section className="col-span-1">
          <SummaryCard amount={8740000} title="Egresos Acomulados" />
        </section>
        <section className="col-span-1">
          <SummaryCard amount={4500000} title="Ingresos Acomulados" />
        </section>
        <section className="col-span-1">
          <SummaryCard amount={8740000} title="Egresos Acomulados" />
        </section>
        <section className="col-span-2">
          <WeekMovements />
        </section>
        <section className="col-span-2">
          <CategoryRanking />
        </section>
        <section className="col-span-4">
          <MonthlyByDay />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default TransactionAnalytics;

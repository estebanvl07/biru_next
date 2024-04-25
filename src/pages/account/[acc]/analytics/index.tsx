"use client";
import {
  DetailAmounts,
  CardBalanceAccount,
  LastTransactions,
  AnnualBalance,
  CategoriesPercent,
} from "~/modules/common";
import { PieChartAmountByCategoires } from "~/modules/charts";

// import AccountCard from "~/views/Accounts/components/accoundCard";

import DashboardLayout from "~/modules/layouts/Dashboard";

import styles from "~/styles/analytics.module.css";
import clsx from "clsx";

const AnalyticsPage = () => {
  return (
    <DashboardLayout title="Análisis y estadisticas">
      <div className="mx-auto mt-4   h-full w-full max-w-[90rem]">
        <div
          className={clsx(
            "bento-container gap-2 md:gap-4",
            styles["bento-container"],
          )}
        >
          <div className="col-span-8 row-span-4 lg:row-span-2 xl:col-span-5 2xl:order-1">
            <DetailAmounts
              className="grid grid-cols-12 !gap-1 md:!gap-4"
              cardClassName="col-span-12 lg:col-span-6 h-full"
            />
          </div>

          {/* Categorias */}
          <div className="order-4 col-span-8 row-span-4 xl:order-3 xl:col-span-5 2xl:order-2 2xl:col-span-3">
            <PieChartAmountByCategoires />
          </div>

          {/* Balance anual */}
          <div className="order-2 col-span-8 row-span-4 xl:order-5 xl:col-span-4 2xl:order-3 2xl:col-span-5">
            <AnnualBalance />
          </div>

          {/* Porcentaje de categorías */}
          <div className="order-5 col-span-8 row-span-3 lg:col-span-4 xl:order-4 xl:col-span-3 2xl:order-4">
            <CategoriesPercent />
          </div>

          {/* Transacciones */}
          <div className="order-3 col-span-8 row-span-4 xl:order-6 xl:col-span-4 2xl:order-5 2xl:col-span-5">
            <CardBalanceAccount />
          </div>

          {/* Lista de Transacciones */}
          <div className="order-6 col-span-8 row-span-3 lg:col-span-4 xl:order-2 xl:col-span-3 2xl:order-6">
            <LastTransactions />
          </div>

          {/* <div className="col-span-2 row-span-4">
            <Card className="flex-col h-full">
              <h3>Ahorros</h3>
              <ul className="mt-4 flex flex-col gap-3 mb-2">
                <li>
                  <header className="flex justify-between items-end">
                    <span className="font-semibold text-sm">Estudios</span>
                    <span className="text-sm">$ 350.000</span>
                  </header>
                  <div className="w-full z-0 relative bg-slate-200 rounded-full h-4">
                    <div className="w-3/6 z-10 h-4 bg-primary rounded-full"></div>
                  </div>
                </li>
                <li>
                  <header className="flex justify-between items-end">
                    <span className="font-semibold text-sm">Moto</span>
                    <span className="text-sm">$ 350.000</span>
                  </header>
                  <div className="w-full z-0 relative bg-slate-200 rounded-full h-4">
                    <div className="w-5/6 z-10 h-4 bg-primary rounded-full"></div>
                  </div>
                </li>
                <li>
                  <header className="flex justify-between items-end">
                    <span className="font-semibold text-sm">Carro</span>
                    <span className="text-sm">$ 350.000</span>
                  </header>
                  <div className="w-full z-0 relative bg-slate-200 rounded-full h-4">
                    <div className="w-6/6 z-10 h-4 bg-primary rounded-full"></div>
                  </div>
                </li>
                <li>
                  <header className="flex justify-between items-end">
                    <span className="font-semibold text-sm">Apartamento</span>
                    <span className="text-sm">$ 350.000</span>
                  </header>
                  <div className="w-full z-0 relative bg-slate-200 rounded-full h-4">
                    <div className="w-5/12 z-10 h-4 bg-primary rounded-full"></div>
                  </div>
                </li>
                <li>
                  <header className="flex justify-between items-end">
                    <span className="font-semibold text-sm">Estudios</span>
                    <span className="text-sm">$ 350.000</span>
                  </header>
                  <div className="w-full z-0 relative bg-slate-200 rounded-full h-4">
                    <div className="w-2/6 z-10 h-4 bg-primary rounded-full"></div>
                  </div>
                </li>
              </ul>
            </Card>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;

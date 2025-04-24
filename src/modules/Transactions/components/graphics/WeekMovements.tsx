import { Card, CardBody, CardHeader, Tab, Tabs } from "@heroui/react";
import React, { Key, useMemo, useState } from "react";
import { getCurrentBookId, getCurrentUserId } from "~/lib/config/app_variables";
import { BarChart } from "~/modules/Charts";
import { api } from "~/utils/api";

const WeekMovements = () => {
  const [filter, setFilter] = useState(1);
  const { data, isLoading, refetch } =
    api.transactionAnalytics.weekMovements.useQuery({
      userId: getCurrentUserId() as string,
      bookId: getCurrentBookId() as string,
      week: filter,
    });

  const keys = data?.incomeStatistics.map(({ day }) => day);

  const series = useMemo(
    () => [
      {
        data: data?.incomeStatistics.map(({ amount }) => amount) || [],
        name: "Ingersos",
        color: "#16a34a",
      },
      {
        data: data?.expenseStatistics.map(({ amount }) => amount) || [],
        name: "Egresos",
        color: "#dc2626",
      },
    ],
    [data],
  );

  const onChange = (key: Key) => {
    setFilter(Number(key));
  };

  return (
    <Card className="h-full border border-divider px-4 py-2 shadow-sm">
      <CardHeader className="flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <aside>
          <h2>Gastos de la Semana</h2>
          <p>Conoce el resumen de tus gastos de la semana</p>
        </aside>
        <Tabs onSelectionChange={onChange}>
          <Tab key={"1"} title="Esta semana" />
          <Tab key={"2"} title="Semana Pasada" />
        </Tabs>
      </CardHeader>
      <CardBody>
        <BarChart
          hasformatNumber
          heightChart="270"
          keys={keys || undefined}
          series={series}
        />
      </CardBody>
    </Card>
  );
};

export default WeekMovements;

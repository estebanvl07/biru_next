import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import { getCurrentBookId, getCurrentUserId } from "~/lib/config/app_variables";
import HeatMap from "~/modules/Charts/HeatMap";
import { api } from "~/utils/api";

const MonthlyByDay = () => {
  const { data: transactions } = api.transactionAnalytics.monthlyByDay.useQuery(
    {
      userId: getCurrentUserId() as string,
      bookId: getCurrentBookId() as string,
    },
  );

  const keys = transactions?.map(({ day }) => day);

  const series = [
    {
      name: "Egresos",
      color: "#dc2626",
      data: transactions?.map(({ transactions }) => transactions.length) ?? [],
    },
  ];

  return (
    <Card className="border border-divider px-4 py-2 shadow-sm">
      <CardHeader className="justify-between">
        <aside>
          <h2>Gastos por Dia</h2>
          <p>Conoce los días con más egresos realizados.</p>
        </aside>
      </CardHeader>
      <CardBody className="">
        <HeatMap
          heightChart="200"
          showYAxis={false}
          keys={keys}
          series={series}
        />
      </CardBody>
    </Card>
  );
};

export default MonthlyByDay;

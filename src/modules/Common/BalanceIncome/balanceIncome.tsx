import React, { useEffect, useState } from "react";

import { useFilterContext } from "~/lib/context/Filter.context";
import { useFilterByType } from "~/modules/Transactions/hook";
import { useParams } from "next/navigation";

import type { Series } from "~/types/chart.types";

import CardDetailAmount from "../DetailAmounts/CardDetailAmount";

const BalanceIncome = ({ className }: { className?: string }) => {
  const [series, setSeries] = useState<Series[]>();
  const { filter, rangeDate } = useFilterContext();
  const params = useParams();

  const { amounts, totalAmounts, percents, noData, isLoading } =
    useFilterByType({
      type: 1,
      options: {
        filter,
        startDate: rangeDate?.startDate,
        endDate: rangeDate?.endDate,
      },
    });

  useEffect(() => {
    if (!amounts) return;

    console.log(amounts);

    setSeries([
      {
        color: "#22c55e",
        name: "Ingresos",
        data:
          amounts.length === 0
            ? [0, 0]
            : amounts.length
              ? [0, ...amounts]
              : [...amounts],
      },
    ]);
  }, [amounts]);

  return (
    <CardDetailAmount
      title="Ingreso"
      amount={totalAmounts?.income ?? 0}
      color="text-green-500 bg-green-500/20"
      icon="iconamoon:arrow-bottom-left-1"
      series={series ?? []}
      percent={percents?.income ?? "0%"}
      noData={noData}
      isLoading={isLoading}
      cardClassName={className}
      redirectHref={`/account/${params?.acc}/transactions/new?type=1`}
    />
  );
};

export default BalanceIncome;

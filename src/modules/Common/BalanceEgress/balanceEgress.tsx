import { useEffect, useState } from "react";

import { useFilterContext } from "~/lib/context/Filter.context";
import { useParams } from "next/navigation";
import { useFilterByType } from "~/modules/Transactions/hook";

import CardDetailAmount from "../DetailAmounts/CardDetailAmount";

import type { Series } from "~/types/chart.types";

const BalanceEgress = ({ className }: { className?: string }) => {
  const params = useParams();
  const [series, setSeries] = useState<Series[]>();
  const { filter, rangeDate } = useFilterContext();

  const { amounts, totalAmounts, percents, noData, isLoading } =
    useFilterByType({
      type: 2,
      options: {
        filter,
        startDate: rangeDate?.startDate,
        endDate: rangeDate?.endDate,
      },
    });

  useEffect(() => {
    if (!amounts) return;
    setSeries([
      {
        color: "#dc2626",
        name: "Ingresos",
        data: amounts.length === 0 ? [0,0] : amounts.length ? [0, ...amounts] : [...amounts],
      },
    ]);
  }, [amounts]);

  return (
    <CardDetailAmount
      title="Egreso"
      amount={totalAmounts?.egress ?? 0}
      icon="iconamoon:arrow-top-right-1"
      color="text-red-500 bg-red-500/20"
      series={series ?? []}
      noData={noData}
      isLoading={isLoading}
      cardClassName={className}
      percent={percents?.egress ?? "0%"}
      redirectHref={`/account/${params?.acc}/transactions/new?type=1`}
    />
  );
};

export default BalanceEgress;

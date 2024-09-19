import React from "react";
import { useBalanceProjection } from "./hooks/projectionFlows";
import { LineChart } from "../Charts";
import { useResize } from "~/lib/hooks/useResize";
import { Card, Empty } from "../components";
import { useParams } from "next/navigation";
import { parseAmount } from "~/lib/helpers";
import { useCurrentAccount } from "../Account/hooks";

const BalanceProjections = () => {
  const { isMobile } = useResize();
  const params = useParams();
  const { account } = useCurrentAccount();
  const { series, balanceTotal } = useBalanceProjection();

  return (
    <div>
      <Card className="gap-4">
        <aside className="w-fit">
          <h3 className="text-nowrap">Proyección de cuenta</h3>
          <p>Desde </p>
          <div className="flex items-center gap-2">
            <h2>{parseAmount(account?.balance || 0)}</h2>
            <span className="text-lg font-semibold">{"-->"}</span>
            <h2>{parseAmount(balanceTotal)}</h2>
          </div>
        </aside>
        <div className="w-full flex-grow">
          {series && series[0]!?.data.length > 0 ? (
            <LineChart
              series={series}
              heightChart="100%"
              widthChart="100%"
              showXAxis={false}
              showYAxis={!isMobile}
            />
          ) : (
            <Empty
              className="py-6"
              href={`/account/${params?.acc}/transactions/new`}
              buttonText="Crear Transacción"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default BalanceProjections;

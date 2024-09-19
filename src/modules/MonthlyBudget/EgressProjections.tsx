import React from "react";
import { CardDetailAmount } from "../Common";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { useFlowProjection } from "./hooks/projectionFlows";

// tomar metas activas que esten marcadas como
// ingresos y va a tomar los movimientos fijos que esten marcados como ingreso,
// calculará en base al actual balance y mostrara la proyección hasta el fin de mes

const EgressProjections = () => {
  const params = useParams();
  const { balanceTotal, series } = useFlowProjection("egress");

  return (
    <>
      <CardDetailAmount
        title="Proyección de Egresos"
        amount={balanceTotal || 0}
        color="text-green-500 bg-green-500/20"
        icon="iconamoon:arrow-bottom-left-1"
        series={series || []}
        percent={"0%"}
        noData={true}
        isLoading={false}
        cardClassName={""}
        chartProps={{
          showToolTip: true,
          showLegend: true,
          showGrid: true,
          showYAxis: true,
          hasZoom: true,
        }}
        redirectHref={`/account/${params?.acc}/transactions/new?type=1`}
      />
    </>
  );
};

export default EgressProjections;

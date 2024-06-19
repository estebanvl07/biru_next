import clsx from "clsx";

import { Card, Empty } from "~/modules/components";
import { LineChart } from "~/modules/Charts";

import { useResize } from "~/lib/hooks/useResize";
import { Series } from "~/types/chart.types";
import { Spinner, Tooltip } from "@nextui-org/react";
import { parseAmount } from "~/lib/helpers";
import { FILTERS } from "~/types/transactions";
import React from "react";

type Props = {
  cardClassName?: string;
  amount: number;
  series?: Series[];
  percent?: string;
  icon: string;
  redirectHref?: string;
  title: string;
  isLoading?: boolean;
  iconClassName?: string;
  color?: string;
  noData?: boolean;
  badgeColor?: string;
};

const CardDetailAmount = React.memo(({
  title,
  amount,
  color,
  percent,
  isLoading,
  series,
  noData,
  cardClassName,
}: Props) => {
  const { isMobile } = useResize();
  return (
    <Card
      className={clsx(
        "flex flex-grow overflow-hidden !h-full flex-row",
        cardClassName,
      )}
    >
      <header className="relative flex flex-col">
        <h4 className="font-medium md:mb-4">{title}</h4>
        <aside>
          <Tooltip
            content={`$ ${amount.toLocaleString()}`}
            className="font-montserrat font-medium"
          >
            <span className="text-nowrap text-2xl font-semibold">
              $ {parseAmount(amount)}
            </span>
          </Tooltip>
          {percent && (
            <p className="text-nowrap !text-xs md:mt-2">
              <span className={clsx("font-semibold", color)}>{percent}</span> De{" "}
              {title}
            </p>
          )}
        </aside>
      </header>
      {
        isLoading ? <div className="w-full grid place-content-center h-full"><Spinner /></div> :
          <>
            {noData && series && !isLoading ? (
              <main className="relative flex-grow">
                <section className="absolute -bottom-4 -right-3">
                  <LineChart
                    series={series}
                    heightChart={isMobile ? "80%" : "100%"}
                    hasZoom={false}
                    showLegend={false}
                    showToolBar={false}
                    showGrid={false}
                    showToolTip={false}
                    bottomBorder={false}
                    showYAxis={false}
                    offsetX={0}
                    offsetY={0}
                    showXAxis={false}
                    hasformatNumber={false}
                  />
                </section>
              </main>
            ) : (
              <div className="w-full py-4 ">
                <Empty
                  icon="tabler:chart-area"
                  description={`Sin ${title}`}
                  iconWidth={32}
                />
              </div>
            )}
          </>
      }

    </Card>
  );
});

export default CardDetailAmount;

import React from "react";
import clsx from "clsx";

import { Card, Empty } from "~/modules/components";
import { LineChart } from "~/modules/Charts";

import { useResize } from "~/lib/hooks/useResize";
import { Series } from "~/types/chart.types";
import { Spinner, Tooltip, Chip } from "@nextui-org/react";
import { parseAmount } from "~/lib/helpers";

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

const CardDetailAmount = React.memo(
  ({
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
          "flex !h-full flex-grow flex-row overflow-hidden",
          cardClassName,
        )}
      >
        <header className="relative flex flex-col justify-between">
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
                <Chip size="sm" variant="flat" className={color}>
                  {percent}
                </Chip>{" "}
                De {title}
              </p>
            )}
          </aside>
        </header>
        {isLoading ? (
          <div className="grid h-full w-full place-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            {noData && series && !isLoading ? (
              <main className="relative flex-grow">
                <section className=" -bottom-4 -right-3">
                  <LineChart
                    series={series}
                    widthChart="100%"
                    heightChart={isMobile ? "80%" : "100px"}
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
        )}
      </Card>
    );
  },
);

export default CardDetailAmount;

import React from "react";
import clsx from "clsx";

import { Card, Empty } from "~/modules/components";
import { LineChart } from "~/modules/Charts";

import { useResize } from "~/lib/hooks/useResize";
import { ChartProps, Series } from "~/types/chart.types";
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
  chartProps?: Omit<ChartProps, "series">;
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
    chartProps,
  }: Props) => {
    const { isMobile } = useResize();

    const initialChartProps = {
      series,
      widthChart: "100%",
      heightChart: isMobile ? "80%" : "100px",
      hasZoom: chartProps?.hasZoom || false,
      showLegend: chartProps?.showLegend || false,
      showToolBar: chartProps?.showToolBar || false,
      showGrid: chartProps?.showGrid || false,
      showToolTip: chartProps?.showToolTip || false,
      bottomBorder: chartProps?.bottomBorder || false,
      showYAxis: chartProps?.showYAxis || false,
      offsetX: chartProps?.offsetX || 0,
      offsetY: chartProps?.offsetY || 0,
      showXAxis: chartProps?.showXAxis || false,
      hasformatNumber: chartProps?.hasformatNumber || false,
    };

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
                  <LineChart {...initialChartProps} />
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

import React from "react";
import clsx from "clsx";

import { Card, Empty } from "~/modules/components";
import { LineChart } from "~/modules/Charts";

import { useResize } from "~/lib/hooks/useResize";
import { Series } from "~/types/chart.types";
import { Spinner, Tooltip, Chip, Skeleton } from "@heroui/react";
import { parseAmount } from "~/lib/helpers";

type Props = {
  cardClassName?: string;
  amount: number;
  series?: Series[];
  percent?: string;
  redirectHref?: string;
  title: string;
  isLoading?: boolean;
  iconClassName?: string;
  color?: string;
  badgeColor?: string;
  titlePercent?: string;
};

const CardDetailAmount = React.memo(
  ({
    title,
    amount,
    color,
    percent,
    isLoading,
    cardClassName,
    titlePercent,
  }: Props) => {
    return (
      <Card
        className={clsx(
          "flex h-full flex-grow flex-col overflow-hidden",
          cardClassName,
        )}
      >
        <h4 className="md:mb-4">{title}</h4>
        {isLoading ? (
          <div>
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div className="flex h-full flex-col justify-end">
            <span className="text-nowrap text-3xl font-medium">
              $ {amount.toLocaleString()}
            </span>
            {percent && (
              <p className="text-nowrap !text-xs">
                <Chip size="sm" variant="flat" className={color}>
                  {percent}
                </Chip>{" "}
                {titlePercent}
              </p>
            )}
          </div>
        )}
      </Card>
    );
  },
);

export default CardDetailAmount;

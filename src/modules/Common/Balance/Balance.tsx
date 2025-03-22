import React from "react";

import { Series } from "~/types/chart.types";
import { Card, CardBody, CardHeader, Chip, Skeleton } from "@heroui/react";
import { String } from "lodash";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  cardClassName?: string;
  amount: number;
  series?: Series[];
  percent?: string;
  redirectHref?: string;
  title: string;
  isLoading?: boolean;
  iconClassName?: string;
  icon?: String;
  color?: string;
  badgeColor?: string;
  titlePercent?: string;
};

const SummaryCard = React.memo(
  ({
    title,
    amount,
    color,
    percent,
    isLoading,
    icon,
    iconClassName,
    cardClassName,
    titlePercent,
  }: Props) => {
    return (
      <Card
        className="h-full border border-divider px-4 py-2 shadow-sm"
        // className={clsx(
        //   "h-full border border-divider p-4 shadow-sm",
        //   cardClassName,
        // )}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <h4>{title}</h4>
            {/* {icon && (
              <Icon icon={icon || ""} width={20} clasName={iconClassName} />
            )} */}
          </div>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <div>
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <div className="full flex flex-col justify-end">
              <span className="whitespace-nowrap text-2xl font-semibold">
                $ {amount.toLocaleString()}
              </span>
              {percent && (
                <div className="flex items-center gap-2">
                  <p className="text-nowrap !text-xs">{titlePercent}</p>
                  <Chip
                    size="sm"
                    variant="dot"
                    className="items-center border-none px-0"
                    color={color as any}
                  >
                    <span>{percent}</span>
                  </Chip>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    );
  },
);

export default SummaryCard;

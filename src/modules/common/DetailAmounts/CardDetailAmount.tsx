import clsx from "clsx";
import { Card } from "~/modules/components";
import { LineChart } from "~/modules/charts";
import { Series } from "~/types/root.types";

type Props = {
  cardClassName?: string;
  amount: number;
  series?: Series[];
  percent?: string;
  icon: string;
  title: string;
  iconClassName?: string;
  color?: string;
  badgeColor?: string;
};

const CardDetailAmount = ({
  title,
  amount,
  color,
  percent,
  series,
  cardClassName,
}: Props) => {
  return (
    <div className={cardClassName}>
      <Card className="flex h-full overflow-hidden !p-0">
        <div className="p-4">
          <h3 className="mb-4 text-lg">{title}</h3>
          <span className="text-3xl font-semibold">
            $ {amount.toLocaleString()}
          </span>
          <p className="mt-2 text-sm">
            <span className={clsx("font-semibold", color)}>{percent}</span> De{" "}
            {title}
          </p>
        </div>
        <div className="relative flex-grow">
          <section className="absolute -bottom-4 -right-3">
            {series && (
              <LineChart
                series={series}
                heightChart="100%"
                showLegend={false}
                showToolBar={false}
                showGrid={false}
                showToolTip={true}
                showYAxis={false}
                offsetX={0}
                offsetY={0}
                showXAxis={false}
                hasformatNumber={false}
              />
            )}
          </section>
        </div>
      </Card>
    </div>
  );
};

export default CardDetailAmount;

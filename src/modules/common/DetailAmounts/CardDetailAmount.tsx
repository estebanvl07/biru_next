import clsx from "clsx";
import { Card, Empty } from "~/modules/components";
import { LineChart } from "~/modules/charts";
import { useResize } from "~/lib/hooks/useResize";
import { Series } from "~/types/chart.types";

type Props = {
  cardClassName?: string;
  amount: number;
  series?: Series[];
  percent?: string;
  icon: string;
  redirectHref?: string;
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
  redirectHref,
  series,
  cardClassName,
}: Props) => {
  const { size } = useResize();

  return (
    <Card
      className={clsx("flex !h-full flex-grow overflow-hidden", cardClassName)}
    >
      <aside className="flex flex-col justify-between">
        <h4 className="mb-4 font-medium">{title}</h4>
        <div>
          <span className="text-nowrap text-2xl font-semibold">
            $ {amount.toLocaleString()}
          </span>
          {percent && (
            <p className="mt-2 text-nowrap !text-xs">
              <span className={clsx("font-semibold", color)}>{percent}</span> De{" "}
              {title}
            </p>
          )}
        </div>
      </aside>
      {series && series[0]!.data.length > 0 ? (
        <div className="relative flex-grow">
          <section className="absolute -bottom-4 -right-3">
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
          </section>
        </div>
      ) : (
        <div className="w-full py-4 ">
          <Empty
            description={`Sin ${title}`}
            href={redirectHref}
            iconWidth={32}
            buttonText={`Crear ${title}`}
          />
        </div>
      )}
    </Card>
  );
};

export default CardDetailAmount;

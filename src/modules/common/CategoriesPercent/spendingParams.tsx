import Chart from "react-apexcharts"
import { Icon } from "@iconify/react/dist/iconify.js";

import { Category } from "@prisma/client";
import { useResize } from "~/lib/hooks/useResize";

interface SpendingParamsProps {
  category?: Category;
  percent?: string;
  percentBalance?: number;
}

const SpendingParams = ({
  category,
  percent = "0",
  percentBalance = 0,
}: SpendingParamsProps) => {
  const percentValue = Number(percent.split("%")[0]);
  const { size } = useResize();

  return (
    <div className="flex flex-col items-center pb-8" title={category?.name}>
      <div className="relative flex h-[150px] w-[150px] items-center justify-center">
        <Chart
          options={{
            chart: {
              type: "radialBar",
              foreColor: "#e11d48",

              selection: {
                stroke: {
                  color: "#e11d48",
                },
              },
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 0,
                  position: "back",
                },
                dataLabels: {
                  show: false,
                  name: {
                    show: false,
                  },
                },
              },
            },

            colors: ["#3E1FE9"],
            stroke: {
              lineCap: "round",
            },
          }}
          series={[percentValue]}
          type="radialBar"
          height={size === 1024 ? 180 : 200}
          width={size === 1024 ? 180 : 200}
        />
        <div className="itmes-center absolute flex flex-col justify-center">
          <div className="flex justify-center">
            {category && category.icon && (
              <Icon
                icon={category.icon}
                width={22}
                className="m-0 px-0 text-primary"
              />
            )}
          </div>
          <span className="text-center text-lg font-semibold">{percent}</span>
        </div>
      </div>
      <p className="z-10 w-24 overflow-hidden text-ellipsis whitespace-nowrap text-center font-semibold">
        {category?.name}
      </p>
    </div>
  );
};

export default SpendingParams;

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Evita que se ejecute en el servidor
});
import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";

import type { ICategory } from "~/types/category";

interface SpendingParamsProps {
  category?: ICategory;
  percent?: string;
  percentBalance?: number;
}

const SpendingParams = ({
  category,
  percent = "0",
  percentBalance = 0,
}: SpendingParamsProps) => {
  const percentValue = Number(percent.split("%")[0]);

  return (
    <div className="flex flex-col items-center pb-8" title={category?.name}>
      <div className="relative flex h-[110px] w-[110px] items-center justify-center">
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
            fill: {
              // colors: ["#e11d48"],
            },

            stroke: {
              lineCap: "round",
            },
          }}
          series={[percentValue]}
          type="radialBar"
          height={180}
          width={180}
        />
        <div className="itmes-center absolute flex flex-col justify-center">
          <div className="flex justify-center">
            {category && (
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

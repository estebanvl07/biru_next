import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import Marquee from "react-fast-marquee";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getPercent } from "~/lib/helpers";
import { LineChart } from "~/modules/Charts";
import PieChart from "~/modules/Charts/pieChart";
import SpendingParams from "~/modules/Common/CategoriesPercent/spendingParams";

const categoriesEx = [
  {
    id: 8,
    name: "Prestamos",
    type: 1,
    icon: "streamline:payment-10",
    description: "Negocio de prestamos",
    state: 1,
    createdAt: "2024-08-16T00:38:47.551Z",
    updatedAt: "2024-08-16T00:38:47.551Z",
    userId: "cly34zlum000c1desy1ydsq5x",
  },

  {
    id: 11,
    name: "Supermercado",
    type: 1,
    icon: "raphael:cart",
    description: "Compras de super y tiendas",
    state: 1,
    createdAt: "2024-10-17T13:03:30.476Z",
    updatedAt: "2024-10-17T13:03:30.476Z",
    userId: "cly34zlum000c1desy1ydsq5x",
  },
];

const SlideComponents = () => {
  return (
    <Marquee pauseOnHover>
      <Card>
        <span className="mb-3 block pr-10">Balance actual</span>
        <h5 className="whitespace-nowrap text-4xl  font-semibold">
          $ 12.345.34
        </h5>
      </Card>
      <Card className="!pb-2">
        <h5 className="text-base">Balance de cuenta</h5>
        <p className="mb-4 text-4xl font-semibold">$ 557.450</p>
        <div className="flex-grow">
          <LineChart
            series={[
              {
                data: [
                  20000, 34000, 105000, 87000, 358000, 545000, 245000, 134000,
                  20000, 34000, 105000, 87000, 358000, 545000, 245000, 134000,
                ],
                name: "Balance",
                color: "#3E1FE9",
              },
            ]}
            heightChart="120px"
            showXAxis={false}
            showYAxis={false}
            showGrid={false}
            bottomBorder={false}
            showToolBar={false}
          />
        </div>
      </Card>
      <Card className="flex items-center justify-between gap-6">
        <aside>
          <span className="mb-3 block">Ingresos</span>
          <h5 className="flex items-center whitespace-nowrap text-4xl  font-semibold text-green-600">
            <span className="ml-2 text-2xl">$ +</span>155.300
          </h5>
        </aside>
        <Chip className="bg-green-600/20 text-green-600">13%</Chip>
      </Card>

      <Card>
        <PieChart
          series={[100450, 580300, 324234]}
          keys={["Comida", "Arriendo", "Servicios"]}
          position="bottom"
          plotTextSize="14px"
          widthChart="200"
          heightChart="220"
          showToolBar={false}
        />
      </Card>
      <Card className="flex items-center justify-between gap-6">
        <aside>
          <span className="mb-3 block">Gastos</span>
          <h5 className="flex items-center whitespace-nowrap text-4xl font-semibold text-red-600">
            <span className="ml-2 text-2xl">$ -</span> 87.455
          </h5>
        </aside>
        <Chip className="bg-red-600/20 text-red-600">13%</Chip>
      </Card>

      <Card>
        <section className="flex h-full w-full max-w-[15rem] flex-wrap items-center justify-center py-2">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={true}
            pagination={{
              type: "bullets",
            }}
            color="#d3d3d3"
            modules={[Pagination]}
            className="mySwiper w-full"
          >
            {categoriesEx.map((category, index) => {
              return (
                <SwiperSlide key={category.id}>
                  <SpendingParams
                    category={category as any}
                    percent={getPercent(250350, 500000)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      </Card>
    </Marquee>
  );
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "relative mx-4 overflow-hidden rounded-xl border bg-white/80 p-6 dark:border-white/10 dark:bg-default-200/30",
        className,
      )}
    >
      <div className="absolute top-2 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />

      {children}
    </div>
  );
};

export default SlideComponents;

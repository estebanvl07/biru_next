import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import clsx from "clsx";
import { cn } from "~/lib/utils";
import MobileVideo from "~/modules/Landing/components/Features/MobileVideo";
import { LineChart } from "~/modules/Charts";
import PieChart from "~/modules/Charts/pieChart";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Eficiencia",
      description:
        "Mantén tus finanzas en orden con una plataforma rápida y eficiente.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b border-divider border-dashed lg:border-r",
    },
    {
      title: "Facil de Manejar",
      description:
        "Visualiza el movimiento de tu dinero y crea estrategias efectivas para aumentar tus ingresos.",
      skeleton: <SkeletonTwo />,
      className:
        "border-b h-full min-h-[200px] border-divider col-span-1 border-dashed lg:col-span-2",
    },
    {
      title: "Análisis",
      description:
        "Visualiza el movimiento de tu dinero y crea estrategias efectivas para aumentar tus ingresos.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 border-dashed  lg:border-r border-divider",
    },
    {
      title: "Control",
      description: "LLeva un mejor control sobre tus gastos",
      skeleton: <SkeletonFour />,
      className:
        "col-span-1 lg:col-span-3 border-b border-divider lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 mx-auto max-w-7xl py-10 lg:py-20">
      <div className="px-8">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
          Nuestras Caracteristicas
        </h4>

        <p className="mx-auto my-4  max-w-2xl  text-center text-sm font-normal text-neutral-500 lg:text-base dark:text-neutral-300">
          Disfruta de los beneficios de controlar tu dinero con Biru.
        </p>
      </div>

      <div className="relative ">
        <div className="mt-12 grid grid-cols-1 rounded-md  border-divider lg:grid-cols-6 xl:border">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `relative flex flex-col items-start justify-start overflow-hidden p-4 sm:p-8`,
        className,
      )}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl text-left text-xl tracking-tight text-black md:text-2xl md:leading-snug dark:text-white">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-left text-sm md:text-base",
        "text-center font-normal text-neutral-500 dark:text-neutral-300",
        "mx-0 my-2 max-w-sm text-left md:text-sm",
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <video
        className="fade-bottom h-full w-full rounded-xl border dark:border-white/10"
        autoPlay
        muted
        playsInline
        loop
        preload="none"
      >
        <source src="/biru-video.mp4" />
      </video>

      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent dark:from-black" /> */}
    </div>
  );
};

export const SkeletonTwo = () => {
  return (
    <div className="fade-bottom relative mt-4 flex h-80 flex-col items-start gap-10 overflow-hidden p-8">
      <MobileVideo />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="relative flex h-full gap-10">
      <div className="group mx-auto h-full w-full bg-transparent dark:bg-transparent">
        <div className="fade-bottom relative flex h-full w-full flex-1 flex-col space-y-2  pb-72 lg:pb-0">
          <div className="absolute -bottom-4 left-[75px] h-56 w-full rounded-lg border bg-white/50 dark:border-white/20  dark:bg-default-200/50" />
          <div className="absolute -bottom-12 left-14 h-56 w-56 rounded-lg border bg-white/30 dark:border-white/10 dark:bg-default-200/30" />
          <div className="absolute -bottom-0 left-24 z-10 flex h-56 w-full flex-col items-start rounded-xl border bg-white px-6 py-5 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black/60">
            <h5 className="text-base">Balance de cuenta</h5>
            <p className="text-4xl font-semibold">$ 557.450</p>
            <div className="w-full">
              <LineChart
                series={[
                  {
                    data: [
                      20000, 122222, 42000, 34000, 105000, 87000, 358000,
                      545000, 245000,
                    ],
                    name: "Balance",
                    color: "#3E1FE9",
                  },
                ]}
                widthChart="100%"
                heightChart="100"
                showXAxis={false}
                showYAxis={false}
                showGrid={false}
                bottomBorder={false}
                showToolBar={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="fade-bottom relative mt-10  flex h-60 flex-col items-center bg-transparent md:h-60 dark:bg-transparent">
      <div className="absolute -bottom-28 right-24 h-52 w-80 rounded-lg border dark:border-white/20" />
      <div className="absolute -bottom-32 right-52 h-52 w-80 rounded-lg border dark:border-white/10" />
      <div className="absolute  -bottom-[90px] right-4 z-10 flex h-80 w-80 flex-col items-center justify-center rounded-lg border bg-white px-4 py-8 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black/60">
        <PieChart
          series={[100450, 580300, 324234]}
          keys={["Comida", "Arriendo", "Servicios"]}
          position="bottom"
          plotTextSize="10px"
          heightChart="300"
          showLegend={false}
          showToolBar={false}
        />
      </div>
    </div>
  );
};

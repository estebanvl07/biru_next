"use client";

import clsx from "clsx";

import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import { Button, Badge } from "~/modules/components";
import Image from "next/image";
import Link from "next/link";
// import Logo from "~/assets/logo-isotype.svg";

const PrincipalSection = () => {
  return (
    <section className="mx-auto flex h-full w-full flex-col items-center justify-around gap-8 px-4 md:max-w-[72rem] md:px-0 lg:flex-row lg:gap-0">
      <aside className="order-2 flex flex-col justify-center lg:order-1">
        <h1 className="text-center font-encode text-4xl font-bold !leading-none tracking-tight md:text-[2.6rem] lg:text-start">
          Domina
          <br />
          tu {""}
          <span className="highlight font-encode text-primary dark:text-primary-light">
            futuro financiero
          </span>
          <br /> con facilidad
        </h1>
        <p className="mt-3 text-pretty text-center text-sm opacity-80 md:max-w-md md:text-base lg:text-start lg:text-base">
          Crea hábitos financieros con Biru, conoce como se mueve tu dinero de
          la forma más fácil.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row md:gap-4 lg:max-w-md lg:justify-start">
          <Link href="/register" aria-label="registrate ahora">
            <Button className="w-full !py-3 lg:w-auto">
              <span className="whitespace-nowrap">Descubre más</span>
              {/* <Image
                src="/logo-isotype.svg"
                alt="Logo de Biru"
                className="!text-white"
                width={24}
                height={24}
                style={{
                  color: "white",
                  fill: "white !important",
                }}
              /> */}
              {/* <Logo /> */}
            </Button>
          </Link>
          <Link href="#" aria-label="Conoce como funciona aqui">
            <Button variantStyle="outline" className="w-full lg:w-auto">
              <span className="whitespace-nowrap">Como funciona</span>
              <Icon icon="solar:play-circle-bold" height="1.5rem" />
            </Button>
          </Link>
        </div>
      </aside>
      <aside className="relative z-20 order-1 mt-16 flex w-full items-center justify-center sm:max-w-[35rem] md:mt-0 lg:order-2 lg:justify-end">
        <InfoCard
          title="Ingresos"
          className="left-6 top-[25%] gap-2 shadow-2xl shadow-black/70 lg:left-28"
        >
          <span className="font-semibold">$832,560</span>
          <Badge className="col-start-2 row-start-2 flex items-center gap-2 place-self-end self-center">
            <InlineIcon icon="ph:trend-up" className="inline" />
            <span>+12.5%</span>
          </Badge>
        </InfoCard>
        <InfoCard
          title="Ahorros"
          className=" bottom-6 right-16 grid-rows-2 shadow-2xl shadow-black/70 md:bottom-24 lg:-right-10"
        >
          <span className="font-semibold">Vacaciones</span>
          <Badge className="col-start-2 row-start-2 place-self-end self-center">
            $352,123
          </Badge>
          <div className="col-span-2 row-start-3 mt-2.5 h-1 self-center rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full w-3/5 rounded-full bg-primary dark:bg-primary-light" />
          </div>
        </InfoCard>
        <span className="relative flex h-[16rem] w-[16rem] items-center justify-center rounded-full bg-primary shadow-2xl shadow-primary md:h-[20rem] md:w-[20rem] lg:h-[24rem] lg:w-[24rem] 2xl:h-[28rem] 2xl:w-[28rem] dark:shadow-black">
          <Image
            src="/dashboard_representation_mobile.webp"
            width={224}
            height={500}
            className="w-[12rem] drop-shadow-2xl md:absolute lg:w-[14rem]"
            alt="Dashboard in mobile representation"
            data-todo="set size"
            loading="lazy"
          />
        </span>
      </aside>
    </section>
  );
};

const InfoCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ className, title, children }) => {
  return (
    <div
      className={clsx(
        "absolute z-10 grid min-w-[30%] scale-75 grid-flow-col grid-cols-2 rounded-md border bg-white/80 px-4 py-2.5 shadow-lg shadow-indigo-800/10 backdrop-blur-md lg:scale-100 dark:text-slate-950",
        className,
      )}
    >
      <span className="text-xs font-medium opacity-90">{title}</span>
      {children}
    </div>
  );
};

export default PrincipalSection;

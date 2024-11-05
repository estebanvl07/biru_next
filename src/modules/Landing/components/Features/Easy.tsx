import React from "react";
import { Card } from "~/modules/components";
import MobileVideo from "./MobileVideo";

const Easy = () => {
  return (
    <Card className="order-4 col-span-4 row-span-1 h-48 flex-row items-center justify-between overflow-hidden bg-white/80 backdrop-blur-sm md:order-5 md:col-span-2 dark:bg-default-200/30">
      <div className="absolute top-2 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />

      <aside className="flex-1">
        <h2 className="mb-2">Facil Manéjo</h2>
        <p>
          Lleva el control de tus finanzas de forma simple y eficiente, sin
          importar si estás en tu computadora o móvil.
        </p>
      </aside>
      <div className="relative flex h-full flex-1 justify-end">
        <MobileVideo />
      </div>
    </Card>
  );
};

export default Easy;

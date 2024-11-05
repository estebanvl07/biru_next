import React from "react";
import { Card } from "~/modules/components";
import Security from "./Security";
import Control from "./Control";
import Analytics from "./Analytics";
import Easy from "./Easy";
import Image from "next/image";
import Efficiency from "./Efficiency";

const Features = () => {
  return (
    <div className="mx-auto my-20 flex w-full max-w-[72rem] flex-col items-center px-4">
      <h2 className="text-4xl">Caracteristicas</h2>
      <p className="text-center">
        Disfruta de los beneficios de controlar tu dinero con Biru.
      </p>
      <div className="relative mt-10 grid w-full grid-cols-4 gap-4">
        <Efficiency />
        <Analytics />
        <Control />
        <Security />
        <Easy />
      </div>
    </div>
  );
};

export default Features;

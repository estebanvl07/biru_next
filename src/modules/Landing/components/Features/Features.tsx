import React from "react";
import Security from "./Security";
import Control from "./Control";
import Analytics from "./Analytics";
import Easy from "./Easy";
import Efficiency from "./Efficiency";

const Features = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-y-16 px-4">
      <header className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-center text-primary">CARACTERISTICAS</p>
        <h2 className="text-4xl tracking-tight md:text-5xl">
          Conoce Las Caracteristicas de Biru
        </h2>
      </header>

      <div className="relative grid w-full grid-cols-4 gap-4">
        <Efficiency />
        <Analytics />
        <Control />
        <Security />
        <Easy />
      </div>
    </section>
  );
};

export default Features;

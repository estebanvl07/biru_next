import React from "react";
import { Card } from "~/modules/components";

const Efficiency = () => {
  return (
    <Card className="order-1 col-span-4 row-span-2 h-[310px] flex-col overflow-hidden bg-white/80 backdrop-blur-sm md:col-span-2 dark:bg-default-200/30">
      <div className="absolute top-2 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />
      <h2>Eficiencia</h2>
      <p>Mantén tus finanzas en orden con una plataforma rápida y eficiente.</p>
      <div className="absolute left-10 top-24 w-[44rem] shadow-2xl md:top-20 dark:shadow-black">
        <video
          className="w-full rounded-xl border dark:border-white/10"
          autoPlay
          muted
          playsInline
          loop
          preload="none"
        >
          <source src="/biru-video.mp4" />
        </video>
      </div>
    </Card>
  );
};

export default Efficiency;

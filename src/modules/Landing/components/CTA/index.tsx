import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section className=" flex bg-primary/10 py-24 dark:bg-default-200/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center">
        <p className="text-center text-sm uppercase text-primary">
          ¿Listo para empezar?
        </p>
        <h2 className="mt-2 text-4xl tracking-tight md:text-5xl">
          COMIENZA A USAR BIRU
        </h2>
        <p className="my-4 max-w-md text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ut
          reprehenderit natus, quaerat libero illum.
        </p>
        <Button color="primary" endContent={<ChevronRight />} size="lg">
          Comenzemos!
        </Button>
      </div>
    </section>
  );
};

export default CTA;

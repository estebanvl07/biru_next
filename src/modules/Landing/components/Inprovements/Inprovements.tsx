import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface InprovementsProps {
  title?: string;
  description?: string;
  icon?: string;
}

const Inprovements = () => {
  return (
    <div className="mx-auto mt-24 max-w-[72rem]">
      <div className="flex items-center justify-between px-4">
        <aside>
          <h2 className="text-4xl">Potencia el uso de Biru</h2>
          <p className="max-w-xl">
            De esta forma, Biru se convierte en una herramienta más efectiva
            para tu negocio Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Cupiditate, itaque!
          </p>
        </aside>
        <Chip
          as={Link}
          href={"#"}
          className="bg-primary/70 text-primary-foreground transition-colors hover:bg-white"
        >
          Ver mas
        </Chip>
      </div>
      <div className="flex gap-4 py-8 transition-all">
        {/* {[1, 2, 3, 4].map((p, index) => (
          <InprovementsCard
            title="Ejemplo"
            icon="hugeicons:internet"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, itaque!"
          />
        ))} */}
      </div>
    </div>
  );
};

const InprovementsCard = ({ title, icon, description }: InprovementsProps) => {
  return (
    <div className="group relative h-80 w-40 overflow-hidden rounded-xl bg-default-200 p-3 shadow-2xl transition-all md:w-[32rem] md:hover:w-[56rem]">
      <div className="relative flex h-full flex-col items-start justify-between overflow-hidden rounded-xl border bg-default-100 p-6 dark:border-white/10">
        <div className="relative z-0 flex items-center justify-center before:absolute before:h-48 before:w-48 before:rounded-full before:border before:content-[''] after:absolute after:h-32 after:w-32 after:rounded-full after:border after:bg-default-200/50 after:content-[''] dark:before:border-white/10 dark:after:border-white/20">
          <Chip className="z-10 h-12 w-12 bg-indigo-600" radius="full">
            <Icon
              icon={"hugeicons:internet"}
              width={24}
              className="text-white"
            />
          </Chip>
        </div>
        <aside className="z-10">
          <h2 className="mb-2 text-3xl">{title}</h2>
          <motion.p className=" opacity-85 group-hover:block">
            {description}
            {description}
            {description}
          </motion.p>
        </aside>
      </div>
      <div className="absolute -bottom-40 -right-28 h-80 w-[80%] rounded-full blur-3xl dark:bg-indigo-800/20" />
    </div>
  );
};

export default Inprovements;

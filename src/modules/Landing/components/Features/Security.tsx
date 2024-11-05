import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import LockIcon from "~/assets/Icones/Lock";
import { useThemeContext } from "~/lib/context/Theme.context";
import { Card } from "~/modules/components";

const Security = () => {
  const { theme } = useThemeContext();

  return (
    <Card className="relative order-3 col-span-2 row-span-2 h-56 flex-col overflow-hidden bg-white/80 backdrop-blur-sm md:order-4 md:col-span-1 dark:bg-default-200/30">
      <div className="absolute top-0 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />

      <h2>Seguridad</h2>
      <p>Máxima seguridad de tu información.</p>
      <div className="absolute right-8 top-32 h-36 w-36 rounded-lg border bg-white/50 dark:border-white/20 dark:bg-default-200/50" />
      <div className="absolute left-8 top-24 h-36 w-36 rounded-lg border bg-white/30 dark:border-white/10 dark:bg-default-200/30" />
      <div className="group absolute left-16 top-[90px] z-10 flex h-48 w-36 flex-col items-center justify-center  overflow-hidden rounded-lg border bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black">
        <LockIcon
          className="absolute -right-8 bottom-8 !text-white opacity-50 transition-all group-hover:opacity-100 dark:opacity-70"
          width="150"
          height="150"
          stroke={theme === "dark" ? "white" : "black"}
        />
      </div>
    </Card>
  );
};

export default Security;

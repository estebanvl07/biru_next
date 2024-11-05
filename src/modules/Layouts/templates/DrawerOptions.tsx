import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

import { Button } from "@nextui-org/button";
import { menuOptions } from "./dashbaord/SideBar/options";
import Link from "next/link";
import CustomDrawer from "~/modules/components/molecules/CustomDrawer";

const DrawerOptions = () => {
  const [drawerOptions, setDrawerOptions] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        onClick={() => setDrawerOptions(!drawerOptions)}
        size="lg"
        className="fixed bottom-24 right-4 z-20 border shadow-2xl dark:border-white/10"
      >
        <Icon icon="flowbite:angle-top-solid" width={20} />
      </Button>
      <CustomDrawer
        isOpen={drawerOptions}
        onClose={() => setDrawerOptions(false)}
        title="Menu de Opciones"
        subtitle="Selecciona la opción que desees"
      >
        <div className="mt-4 grid grid-cols-4 gap-y-6 px-10">
          {menuOptions.map((option) => {
            return (
              <Link
                key={option.id}
                href={option.href}
                className="flex flex-col items-center justify-center gap-3"
                title={option.name}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-default-100">
                  <Icon
                    icon={option.icon}
                    className="text-black dark:text-white"
                    width={24}
                  />
                </div>
                <h4 className="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-center">
                  {option.name}
                </h4>
              </Link>
            );
          })}
        </div>
      </CustomDrawer>
    </>
  );
};

export default DrawerOptions;

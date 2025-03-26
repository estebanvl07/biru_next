import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

import { Button } from "@heroui/button";
import { menuOptions } from "./dashbaord/SideBar/options";
import Link from "next/link";
import CustomDrawer from "~/modules/components/molecules/CustomDrawer";

const DrawerOptions = () => {
  const [drawerOptions, setDrawerOptions] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        onPress={() => setDrawerOptions(!drawerOptions)}
        size="lg"
        className="fixed bottom-24 right-4 z-20 border shadow-2xl dark:border-white/10"
      >
        <Icon icon="flowbite:angle-top-solid" width={20} />
      </Button>
      <CustomDrawer
        placement="bottom"
        size="full"
        isOpen={drawerOptions}
        onClose={() => setDrawerOptions(false)}
        title="Menu de Opciones"
        subtitle="Selecciona la opción que desees"
      >
        <div className="flex flex-col gap-6">
          {menuOptions.map(({ options, title }, index) => {
            return (
              <div key={index} className="flex flex-col">
                <h4 className="mb-2">{title}</h4>
                <div className="grid grid-cols-4 gap-y-6">
                  {options.map(({ href, icon, name, id }) => (
                    <Link
                      key={id}
                      href={href}
                      className="flex flex-col items-center justify-center gap-2"
                      title={name}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-100">
                        <Icon
                          icon={icon}
                          className="text-black dark:text-white"
                          width={22}
                        />
                      </div>
                      <h4 className="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs">
                        {name}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CustomDrawer>
    </>
  );
};

export default DrawerOptions;

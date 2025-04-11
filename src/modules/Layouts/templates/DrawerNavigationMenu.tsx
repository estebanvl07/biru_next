import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

import { Button } from "@heroui/button";
import { MENU_OPTIONS } from "./dashbaord/SideBar/options";
import Link from "next/link";
import CustomDrawer from "~/modules/components/molecules/CustomDrawer";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { useParams } from "next/navigation";

const DrawerOptions = () => {
  const [drawerOptions, setDrawerOptions] = useState(false);
  const params = useParams();
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
        customHeader={
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" width={18} />
              <span>Biru</span>
            </div>
            <h2 className="tracking-tight">Menu de Opciones</h2>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          {MENU_OPTIONS.map(({ options, title }, index) => {
            return (
              <div key={index} className="flex flex-col">
                <h4 className="mb-2 font-semibold">{title}</h4>
                <div className="grid grid-cols-4 gap-y-6 border-b border-divider pb-4">
                  {options.map(({ href, icon, name, id }) => (
                    <Link
                      key={id}
                      href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}${href}`}
                      className="flex flex-col items-center justify-center gap-2"
                      title={name}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-default-100 dark:bg-default-200">
                        <Icon
                          icon={icon ?? ""}
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

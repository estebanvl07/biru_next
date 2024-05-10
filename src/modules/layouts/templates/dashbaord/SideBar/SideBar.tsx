import clsx from "clsx";
import React from "react";
import ButtonSignOut from "./ButtonSignOut";
import OptionsList from "./OptionsList";

import { menuOptions } from "./options";
import NavigationLogo from "../Header/NavigationLogo";

interface SideBarProps {
  serviceOptions?: boolean;
}

const SideBar = ({ serviceOptions = true }: SideBarProps) => {
  return (
    <div
      className={clsx(
        "fixed left-0 z-20 hidden h-screen w-60 flex-col justify-between border-r  bg-white pb-4 pt-2 text-white dark:border-white/10 dark:bg-slate-950 md:flex ",
      )}
    >
      <aside className="mt-2 w-60 pl-8 pt-2">
        <NavigationLogo />
      </aside>
      <nav className="scrollbar-y-customize mt-6 flex-grow overflow-y-auto px-6">
        {menuOptions.map((list) => {
          if (!serviceOptions && list.title === "Servicios") return null;
          return <OptionsList key={list.id} list={list} />;
        })}
      </nav>
      <hr className="mx-4 mb-6 dark:bg-white/10" />
      <ButtonSignOut />
    </div>
  );
};

export default SideBar;

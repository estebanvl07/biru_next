import clsx from "clsx";
import React, { LegacyRef, RefAttributes } from "react";
import ButtonSignOut from "./ButtonSignOut";
import OptionsList from "./OptionsList";

import { menuOptions } from "./options";
import NavigationLogo from "../Header/NavigationLogo";
import { useResize } from "~/lib/hooks/useResize";

interface SideBarProps {
  serviceOptions?: boolean;
  className?: string;
}

const SideBar = ({ serviceOptions = true, className }: SideBarProps) => {
  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-20 hidden h-screen w-60 flex-col justify-between border-r border-slate-200  bg-default-100 pb-4 pt-2 text-white/80 md:flex dark:border-white/10 dark:bg-slate-950",
        className,
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
      <ButtonSignOut />
    </div>
  );
};

export default SideBar;

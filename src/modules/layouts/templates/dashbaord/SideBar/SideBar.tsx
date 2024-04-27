import clsx from "clsx";
import React from "react";
import ButtonSignOut from "./ButtonSignOut";
import OptionsList from "./OptionsList";

import { menuOptions } from "./options";
import NavigationLogo from "../Header/NavigationLogo";

const SideBar = () => {
  return (
    <div
      className={clsx(
        "fixed left-0 z-20 hidden h-screen w-60 flex-col justify-between border-r  bg-white pb-4 pt-2 text-white md:flex dark:border-white/10 dark:bg-slate-950 ",
      )}
    >
      <aside className="mt-2 w-60 pl-8 pt-2">
        <NavigationLogo />
      </aside>
      <nav className="mt-6 flex-grow px-6">
        {menuOptions.map((list) => {
          return <OptionsList key={list.id} list={list} />;
        })}
      </nav>
      <hr className="mx-4 mb-6" />
      <ButtonSignOut />
    </div>
  );
};

export default SideBar;

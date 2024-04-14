import React from "react";
import clsx from "clsx";

import Nav from "./Nav";
import NavigationLogo from "./NavigationLogo";
import NavigationBack from "./NavigationBack";

const HeaderApp = () => {
  return (
    <header className="top-0 z-30 flex w-full items-center justify-between border-b bg-white md:fixed md:h-16 dark:border-white/10 dark:bg-slate-950">
      <aside className="w-60 pl-8">
        <NavigationLogo />
      </aside>
      <section className="flex w-full flex-grow items-center justify-between px-4">
        <section className="ml-4 flex items-center gap-3">
          <NavigationBack />
          <div
            className={clsx("flex flex-col items-start justify-center", {
              // "!pl-7": location.pathname === "/home",
            })}
          >
            <h1
              className={clsx(
                "text-start text-xl font-semibold text-indigo-600 dark:text-white",
              )}
            >
              Dashboard
              {/* {titleModule} */}
            </h1>
            <p className={clsx("text-sm opacity-90 dark:text-slate-300")}>
              Cuenta de ahorros
              {/* {accountName} */}
            </p>
          </div>
        </section>
        <Nav />
      </section>
    </header>
  );
};

export default HeaderApp;

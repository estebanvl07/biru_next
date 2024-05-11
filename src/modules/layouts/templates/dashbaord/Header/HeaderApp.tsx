import clsx from "clsx";

import Nav from "./Nav";
import { usePathname } from "next/navigation";
import NavigationBack from "./NavigationBack";
import { useCurrentAccount } from "~/modules/account/hooks";
import FilterTemplates from "./FilterTemplates";

const HeaderApp = ({ title }: { title?: string }) => {
  const pathname = usePathname();

  const { account } = useCurrentAccount();

  return (
    <header className="z-10 mb-2 flex w-full items-center justify-between bg-white md:h-16 dark:border-white/10 dark:bg-slate-950">
      <section className="flex w-full flex-grow items-center justify-between">
        <section className="flex items-center gap-3">
          {!pathname?.includes("main") && <NavigationBack />}
          <div
            className={clsx("flex flex-col items-start justify-center", {
              // "!pl-7": location.pathname === "/home",
            })}
          >
            <span className="text-gray-600 dark:text-slate-200">
              {account?.name}
            </span>
            <h1
              className={clsx(
                "text-start text-2xl font-semibold text-primary dark:text-slate-200",
              )}
            >
              {title ?? "Dashboard"}
            </h1>
          </div>
        </section>
        <Nav />
      </section>
    </header>
  );
};

export default HeaderApp;

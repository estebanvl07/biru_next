import { usePathname } from "next/navigation";

import Nav from "./Nav";
import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";
import NavigationLogo from "./NavigationLogo";
import { useSession } from "next-auth/react";
import Breadcrum from "../../Breadcrum";

const HeaderApp = ({
  title = "Dashboard",
  hasFilter,
  hasLogout,
  logo = false,
}: {
  hasFilter?: boolean;
  title?: string;
  logo?: boolean;
  hasLogout?: boolean;
}) => {
  const pathname = usePathname();
  const { account } = useCurrentAccount();

  return (
    <>
      <header className="z-10 flex w-full items-center justify-between">
        <aside className="flex items-center gap-3">
          {/* {
          logo &&
        <NavigationLogo className="mr-8" />
        } */}
          {!pathname?.includes("main") && <NavigationBack />}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-start text-xl font-semibold -tracking-wide text-primary lg:text-3xl dark:text-slate-200">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-slate-200">
              Cuenta Seleccionada ({account?.name || "Bienvenido"})
            </p>
          </div>
        </aside>
        <Nav hasLogout={hasLogout} hasFilter={hasFilter} />
      </header>
      {/* <Breadcrum /> */}
    </>
  );
};

export default HeaderApp;

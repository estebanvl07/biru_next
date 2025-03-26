import { usePathname } from "next/navigation";

import Nav from "./Nav";
import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";
import Link from "next/link";
import { Tab, Tabs } from "@heroui/tabs";
import NavigationLogo from "./NavigationLogo";
import React, { memo } from "react";

const HeaderApp = memo(
  ({
    title = "Dashboard",
    hasFilter,
    hasLogout,
    subtitle,
    logo = false,
    hasNotifications = true,
    hasLeftContent = true,
    children,
    hasGoBack = true,
  }: {
    hasFilter?: boolean;
    title?: string;
    subtitle?: string;
    hasLeftContent?: boolean;
    hasGoBack?: boolean;
    logo?: boolean;
    hasLogout?: boolean;
    children?: React.ReactNode;
    hasNotifications?: boolean;
  }) => {
    const pathname = usePathname();
    const { account } = useCurrentAccount();

    return (
      <header className="z-10 flex w-full flex-col">
        <div className="flex items-start justify-between">
          <div>
            <aside className="flex items-center gap-3">
              {logo && <NavigationLogo isExpanded className="mr-8" />}
              {hasGoBack && <NavigationBack />}
              {hasLeftContent && (
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-start text-xl font-semibold -tracking-wide text-primary lg:text-3xl dark:text-slate-200">
                    {title}
                  </h1>
                  {subtitle ? (
                    <p className="text-gray-600 dark:text-slate-200">
                      {subtitle}
                    </p>
                  ) : (
                    <p className="text-gray-600 dark:text-slate-200">
                      Cuenta Seleccionada ({account?.name || "Bienvenido"})
                    </p>
                  )}
                </div>
              )}
            </aside>
            {children}
          </div>
          <Nav
            hasLogout={hasLogout}
            hasFilter={hasFilter}
            hasNotifications={hasNotifications}
          />
        </div>
      </header>
    );
  },
);

export default HeaderApp;

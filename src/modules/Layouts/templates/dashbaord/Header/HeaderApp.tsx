import { usePathname } from "next/navigation";

import Nav from "./Nav";
import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";
import Link from "next/link";
import { Tab, Tabs } from "@heroui/tabs";
import NavigationLogo from "./NavigationLogo";
import React, { memo } from "react";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SearchIcon } from "lucide-react";

const HeaderApp = memo(
  ({
    title = "Dashboard",
    hasFilter,
    hasLogout,
    subtitle,
    logo = false,
    hasNotifications = true,
    rightContent,
    hasLeftContent = true,
    children,
    hasGoBack = true,
  }: {
    hasFilter?: boolean;
    title?: string;
    rightContent?: React.ReactNode;
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
      <header className="z-10 flex w-full flex-col px-8 py-2">
        <div className="flex items-center justify-between">
          <aside className="flex items-center">
            {/* {hasGoBack && <NavigationBack />} */}

            {logo && (
              <aside className="min-w-[246px]">
                <NavigationLogo isExpanded />
              </aside>
            )}
            {/* {children} */}
            <Input
              startContent={<SearchIcon width={18} />}
              placeholder="Buscar"
              radius="full"
              className="w-80"
            />
          </aside>
          {rightContent}
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

import React, { memo } from "react";
import { Input } from "@heroui/input";
import { SearchIcon } from "lucide-react";
import NavigationLogo from "./NavigationLogo";
import Nav from "./Nav";
import clsx from "clsx";
import BookSwitcher from "./BookSwitcher";

interface HeaderAppProps {
  hasFilter?: boolean;
  rightContent?: React.ReactNode;
  subtitle?: string;
  hasLeftContent?: boolean;
  hasGoBack?: boolean;
  className?: string;
  logo?: boolean;
  hasLogout?: boolean;
  children?: React.ReactNode;
  hasNotifications?: boolean;
}

const HeaderApp = memo(
  ({
    hasFilter,
    hasLogout,
    className,
    rightContent,
    logo = false,
    hasNotifications = true,
  }: HeaderAppProps) => {
    return (
      <header
        className={clsx("z-50 flex w-full flex-col px-8 py-2", className)}
      >
        <div className="flex items-center justify-between">
          <aside className="flex items-center">
            {logo && (
              <aside className="min-w-[246px]">
                <NavigationLogo isExpanded />
              </aside>
            )}
            <div className="flex items-center gap-2">
              <Input
                startContent={<SearchIcon width={18} />}
                placeholder="Buscar"
                radius="full"
                classNames={{
                  inputWrapper: "border border-divider/10 shadow-none",
                }}
                className="w-80"
              />
              <BookSwitcher />
            </div>
          </aside>
          <div className="flex items-center gap-x-4">
            {rightContent}
            <Nav hasNotifications={hasNotifications} />
          </div>
        </div>
      </header>
    );
  },
);

export default HeaderApp;

import clsx from "clsx";
import { MENU_OPTIONS } from "./options";
import NavigationLogo from "../Header/NavigationLogo";
import React, { useEffect, useState } from "react";
import OptionItem from "./OptionItem";
import { useResize } from "~/lib/hooks/useResize";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronsUpDown } from "lucide-react";

interface SideBarProps {
  className?: string;
}

const SideBar = React.memo(({ className }: SideBarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isDesktop } = useResize();

  useEffect(() => {
    isDesktop ? setIsExpanded(true) : setIsExpanded(false);
  }, [isDesktop]);

  return (
    <aside
      className={clsx(
        "relative z-20 hidden min-h-screen pb-20 duration-700 transition-width md:block",
        {
          "w-[90px]": !isExpanded,
          "!w-[300px]": isExpanded,
        },
      )}
    >
      <div
        className={clsx(
          "left-0 top-0 z-20 flex h-full flex-col gap-4 py-2",
          className,
          {
            "w-[85px]": !isExpanded,
            "w-[254px]": isExpanded,
          },
        )}
      >
        <nav
          className={clsx(
            "scrollbar-y-customize mt-3 w-full flex-grow overflow-y-auto transition-all",
            {
              "px-4": isExpanded,
            },
          )}
        >
          {MENU_OPTIONS.map(({ options, title }, index) => (
            <div className="mb-4" key={index}>
              {isExpanded && (
                <h6 className="mb-1 px-2 text-xs font-medium dark:text-foreground-300">
                  {title}
                </h6>
              )}
              {options.map((item) => (
                <OptionItem
                  showIcon
                  isExpanded={isExpanded}
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          ))}
        </nav>
        <footer className="px-4">
          <Dropdown placement="right-end">
            <DropdownTrigger>
              <Button
                fullWidth
                className="flex h-auto items-center justify-between gap-4 rounded-xl border-none px-2 py-2 dark:bg-default-300/50"
              >
                <aside className="flex items-center gap-2 ">
                  <Avatar
                    src=""
                    name="Esteban_vl"
                    color="primary"
                    radius="md"
                  />
                  <div className="hidden flex-col items-start lg:flex">
                    <p className="text-sm">Personal</p>
                    <p className="text-xs opacity-80">viloriaalgarin...</p>
                  </div>
                </aside>
                <ChevronsUpDown className="hidden lg:block" width={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="1">
                Hola
                {/* <Icon icon="fluent:menu-24-filled" /> */}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <p className="px-6 text-xs">Create By, Team Dev'forgx 🚀</p> */}
        </footer>
      </div>
    </aside>
  );
});

export default SideBar;

import clsx from "clsx";
import { menuOptions } from "./options";
import NavigationLogo from "../Header/NavigationLogo";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OptionItem from "./OptionItem";
import AvatarMenu from "../Header/Menu/AvatarMenu";
import { Skeleton } from "@heroui/skeleton";
import { useResize } from "~/lib/hooks/useResize";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useOutsideClick } from "~/lib/hooks";
import Menu from "../Header/Menu/Menu";

interface SideBarProps {
  serviceOptions?: boolean;
  className?: string;
}

const SideBar = React.memo(
  ({ serviceOptions = true, className }: SideBarProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const { isDesktop } = useResize();

    useEffect(() => {
      isDesktop ? setIsExpanded(true) : setIsExpanded(false);
    }, [isDesktop]);

    return (
      <motion.aside
        layout
        className={clsx(
          "relative z-20 hidden min-h-screen duration-700 transition-width md:block",
          {
            "w-[90px]": !isExpanded,
            "!w-[300px]": isExpanded,
          },
        )}
      >
        <div
          className={clsx(
            "fixed left-0 top-0 z-20 flex h-screen min-h-screen flex-col gap-4 pb-4 pt-2 dark:border-white/10",
            className,
            {
              "w-[85px]": !isExpanded,
              "w-[246px]": isExpanded,
            },
          )}
        >
          <motion.aside
            layout
            className={clsx("mt-2 pt-2", {
              "mt-6 flex flex-col items-center justify-center gap-6":
                !isExpanded,
              "flex items-center justify-between px-6": isExpanded,
            })}
          >
            <NavigationLogo isExpanded={isExpanded} />
          </motion.aside>

          <nav
            className={clsx(
              "scrollbar-y-customize mt-3 w-full flex-grow overflow-y-auto transition-all",
              {
                "px-4": isExpanded,
              },
            )}
          >
            {menuOptions.map(({ options, title }, index) => (
              <div className="mb-4">
                <h6 className="mb-1 px-2 text-xs">{title}</h6>
                <ul>
                  {options.map((item) => (
                    <OptionItem
                      isExpanded={isExpanded}
                      key={item.id}
                      item={item}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <footer>
            <p className="px-6 text-xs">Create By, Team Dev'forgx 🚀</p>
          </footer>
        </div>
      </motion.aside>
    );
  },
);

export default SideBar;

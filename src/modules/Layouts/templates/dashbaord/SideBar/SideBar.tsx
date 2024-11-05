import clsx from "clsx";
import { menuOptions } from "./options";
import NavigationLogo from "../Header/NavigationLogo";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OptionItem from "./OptionItem";
import AvatarMenu from "../Header/Menu/AvatarMenu";
import { Skeleton } from "@nextui-org/skeleton";
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
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handlerRef = useOutsideClick<HTMLDivElement>(() => onHide());
    const { data: session, status } = useSession();
    const { isDesktop } = useResize();

    const onHide = () => {
      setShowMenu(false);
    };

    useEffect(() => {
      if (showMenu) {
        setIsExpanded(true);
      }
    }, [showMenu]);

    useEffect(() => {
      if (!isExpanded) {
        setShowMenu(false);
      }
    }, [isExpanded]);

    return (
      <motion.aside
        layout
        className={clsx(
          "relative z-20 hidden min-h-screen bg-default-100 duration-700 transition-width md:block dark:bg-default-100",
          {
            "w-[90px]": !isExpanded,
            "!w-[300px]": isExpanded,
          },
        )}
      >
        <div
          className={clsx(
            "fixed left-0 top-0 z-20 flex h-screen min-h-screen flex-col justify-between gap-4 pb-4 pt-2 dark:border-white/10",
            className,
            {
              "w-[85px]": !isExpanded,
              "w-[246px]": isExpanded,
            },
          )}
        >
          <motion.aside
            layout
            className={clsx("mt-2 h-16 pt-2", {
              "mt-6 flex flex-col items-center justify-center gap-6":
                !isExpanded,
              "flex items-center justify-between px-6": isExpanded,
            })}
          >
            <NavigationLogo isExpanded={isExpanded} />
            <motion.button
              layout
              className={clsx(
                "z-10 grid h-6 w-6 place-content-center rounded-lg bg-default-200 p-4 backdrop-blur-sm",
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon
                width={24}
                icon={isExpanded ? "formkit:arrowleft" : "formkit:arrowright"}
              />
            </motion.button>
          </motion.aside>

          <nav
            className={clsx(
              "scrollbar-y-customize mt-6 w-full flex-grow overflow-y-auto transition-all",
              {
                "px-4": isExpanded,
                // "flex flex-col justify-center": !isExpanded,
              },
            )}
          >
            {menuOptions.map((option) => (
              <OptionItem
                isExpanded={isExpanded}
                key={option.id}
                item={option}
              />
            ))}
          </nav>
          {status === "loading" ? (
            <div className="flex w-40 items-center gap-2 rounded-full border p-2">
              <Skeleton className="h-8 w-8 rounded-full" />{" "}
              <aside>
                <Skeleton className="mb-1 h-3 w-14 rounded-xl" />
                <Skeleton className="h-2 w-10 rounded-xl" />
              </aside>
            </div>
          ) : (
            <div
              className={clsx(
                "mx-4 flex cursor-pointer flex-col items-center gap-4 rounded-full border  bg-white p-1.5 transition-width dark:border-none dark:border-white/10 dark:bg-default-200",
                {
                  "mx-auto w-fit border-none shadow-none": !isExpanded,
                  "rounded-lg": showMenu,
                },
              )}
              onClick={() => setShowMenu(!showMenu)}
              ref={handlerRef}
            >
              {showMenu && <Menu onHide={onHide} />}
              <div className="flex h-fit w-full items-center gap-2">
                <AvatarMenu />
                {isExpanded && isDesktop && (
                  <aside className="flex flex-col items-start">
                    <p
                      className="m-0 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap p-0 text-sm font-semibold dark:text-white"
                      title={session?.user.name ?? ""}
                    >
                      {session?.user.name}
                    </p>
                    <span
                      className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap text-xs dark:text-slate-300"
                      title={session?.user.email ?? ""}
                    >
                      {session?.user.email}
                    </span>
                  </aside>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    );
  },
);

export default SideBar;

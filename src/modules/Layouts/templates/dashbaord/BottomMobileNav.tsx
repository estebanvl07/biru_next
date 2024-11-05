import Link from "next/link";
import React from "react";
import clsx from "clsx";

import { mobileOptions } from "./SideBar/options";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useParams, usePathname } from "next/navigation";

const BottomMobileNav = () => {
  const params = useParams();
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed bottom-0 z-30 flex w-full items-center justify-between border-t bg-white/50 px-8 py-4 pb-10 backdrop-blur-md dark:border-white/10 dark:bg-default-300/50">
        {mobileOptions.map(({ href, icon, name, id }) => {
          return (
            <Link
              key={id}
              href={`/account/${params?.acc}${href}`}
              className="flex flex-col items-center justify-center gap-2"
              title={name}
            >
              <Icon
                icon={icon}
                width={24}
                className={clsx({
                  "text-primary": pathname?.includes(href),
                })}
              />
              <span className="hidden overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs sm:block sm:w-20">
                {name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default BottomMobileNav;

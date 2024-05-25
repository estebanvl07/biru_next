import { useParams } from "next/navigation";
import { useState } from "react";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { HandlerTheme } from "~/modules/components";
import AvatarMenu from "./Menu/AvatarMenu";
import CreationMenu from "./CreationMenu/CreationMenu";
import Menu from "./Menu/Menu";
import FilterTemplates from "./FilterTemplates";

import { useOutsideClick } from "~/lib/hooks";
import { useResize } from "~/lib/hooks/useResize";
import { Skeleton } from "@nextui-org/skeleton";

// TODO: add loader
export default function HeaderMenu() {
  const params = useParams();

  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();

  const handlerRef = useOutsideClick<HTMLDivElement>(() => onHide());
  const { isDesktop } = useResize();

  const onHide = () => {
    setShowMenu(false);
  };

  return (
    <motion.nav
      layout
      className="relative z-10 flex items-center justify-end gap-1"
    >
      <HandlerTheme />
      <FilterTemplates />
      {params?.acc && <CreationMenu />}

      {status === "loading" ? (
        <div className="flex w-40 items-center gap-2 rounded-full border p-2">
          <Skeleton className="h-8 w-8 rounded-full" />{" "}
          <aside>
            <Skeleton className="mb-1 h-3 w-14 rounded-xl" />
            <Skeleton className="h-2 w-10 rounded-xl" />
          </aside>
        </div>
      ) : (
        <>
          <div
            className="flex cursor-pointer items-center gap-2 rounded-full border p-1.5 shadow-md dark:border-none dark:border-white/10 dark:bg-default-50"
            onClick={() => setShowMenu(!showMenu)}
            ref={handlerRef}
          >
            <AvatarMenu />
            {isDesktop && (
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
            <Icon
              icon="heroicons-outline:menu-alt-3"
              width={18}
              className="mr-2"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
          {showMenu && <Menu onHide={onHide} />}
        </>
      )}
    </motion.nav>
  );
}

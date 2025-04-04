import { Skeleton } from "@heroui/skeleton";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import { useResize } from "~/lib/hooks/useResize";
import AvatarMenu from "~/modules/Layouts/templates/dashbaord/Header/Menu/AvatarMenu";
import Menu from "~/modules/Layouts/templates/dashbaord/Header/Menu/Menu";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handlerRef = useOutsideClick<HTMLDivElement>(() => onHide());

  const { isDesktop } = useResize();
  const { status, data: session } = useSession();

  const onHide = () => {
    setShowMenu(false);
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex w-40 items-center gap-2 rounded-full border p-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <aside>
            <Skeleton className="mb-1 h-3 w-14 rounded-xl" />
            <Skeleton className="h-2 w-10 rounded-xl" />
          </aside>
        </div>
      ) : (
        <div
          className={clsx(
            "flex cursor-pointer flex-col items-center gap-4 p-1.5",
          )}
          onClick={() => setShowMenu(!showMenu)}
          ref={handlerRef}
        >
          <div className="flex h-fit w-full items-center gap-2">
            <AvatarMenu />
          </div>
        </div>
      )}
      {showMenu && <Menu onHide={onHide} />}
    </>
  );
};

export default UserMenu;

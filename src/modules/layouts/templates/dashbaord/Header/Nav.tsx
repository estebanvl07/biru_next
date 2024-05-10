"use client";
import { useSession } from "next-auth/react";
import { HandlerTheme } from "~/modules/components";

import AvatarMenu from "./Menu/AvatarMenu";
import CreationMenu from "./CreationMenu/CreationMenu";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import Menu from "./Menu/Menu";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  type?: "empty" | "dashboard";
};

export default function HeaderMenu({ type = "dashboard" }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();
  const params = useParams();
  const handlerRef = useOutsideClick<HTMLDivElement>(() => onHide());

  const onHide = () => {
    setShowMenu(false);
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <nav
      className="relative z-10 flex items-center justify-end gap-3"
      // ref={navRef}
    >
      <HandlerTheme />
      {params?.acc && <CreationMenu />}

      <div
        className="flex cursor-pointer items-center gap-2 rounded-full border p-1.5 shadow-md dark:border-white/10"
        onClick={() => setShowMenu(!showMenu)}
        ref={handlerRef}
      >
        <AvatarMenu />
        <div className="flex flex-col items-start">
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
        </div>
        <Icon
          icon="heroicons-outline:menu-alt-3"
          width={18}
          className="mr-2"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      {showMenu && <Menu onHide={onHide} />}
    </nav>
  );
}

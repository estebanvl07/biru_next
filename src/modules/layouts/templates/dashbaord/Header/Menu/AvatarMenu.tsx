"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Avatar } from "primereact/avatar";

import Menu from "./Menu";
import { useOutsideClick } from "~/lib/hooks";

const AvatarMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handlerRef = useOutsideClick<HTMLDivElement>(() => onHide());

  const { data: session, status } = useSession();

  const onHide = () => {
    setShowMenu(false);
  };

  return (
    <div className="relative flex items-center justify-center" ref={handlerRef}>
      <Avatar
        onClick={() => setShowMenu(!showMenu)}
        image={session?.user?.image ?? ""}
        shape="circle"
        size="large"
      />
      {showMenu && <Menu onHide={onHide} />}
    </div>
  );
};

export default AvatarMenu;

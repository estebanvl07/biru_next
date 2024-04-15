import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Avatar } from "primereact/avatar";
import Menu from "./Menu";

import { useOutsideClick } from "~/lib/hooks";
import Image from "next/image";

const AvatarMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handlerRef = useOutsideClick<HTMLDivElement>(() => onHide());

  const { data: session, status } = useSession();

  const onHide = () => {
    setShowMenu(false);
  };

  return (
    <div className="relative flex items-center justify-center" ref={handlerRef}>
      <Image
        src={session?.user?.image ?? ""}
        alt={`${session?.user.name}, Profile Image`}
        onClick={() => setShowMenu(!showMenu)}
        width={45}
        height={45}
        className="cursor-pointer rounded-full"
      />
      {/* <Avatar
        onClick={() => setShowMenu(!showMenu)}
        image={session?.user?.image ?? ""}
        shape="circle"
        size="large"
      /> */}
      {showMenu && <Menu onHide={onHide} />}
    </div>
  );
};

export default AvatarMenu;

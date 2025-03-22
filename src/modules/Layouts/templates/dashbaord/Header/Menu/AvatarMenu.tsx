import { useSession } from "next-auth/react";
import React, { useState } from "react";

import Image from "next/image";
import { Avatar } from "@heroui/react";

const AvatarMenu = () => {
  const { data: session, status } = useSession();

  return (
    <div className="relative flex items-center justify-center">
      <Avatar src={session?.user.image || ""} name={session?.user.name || ""} />
    </div>
  );
};

export default AvatarMenu;

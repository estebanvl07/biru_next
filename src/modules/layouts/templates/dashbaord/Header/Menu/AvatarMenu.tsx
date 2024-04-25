import { useSession } from "next-auth/react";
import React, { useState } from "react";

import Image from "next/image";

const AvatarMenu = () => {
  const { data: session, status } = useSession();

  return (
    <div className="relative flex items-center justify-center">
      {session?.user.image ? (
        <Image
          src={session?.user?.image ?? ""}
          alt={`${session?.user.name}, Profile Image`}
          width={45}
          height={45}
          className="cursor-pointer rounded-full"
        />
      ) : (
        <div className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-primary dark:bg-slate-900">
          <p className="text-center text-lg font-semibold uppercase text-white">
            {session?.user.name?.split("")[0]}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;

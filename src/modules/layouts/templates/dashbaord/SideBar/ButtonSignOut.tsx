"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut } from "next-auth/react";

import React from "react";
import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";
import { Button } from "~/modules/components";

const ButtonSignOut = () => {
  return (
    <Button
      variantStyle="empty"
      className="mx-4 mb-2 items-center !justify-start !px-6 !py-3 text-sm hover:bg-slate-100 hover:dark:bg-indigo-900/40"
      onClick={() => {
        signOut({
          callbackUrl: CALLBACK_SIGN_OUT_URL,
        });
      }}
    >
      <Icon
        icon="humbleicons:logout"
        width={24}
        className="text-indigo-600 dark:text-indigo-400"
      />
      <p className="whitespace-nowrap text-slate-900 dark:text-white">
        Cerrar sesión
      </p>
    </Button>
  );
};

export default ButtonSignOut;

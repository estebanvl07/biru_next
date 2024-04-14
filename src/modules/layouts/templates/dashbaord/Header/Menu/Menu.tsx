import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import type { ListMenu } from "~/types/root.types";
import { CALLBACK_SIGNOUT_URL } from "~/lib/constants/config";
import AccountsOptions from "./AccountsOptions";
import LinkOption from "../Linkoption";

const Menu = ({ onHide }: { onHide: () => void }) => {
  const options: ListMenu[] = [
    {
      label: "Perfil",
      href: "/profile",
      icon: "mdi:account-outline",
    },
    {
      label: "Configuración",
      href: "/settings",
      icon: "mingcute:settings-6-line",
    },
    {
      label: "Ayuda",
      href: "/help",
      icon: "material-symbols:help-outline",
    },
  ];

  return (
    <motion.div className="absolute right-0 top-16 flex w-52 flex-col rounded-md border bg-white py-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
      <AccountsOptions />
      <ul className="flex w-full flex-col">
        {options.map((option) => {
          return <LinkOption onHide={onHide} key={option.label} {...option} />;
        })}
        <hr />
        <button
          className="mt-2 flex items-center !justify-start gap-2 rounded-none !px-4 !py-2 text-sm font-normal hover:bg-gray-100 dark:hover:bg-slate-950"
          onClick={() =>
            signOut({
              callbackUrl: CALLBACK_SIGNOUT_URL,
            })
          }
        >
          <Icon icon="humbleicons:logout" width={18} />
          Cerrar Sesión
        </button>
      </ul>
    </motion.div>
  );
};

export default Menu;

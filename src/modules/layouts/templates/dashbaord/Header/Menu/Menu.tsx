import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import type { ListMenu } from "~/types/root.types";
import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";
import AccountsOptions from "./AccountsOptions";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/router";

const OPTIONS: ListMenu[] = [
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
    showLine: true,
    icon: "material-symbols:help-outline",
  },
  {
    label: "Cerrar Sesión",
    icon: "humbleicons:logout",
    href: "",
    onClick: () => {
      signOut({
        callbackUrl: CALLBACK_SIGN_OUT_URL,
      });
    },
  },
];

const Menu = ({ onHide }: { onHide: () => void }) => {
  const router = useRouter();

  return (
    <motion.div className="absolute right-0 top-16 flex w-52 flex-col rounded-md border bg-white/80 pb-1 pt-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
      <AccountsOptions />
      <ul className="flex w-full flex-col">
        <Listbox variant="flat" aria-label="options the app">
          {OPTIONS.map((option) => {
            return (
              <ListboxItem
                onClick={() => {
                  if (option.href) return router.push(option.href);
                  option.onClick && option.onClick();
                  onHide();
                }}
                color="primary"
                className="px-3 hover:rounded-md dark:hover:!text-white"
                showDivider={option.showLine}
                startContent={<Icon icon={option.icon ?? ""} />}
                key={option.label}
              >
                {option.label}
              </ListboxItem>
            );
          })}
        </Listbox>
      </ul>
    </motion.div>
  );
};

export default Menu;

import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";
import type { ListMenu } from "~/types/root.types";

import { Listbox, ListboxItem } from "@heroui/react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { HandlerTheme } from "~/modules/components";

const OPTIONS: ListMenu[] = [
  {
    label: "Libros",
    href: "/overview",
  },
  {
    label: "Cuentas",
    href: "/overview/settings/account",
  },
  {
    label: "Configuración",
    href: "/overview/settings",
  },
];

const APP_NAVIGATION: ListMenu[] = [
  {
    label: "Pagina de Inicio",
    href: "/",
  },
  {
    label: "Cerrar Sesión",
    icon: "humbleicons:logout",
    onClick: () => {
      signOut({
        callbackUrl: CALLBACK_SIGN_OUT_URL,
      });
    },
  },
];

const Menu = ({
  onHide,
  className,
}: {
  className?: string;
  onHide: () => void;
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "absolute top-12 z-50 flex w-72 flex-col rounded-xl border border-divider bg-white px-2 pb-1 pt-2 shadow-xl backdrop-blur-sm md:right-0 dark:bg-default-100",
        className,
      )}
    >
      <div className="my-2 px-4">
        <p className="font-medium">{session?.user.name}</p>
        <p>{session?.user.email}</p>
      </div>

      {/* <AccountsOptions /> */}
      <ul className="flex w-full flex-col">
        <Listbox
          className="border-b border-divider pb-2"
          variant="flat"
          aria-label="options the app"
        >
          {OPTIONS.map((option, index) => {
            return (
              <ListboxItem
                key={index}
                onPress={() => {
                  if (option.href) return router.push(option.href);
                  option.onClick && option.onClick();
                  onHide();
                }}
                className="px-3 py-2 hover:rounded-md hover:!bg-default-100 dark:!text-white dark:hover:!bg-default-200"
                showDivider={option.showLine}
                endContent={<Icon icon={option.icon ?? ""} />}
              >
                {option.label}
              </ListboxItem>
            );
          })}
        </Listbox>
        <div className="mb-1 flex items-center justify-between border-b border-divider py-2 pl-4 pr-3">
          <p>Cambiar Tema</p>
          <HandlerTheme isSmall />
        </div>
        <Listbox variant="flat" aria-label="options the app">
          {APP_NAVIGATION.map((option, index) => {
            return (
              <ListboxItem
                key={index}
                onPress={() => {
                  if (option.href) return router.push(option.href);
                  option.onClick && option.onClick();
                  onHide();
                }}
                className="rounded-md px-3 py-2 hover:!bg-default-100 dark:!text-white dark:hover:!bg-default-200"
                showDivider={option.showLine}
                endContent={<Icon icon={option.icon ?? ""} width={18} />}
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

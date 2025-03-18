import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";
import AccountsOptions from "./AccountsOptions";
import type { ListMenu } from "~/types/root.types";

import { Listbox, ListboxItem } from "@heroui/react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import clsx from "clsx";

const OPTIONS: ListMenu[] = [
  // {
  //   label: "Perfil",
  //   href: "/setting",
  //   icon: "mdi:account-outline",
  // },
  {
    label: "Configuración",
    href: "/setting",
    icon: "mingcute:settings-6-line",
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
  const router = useRouter();
  const params = useParams();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
      className={clsx(
        "absolute  top-16 flex w-52 flex-col rounded-md border bg-white pb-1 pt-2 backdrop-blur-sm md:right-0 dark:border-white/10 dark:bg-default-100",
        className,
      )}
    >
      <AccountsOptions />
      <ul className="flex w-full flex-col">
        <Listbox variant="flat" aria-label="options the app">
          {OPTIONS.map((option) => {
            return (
              <ListboxItem
                onClick={() => {
                  if (option.href)
                    return router.push(
                      `/account/${params?.acc}/${option.href}`,
                    );
                  option.onClick && option.onClick();
                  onHide();
                }}
                color="primary"
                className="px-3 hover:rounded-md dark:!text-white"
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

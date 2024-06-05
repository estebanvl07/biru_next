import React from "react";

import Section from "~/modules/Profile/Section";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";

import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";

import { signOut, useSession } from "next-auth/react";
import { useThemeContext } from "~/lib/context/themeContext";

const MobileSettingPage = () => {
  const { data } = useSession();

  const { theme, setTheme } = useThemeContext();
  const isDark = theme === "dark";

  const avatarSrc = data?.user.image ?? "";

  return (
    <div className="mx-auto flex max-w-[50rem] flex-col gap-2">
      <section className="flex flex-col items-center justify-center py-10">
        <Avatar
          isBordered
          src={avatarSrc}
          name={data?.user.name ?? ""}
          color="primary"
          aria-label="Avatar of user"
          classNames={{
            base: "!w-24 !h-24",
          }}
        />

        <p className="mt-2 block w-40 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-bold text-slate-900 dark:text-white">
          {data?.user.name ?? "Bienvenido"}
        </p>
        <span>{data?.user.email}</span>
      </section>
      <Section
        title="Aplicación"
        options={[
          // {
          //   id: 1,
          //   text: "Editar Perfil",
          //   startContent: <Icon icon="mage:user" width={20} />,
          //   href: "/setting/profile",
          // },
          // {
          //   id: 2,
          //   text: "Notificaciones",
          //   startContent: <Icon icon="lucide:bell" width={20} />,
          //   href: "/setting/notifications",
          // },
          {
            id: 3,
            text: "Tema",
            startContent: <Icon icon="iconoir:sun-light" width={20} />,
            onclick: () => setTheme(isDark ? "light" : "dark"),
          },
        ]}
      />
      <Section
        title="General"
        options={[
          {
            id: 1,
            text: "Ayuda",
            startContent: (
              <Icon icon="material-symbols:help-outline" width={20} />
            ),
            // href: "/help",
          },
          {
            id: 2,
            text: "Cerrar sessión",
            startContent: <Icon icon="material-symbols:logout" width={20} />,
            onclick: () =>
              signOut({
                callbackUrl: CALLBACK_SIGN_OUT_URL,
              }),
          },
        ]}
      />
    </div>
  );
};

export default MobileSettingPage;

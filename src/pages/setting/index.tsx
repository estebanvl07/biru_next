"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { undefined } from "zod";
import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";
import { useTheme } from "~/lib/hooks";
import { useResize } from "~/lib/hooks/useResize";
import { HandlerTheme } from "~/modules/components";
import DarkMode from "~/modules/components/atoms/HandlerTheme.component";
import DashboardLayout from "~/modules/layouts/Dashboard";
import MobileSettingPage from "~/modules/profile/MobileSettingPage";
import Section from "~/modules/profile/Section";
import { api } from "~/utils/api";

const ProfilePage = () => {
  const { data } = useSession();
  const { isMobile } = useResize();
  const { isDark, mode, onChangeMode } = useTheme();

  const avatarSrc = data?.user.image ?? "";

  return (
    <DashboardLayout title="Configuración">
      {isMobile ? (
        <MobileSettingPage />
      ) : (
        <div className="flex max-w-[50rem] flex-col items-center justify-center gap-10 rounded-xl border bg-default-50 p-8 lg:flex-row dark:border-white/10 dark:bg-default-200">
          <article className="flex w-full max-w-[15rem] flex-col items-center rounded-xl px-6 py-8 lg:items-start">
            <Avatar
              isBordered
              src={avatarSrc ?? undefined}
              name={data?.user.name ?? ""}
              color="primary"
              aria-label="Avatar of user"
              classNames={{
                base: "!w-24 !h-24",
              }}
            />

            <p className="mt-4 block w-40 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-bold text-slate-900 dark:text-white">
              {data?.user.name ?? "Bienvenido"}
            </p>
            <span>{data?.user.email}</span>
          </article>
          <aside className="w-full max-w-[32rem]">
            <Section
              title="Aplicación"
              options={[
                {
                  id: 1,
                  text: "Editar Perfil",
                  startContent: <Icon icon="mage:user" width={20} />,
                  href: "/setting/profile",
                },
                {
                  id: 2,
                  text: "Notificaciones",
                  startContent: <Icon icon="lucide:bell" width={20} />,
                  href: "/setting/notifications",
                },
                {
                  id: 3,
                  text: isDark ? "Modo claro" : "Modo Oscuro",
                  startContent: <Icon icon="iconoir:sun-light" width={20} />,
                  onclick: () => onChangeMode(),
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
                  href: "/help",
                },
                {
                  id: 2,
                  text: "Cerrar sessión",
                  startContent: (
                    <Icon icon="material-symbols:logout" width={20} />
                  ),
                  onclick: () =>
                    signOut({
                      callbackUrl: CALLBACK_SIGN_OUT_URL,
                    }),
                },
              ]}
            />
          </aside>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;

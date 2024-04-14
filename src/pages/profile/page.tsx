"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import DarkMode from "~/modules/components/atoms/HandlerTheme.component";
import Section from "~/modules/profile/Section";

const ProfilePage = () => {
  const session = useSession();

  return (
    <div className="mx-auto flex max-w-[50rem] flex-col gap-2">
      <section className="flex flex-col items-center justify-center gap-3 py-10">
        <Image
          src={session.data?.user.image ?? ""}
          width={100}
          height={100}
          className="rounded-full"
          alt="profile image"
        />

        <p className="block w-48 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-bold text-slate-900 dark:text-white">
          {session.data?.user.name ?? "Bienvenido"}
        </p>
      </section>
      <Section
        title="Perfil"
        options={[
          {
            id: 1,
            text: "Editar Perfil",
          },
          {
            id: 2,
            text: "Notificaciones",
          },
          {
            id: 3,
            text: "Tema",
            icon: <DarkMode />,
          },
        ]}
      />
      <Section
        title="Sesión"
        options={[
          {
            id: 1,
            text: "Cerrar Sesión",
            // onclick: () => handleLogout(),
          },
        ]}
      />
      {/* <Sections
        title="Sesión"
      /> */}
    </div>
  );
};

export default ProfilePage;

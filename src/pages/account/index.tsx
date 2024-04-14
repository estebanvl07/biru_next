"use client";
import { useSession } from "next-auth/react";
import React from "react";

import AccountCard from "~/modules/account/AccountCard";
import { Button } from "~/modules/components";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import WhitoutSideBar from "~/modules/layouts/templates/dashbaord/whitout-sidebar";

const AccountPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const accounts = [
    {
      balance: 321439,
      name: "Cuenta de Ahorros",
      createdAt: "",
      reference: "12",
      type: "1",
      id: 1,
      updatedAt: "",
    },
    {
      balance: 321439,
      name: "Tienda",
      createdAt: "",
      reference: "12",
      type: "1",
      id: 2,
      updatedAt: "",
    },
    {
      balance: 3212439,
      name: "Inversiones",
      createdAt: "",
      reference: "12",
      type: "1",
      id: 3,
      updatedAt: "",
    },
  ];

  const setAccount = (id: number) => {
    router.push(`/account/${id}/main`);
  };

  return (
    <WhitoutSideBar>
      <div className="relative grid h-full min-h-calc-48 w-full grid-cols-6 flex-row md:min-h-calc-64">
        <aside className="relative col-span-2 hidden min-h-calc-48 w-full flex-col justify-center bg-primary px-8 text-white md:min-h-calc-64 lg:flex dark:bg-slate-900">
          <div className="fixed top-[45%]">
            <h4 className="mb-4 text-2xl font-medium ">
              Hola {session?.user.name?.split(" ")[0]}, <br /> Bienvenido de
              vuelta
            </h4>
            <p className="mb-2 w-80 text-sm text-slate-300">
              Selecciona una cuenta existente o crea una nueva para administrar
              tus finanzas. Tu futuro financiero está a solo un clic de
              distancia
            </p>
          </div>
        </aside>
        <section className="col-span-6 flex min-h-calc-48 flex-col justify-center px-12 py-8 md:min-h-calc-64 lg:col-span-4">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 p-4">
            <Icon icon="ph:wallet" width={32} className="text-primary" />
          </div>
          <h2>Mis cuentas</h2>
          <p>Seleccione alguna de sus cuentas para continuar.</p>
          <div className="flex flex-wrap gap-2 py-2">
            {accounts.map((account) => {
              return (
                <AccountCard
                  key={account.id}
                  account={account}
                  onclick={() => setAccount(account.id)}
                />
              );
            })}
          </div>
          <Link href="/account/new">
            <Button className="mt-2 w-fit">Crear cuenta</Button>
          </Link>
        </section>
      </div>
    </WhitoutSideBar>
  );
};

export default AccountPage;

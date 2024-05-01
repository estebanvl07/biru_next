import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AccountCard from "~/modules/account/AccountCard";
import { Button } from "~/modules/components";
import { HeaderApp } from "~/modules/layouts/templates/dashbaord";

import { api } from "~/utils/api";

const AccountPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: accounts } = api.userAccount.getAll.useQuery();

  const setAccount = (id: number) => router.push(`/account/${id}/main`);

  useEffect(() => {
    if (accounts?.length === 0) router.push(`/account/new`);
  }, [accounts]);

  return (
    <div className="relative grid h-screen w-full grid-cols-6 flex-row">
      <aside className="relative col-span-2 hidden w-full flex-col justify-center bg-primary px-8 text-white lg:flex dark:bg-slate-900">
        <Image
          src="/logo-white.svg"
          className="absolute left-4 top-6"
          alt="Logo de Biru en Blanco"
          width={80}
          height={49}
        />
        <div className="fixed top-[45%]">
          <h4 className="mb-4 text-2xl font-medium ">
            Hola {session?.user.name?.split(" ")[0]}, <br /> Bienvenido de
            vuelta
          </h4>
          <p className="mb-2 w-80 text-sm text-slate-300">
            Selecciona una cuenta existente o crea una nueva para administrar
            tus finanzas. Tu futuro financiero está a solo un clic de distancia
          </p>
        </div>
      </aside>
      <section className="col-span-6 flex flex-col justify-start px-12 py-4 lg:col-span-4">
        <HeaderApp title="Cuentas" />
        <div className="flex h-full flex-col justify-center">
          <h2>Mis cuentas</h2>
          <p>Seleccione alguna de sus cuentas para continuar.</p>
          <div className="flex flex-wrap gap-2 py-2">
            {accounts?.map((account) => {
              return (
                <AccountCard
                  key={account.id}
                  account={account as any}
                  onclick={() => setAccount(account.id)}
                />
              );
            })}
          </div>
          <Link href="/account/new">
            <Button className="mt-4 w-fit">Crear cuenta</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;

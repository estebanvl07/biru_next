import React from "react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import AccountCard from "~/modules/account/AccountCard";
import { Button } from "~/modules/components";
import { HeaderApp } from "~/modules/layouts/templates/dashbaord";

import type { GetServerSideProps } from "next";
import { useAccounts } from "~/modules/account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { Icon } from "@iconify/react/dist/iconify.js";
import WhitoutSideBar from "~/modules/layouts/templates/dashbaord/whitout-sidebar";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const helpers = await createServerSideCaller(ctx);

  const accounts = await helpers.userAccount.getAll.fetch();

  if (accounts.length === 0) {
    return {
      redirect: {
        destination: "/account/new",
        permanent: false,
      },
    };
  }

  const trpcState = helpers.dehydrate();

  return {
    props: {
      trpcState,
    },
  };
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.1,
    },
  },
};

const AccountPage = () => {
  const router = useRouter();
  const { accounts } = useAccounts();
  const { data: session } = useSession();

  const navigateAccount = (id: number) => router.push(`/account/${id}/main`);

  return (
    <>
      <Head>
        <title>Biru - Cuentas</title>
        <meta
          name="description"
          content="Selecciona una cuenta para continuar"
        />
      </Head>
      <div className="relative grid h-screen w-full grid-cols-6 flex-row dark:bg-slate-950">
        <aside className="relative col-span-2 hidden w-full flex-col justify-center bg-primary px-8 text-white dark:bg-slate-900 lg:flex">
          <Image
            src="/logo-white.svg"
            className="absolute left-4 top-6"
            alt="Logo de Biru en Blanco"
            width={80}
            height={49}
          />
          <div className="mt-12">
            <div className="mb-6 grid h-16 w-16 place-content-center rounded-full border bg-white dark:border-none dark:bg-slate-800">
              <Icon
                icon="material-symbols:account-balance-outline"
                className="text-primary dark:text-white"
                width={32}
              />
            </div>
            <h4 className="mb-4 text-2xl font-medium ">
              Hola {session?.user.name?.split(" ")[0]}, <br /> Bienvenido de
              vuelta
            </h4>
            <p className="mb-2 w-80 text-sm text-slate-300">
              Selecciona una cuenta, o crea una nueva para administrar tus
              finanzas. Tu futuro financiero está a solo un clic de distancia
            </p>
          </div>
        </aside>
        <section className="col-span-6 flex flex-col justify-start px-12 py-4 lg:col-span-4">
          <HeaderApp title="Cuentas" />
          <div className="flex h-full flex-col justify-center">
            <h2>Mis cuentas</h2>
            <p>Seleccione alguna de sus cuentas para continuar.</p>
            <motion.div
              className="flex flex-wrap gap-2 py-2"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {accounts.map((account) => {
                return (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={() => navigateAccount(account.id)}
                  />
                );
              })}
            </motion.div>
            <Link href="/account/new" className="w-fit">
              <Button className="mt-4">Crear cuenta</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default AccountPage;

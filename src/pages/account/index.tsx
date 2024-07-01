import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { HeaderApp } from "~/modules/Layouts/templates/dashbaord";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import HeaderMobile from "~/modules/Layouts/templates/dashbaord/Header/HeaderMobile";
import AccountCard from "~/modules/Account/AccountCard";

import type { GetServerSideProps } from "next";
import { useAccounts } from "~/modules/Account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";

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
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { accounts } = useAccounts();
  const { isMobile, isDesktop } = useResize();
  const { data: session } = useSession();

  const navigateAccount = (id: number) => router.push(`/account/${id}/main`);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Biru - Mis Cuentas</title>
        <meta
          name="description"
          content="Selecciona una cuenta para continuar"
        />
      </Head>
      <main className="relative grid h-screen w-full grid-cols-6 flex-row dark:bg-slate-950">
        <aside className="relative col-span-2 hidden w-full flex-col justify-center bg-primary px-8 text-white lg:flex dark:bg-slate-900">
          <Image
            src="/logo-white.svg"
            className="absolute left-4 top-6"
            alt="Logo de Biru en Blanco"
            width={80}
            height={49}
          />
          <article className="mt-12">
            <div className="mb-6 grid h-16 w-16 place-content-center rounded-full border bg-white dark:border-none dark:bg-slate-800">
              <Icon
                icon="material-symbols:account-balance-outline"
                className="text-primary dark:text-white"
                width={32}
              />
            </div>
            <h4 className="mb-4 text-2xl font-medium ">
              Hola {session?.user.name?.split(" ")[0]}, <br /> Bienvenido
            </h4>
            <p className="mb-2 w-80 text-sm text-slate-300">
              Selecciona una cuenta, o crea una nueva para administrar tus
              finanzas. Tu futuro financiero está a solo un clic de distancia
            </p>
          </article>
        </aside>
        <section className="col-span-6 flex flex-col justify-start px-4 py-4 md:px-12 lg:col-span-4">
          {isDesktop ? (
            <HeaderApp title="Cuentas" hasFilter={false} />
          ) : (
            <HeaderMobile title="Cuentas" />
          )}

          <nav className="mt-4 flex items-center justify-between">
            <h3>Mis cuentas</h3>
            <Button
              color="primary"
              type="button"
              as={Link}
              href="/account/new"
              isIconOnly={isMobile}
            >
              <Icon icon="ph:plus" width={18} /> {!isMobile && "Crear Cuenta"}
            </Button>
          </nav>
          {isClient && (
            <motion.div
              className="mt-2 grid grid-cols-1 flex-wrap gap-2 py-2 sm:grid-cols-2 xl:flex"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {accounts.map((account) => {
                return (
                  <AccountCard
                    key={account.id}
                    account={account}
                    hoverStyles
                    onClick={() => navigateAccount(account.id)}
                  />
                );
              })}
            </motion.div>
          )}
        </section>
      </main>
    </>
  );
};

export default AccountPage;

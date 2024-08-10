import { useRouter } from "next/router";
import Head from "next/head";
import clsx from "clsx";

import { HeaderApp, SideBar } from "./templates/dashbaord";
import { useResize } from "~/lib/hooks/useResize";
import HeaderMobile from "./templates/dashbaord/Header/HeaderMobile";
import BottomMobileNav from "./templates/dashbaord/BottomMobileNav";
import { useCurrentAccount } from "~/modules/Account/hooks";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import MainLoader from "../Loaders/mainLoader.component";
import { useEffect, useState } from "react";
import Breadcrum from "./templates/Breadcrum";
import { Button } from "@nextui-org/button";

import Link from "next/link";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const DashboardLayout = ({
  children,
  title,
  headDescription,
  hasFilter = false,
  serviceOptions = true,
}: {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  serviceOptions?: boolean;
  hasFilter?: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);
  const { account, isLoading } = useCurrentAccount();
  const { isMobile } = useResize();

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   if (isLoading === false && !account) {
  //     router.push("/account")
  //   }
  // }, [isLoading])

  return (
    <div className="bg-zinc-100/50 flex overflow-hidden dark:bg-slate-950">
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>
      {<SideBar serviceOptions={serviceOptions} />}
      {isMobile && <BottomMobileNav />}

      <section className="z-0 h-full min-h-screen w-full flex-grow py-3 md:pl-60">
        <div className="flex flex-col md:px-8">
          {!isMobile ? (
            <HeaderApp title={title} hasFilter={hasFilter} />
          ) : (
            <HeaderMobile title={title} />
          )}
          <AnimatePresence>
            <motion.main
              className={clsx("z-0 mt-4 px-content md:px-0", {
                "pb-16": isMobile,
              })}
              key={router.route}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              {isClient ? <>{children}</> : <MainLoader />}
              {!isMobile && (
                <footer className="mt-4 flex w-full items-center justify-between text-xs">
                  <p>Desarrollado por Esteban vl & Pedro Va</p>
                  <span className="flex items-center gap-1">
                    Hecho con
                    <Icon
                      icon="mdi:heart-outline"
                      width={24}
                      className="text-red-500"
                    />
                  </span>
                </footer>
              )}
            </motion.main>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;

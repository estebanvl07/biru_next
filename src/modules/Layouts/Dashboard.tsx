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
import DrawerOptions from "./templates/DrawerOptions";
import Sheet from "../components/molecules/Sheet";

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
  const { isMobile } = useResize();

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex h-screen flex-row overflow-hidden bg-default-100 md:p-1.5 md:pl-0 dark:bg-slate-900">
      <AnimatePresence>
        <Head>
          <title>Biru - {title}</title>
          <meta name="description" content={headDescription} />
        </Head>
        {<SideBar serviceOptions={serviceOptions} />}
        {isMobile && <BottomMobileNav />}
        {isMobile && <DrawerOptions />}

        <section className="z-0  h-full w-full flex-grow overflow-y-auto rounded-md rounded-tl-2xl border bg-white pb-3 pt-6   scrollbar-hide dark:border-white/10 dark:bg-slate-950">
          <div className="mx-auto flex max-w-[78rem] flex-col md:px-8">
            {!isMobile ? (
              <HeaderApp title={title} hasFilter={hasFilter} />
            ) : (
              <HeaderMobile title={title} />
            )}
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
                <footer className="z-0 mt-4 flex w-full items-center justify-between text-xs">
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
          </div>
        </section>
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;

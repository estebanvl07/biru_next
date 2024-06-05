import { useRouter } from "next/router";
import Head from "next/head";
import clsx from "clsx";

import { HeaderApp, SideBar } from "./templates/dashbaord";
import { useResize } from "~/lib/hooks/useResize";
import HeaderMobile from "./templates/dashbaord/Header/HeaderMobile";
import BottomMobileNav from "./templates/dashbaord/BottomMobileNav";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import MainLoader from "../Loaders/mainLoader.component";
import { useEffect, useState } from "react";

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

  const router = useRouter();
  const { size } = useResize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex overflow-hidden dark:bg-slate-950">
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>
      {<SideBar serviceOptions={serviceOptions} />}
      {size && size <= 768 && <BottomMobileNav />}
      <section className="z-0 h-full min-h-screen w-full flex-grow py-3 md:pl-60">
        <div className="flex flex-col px-4 md:px-8">
          {size && size >= 768 ? (
            <HeaderApp title={title} hasFilter={hasFilter} />
          ) : (
            <HeaderMobile title={title} />
          )}
          <AnimatePresence>
            <motion.main
              className={clsx("z-0", {
                "pb-24": size && size <= 768,
              })}
              key={router.route}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              {isClient ? <>{children}</> : <MainLoader />}
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
            </motion.main>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;

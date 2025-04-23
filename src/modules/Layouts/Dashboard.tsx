import { useRouter } from "next/router";
import Head from "next/head";
import clsx from "clsx";

import { HeaderApp, SideBar } from "./templates/dashbaord";
import { useResize } from "~/lib/hooks/useResize";
import HeaderMobile from "./templates/dashbaord/Header/HeaderMobile";
import BottomMobileNav from "./templates/dashbaord/BottomMobileNav";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import DrawerOptions from "./templates/DrawerNavigationMenu";
import Breadcrum from "./templates/Breadcrum";
import { NotificationListener } from "../components/molecules/Notifications/NotificationListener";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const DashboardLayout = ({
  children,
  title,
  headDescription,
  subtitle,
  activityContent,
  headerProps,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headDescription?: string;
  activityContent?: React.ReactNode;
  headerProps?: {
    rightContent?: React.ReactNode;
    subtitle?: string;
  };
  serviceOptions?: boolean;
  hasFilter?: boolean;
}) => {
  const { isMobile } = useResize();
  const router = useRouter();

  return (
    <div className="flex h-screen flex-row overflow-hidden bg-white dark:bg-slate-900">
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>
      <div className="flex w-full flex-col">
        {!isMobile ? (
          <HeaderApp
            rightContent={headerProps?.rightContent}
            subtitle={headerProps?.subtitle}
            hasNotifications
            logo
          />
        ) : (
          <HeaderMobile title={title} />
        )}
        <div className="relative flex h-full w-full flex-row pb-20 md:pr-4">
          <SideBar />
          <NotificationListener />
          {isMobile && <BottomMobileNav />}
          {isMobile && <DrawerOptions />}
          <section className="relative z-0 h-full w-full flex-grow overflow-hidden overflow-y-auto rounded-xl border-divider/10 bg-white pb-10 scrollbar-hide md:border md:bg-default-50/50 md:pt-4 dark:bg-slate-900 md:dark:bg-slate-950">
            <div className="mx-auto flex max-w-[90rem] flex-col md:px-8">
              {!isMobile && (
                <>
                  {/* <Breadcrum /> */}
                  <div className="flex flex-row items-center justify-between">
                    <aside>
                      <h1 className="text-start text-xl font-semibold -tracking-wide text-primary lg:text-3xl dark:text-slate-200">
                        {title}
                      </h1>
                      {subtitle && (
                        <p className="text-gray-600 dark:text-slate-200">
                          {subtitle}
                        </p>
                      )}
                    </aside>
                    {activityContent}
                  </div>
                </>
              )}
              <motion.main
                className={clsx("z-0 px-content md:mt-4 md:px-0", {
                  "pb-16": isMobile,
                })}
                key={router.pathname}
                variants={variants}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {children}
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
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import Head from "next/head";
import React, { FC, useState, useEffect } from "react";

import { HeaderApp } from "~/modules/Layouts/templates/dashbaord";
import HeaderMobile from "./Header/HeaderMobile";

import { useResize } from "~/lib/hooks/useResize";
import { Tab, Tabs } from "@heroui/tabs";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

interface DashboardProps {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  hasFilter?: boolean;
  subtitle?: string;
  hasLogout?: boolean;
  hasLeftContent?: boolean;
  headerChildren?: React.ReactNode;
  hasLogo?: boolean;
  hasNotifications?: boolean;
}

const OverviewLayout: FC<DashboardProps> = ({
  children,
  title,
  headDescription,
  hasNotifications,
  subtitle,
  hasLogout,
}) => {
  const pathname = usePathname();
  const { isMobile } = useResize();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>

      <main className="mx-auto flex min-h-screen w-full flex-grow flex-col bg-default-100 dark:bg-slate-950">
        <div className="border-b border-divider bg-white px-8 pt-4 dark:bg-slate-900">
          {isMobile ? (
            <HeaderMobile title={title} />
          ) : (
            <HeaderApp
              hasLogout={hasLogout}
              hasNotifications={hasNotifications}
              title={title}
              subtitle={subtitle}
              hasFilter={false}
              hasLeftContent={false}
              logo
            >
              <div className="flex gap-3">
                <Tabs
                  selectedKey={pathname}
                  variant="underlined"
                  classNames={{
                    tabList: "px-0",
                    cursor: "-bottom-1",
                  }}
                >
                  <Tab title="Libros" href="/overview" key={"/overview"}></Tab>
                  <Tab
                    title="Configuración"
                    href="/overview/settings"
                    key={"/overview/settings"}
                  ></Tab>
                </Tabs>
              </div>
            </HeaderApp>
          )}
        </div>
        <AnimatePresence>
          <div className="mx-auto w-full max-w-[80rem] p-4">
            {isClient && children}
          </div>
        </AnimatePresence>
      </main>
    </>
  );
};

export default OverviewLayout;

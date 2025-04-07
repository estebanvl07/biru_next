import Head from "next/head";
import React, { FC, useState, useEffect } from "react";

import { HeaderApp } from "~/modules/Layouts/templates/dashbaord";
import HeaderMobile from "./Header/HeaderMobile";

import { useResize } from "~/lib/hooks/useResize";
import { Tab, Tabs } from "@heroui/tabs";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

interface DashboardProps {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  hasFilter?: boolean;
  subtitle?: string;
  showOptions?: boolean;
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

      <main className="mx-auto flex min-h-screen w-full flex-grow flex-col overflow-x-hidden bg-default-100 dark:bg-slate-950">
        <div className="border-b border-divider  bg-white py-2 md:px-8 dark:bg-slate-900">
          {isMobile ? (
            <HeaderMobile title={title} />
          ) : (
            <HeaderApp
              hasGoBack={false}
              hasLogout={hasLogout}
              hasNotifications={hasNotifications}
              title={title}
              subtitle={subtitle}
              hasFilter={false}
              hasLeftContent={false}
              logo
            >
              <div className="flex items-center gap-6">
                <Link title="Libros" href="/overview">
                  Libros
                </Link>
                <Link title="Configuración" href="/overview/settings">
                  Configuración
                </Link>
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

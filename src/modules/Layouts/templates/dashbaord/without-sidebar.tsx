import Head from "next/head";
import React, { FC, useState, useEffect } from "react";

import { HeaderApp } from "~/modules/Layouts/templates/dashbaord";
import HeaderMobile from "./Header/HeaderMobile";

import { useResize } from "~/lib/hooks/useResize";

interface DashboardProps {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  hasFilter?: boolean;
  hasLogout?: boolean;
}

const WithoutSideBar: FC<DashboardProps> = ({
  children,
  title,
  headDescription,
  hasFilter,
  hasLogout,
}) => {
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

      <main className="flex min-h-screen w-full flex-grow flex-col bg-gradient-to-r from-zinc-100 to-zinc-100 px-8 py-4 dark:from-default-50 dark:via-default-100 dark:to-default-50">
        {isMobile ? (
          <HeaderMobile title={title} />
        ) : (
          <HeaderApp
            hasLogout={hasLogout}
            title={title}
            hasFilter={hasFilter}
            logo
          />
        )}
        {isClient && children}
      </main>
    </>
  );
};

export default WithoutSideBar;

import Head from "next/head";
import React, { FC, useState, useEffect } from "react";

import { HeaderApp } from "~/modules/Layouts/templates/dashbaord";
import HeaderMobile from "./Header/HeaderMobile";

import { useResize } from "~/lib/hooks/useResize";

interface DashboardProps {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  hasFilter?: boolean
}

const WithoutSideBar: FC<DashboardProps> = ({
  children,
  title,
  headDescription,
  hasFilter
}) => {
  const { isMobile } = useResize()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>
     
      <main className="w-full min-h-screen flex flex-col flex-grow px-8 py-4 bg-white dark:bg-slate-950">
        {
          isMobile ? <HeaderMobile title={title} /> :
          <HeaderApp title={title} hasFilter={hasFilter} logo />
        }
        {isClient && children}
      </main>
    </>
  );
};

export default WithoutSideBar;

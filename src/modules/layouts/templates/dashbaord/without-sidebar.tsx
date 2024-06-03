import Head from "next/head";
import React, { FC } from "react";
import { HeaderApp } from "~/modules/layouts/templates/dashbaord";

interface DashboardProps {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
}

const WithoutSideBar: FC<DashboardProps> = ({
  children,
  title,
  headDescription,
}) => {
  return (
    <>
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>
      <div className="flex h-full min-h-screen flex-col bg-white dark:bg-slate-950">
        <main className="w-full flex-grow px-8 py-4">
          <HeaderApp title={title} />
          {children}
        </main>
      </div>
    </>
  );
};

export default WithoutSideBar;

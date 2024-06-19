import type { FC } from "react";
import { Header } from "~/modules/components/Header";
import Head from "next/head";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const BasicLayout: FC<LayoutProps> = ({
  children,
  title = "Biru - Finanzas personales",
  description = "Descubre la manera mas sencilla de manejar tu finanzas",
}) => {
  return (
    <div className="bg-white from-slate-950 to-slate-950 dark:bg-gradient-to-b">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className="relative flex h-full min-h-screen flex-col px-2 sm:px-0">
        {/* ??? */}
        <span
          className="absolute -top-20 h-[40%] w-[98%] rounded-b-[20rem] bg-none blur-3xl dark:bg-indigo-950/40"
          aria-hidden="true"
          aria-label="header-light-shadow"
        />
        <Header />
        {children}
      </main>
    </div>
  );
};

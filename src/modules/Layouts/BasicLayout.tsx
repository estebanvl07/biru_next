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
    <div className="bg-gradient-to-r from-zinc-100 to-zinc-100 dark:from-default-50 dark:via-default-100 dark:to-default-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className="relative flex h-full min-h-screen flex-col px-2 sm:px-0">
        {/* ??? */}

        <div className="absolute top-0 -z-0 hidden h-screen w-full bg-[url(/point.svg)] bg-repeat dark:block" />
        <Header />
        {children}
      </main>
    </div>
  );
};

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
    <div className="h-screen bg-white dark:bg-slate-950">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className="relative flex h-full flex-col overflow-hidden px-2 pb-16 sm:px-0">
        <Header />
        {children}
      </main>
    </div>
  );
};

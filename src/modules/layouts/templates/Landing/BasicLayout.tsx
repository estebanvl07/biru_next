import { FC } from "react";
import { Header } from ".";
import Head from "next/head";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const BasicLayout: FC<LayoutProps> = ({
  children,
  title = "Biru - Finanzas personales",
  description = "Descubre la manera mas sencilla de manejar tu finanzas",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <main className="h-[calc(100vh-78.19px)]">{children}</main>
    </>
  );
};

export default BasicLayout;

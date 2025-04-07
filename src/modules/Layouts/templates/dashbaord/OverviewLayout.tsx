import Head from "next/head";
import React, { FC } from "react";

import { HeaderApp } from "~/modules/Layouts/templates/dashbaord";
import HeaderMobile from "./Header/HeaderMobile";

import { useResize } from "~/lib/hooks/useResize";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Toaster } from "sonner";

interface DashboardProps {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  subtitle?: string;
  showOptions?: boolean;
  hasLogout?: boolean;
  headerChildren?: React.ReactNode;
  hasNotifications?: boolean;
}

const OverviewLayout: FC<DashboardProps> = ({
  children,
  title,
  headDescription,
  hasNotifications,
  subtitle,
}) => {
  const { isMobile } = useResize();

  return (
    <>
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>

      <main className="mx-auto flex min-h-screen w-full flex-grow flex-col overflow-x-hidden bg-default-50/50 dark:bg-slate-950">
        <div className="border-b border-divider/10 bg-white md:px-8 dark:bg-slate-900">
          {isMobile ? (
            <HeaderMobile title={title} />
          ) : (
            <HeaderApp
              hasGoBack={false}
              hasLogout={false}
              hasNotifications={hasNotifications}
              subtitle={subtitle}
              className="!px-0"
              hasFilter={false}
              rightContent={
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className="border border-divider font-medium"
                  >
                    Feedback
                  </Button>
                  <Link href={"/overview/settings"}>Ayuda</Link>
                  <Link href={"/overview/settings"}>Configuración</Link>
                </div>
              }
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
        <div className="mx-auto w-full max-w-[1360px] p-6">{children}</div>
        <Toaster position="bottom-left" />
      </main>
    </>
  );
};

export default OverviewLayout;

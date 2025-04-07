import React, { useEffect, useRef } from "react";
import OverviewLayout from "./templates/dashbaord/OverviewLayout";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "General",
    href: "#",
  },
  {
    name: "Mis Categorías",
    href: "category",
  },
  {
    name: "Entidades",
    href: "entities",
  },
  {
    name: "Mis Cuentas",
    href: "account",
  },
  {
    name: "Personalizar Plantillas",
    href: "templates",
  },
  {
    name: "Seguridad",
    href: "#",
  },
  {
    name: "Información de la Cuenta",
    href: "#",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);
  const pathname = usePathname();

  return (
    <OverviewLayout title="Configuración">
      <div className="hidden border-b py-4 pb-8 md:block">
        <h2 className="text-4xl -tracking-wide">Configuración</h2>
      </div>
      <main className="flex flex-col items-start gap-4 md:mt-10 md:flex-row md:gap-8">
        <aside className="flex w-full flex-col rounded-xl md:w-64">
          <ul className="flex  flex-row overflow-x-auto py-1 scrollbar-hide md:flex-col md:py-0">
            {routes.map(({ href, name }) => {
              const isActive = pathname.includes(href);
              return (
                <Link
                  id={href}
                  key={name}
                  ref={isActive ? activeRef : null}
                  href={`/overview/settings/${href}`}
                  className={clsx(
                    "whitespace-nowrap rounded-lg px-4 py-2 text-sm hover:bg-default-200",
                    {
                      "bg-default-200 font-semibold": isActive,
                    },
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </ul>
        </aside>
        <div className="w-full flex-grow md:w-auto">{children}</div>
      </main>
    </OverviewLayout>
  );
};

export default SettingsLayout;

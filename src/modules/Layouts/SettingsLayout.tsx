import React from "react";
import OverviewLayout from "./templates/dashbaord/OverviewLayout";
import Link from "next/link";
import { Input, Tab, Tabs } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Spotlight } from "../components/ui/spotLight";

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
  return (
    <OverviewLayout>
      <Spotlight />
      <div className="border-b py-10">
        <h2 className="text-3xl -tracking-wide">Configuración</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <main className="mt-10 flex items-start gap-8">
        <aside className="flex w-64 flex-col">
          <ul className="flex flex-col">
            {routes.map(({ href, name }) => (
              <Link
                key={name}
                href={`/overview/settings/${href}`}
                className="rounded-lg px-4 py-2 text-sm hover:bg-default-200"
              >
                {name}
              </Link>
            ))}
          </ul>
        </aside>
        <div className="flex-grow">{children}</div>
      </main>
    </OverviewLayout>
  );
};

export default SettingsLayout;

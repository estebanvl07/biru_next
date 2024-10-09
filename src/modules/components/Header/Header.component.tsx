import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import { HandlerTheme } from "../atoms";
import { useResize } from "~/lib/hooks/useResize";
import { usePathname } from "next/navigation";
import { useThemeContext } from "~/lib/context/Theme.context";

export const Header = () => {
  const { theme } = useThemeContext();
  const { size } = useResize();

  return (
    <header className="z-20 w-full bg-white text-gray-600 sm:px-0 dark:bg-default-200">
      <div className="relative mx-auto flex max-w-[76rem] items-center justify-between gap-2 px-4 py-3">
        <aside className="flex items-center gap-16">
          <Link href="/">
            <Image
              src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
              alt="Logo de Biru"
              width={120}
              height={60}
            />
          </Link>
          {size && size >= 590 && <Navigator />}
        </aside>
        <div className="flex flex-grow basis-0 justify-end gap-2">
          <Button
            variant="ghost"
            className="border-none"
            as={Link}
            href="/login"
          >
            Iniciar sesión
          </Button>
          <Button color="primary" as={Link} href="/login">
            Registrarme
          </Button>
          <Button
            isIconOnly
            radius="full"
            as={Link}
            href="/login"
            className="bg-default-100 md:hidden"
            variant="flat"
          >
            <Icon
              icon="material-symbols:login"
              className="dark:text-slate-300"
              width={20}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

const NAVIGATOR_LINKS = [
  {
    href: "/",
    text: "Inicio",
  },
  {
    href: "/login",
    text: "Ventajas",
  },
  {
    href: "/register",
    text: "¿Como Inicio?",
  },
  {
    href: "/register",
    text: "Guia",
  },
  {
    href: "/register",
    text: "Sopórte",
  },
];

const Navigator = () => {
  const { isMobile } = useResize();
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "relative mx-auto flex w-fit items-center justify-center gap-4 rounded-full px-6 [&>a]:transition-all hover:[&>a]:scale-105",
        {
          " !gap-3 [&>a]:!text-xs": isMobile,
        },
      )}
    >
      {NAVIGATOR_LINKS.map(({ href, text }) => {
        return (
          <div
            key={href}
            className="relative flex h-full w-fit flex-col items-center justify-center"
          >
            <Link
              href={href}
              className={clsx("font-normal", {
                "font-semibold": pathname === href,
              })}
            >
              {text}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

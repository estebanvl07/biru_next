import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Icon } from "@iconify/react/dist/iconify.js";

import { HandlerTheme } from "../atoms";
import { useResize } from "~/lib/hooks/useResize";
import { usePathname } from "next/navigation";
import { useThemeContext } from "~/lib/context/Theme.context";
import DarkMode from "../atoms/HandlerTheme.component";
import { Button } from "@heroui/button";
import Sheet from "../molecules/Sheet";
import { useState } from "react";

export const Header = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const { theme } = useThemeContext();
  const { size, isMobile } = useResize();

  return (
    <header className="sticky left-0 top-0 z-40 mx-auto flex w-full max-w-[60rem] items-center justify-between bg-white/70 px-4 py-4 text-gray-600 shadow-lg shadow-indigo-800/10 backdrop-blur-lg md:top-2 md:mt-2 md:rounded-xl md:py-2 dark:bg-default-200/50 dark:shadow-black/50">
      <aside className="flex flex-grow basis-0 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={theme === "dark" ? "/logo-white.svg" : "/logo.png"}
            alt="Logo de Biru"
            width={isMobile ? 26 : 20}
            height={20}
          />
          <span className="text-base font-semibold md:text-sm dark:text-white">
            Biru
          </span>
        </Link>
      </aside>
      {size && size >= 590 && <Navigator />}
      {size && size >= 590 && (
        <div className="flex flex-grow basis-0 justify-end gap-1">
          <HandlerTheme />
          <Button variant="bordered" as={Link} href="/login">
            Iniciar sesión
          </Button>
          <Button color="primary" as={Link} href="/login">
            Registrarme
          </Button>
        </div>
      )}
      {isMobile && (
        <div className="flex flex-grow items-center justify-end gap-2">
          <HandlerTheme />

          {/* <Button variant="flat" as={Link} href="/login" color="primary">
            Iniciar sesión
          </Button> */}
          <Button isIconOnly onClick={() => setShowSideNav(true)}>
            <Icon icon="heroicons:bars-3-bottom-right-16-solid" width={24} />
          </Button>
          <Sheet
            isOpen={showSideNav}
            onClose={() => setShowSideNav(false)}
            title="Menu"
            classNames={{
              main: "w-screen max-w-[20rem]",
            }}
          >
            <p>wefnwef</p>
          </Sheet>
        </div>
      )}
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
];

const Navigator = () => {
  const { isMobile } = useResize();
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "relative flex w-fit items-center justify-center gap-4 [&>a]:transition-all hover:[&>a]:scale-105",
        {
          " !gap-3 [&>a]:!text-xs": isMobile,
        },
      )}
    >
      {NAVIGATOR_LINKS.map(({ href, text }) => {
        return (
          <div
            key={href}
            className="relative flex h-full w-fit flex-col items-center justify-center text-zinc-500 dark:text-white"
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

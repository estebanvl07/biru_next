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
  const { isMobile, size } = useResize();

  return (
    <header className="z-20 w-full px-4 sm:px-0">
      <div className="relative mx-auto flex max-w-[72rem] items-center justify-between gap-2 py-4 md:px-8">
        <Link href="/">
          <Image
            src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
            alt="Logo de Biru"
            width={120}
            height={60}
          />
        </Link>
        {size && size >= 590 && <Navigator />}
        <div className="flex justify-end gap-2">
          <HandlerTheme />
          {isMobile && (
            <Button
              isIconOnly
              radius="full"
              as={Link}
              href="/login"
              className="bg-default-100"
              variant="flat"
            >
              <Icon
                icon="material-symbols:login"
                className="dark:text-slate-300"
                width={20}
              />
            </Button>
          )}
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
    text: "Iniciar Sesión",
  },
  {
    href: "/register",
    text: "¡Quiero Registarme!",
  },
];

const Navigator = () => {
  const { isMobile } = useResize();
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "mx-auto flex w-fit items-center justify-center gap-6 rounded-full bg-primary/10 px-6 py-1 text-primary dark:bg-slate-950/60 dark:text-primary-light [&>a]:transition-all hover:[&>a]:scale-105",
        {
          " !gap-3 [&>a]:!text-xs": isMobile,
        },
      )}
    >
      {NAVIGATOR_LINKS.map(({ href, text }, i) => {
        return (
          <Link
            key={i}
            href={href}
            className={clsx("font-normal", {
              "font-semibold": pathname === href,
            })}
          >
            {text}
          </Link>
        );
      })}
    </nav>
  );
};

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Icon } from "@iconify/react/dist/iconify.js";

import { useResize } from "~/lib/hooks/useResize";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { HandlerTheme } from "../atoms";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

export const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const { isMobile } = useResize();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <div className="flex h-14 w-full items-center justify-center bg-indigo-600 text-white">
        <p className="!text-white">
          Optimiza tu negocio en un 80%, usando Biru
        </p>
      </div> */}
      <header
        className={clsx(
          "sticky top-0 z-50 w-full bg-white/60 px-4 py-3 text-gray-600 backdrop-blur-sm dark:bg-slate-950/50",
          {
            "border-b border-divider/10": hasScrolled,
          },
        )}
      >
        <div className="mx-auto flex max-w-[70rem] items-center justify-between">
          <aside className="flex flex-grow basis-0 items-center">
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              <Image
                src={"/logo.svg"}
                alt="Logo de Biru"
                width={isMobile ? 24 : 20}
                height={20}
              />
              <p className="text-xl font-semibold md:text-2xl dark:text-white">
                Biru
              </p>
            </Link>
          </aside>
          {!isMobile && (
            <div className="flex items-center gap-8">
              <Navigator />

              <div className="flex flex-grow basis-0 justify-end gap-2">
                <HandlerTheme />
                <Button
                  className="dark:bg-white dark:text-black"
                  as={Link}
                  href="/login"
                >
                  Iniciar sesión
                </Button>
                <Button
                  startContent={<LayoutGrid width={18} />}
                  color="primary"
                  as={Link}
                  href="/register"
                >
                  Comenzar Gratis
                </Button>
              </div>
            </div>
          )}
          {isMobile && (
            <div className="flex flex-grow items-center justify-end gap-2">
              <Button color="primary" as={Link} href="/login">
                Iniciar Sesión
              </Button>
              <Button isIconOnly onPress={() => setShowSideNav(true)}>
                <Icon
                  icon="heroicons:bars-3-bottom-right-16-solid"
                  width={24}
                />
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
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

  return (
    <nav
      className={clsx(
        "relative flex w-fit items-center justify-center gap-6 [&>a]:transition-all hover:[&>a]:scale-105",
        {
          " !gap-3 [&>a]:!text-xs": isMobile,
        },
      )}
    >
      {NAVIGATOR_LINKS.map(({ href, text }, index) => {
        return (
          <div
            key={index}
            className="relative flex h-full w-fit flex-col items-center justify-center text-sm text-zinc-500 dark:text-white"
          >
            <Link href={href} className={"font-normal"}>
              {text}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

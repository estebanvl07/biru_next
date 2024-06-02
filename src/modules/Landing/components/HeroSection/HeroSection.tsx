import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@nextui-org/button";
import { Header } from "~/modules/components/Header";
import { Chip } from "@nextui-org/react";
import { useResize } from "~/lib/hooks/useResize";
import { useThemeContext } from "~/lib/context/themeContext";

export const HeroSection = () => {
  const { theme } = useThemeContext();
  const { isMobile } = useResize();

  const isDark = theme === "dark";

  return (
    <div className="fade-bottom relative z-10 mx-auto flex h-screen max-h-[56rem] w-full flex-col items-center md:overflow-hidden md:px-2">
      <Header />
      <span className="absolute -top-20 h-[40%] w-[98%] rounded-b-[20rem] bg-none blur-3xl dark:bg-indigo-950/40"></span>
      <div className="absolute -top-12 h-[40rem] w-4/5 bg-opacity-10 bg-[url('/grid.svg')] bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-30"></div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-4 md:flex-col md:gap-4">
        <motion.article
          initial={{
            scale: 0.6,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="relative z-10 flex w-full flex-col items-center justify-center py-8"
        >
          <Chip
            className="mb-2 bg-primary/10 py-1 text-center text-primary dark:bg-indigo-500/20 dark:text-slate-300"
            variant="flat"
          >
            <span className="flex gap-2">
              Toma control de tus finanzas
              <Icon icon="material-symbols:finance-mode-rounded" width={20} />
            </span>
          </Chip>
          <h1 className="z-10 my-2 text-center font-encode text-4xl font-bold !leading-none tracking-tight sm:text-5xl md:text-6xl">
            Domina tu{" "}
            <span className="highlight font-encode text-primary dark:text-primary-light">
              futuro financiero
            </span>
            <br /> con facilidad
          </h1>

          <p className=" text-pretty text-center text-sm opacity-80 md:max-w-md md:text-base lg:text-base">
            Crea hábitos financieros con Biru, conoce como se mueve tu dinero de
            la forma más fácil.
          </p>

          <nav className="order-2 mt-6 flex w-full flex-col justify-center gap-4 sm:max-w-md sm:flex-row md:order-1 lg:justify-start">
            <Link href="/register" aria-label="registrate ahora">
              <Button
                radius="full"
                color="primary"
                size={isMobile ? "md" : "lg"}
                className="w-full !py-4 lg:w-auto"
              >
                <span className="whitespace-nowrap">Iniciar ahora</span>
                <Icon icon="material-symbols:login" width={24} />
              </Button>
            </Link>
            <Link href="#" aria-label="Conoce como funciona aqui">
              <Button
                radius="full"
                color="primary"
                size={isMobile ? "md" : "lg"}
                variant="bordered"
                className="w-full border-1 py-4 lg:w-auto dark:bg-indigo-800/20 dark:text-primary-light dark:backdrop-blur-lg"
              >
                <span className="whitespace-nowrap">Como funciona</span>
                <Icon icon="solar:play-circle-bold" width={24} />
              </Button>
            </Link>
          </nav>
        </motion.article>
        <motion.div
          initial={{
            y: 40,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="fade-bottom relative hidden h-44 w-full items-center justify-center overflow-hidden md:flex md:h-[20rem]"
        >
          <Image
            src={isDark ? "/dashboard-dark.png" : "/dashboard-light.png"}
            width={1160}
            height={500}
            className="w-[50rem] drop-shadow-2xl md:absolute md:top-0"
            alt="Dashboard in mobile representation"
            data-todo="set size"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
};

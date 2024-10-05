import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@nextui-org/button";
import { Header } from "~/modules/components/Header";
import { useThemeContext } from "~/lib/context/Theme.context";

export const HeroSection = () => {
  const { theme } = useThemeContext();

  const isDark = theme === "dark";

  return (
    <div className="fade-bottom relative z-10 flex h-screen max-h-[56rem] w-full flex-col items-center bg-gradient-to-r from-fuchsia-100 to-indigo-100 md:overflow-hidden">
      <Header />

      <div
        className="absolute -top-12 h-[32rem] w-4/5 bg-opacity-10 bg-[url('/grid.svg')] bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-20"
        aria-hidden="true"
        aria-label="background-grid"
      />
      <div className="mx-auto flex h-full w-full flex-col items-center gap-8 px-4 pl-4 md:max-w-[76rem] md:flex-row md:justify-center md:gap-4">
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
          className="z-10  flex w-full flex-col items-start justify-center gap-4 border py-8"
        >
          <h1 className="font-poppins z-10 my-2 text-4xl font-semibold !leading-none -tracking-wider sm:text-[62px] ">
            Domina tu{" "}
            <span className="highlight font-encode text-primary dark:text-primary-light ">
              futuro financiero
            </span>
            <br />
            con facilidad
          </h1>

          <p className=" text-pretty text-start text-sm opacity-90 md:max-w-md">
            Crea hábitos financieros con Biru, conoce como se mueve tu dinero de
            la forma más fácil.
          </p>

          <nav className="order-2 mt-2 flex w-full flex-col justify-start gap-4 sm:max-w-md sm:flex-row md:order-1">
            <Button
              color="primary"
              href="/login"
              as={Link}
              size="md"
              className="w-full !py-4 px-6 lg:w-auto"
            >
              <span className="whitespace-nowrap">Iniciar ahora</span>
              <Icon icon="material-symbols:login" width={24} />
            </Button>
            <Button
              size="md"
              as={Link}
              href="#"
              // variant="flat"
              className="w-full bg-primary/20 px-6 py-4 text-primary backdrop-blur-xl lg:w-auto dark:bg-indigo-800/20 dark:text-primary-light"
            >
              <span className="whitespace-nowrap">Como funciona</span>
              <Icon icon="solar:play-circle-bold" width={24} />
            </Button>
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
          className="relative right-0 z-10 flex h-full w-full rotate-45 items-center justify-center "
        >
          <Image
            src={"/mobile-das-re.png"}
            width={600}
            height={500}
            className="w-[20rem] drop-shadow-2xl md:absolute md:left-0 md:top-8"
            alt="Dashboard"
            data-todo="set size"
            loading="lazy"
          />
        </motion.div>
        <Image
          src={"/dashboard-re.png"}
          width={1200}
          height={650}
          className="absolute z-0 translate-x-[60%] drop-shadow-2xl md:top-20"
          alt="Dashboard"
          data-todo="set size"
          loading="lazy"
        />
      </div>
    </div>
  );
};

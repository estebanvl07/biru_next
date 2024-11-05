import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Header } from "~/modules/components/Header";
import { useThemeContext } from "~/lib/context/Theme.context";
import { Avatar, Button, Chip } from "@nextui-org/react";
import TypewriterComponent from "typewriter-effect";

export const HeroSection = () => {
  const { theme } = useThemeContext();

  const isDark = theme === "dark";

  return (
    <div className="relative z-10 flex h-full max-h-[32rem] w-full items-center  md:overflow-hidden">
      {/* <div
        className="absolute top-4 h-[32rem] w-11/12 bg-opacity-10 bg-[url('/grid.svg')] bg-cover bg-center bg-no-repeat opacity-15 md:top-24 dark:opacity-20"
        aria-hidden="true"
        aria-label="background-grid"
      /> */}
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
          className="relative z-10 flex w-full flex-col items-center justify-center py-16 md:py-32"
        >
          <Chip
            avatar={<Avatar name="B" color="primary" />}
            color="primary"
            variant="bordered"
            className="border-1 border-primary bg-primary/5 dark:border-white/10"
          >
            <TypewriterComponent
              options={{
                strings: [
                  "Cuida tu dinero de froma inteligente",
                  "Haz parte de nuestro",
                  "Te ayudamos a controlar tus ingresos de forma fácil",
                  "¡Empieza Ya!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Chip>
          <motion.h1
            initial={{
              height: 0,
              opacity: 0.6,
            }}
            whileInView={{
              opacity: 1,
              height: "auto",
            }}
            transition={{
              duration: 0.3,
            }}
            className="z-10 mb-6 mt-4 overflow-hidden text-center text-4xl font-medium !leading-none -tracking-wider sm:text-6xl "
          >
            Construye un futuro <br /> financiero sin esfuerzo.
          </motion.h1>

          <p className="text-pretty text-center text-sm opacity-90 md:max-w-xl">
            Con Biru, crea hábitos financieros y controla tu dinero de manera
            fácil y eficiente. Organiza y optimiza cada movimiento para alcanzar
            tus metas sin complicaciones.
          </p>

          <nav className="order-2 mt-4 flex w-full  flex-row justify-center gap-4 sm:max-w-md md:order-1">
            <Button
              color="primary"
              href="/login"
              as={Link}
              className="w-full !py-4 px-6 lg:w-auto"
            >
              <span className="whitespace-nowrap">Iniciar ahora</span>
              <Icon icon="material-symbols:login" width={24} />
            </Button>
            <Button
              variant="bordered"
              color="primary"
              href="/login"
              as={Link}
              className="w-full !py-4 px-6 lg:w-auto"
            >
              <span className="whitespace-nowrap">Iniciar ahora</span>
              <Icon icon="material-symbols:login" width={24} />
            </Button>
          </nav>
        </motion.article>
        {/* <motion.div
          initial={{
            y: 40,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="relative flex h-44 w-full items-center justify-center overflow-hidden md:h-[20rem]"
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
        </motion.div> */}
        {/* <Image
          src={"/dashboard-re.png"}
          width={1200}
          height={650}
          className="absolute z-0 translate-x-[60%] drop-shadow-2xl md:top-20"
          alt="Dashboard"
          data-todo="set size"
          loading="lazy"
        /> */}
      </div>
    </div>
  );
};

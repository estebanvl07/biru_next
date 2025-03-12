import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useThemeContext } from "~/lib/context/Theme.context";
import { Button } from "@heroui/button";
import Typewriter from "typewriter-effect";

export const Explore = () => {
  const { theme } = useThemeContext();

  return (
    <div className="px-4">
      <aside className="mx-auto mt-24">
        <h2 className="text-center font-encode text-3xl font-bold !leading-none tracking-tight md:text-4xl">
          Maneja con {""}
          <span className="font-encode text-primary dark:text-indigo-400">
            Biru
          </span>
          <br />
          tu negocio de forma fácil y sencilla
        </h2>
        <p className="m-auto mt-4 max-w-lg text-center">
          Usar esta aplicación para gestionar tu negocio ofrece beneficios
          significativos. Simplifica la contabilidad y el seguimiento de
          transacciones, facilita la planificación financiera y mejora la
          transparencia operativa.
        </p>
      </aside>
      <section className="mx-auto flex w-full flex-col-reverse items-center justify-around px-4 md:mb-28 md:max-w-[72rem] md:gap-8 md:px-8 lg:flex-row lg:gap-0">
        <motion.aside
          initial={{
            width: 0,
          }}
          whileInView={{
            width: "auto",
          }}
          transition={{
            duration: 1,
          }}
          className="absolute m-auto flex flex-col items-center overflow-hidden text-9xl text-opacity-20"
        >
          <h3 className="whitespace-nowrap text-8xl font-bold opacity-60 md:text-9xl">
            TOMA CONTROL
          </h3>
          <h3 className="whitespace-nowrap text-7xl font-bold opacity-30 md:text-8xl">
            DE TU DINERO.
          </h3>
        </motion.aside>
        <div className="group flex items-center md:gap-12">
          <motion.aside
            initial={{
              opacity: 0,
              rotate: "0deg",
              y: -40,
            }}
            whileInView={{
              opacity: 1,
              rotate: "-10deg",
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="floating-animation z-0 hover:z-10"
          >
            <Image
              src={"/mobile-light.png"}
              alt="Dashboard views"
              className="z-0 w-60 opacity-75 drop-shadow-xl transition-all duration-500 hover:z-10 hover:scale-110 hover:opacity-100  group-hover:-rotate-[4deg] dark:opacity-50"
              loading="lazy"
              width={520}
              height={380}
            />
          </motion.aside>
          <motion.aside
            initial={{
              opacity: 0,
              rotate: "0deg",
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              rotate: "12deg",
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="floating-animation-2"
          >
            <Image
              src={"/mobile-light.png"}
              alt="Dashboard views"
              className="z-0 mt-32 w-60 shadow-black drop-shadow-xl transition-all duration-500  hover:scale-110  group-hover:rotate-2"
              loading="lazy"
              width={520}
              height={380}
            />
          </motion.aside>
        </div>
        {/* <motion.aside
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <p className="mb-4 font-encode font-bold text-primary">
            Explora la facilidad de su uso
          </p>
          <h2 className="font-encode text-3xl font-bold !leading-none tracking-tight md:text-4xl">
            Maneja con {""}
            <span className="font-encode text-primary dark:text-indigo-400">
              Biru
            </span>
            <br />
            tu negocio de forma <br />
            fácil y sencilla
          </h2>
          <p className="mt-4  max-w-[26rem]">
            Usar esta aplicación para gestionar tu negocio ofrece beneficios
            significativos. Simplifica la contabilidad y el seguimiento de
            transacciones, facilita la planificación financiera y mejora la
            transparencia operativa. Con información precisa y accesible, tomar
            decisiones informadas se vuelve más sencillo, impulsando así la
            eficiencia y el crecimiento empresarial.
          </p>

          <Button
            href="/register"
            aria-label="Inicia aquí"
            color="primary"
            as={Link}
            className="mr-2 mt-8 w-full lg:w-fit"
          >
            <span className="whitespace-nowrap">Iniciar ahora</span>
          </Button>
          <Button
            variant="bordered"
            href="/register"
            aria-label="Inicia aquí"
            color="primary"
            as={Link}
            className="mt-8 w-full lg:w-fit"
          >
            <span className="whitespace-nowrap">Iniciar ahora</span>
          </Button>
        </motion.aside> */}
      </section>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useThemeContext } from "~/lib/context/themeContext";
import { Button } from "@nextui-org/button";

export const Explore = () => {
  const { theme } = useThemeContext();

  return (
    <section className="mx-auto my-10 flex w-full flex-col-reverse items-center justify-around gap-8 px-4 md:mb-28 md:max-w-[72rem] md:px-8 lg:flex-row lg:gap-0">
      <motion.aside
        initial={{
          opacity: 0,
          x: -40,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <Image
          src={theme === "dark" ? "/mobile.png" : "/mobile-light.png"}
          alt="Dashboard views"
          className="w-60 drop-shadow-xl"
          loading="lazy"
          width={520}
          height={380}
        />
      </motion.aside>
      <motion.aside
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quam
          perspiciatis cum recusandae repellat quidem.
        </p>
        <p className="mt-4  max-w-[26rem]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet fuga
          consequatur quo nam id cumque nobis laboriosam vitae quod fugit
          blanditiis tenetur consequuntur delectus, dolores autem ducimus
          voluptas! Non, molestiae!
        </p>
        <Button
          href="/register"
          aria-label="Inicia aquí"
          color="primary"
          as={Link}
          className="mt-8 w-full lg:w-fit"
        >
          <span className="whitespace-nowrap">Iniciar ahora</span>
        </Button>
      </motion.aside>
    </section>
  );
};

import Link from "next/link";
import { motion } from "framer-motion";

import { Avatar, Button, Chip } from "@heroui/react";
import TypewriterComponent from "typewriter-effect";
import { ChevronRight } from "lucide-react";
import { TextAnimate } from "~/modules/components/ui/TextAnimate";

export const HeroSection = () => {
  const title = "El Control Financiero que Necesitas";

  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 pb-8 pt-28">
      <div className="relative z-30 flex w-full flex-col items-center justify-center gap-8 px-8">
        <Chip
          avatar={<Avatar name="B" color="primary" />}
          color="primary"
          variant="bordered"
          className="border-1 border-primary bg-primary/5 text-base dark:border-indigo-200 dark:border-white/10 dark:text-indigo-200"
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
        <h1 className="text-center text-4xl font-medium leading-tight sm:text-5xl md:max-w-lg md:text-6xl lg:max-w-2xl">
          {title.split(" ").map((word, index) => (
            <TextAnimate
              className="z-10 w-full overflow-hidden px-1 text-center text-5xl font-medium !leading-none -tracking-wider sm:text-6xl  md:px-2 "
              animate="blurInUp"
              by="word"
              once
              delay={index * 0.1}
              duration={0.7}
              as={"span"}
            >
              {word}
            </TextAnimate>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-pretty text-center text-base opacity-90 md:max-w-xl lg:text-lg"
        >
          Gestiona tus ingresos, controla tus gastos y alcanza tus metas
          financieras desde un solo lugar.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            color="primary"
            size="lg"
            href="/login"
            as={Link}
            className="!py-4 px-6 lg:w-auto"
          >
            <span className="whitespace-nowrap">Empezar Ahora</span>
            <ChevronRight />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

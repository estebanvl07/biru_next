import { Swiper, SwiperSlide } from "swiper/react";
import { CardInfo } from "./CardInfo";
import { Pagination } from "swiper/modules";

import { useResize } from "~/lib/hooks/useResize";
import { AnimatePresence, motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import {
  Accordion,
  AccordionItem,
  card,
  Chip,
  Progress,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { groupedAnimation } from "~/modules/animations";

type CardProps = {
  id: number;
  icon: string;
  image: string;
  title: string;
  name: string;
  description: string;
};

const cards: CardProps[] = [
  {
    id: 5,
    icon: "material-symbols:analytics-outline",
    title: "Obten tus análisis",
    name: "Análisis",
    image: "/features/analytics.png",
    description:
      "El análisis de gastos permite identificar patrones de consumo, ajustar presupuestos y optimizar la gestión financiera personal o empresarial.",
  },
  {
    id: 4,
    icon: "ph:wallet-bold",
    title: "Multiples cuentas",
    name: "Cuentas",
    image: "/features/accounts.png",
    description:
      "Tener varias cuentas para diferentes fines simplifica la gestión financiera, ayuda a cumplir metas específicas y minimiza confusiones contables.",
  },

  {
    id: 3,
    icon: "material-symbols:balance",
    image: "/features/dashboard.png",
    title: "Balances Detallados",
    name: "Balances",
    description:
      "Saber los balances de una cuenta es crucial para tomar decisiones financieras informadas, evitar sobregiros y planificar con precisión.",
  },

  {
    id: 6,
    icon: "ph:users-bold",
    image: "/features/entities.png",
    title: "Registra tus contactos",
    name: "Entidades",
    description:
      "Crear entidades claras para registros financieros simplifica el seguimiento de transacciones y mejora la gestión contable.",
  },
  {
    id: 7,
    icon: "ph:target",
    image: "/features/goals.png",
    title: "Crea metas",
    name: "Metas",
    description:
      "Crear entidades claras para registros financieros simplifica el seguimiento de transacciones y mejora la gestión contable.",
  },
  {
    id: 1,
    icon: "iconamoon:category",
    title: "Registra transacciones",
    name: "Transacciones",
    image: "/features/transactions.png",
    description:
      "Separar gastos por categorías mejora la claridad financiera, permite controlar presupuestos y fomenta hábitos de ahorro efectivos.",
  },
  {
    id: 8,
    icon: "heroicons:wallet-solid",
    image: "/features/movements.png",
    title: "Movimientos  Fijos",
    name: "Movimientos",
    description:
      "Crear entidades claras para registros financieros simplifica el seguimiento de transacciones y mejora la gestión contable.",
  },
];

export const Advantages = () => {
  const { isMobile } = useResize();
  const [itemSelected, setItemSelected] = useState<CardProps | null>(cards[0]!);
  const [showCard, setShowCard] = useState(true);

  const onChangeItem = (item: CardProps) => {
    setShowCard(false);
    setItemSelected(item);
    setTimeout(() => {
      setShowCard(true);
    }, 300);
  };

  return (
    <div className="mx-auto flex h-fit w-full max-w-[72rem] flex-col items-center px-4 md:h-auto md:min-h-screen md:items-start">
      <h2 className="text-4xl">Funcionalidades</h2>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit magni
        exercitationem ipsam.
      </p>
      <section className="mt-10 flex w-full flex-col items-center gap-8 md:flex-row">
        <motion.aside
          initial={{ x: -30 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
          layout
          className="relative flex max-h-[40rem] w-full max-w-[38rem] flex-grow flex-row gap-6 overflow-hidden rounded-xl border bg-white/80 p-6 shadow-2xl md:h-[100vh] md:flex-col md:gap-0 md:p-8 dark:border-white/10 dark:bg-default-200/30"
        >
          <div className="absolute left-2 top-0 -z-0 hidden h-full w-full bg-[url(/point.svg)] bg-repeat dark:block" />
          <AnimatePresence>
            {itemSelected && showCard && (
              <>
                <aside className="flex-1">
                  <motion.h4
                    initial={{
                      x: -100,
                      opacity: 0.6,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className=" mb-4 text-3xl font-semibold md:text-4xl"
                  >
                    {itemSelected?.title}
                  </motion.h4>
                  <motion.p
                    initial={{
                      x: -100,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    {itemSelected?.description}
                  </motion.p>
                </aside>
                <motion.aside
                  initial={{
                    opacity: 0.2,
                    x: 80,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    x: 80,
                    opacity: 0.2,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative w-[50%]"
                >
                  <motion.div className="absolute -bottom-16 left-0 top-0 w-[60rem] md:left-16 md:top-auto">
                    <Image
                      src={itemSelected?.image}
                      width={1200}
                      className="w-full rounded-2xl border drop-shadow-2xl duration-300 md:left-auto dark:border-white/10"
                      height={600}
                      loading="lazy"
                      alt={itemSelected?.title}
                    />
                  </motion.div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </motion.aside>
        <motion.div
          initial={{
            y: 50,
          }}
          whileInView={{
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="flex w-full flex-1 flex-col items-center justify-center gap-6 "
        >
          <aside className="flex w-full flex-col items-center justify-center text-end md:items-end md:justify-end">
            <h3>¿Ya conocias nuestras funcionalidades?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </aside>
          <div className="flex w-full flex-wrap items-end justify-center gap-2 overflow-auto scrollbar-hide md:justify-end">
            {cards.map((item) => {
              return (
                <div
                  key={item.id}
                  title={item.name}
                  onClick={() => {
                    onChangeItem(item);
                  }}
                  className={clsx(
                    "flex max-w-[28rem] cursor-pointer items-center gap-3 rounded-xl border bg-white/50 px-6 py-2 transition-colors dark:border-white/10 dark:bg-default-100/20",
                    {
                      "bg-white dark:bg-default-100":
                        item.id === itemSelected?.id,
                    },
                  )}
                >
                  <Icon icon={item.icon} width={18} />
                  <h2 className="text-xl font-medium md:text-2xl">
                    {item.name}
                  </h2>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

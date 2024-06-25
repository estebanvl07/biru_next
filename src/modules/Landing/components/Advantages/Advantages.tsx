import { Swiper, SwiperSlide } from "swiper/react";
import { CardInfo } from "./CardInfo";
import { Pagination } from "swiper/modules";

import { useResize } from "~/lib/hooks/useResize";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const cards = [
  {
    id: 1,
    icon: "iconamoon:category",
    title: "Crea categorías",
    description:
      "Separar gastos por categorías mejora la claridad financiera, permite controlar presupuestos y fomenta hábitos de ahorro efectivos.",
  },
  {
    id: 2,
    icon: "ph:wallet-bold",
    title: "Multiples cuentas",
    description:
      "Tener varias cuentas para diferentes fines simplifica la gestión financiera, ayuda a cumplir metas específicas y minimiza confusiones contables.",
    color: "primary",
  },
  {
    id: 3,
    icon: "material-symbols:balance",
    title: "Balances",
    description:
      "Saber los balances de una cuenta es crucial para tomar decisiones financieras informadas, evitar sobregiros y planificar con precisión.",
  },
  {
    id: 4,
    icon: "material-symbols:analytics-outline",
    title: "Análisis",
    description:
      "El análisis de gastos permite identificar patrones de consumo, ajustar presupuestos y optimizar la gestión financiera personal o empresarial.",
    color: "primary",
  },
  {
    id: 5,
    icon: "ph:users-bold",
    title: "Entidades",
    description:
      "Crear entidades claras para registros financieros simplifica el seguimiento de transacciones y mejora la gestión contable.",
  },
];

export const Advantages = () => {
  const { isMobile } = useResize();

  return (
    <section className="mx-auto mt-8 flex w-full flex-col px-4 sm:mt-14 md:max-w-[72rem] md:items-center lg:mt-16">
      <motion.aside
        initial={{
          opacity: 0.5,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="flex-grow"
      >
        <h2 className="font-encode text-3xl font-bold tracking-tight md:text-center md:text-4xl">
          Conoce las ventajas de
          <br /> usar{" "}
          <span className="font-encode text-primary dark:text-indigo-400">
            Biru
          </span>{" "}
        </h2>
        <p className="mt-2 md:text-center ">
          Con Biru podrás llevar un mejor manejo <br /> de tus ingresos y
          egresos
        </p>
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
        className="mt-8 flex h-full w-full items-center justify-center overflow-auto"
      >
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={isMobile ? 10 : 30}
          className="mySwipper"
        >
          {cards.map((card) => {
            return (
              <SwiperSlide key={card.id}>
                <CardInfo {...(card as any)} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </section>
  );
};

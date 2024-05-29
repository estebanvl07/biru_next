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
      "Mantén un orden de tus transacciones y crea categorías donde indicas en que gastas tu dinero",
  },
  {
    id: 2,
    icon: "ph:wallet-bold",
    title: "Multiples cuentas",
    description:
      "Lleva en orden no solo tus finanzas personales si no también tus negocios e inversiones",
    color: "primary",
  },
  {
    id: 3,
    icon: "iconamoon:category",
    title: "Balances",
    description:
      "Lleva un balance de tus cuentas y mira las estadísticas de ingresos y egresos",
  },
  {
    id: 4,
    icon: "ph:wallet-bold",
    title: "Multiples cuentas",
    description:
      "Lleva en orden no solo tus finanzas personales si no también tus negocios e inversiones",
    color: "primary",
  },
  {
    id: 5,
    icon: "iconamoon:category",
    title: "Balances",
    description:
      "Lleva un balance de tus cuentas y mira las estadísticas de ingresos y egresos",
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
          spaceBetween={isMobile ? 10 : 300}
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

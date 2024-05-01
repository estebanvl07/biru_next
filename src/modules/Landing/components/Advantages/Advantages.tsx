import { CardInfo } from "./CardInfo";

export const Advantages = () => {
  return (
    <section className="mt-8 flex w-full flex-col items-center px-4 sm:mt-14 lg:mt-16">
      <aside className="flex-grow">
        <h2 className="text-center font-encode text-3xl font-bold tracking-tight md:text-4xl">
          Conoce las ventajas de
          <br /> usar{" "}
          <span className="font-encode text-primary dark:text-indigo-400">
            Biru
          </span>{" "}
        </h2>
        <p className="mt-2 text-center ">
          Con Biru podrás llevar un mejor manejo <br /> de tus ingresos y
          egresos
        </p>
      </aside>
      <section className="mt-8 flex flex-col gap-6 md:flex-row lg:mt-16">
        <CardInfo
          icon="iconamoon:category"
          title="Crea categorías"
          description="Mantén un orden de tus transacciones y crea categorías donde indicas en que gastas tu dinero"
        />
        <CardInfo
          icon="ph:wallet-bold"
          title="Multiples cuentas"
          description="Lleva en orden no solo tus finanzas personales si no también tus negocios e inversiones"
          color="primary"
        />
        <CardInfo
          icon="iconamoon:category"
          title="Balances"
          description="Lleva un balance de tus cuentas y mira las estadísticas de ingresos y egresos"
        />
      </section>
    </section>
  );
};

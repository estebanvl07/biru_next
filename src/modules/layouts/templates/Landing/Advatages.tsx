import { LandingCardInfo } from ".";

const Advatages = () => {
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
        <LandingCardInfo
          icon="iconamoon:category"
          title="Crea categorías"
          description="Manten un orden de tus transacciónes y crea categorías donde indicas en que gastas tu dinero"
        />
        <LandingCardInfo
          icon="ph:wallet-bold"
          title="Multiples cuentas"
          description="Lleva en orden no solo tus finanzas personales si no tambien tus negocios e inversiones"
          color="primary"
        />
        <LandingCardInfo
          icon="iconamoon:category"
          title="Balances"
          description="Lleva un balance de tus cuentas y mira las estadisticas de ingresos y egresos"
        />
      </section>
    </section>
  );
};

export default Advatages;

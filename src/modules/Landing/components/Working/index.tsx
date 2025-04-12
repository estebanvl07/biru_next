import { BrainIcon, Eye, FlagIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import BlurFade from "~/modules/components/ui/BlurFade";

const WorkingSection = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-y-16 overflow-hidden px-4">
      <header className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-center text-primary">COMO FUNCIONA</p>
        <h2 className="text-4xl tracking-tight md:text-5xl">
          Solo 3 Pasos para Empezar
        </h2>
      </header>
      <div className="flex w-full flex-col-reverse items-center gap-32 md:flex-row">
        <div className="relative flex min-w-[60rem] flex-1 flex-row gap-16 overflow-x-auto md:min-w-[32rem] md:flex-col">
          <BlurFade inView delay={0.1} duration={0.5}>
            <div className="flex flex-col items-center gap-4 border-t border-primary bg-transparent pl-10 md:flex-row md:border-l">
              <div>
                <span className="flex h-12 w-12  items-center justify-center rounded-full bg-indigo-600/20 text-primary dark:text-white">
                  <Eye width={24} />
                </span>
              </div>
              <aside>
                <h2 className="max-w-xs text-xl">Visibilidad y Control</h2>
                <p className="text-base">
                  Visualiza tus ingresos, gastos y saldos en un solo lugar para
                  tomar decisiones informadas y evitar sorpresas financieras.
                </p>
              </aside>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.2} duration={0.5}>
            <div className="flex flex-col items-start gap-4 border-t border-primary bg-transparent py-4 md:flex-row md:items-center md:border-l md:pl-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 text-primary dark:text-white">
                  <FlagIcon width={24} />
                </span>
              </div>
              <aside>
                <h2 className="max-w-xs text-xl">Seguimiento de Metas</h2>
                <p className="text-base">
                  Crea objetivos claros como ahorrar, pagar deudas o invertir, y
                  monitorea tu progreso de forma sencilla y motivadora.
                </p>
              </aside>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.3} duration={0.5}>
            <div className="flex items-center gap-4 border-l border-primary bg-transparent pl-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 text-primary dark:text-white">
                  <BrainIcon width={24} />
                </span>
              </div>
              <aside>
                <h2 className="max-w-xs text-xl"> Reportes Inteligentes</h2>
                <p className="text-base">
                  Automatiza registros y genera reportes visuales que te ayudan
                  a entender tus hábitos financieros
                </p>
              </aside>
            </div>
          </BlurFade>
        </div>
        <aside className="flex h-full flex-grow items-center">
          <Image
            src="/thumbnail.png"
            alt="Thumbnail de Biru"
            className="rounded-xl border-4 border-divider shadow-2xl"
            width={500}
            height={500}
          />
        </aside>
      </div>
    </section>
  );
};

export default WorkingSection;

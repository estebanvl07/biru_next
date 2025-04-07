import { Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BrainIcon, Eye, FlagIcon } from "lucide-react";
import React from "react";
import BlurFade from "~/modules/components/ui/BlurFade";

const Problem = () => {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-16 px-4">
      <header className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-center text-primary">SOLUCIONES</p>
        <h2 className="text-4xl tracking-tight md:text-5xl">
          Conoce Nuestras Soluciones
        </h2>
      </header>

      <div className="relative mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BlurFade inView delay={0.1} duration={0.5}>
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="flex flex-col items-start justify-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 text-primary dark:text-white">
                <Eye width={24} />
              </div>
              <h2 className="max-w-xs text-xl">Visibilidad y Control</h2>
            </CardHeader>
            <CardBody>
              <p className="text-base">
                Visualiza tus ingresos, gastos y saldos en un solo lugar para
                tomar decisiones informadas y evitar sorpresas financieras.
              </p>
            </CardBody>
          </Card>
        </BlurFade>
        <BlurFade inView delay={0.2} duration={0.5}>
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="flex flex-col items-start justify-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 text-primary dark:text-white">
                <FlagIcon width={24} />
              </div>
              <h2 className="max-w-xs text-xl">Seguimiento de Metas</h2>
            </CardHeader>
            <CardBody>
              <p className="text-base">
                Crea objetivos claros como ahorrar, pagar deudas o invertir, y
                monitorea tu progreso de forma sencilla y motivadora.
              </p>
            </CardBody>
          </Card>
        </BlurFade>
        <BlurFade inView delay={0.3} duration={0.5}>
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="flex flex-col items-start justify-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 text-primary dark:text-white">
                <BrainIcon width={24} />
              </div>
              <h2 className="max-w-xs text-xl"> Reportes Inteligentes</h2>
            </CardHeader>
            <CardBody>
              <p className="text-base">
                Automatiza registros y genera reportes visuales que te ayudan a
                entender tus hábitos financieros
              </p>
            </CardBody>
          </Card>
        </BlurFade>
      </div>
    </section>
  );
};

export default Problem;

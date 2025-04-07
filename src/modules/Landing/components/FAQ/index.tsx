import { Accordion, AccordionItem } from "@heroui/react";
import React from "react";

const FAQ = () => {
  return (
    <section className="mx-auto max-w-4xl space-y-16">
      <header className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-center text-primary">FAQ</p>
        <h2 className="text-4xl tracking-tight md:text-5xl">
          Preguntas Frecuentes
        </h2>
      </header>
      <div>
        <Accordion
          variant="splitted"
          itemClasses={{
            base: "shadow-none border border-divider rounded-lg tracking-tight",
          }}
        >
          <AccordionItem title="¿Qué es Biru?">
            <p className="py-4">
              Biru es una herramienta de gestión de proyectos que permite a los
              equipos colaborar de manera eficiente y organizada.
            </p>
          </AccordionItem>
          <AccordionItem title="¿Cómo funciona Biru?">
            <p className="py-4">
              Biru funciona a través de tableros, listas y tarjetas que permiten
              organizar tareas y proyectos de manera visual.
            </p>
          </AccordionItem>
          <AccordionItem title="¿Es Biru gratuito?">
            <p className="py-4">
              Biru ofrece un plan gratuito con funciones limitadas, así como
              opciones de pago para acceder a características premium.
            </p>
          </AccordionItem>
          <AccordionItem title="¿Cómo puedo cancelar mi suscripción a Biru?">
            <p className="py-4">
              Puedes cancelar tu suscripción a través de la configuración de tu
              cuenta en la plataforma.
            </p>
          </AccordionItem>
          <AccordionItem title="¿Biru ofrece actualizaciones frecuentes?">
            <p className="py-4">
              Sí, Biru se actualiza regularmente con nuevas funciones y mejoras
              basadas en los comentarios de los usuarios.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

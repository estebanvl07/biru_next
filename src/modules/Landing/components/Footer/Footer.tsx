import Image from "next/image";
import Link from "next/link";

import type { FC } from "react";
import type { LinkListProps } from "./Footer.types";

export const Footer = () => {
  return (
    <footer className="flex min-h-80 w-full justify-center bg-slate-100 dark:bg-slate-900">
      <div className="flex w-full flex-col px-8 md:max-w-[72rem]">
        <section className="flex flex-grow flex-col items-center gap-16 py-8 sm:flex-row sm:py-0">
          <aside className="w-full flex-grow sm:w-auto">
            <Image src="/logo.svg" alt="Logo de Biru" width={100} height={6} />
            <p className="mt-2 max-w-[26rem] text-sm">
              Te ayudamos a organizar tus finanzas personales o las de tu
              negocio
            </p>
          </aside>
          <section className="grid w-full flex-grow gap-10 py-4 sm:grid-cols-2 sm:place-content-around sm:py-8 md:grid-cols-3 md:py-0">
            <LinkList
              title="Conoce Biru"
              links={[
                {
                  text: "Descubre Biru",
                  to: "#",
                },
                {
                  text: "Como funciona",
                  to: "#",
                },
                {
                  text: "Contáctanos",
                  to: "#",
                },
                {
                  text: "Términos & Servicios",
                  to: "#",
                },
              ]}
            />
            <LinkList
              title="Ayuda"
              links={[
                {
                  text: "Funcionalidades",
                  to: "#",
                },
                {
                  text: "Recuperar contraseña",
                  to: "/recover",
                },
                {
                  text: "Soporte",
                  to: "#",
                },
              ]}
            />
            <LinkList
              title="Como inicio"
              links={[
                {
                  text: "Iniciar Sesión",
                  to: "/login",
                },
                {
                  text: "Registrarme",
                  to: "/register",
                },
              ]}
            />
          </section>
        </section>
        <section className="flex w-full justify-between border-t py-4 text-sm dark:border-white/10">
          <p>
            <span className="mr-4">Copyright ©</span>
            <span>2024 Biru. Todos los derechos reservados</span>
          </p>
          <nav>
            <p>Networks</p>
          </nav>
        </section>
      </div>
    </footer>
  );
};

const LinkList: FC<LinkListProps> = ({ title, links }) => {
  return (
    <ul className="flex w-full flex-col">
      <li className="mb-4 font-bold text-primary dark:text-indigo-400">
        {title}
      </li>
      {links.map(({ text, to = "#" }, index) => (
        <li
          className="mb-1 transition-transform hover:translate-x-1"
          key={index}
        >
          <Link href={to} className="text-sm" aria-label={text}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

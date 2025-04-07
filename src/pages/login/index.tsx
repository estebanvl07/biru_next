import Link from "next/link";
import React from "react";
import { BasicLayout } from "~/modules/Layouts";
import { LoginForm } from "~/modules/Login";
import { SignInOptions } from "~/modules/components";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const LoginPage = () => {
  return (
    <BasicLayout
      title="Iniciar sesión"
      description="Inicia sesión en Biru para acceder a tu cuenta."
    >
      <div className="my-auto flex h-full w-full flex-row justify-center px-4 py-6 pt-20">
        <section className="relative flex h-full w-full max-w-[25rem] flex-grow flex-col items-center justify-center gap-2">
          <h1 className="text-pretty text-2xl font-bold tracking-tight text-primary dark:text-white">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-pretty text-center text-slate-400">
            Introduzca sus datos para iniciar sesión
          </p>
          <SignInOptions />
          <LoginForm />
          <Link href="/recover" className="mt-6 w-fit text-primary">
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="mt-2 flex w-full items-center justify-center gap-2 text-sm">
            ¿No tienes cuenta?,
            <Link
              href="/register"
              className="font-medium text-primary hover:font-semibold"
            >
              Crear cuenta
            </Link>
          </span>
        </section>
      </div>
    </BasicLayout>
  );
};

export default withAuthRedirect(LoginPage);

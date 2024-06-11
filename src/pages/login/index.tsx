import Link from "next/link";
import React from "react";
import { BasicLayout } from "~/modules/Layouts";
import { LoginForm } from "~/modules/Login";
import { SignInOptions } from "~/modules/components";
import { useThemeContext } from "~/lib/context/Theme.context";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";

const LoginPage = () => {
  const { theme } = useThemeContext();

  return (
    <BasicLayout
      title="Iniciar sesión"
      description="Inicia sesión en Biru para acceder a tu cuenta."
    >
      <div className="my-auto flex h-full w-full flex-row justify-center px-4 py-6">
        {theme === "dark" && (
          <span className="absolute top-0 h-screen w-full bg-[url(/point.svg)] bg-repeat"></span>
        )}
        <section className="relative flex h-full w-full max-w-[25rem] flex-grow flex-col items-center justify-center gap-2">
          <h1 className="text-pretty text-2xl font-bold tracking-tight text-primary dark:text-indigo-300">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-pretty text-center text-slate-400">
            Introduzca sus datos para iniciar sesión
          </p>
          <SignInOptions />
          <LoginForm />
          <Link
            href="/recover"
            className="mt-6 w-fit text-indigo-800 dark:text-indigo-500"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="mt-2 flex w-full items-center justify-center gap-2 text-sm">
            ¿No tienes cuenta?,
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:font-semibold dark:text-indigo-500"
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

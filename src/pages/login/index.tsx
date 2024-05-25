import Link from "next/link";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { SignInOptions } from "~/modules/components";
import { BasicLayout } from "~/modules/layouts";
import { LoginForm } from "~/modules/Login";

const LoginPage = () => {
  return (
    <BasicLayout>
      <div className="my-auto flex h-full w-full flex-row justify-center px-4 py-6">
        <section className="relative flex h-full w-full max-w-[25rem] flex-grow flex-col items-center justify-center gap-2">
          <h1 className=" text-pretty text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-pretty text-center text-slate-400">
            Introduzca sus datos para iniciar sesión
          </p>
          <SignInOptions title="" />
          <LoginForm />
          <span className="mt-6 flex w-full items-center justify-center gap-2 text-sm">
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

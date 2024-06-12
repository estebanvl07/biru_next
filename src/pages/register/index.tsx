import { useState } from "react";
import Link from "next/link";
import { SignInOptions } from "~/modules/components";
import {
  SuccessfullyCreated,
  RegisterForm,
  type RegisterFormProps,
} from "~/modules/Register/components";
import { BasicLayout } from "~/modules/Layouts";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { useThemeContext } from "~/lib/context/Theme.context";
import { api } from "~/utils/api";
import { toast } from "sonner";

const Register = () => {
  const { theme } = useThemeContext();
  const { mutateAsync: registerUser, isSuccess } =
    api.users.register.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmitHandler: RegisterFormProps["onSubmit"] = (data) => {
    return registerUser(data);
  };

  return (
    <BasicLayout
      title="Regístrate en Biru"
      description="Regístrate ahora en biru, se parte de nuestro equipo y empieza a organizar tu vida financiera"
    >
      {isSuccess ? (
        <SuccessfullyCreated />
      ) : (
        <div className="my-auto flex h-full w-full justify-center px-4 py-6">
          {theme === "dark" && (
            <span className="absolute top-0 h-screen w-full bg-[url(/point.svg)] bg-repeat"></span>
          )}
          <section className="relative flex h-full w-full max-w-[25rem] flex-col items-center justify-center gap-2">
            <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
              ¡Crear nueva cuenta!
            </h1>
            <span className="text-pretty text-center text-sm text-slate-400">
              Estás a un paso de ser parte de nuestro equipo, únete ahora.
            </span>
            <SignInOptions />
            <RegisterForm onSubmit={onSubmitHandler} />
            <p className="mt-6 flex w-full items-center justify-center gap-2 text-sm">
              ¿Ya tienes cuenta?,
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:font-semibold dark:text-indigo-500"
              >
                Iniciar sesión
              </Link>
            </p>
          </section>
        </div>
      )}
    </BasicLayout>
  );
};

export default withAuthRedirect(Register);

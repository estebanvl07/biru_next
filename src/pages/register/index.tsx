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

  const onSubmitHandler: RegisterFormProps["onSubmit"] = async (data) => {
    try {
      await registerUser(data);
    } catch {}
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
      <li
        aria-live="polite"
        aria-atomic="true"
        role="status"
        tabindex="0"
        className="toast group-[.toaster]:border-border group-[.toast]:bg-error group group-[.toaster]:bg-background group-[.toast]:text-red-600 group-[.toaster]:text-foreground group-[.toaster]:shadow-lg"
        data-sonner-toast=""
        data-styled="true"
        data-mounted="true"
        data-promise="false"
        data-removed="false"
        data-visible="true"
        data-y-position="bottom"
        data-x-position="right"
        data-index="0"
        data-front="true"
        data-swiping="false"
        data-dismissible="true"
        data-type="error"
        data-swipe-out="false"
        data-expanded="false"
        //       style="
        //   --index: 0;
        //   --toasts-before: 0;
        //   --z-index: 1;
        //   --offset: 0px;
        //   --initial-height: 53.5px;
        // "
      >
        <div data-icon="" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            height="20"
            width="20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div data-content="" className="">
          <div data-title="" className="">
            El correo ya esta en uso
          </div>
        </div>
      </li>
    </BasicLayout>
  );
};

export default withAuthRedirect(Register);

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";

import {
  Input,
  Button,
  SignInOptions,
  InputPassword,
} from "~/modules/components";
import { SuccessfullyCreated } from "~/modules/Register/components";
import { BasicLayout } from "~/modules/layouts";
import { api } from "~/utils/api";
import {
  registerUserInput,
  type RegisterUserInputType,
} from "~/modules/Register/resolver";

const Register = () => {
  const {
    mutate: registerUser,
    isSuccess,
    isPending: isSubmitting,
    error,
  } = api.users.register.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterUserInputType>({
    resolver: zodResolver(registerUserInput),
  });

  const onSubmit = (payload: RegisterUserInputType) => registerUser(payload);

  const errorMessage =
    error?.data?.code === "BAD_REQUEST" ? error?.message : "";

  return (
    <BasicLayout>
      {isSuccess ? (
        <SuccessfullyCreated />
      ) : (
        <div className="flex h-full w-full justify-center py-6">
          <section className="relative flex h-full w-full max-w-[25rem] flex-col items-center justify-center gap-2">
            <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
              ¡Crear nueva cuenta!
            </h1>
            <span className="text-pretty text-center text-sm text-slate-400">
              Estas a un paso de ser parte del equipo de Biru
            </span>
            <section className="mt-2 flex w-full flex-col items-center justify-center gap-2">
              <div className="flex w-full gap-2">
                <SignInOptions />
              </div>
            </section>
            <form
              className="mt-4 flex w-full flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                iconPath="basil:user-outline"
                label="Nombre"
                register={register("name")}
                placeholder="John Doe"
                containerClassName="w-full"
                error={errors.name?.message}
              />
              <Input
                label="Correo"
                type="email"
                placeholder="john@doe.com"
                iconPath="ic:outline-email"
                containerClassName="w-full"
                register={register("email")}
                error={errors.email?.message}
              />
              <InputPassword
                label="Contraseña"
                containerClassName="w-full"
                error={errors.password?.message}
                register={register("password")}
              />

              <Button variantStyle="fill" className="mt-2" type="submit">
                Registrarme
                <Spinner
                  color="current"
                  className={clsx("-mr-4 stroke-[3] opacity-0", {
                    "animate-spin opacity-100 transition-opacity delay-100":
                      isSubmitting,
                  })}
                  size="sm"
                />
              </Button>
              {errorMessage && (
                <span className="text-xs text-red-500 dark:text-red-400">
                  {errorMessage}
                </span>
              )}
            </form>
            <span className="mt-6 flex w-full items-center justify-center gap-2 text-sm">
              ¿Ya tienes cuenta?,
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:font-semibold dark:text-indigo-500"
              >
                Iniciar sesión
              </Link>
            </span>
          </section>
        </div>
      )}
    </BasicLayout>
  );
};

export default Register;

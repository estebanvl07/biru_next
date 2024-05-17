import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Input, Spinner } from "@nextui-org/react";
import Link from "next/link";

import { Button, SignInOptions } from "~/modules/components";
import { SuccessfullyCreated } from "~/modules/Register/components";
import { BasicLayout } from "~/modules/layouts";
import { Icon } from "@iconify/react/dist/iconify.js";

import { api } from "~/utils/api";

import {
  registerUserInput,
  type RegisterUserInputType,
} from "~/modules/Register/resolver";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            <SignInOptions />
            <form
              className="mt-4 flex w-full flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                required
                isRequired
                label="Nombre"
                placeholder="John Doe"
                {...register("name")}
                isInvalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
                startContent={<Icon icon="basil:user-outline" width={18} />}
              />
              <Input
                required
                isRequired
                label="Correo"
                type="email"
                placeholder="john@doe.com"
                {...register("email")}
                isInvalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
                startContent={<Icon icon="ic:outline-email" width={18} />}
              />
              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                startContent={
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassword(!showPassword);
                    }}
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "majesticons:eye-line"
                          : "mdi:eye-off-outline"
                      }
                      width={18}
                    />
                  </button>
                }
                {...register("password")}
                isInvalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                required
                isRequired
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

export default Register;

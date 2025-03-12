"use client";
import { Button, Input, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  recoverUserInput,
  type RecoverUserInputType,
} from "~/modules/Recover/resolver";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RecoverFormProps } from "./RecoverForm.types";
import clsx from "clsx";
import Link from "next/link";

export const RecoverForm = ({
  onSubmit,
  onGoToVerifyCodeStep,
}: RecoverFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoverUserInputType>({
    resolver: zodResolver(recoverUserInput),
  });

  return (
    <section className="z-10 m-auto flex max-w-[24rem] flex-col items-center justify-center gap-2">
      <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
        ¿Olvidaste tu contraseña?
      </h1>
      <p className="mb-2 text-center">
        Introduzca su correo, y enviaremos un código de verificación a su cuenta
      </p>
      <form
        className={clsx(
          "flex w-full flex-col items-center justify-center gap-2",
          { "pointer-events-none animate-pulse": isSubmitting },
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Correo"
          placeholder="john@doe.com"
          autoComplete="email"
          startContent={<Icon icon="ic:outline-email" width={18} />}
          {...register("email")}
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          isRequired
          required
        />
        <Button color="primary" type="submit" className="mt-2 w-full">
          Recuperar Usuario
          <Spinner
            color="current"
            className={clsx("-mr-4 stroke-[3] opacity-0", {
              "animate-spin opacity-100 transition-opacity delay-100":
                isSubmitting,
            })}
            size="sm"
          />
        </Button>
      </form>
      <p
        className="mt-2 text-sm text-primary hover:cursor-pointer dark:text-indigo-300"
        onClick={onGoToVerifyCodeStep}
      >
        Ya tengo un código
      </p>
      <p className="mt-6 flex items-center gap-2">
        ¿No tienes una cuenta?
        <Link href="/register" className="text-primary dark:text-indigo-400">
          Crear cuenta
        </Link>
      </p>
    </section>
  );
};

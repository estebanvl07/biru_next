import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { InputPassword } from "~/modules/components";
import type { ChangePasswordFormProps } from "./ChangePasswordForm.types";
import {
  changePasswordForm,
  type ChangePasswordFormType,
} from "~/modules/Recover/resolver";

export const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordForm),
  });

  return (
    <section className="m-auto flex w-full max-w-[24rem] flex-col items-center justify-center gap-2">
      <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
        Cambiar Contraseña
      </h1>
      <p className="mb-2 text-center">Introduzca su nueva contraseña</p>
      <form
        className="flex w-full flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputPassword
          autoComplete="current-password"
          errorMessage={errors.password?.message}
          isInvalid={Boolean(errors.password)}
          isRequired
          label="Contraseña"
          required
          {...register("password")}
        />
        <InputPassword
          autoComplete="current-password"
          errorMessage={errors.password?.message}
          isInvalid={Boolean(errors.password)}
          isRequired
          label="Confirmar Contraseña"
          required
          {...register("password")}
        />
        <div className="mt-2 flex w-full flex-col items-center gap-2 sm:flex-row">
          <Button color="primary" type="submit" className=" w-full flex-1">
            Cambiar Contraseña
          </Button>
          <Button className="flex-1" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </section>
  );
};

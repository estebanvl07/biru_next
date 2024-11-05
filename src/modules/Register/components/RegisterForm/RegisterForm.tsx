"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { InputPassword } from "~/modules/components";
import {
  registerUserInput,
  type RegisterUserInputType,
} from "~/modules/Register/resolver";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import type { RegisterFormProps } from "./RegisterForm.types";

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserInputType>({
    resolver: zodResolver(registerUserInput),
  });

  return (
    <form
      className={clsx(
        "mt-2 flex w-full flex-col items-center justify-center gap-2",
        { "pointer-events-none animate-pulse": isSubmitting },
      )}
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
        classNames={{
          inputWrapper: "!bg-default-200/50",
        }}
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
        classNames={{
          inputWrapper: "!bg-default-200/50",
        }}
        startContent={<Icon icon="ic:outline-email" width={18} />}
      />
      <InputPassword
        label="Contraseña"
        autoComplete="current-password"
        {...register("password")}
        classNames={{
          inputWrapper: "!bg-default-200/50",
        }}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message}
        required
        isRequired
      />

      <Button color="primary" className="mt-2" fullWidth type="submit">
        Registrarme
        {isSubmitting && (
          <Spinner
            color="current"
            className={clsx("-mr-4 stroke-[3] opacity-0", {
              "animate-spin opacity-100 transition-opacity delay-100":
                isSubmitting,
            })}
            size="sm"
          />
        )}
      </Button>
    </form>
  );
};

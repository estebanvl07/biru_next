import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyCodeInput,
  type VerifyCodeInputType,
} from "~/modules/Recover/resolver";
import type { VerifyCodeFormProps } from "./VerifyCodeForm.types";

export const VerifyCodeForm = ({
  onSubmit,
  onGoBack,
  email,
}: VerifyCodeFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<VerifyCodeInputType>({
    resolver: zodResolver(verifyCodeInput),
    defaultValues: {
      email,
    },
  });

  const isEmailReadonly = !!email;

  return (
    <section className="z-10 m-auto flex w-full max-w-[24rem] flex-col items-center justify-center gap-2">
      <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight text-primary dark:text-indigo-300">
        Verificar Código
      </h1>
      <p className="mb-2 text-center">
        Introduzca el código enviado a su correo electrónico
      </p>
      <form
        className="flex w-full flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          autoComplete="email"
          errorMessage={errors.email?.message}
          isInvalid={Boolean(errors.email)}
          label="Correo"
          placeholder="john@doe.com"
          readOnly={isEmailReadonly}
          startContent={<Icon icon="ic:outline-email" width={18} />}
          {...register("email")}
        />

        <Input
          errorMessage={errors.code?.message}
          isInvalid={Boolean(errors.code)}
          isRequired
          label="Código"
          placeholder="XXXXXX"
          required
          startContent={<Icon icon="fluent:code-text-16-filled" width={18} />}
          type="text"
          {...register("code")}
        />

        <Button color="primary" type="submit" className="mt-2 w-full">
          Verificar
        </Button>
      </form>
      <p
        className="mt-2 cursor-pointer text-sm text-primary dark:text-indigo-300"
        onClick={onGoBack}
      >
        ¿No tienes un código?
      </p>
    </section>
  );
};

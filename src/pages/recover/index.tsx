import React, { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import Link from "next/link";

import ChangePasswordForm from "~/modules/Recover/ChangePasswordForm";
import VerifyCode from "~/modules/Recover/VerifyCode";
import { BasicLayout } from "~/modules/Layouts";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useThemeContext } from "~/lib/context/Theme.context";
import { RecoverSchema } from "~/modules/Recover/schema";
import { api } from "~/utils/api";

import { STEPS_RECOVER } from "~/types/recover.types";

export const RecoverPage = () => {
  const [code, setCode] = useState<string>("");
  const [steps, setSteps] = useState<STEPS_RECOVER>(1);

  const { theme } = useThemeContext();

  const { mutate: VerifyMutation } = api.recover.verifyEmail.useMutation();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RecoverSchema>({
    resolver: zodResolver(RecoverSchema),
  });

  const onSubmit = (payload: RecoverSchema) => {
    VerifyMutation(payload, {
      onSuccess() {
        setSteps(STEPS_RECOVER.VALIDATE_CODE);
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  const goStep = (numberStep: STEPS_RECOVER) => {
    setSteps(numberStep);
  };

  return (
    <BasicLayout
      title="Recuperar contraseña"
      description="¿Olvidaste tu contraseña?, no te preocupes, te ayudaremos a recuperarla"
    >
      {theme === "dark" && (
        <span className="absolute top-0 z-0 h-screen w-full bg-[url(/point.svg)] bg-repeat"></span>
      )}
      {steps === STEPS_RECOVER.VALIDATE && (
        <section className="z-10 m-auto flex max-w-[24rem] flex-col items-center justify-center gap-2">
          <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="mb-2 text-center">
            Introduzca su correo, y enviaremos un código de verificación a su
            cuenta
          </p>
          <form
            className="flex w-full flex-col items-center justify-center gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              required
              isRequired
              type="text"
              startContent={<Icon icon="ic:outline-email" width={18} />}
              placeholder="Jhon@Doe.com"
              label="Correo"
              {...register("email")}
              isInvalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
            <Button color="primary" type="submit" className="mt-2 w-full">
              Buscar Correo
            </Button>
          </form>
          <p
            className="mt-2 text-sm text-primary hover:cursor-pointer dark:text-indigo-300"
            onClick={() => setSteps(STEPS_RECOVER.VALIDATE_CODE)}
          >
            Ya tengo un código
          </p>
          <p className="mt-6 flex items-center gap-2">
            ¿No tienes una cuenta?
            <Link
              href="/register"
              className="text-primary dark:text-indigo-400"
            >
              Crear cuenta
            </Link>
          </p>
        </section>
      )}
      {steps === STEPS_RECOVER.VALIDATE_CODE && (
        <VerifyCode goStep={goStep} setCode={setCode} />
      )}
      {steps === STEPS_RECOVER.CHANGE_PASSWORD && (
        <ChangePasswordForm {...goStep} code={code} />
      )}
    </BasicLayout>
  );
};

export default RecoverPage;

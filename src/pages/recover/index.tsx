import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChangePasswordForm from "~/modules/Recover/ChangePasswordForm";
import VerifyCode from "~/modules/Recover/VerifyCode";
import { RecoverSchema } from "~/modules/Recover/schema";
import { BasicLayout } from "~/modules/layouts";
import { STEPS_RECOVER } from "~/types/recover.types";
import { api } from "~/utils/api";

export const RecoverPage = () => {
  const [code, setCode] = useState<string>("");
  const [steps, setSteps] = useState<STEPS_RECOVER>(1);

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
      onSuccess(data, variables, context) {
        setSteps(STEPS_RECOVER.CHANGE_PASSWORD);
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };

  const goStep = (numberStep: STEPS_RECOVER) => {
    setSteps(numberStep);
  };

  return (
    <BasicLayout>
      {steps === STEPS_RECOVER.VALIDATE && (
        <form
          className="m-auto flex max-w-[24rem] flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>¿Olvidaste tu contraseña?</h2>
          <p className="mb-2 text-center">
            Introduzca su correo, y enviaremos un codigo de verificación a su
            cuenta
          </p>
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
          <p
            className="mt-2 cursor-pointer text-sm text-primary dark:text-indigo-300"
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
        </form>
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

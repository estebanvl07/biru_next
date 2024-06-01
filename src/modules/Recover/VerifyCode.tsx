import React from "react";
import { api } from "~/utils/api";
import { CodeSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { STEPS_RECOVER } from "~/types/recover.types";

const VerifyCode = ({
  goStep,
  setCode,
}: {
  goStep: (step: STEPS_RECOVER) => void;
  setCode: (code: string) => void;
}) => {
  const { mutate: VerifyCodeMutation } = api.recover.verifyCode.useMutation();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CodeSchema>({
    resolver: zodResolver(CodeSchema),
  });

  const onSubmit = (payload: CodeSchema) => {
    VerifyCodeMutation(payload, {
      onSuccess(data, variables, context) {
        data?.token && setCode(data?.token);
        goStep(STEPS_RECOVER.CHANGE_PASSWORD);
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };

  return (
    <form
      className="m-auto flex w-full max-w-[24rem] flex-col items-center justify-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Verificar Código</h2>
      <p className="mb-2 text-center">
        Introduzca el código enviado a su correo electronico
      </p>
      <Input
        required
        isRequired
        type="text"
        startContent={<Icon icon="fluent:code-text-16-filled" width={18} />}
        placeholder="XXXXXX"
        label="Código"
        {...register("code")}
        isInvalid={Boolean(errors.code)}
        errorMessage={errors.code?.message}
      />

      <Button color="primary" type="submit" className="mt-2 w-full">
        Verificar
      </Button>
      <p
        className="mt-2 cursor-pointer text-sm text-primary dark:text-indigo-300"
        onClick={() => goStep(STEPS_RECOVER.VALIDATE)}
      >
        ¿No tienes un código?
      </p>
    </form>
  );
};

export default VerifyCode;

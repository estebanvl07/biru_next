import { CodeSchema } from "./schema";

import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";

import { STEPS_RECOVER } from "~/types/recover.types";
import { Alert } from "../components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";

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

  const { isOpen, onClose, onOpen, props, setProps } = useAlert({
    type: "error",
  });

  const onSubmit = (payload: CodeSchema) => {
    VerifyCodeMutation(payload, {
      onSuccess(data) {
        data?.token && setCode(data?.token);
        goStep(STEPS_RECOVER.CHANGE_PASSWORD);
      },
      onError(error) {
        if (error instanceof Error) {
          setProps({
            body: error.message,
            ...props,
          });
          onOpen();
        }
      },
    });
  };

  return (
    <section className="z-10 m-auto flex w-full max-w-[24rem] flex-col items-center justify-center gap-2">
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight text-primary dark:text-indigo-300">
        Verificar Código
      </h1>
      <p className="mb-2 text-center">
        Introduzca el código enviado a su correo electronico
      </p>
      <form
        className="flex w-full flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          required
          isRequired
          type="text"
          placeholder="XXXXXX"
          label="Código"
          isInvalid={Boolean(errors.code)}
          errorMessage={errors.code?.message}
          startContent={<Icon icon="fluent:code-text-16-filled" width={18} />}
          {...register("code")}
        />

        <Button color="primary" type="submit" className="mt-2 w-full">
          Verificar
        </Button>
      </form>
      <p
        className="mt-2 cursor-pointer text-sm text-primary dark:text-indigo-300"
        onClick={() => goStep(STEPS_RECOVER.VALIDATE)}
      >
        ¿No tienes un código?
      </p>
    </section>
  );
};

export default VerifyCode;

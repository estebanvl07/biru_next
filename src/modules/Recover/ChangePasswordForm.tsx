import React, { useState } from "react";
import { api } from "~/utils/api";
import { RecoverPasswordSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { STEPS_RECOVER } from "~/types/recover.types";
import { useRouter } from "next/router";

const ChangePasswordForm = ({
  goStep,
  code,
}: {
  goStep?: (step: STEPS_RECOVER) => void;
  code: string;
}) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: ChangePassowordMutation } =
    api.recover.changePassword.useMutation();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RecoverPasswordSchema>({
    resolver: zodResolver(RecoverPasswordSchema),
  });

  const onSubmit = (payload: RecoverPasswordSchema) => {
    if (payload.password !== payload.confirmPassword) {
      return alert("Las contraseñas deben ser iguales");
    }

    ChangePassowordMutation(
      { password: payload.password, code },
      {
        onSuccess(data, variables, context) {
          alert("Las contraseñas se ha cambiado con exito");
          console.log(data);
        },
        onError(error) {
          console.log(error);
        },
      },
    );
  };

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
                  showPassword ? "majesticons:eye-line" : "mdi:eye-off-outline"
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

        <Input
          label="Confirmar Contraseña"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="current-password"
          startContent={
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              <Icon
                icon={
                  showConfirmPassword
                    ? "majesticons:eye-line"
                    : "mdi:eye-off-outline"
                }
                width={18}
              />
            </button>
          }
          {...register("confirmPassword")}
          isInvalid={Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword?.message}
          required
          isRequired
        />
        <nav className="mt-2 flex w-full flex-col items-center gap-2 sm:flex-row">
          <Button color="primary" type="submit" className=" w-full flex-1">
            Cambiar Contraseña
          </Button>
          <Button className="flex-1" onClick={() => router.back()}>
            Cancelar
          </Button>
        </nav>
      </form>
    </section>
  );
};

export default ChangePasswordForm;

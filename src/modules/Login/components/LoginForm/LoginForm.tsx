"use client";
import { Button, Input } from "@nextui-org/react";
import { CALLBACK_SIGN_IN_URL } from "~/lib/constants/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { InputPassword } from "~/modules/components";
import { loginInput, type LoginInputType } from "~/modules/Login/resolver";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = async ({ email, password }: LoginInputType) => {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: CALLBACK_SIGN_IN_URL,
        redirect: false,
      });
      if (!response?.ok) {
        throw new Error(response?.error as string);
      }
      await router.replace("/account");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form
      className="mt-4 flex w-full flex-col gap-2"
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
      <InputPassword
        label="Contraseña"
        autoComplete="current-password"
        {...register("password")}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message}
        required
        isRequired
      />

      <Button color="primary" type="submit" className="mt-2">
        Iniciar sesión
      </Button>
    </form>
  );
};

import Link from "next/link";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { SignInOptions } from "~/modules/components";
import { BasicLayout } from "~/modules/layouts";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

import { Button } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";

import { CALLBACK_SIGN_IN_URL } from "~/lib/constants/config";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginInput, type LoginInputType } from "~/modules/Login/resolver";
import { useThemeContext } from "~/lib/context/themeContext";
import { Alert } from "~/modules/components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginInput),
  });

  const { theme } = useThemeContext();
  const router = useRouter();
  const { isOpen, props, onOpen, onClose, setProps } = useAlert({
    type: "error",
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
        setProps({
          body: <span className="text-center">{error.message}</span>,
          ...props,
        });
        onOpen();
      }
    }
  };

  return (
    <BasicLayout
      title="Iniciar sesión"
      description="Inicia sesión en Biru para acceder a tu cuenta."
    >
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <div className="my-auto flex h-full w-full flex-row justify-center px-4 py-6">
        {theme === "dark" && (
          <span className="absolute top-0 h-screen w-full bg-[url(/point.svg)] bg-repeat"></span>
        )}
        <section className="relative flex h-full w-full max-w-[25rem] flex-grow flex-col items-center justify-center gap-2">
          <h1 className="text-pretty text-2xl font-bold tracking-tight text-primary dark:text-indigo-300">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-pretty text-center text-slate-400">
            Introduzca sus datos para iniciar sesión
          </p>
          <SignInOptions title="" />
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
                      showPassword
                        ? "majesticons:eye-line"
                        : "mdi:eye-off-outline"
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

            <Button variantStyle="fill" type="submit" className="mt-2">
              Iniciar sesión
            </Button>
          </form>
          <Link
            href="/recover"
            className="mt-6 w-fit text-indigo-800 dark:text-indigo-500"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="mt-2 flex w-full items-center justify-center gap-2 text-sm">
            ¿No tienes cuenta?,
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:font-semibold dark:text-indigo-500"
            >
              Crear cuenta
            </Link>
          </span>
        </section>
      </div>
    </BasicLayout>
  );
};

export default withAuthRedirect(LoginPage);

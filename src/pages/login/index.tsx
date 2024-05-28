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

  const onSubmit = async ({ email, password }: LoginInputType) => {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: CALLBACK_SIGN_IN_URL,
        redirect: false,
      });
      console.log("sing-in", response);

      if (response?.ok) {
        await router.replace("/account");
      }
    } catch (error) {
      console.error("sign-in", error);
    }
  };

  return (
    <BasicLayout>
      <div className="my-auto flex h-full w-full flex-row justify-center  px-4 py-6">
        {theme === "dark" && (
          <span className="absolute top-0 h-screen w-full bg-[url(/point.svg)] bg-repeat"></span>
        )}
        <section className="relative flex h-full w-full max-w-[25rem] flex-grow flex-col items-center justify-center gap-2">
          <h1 className=" text-pretty text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
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

            {/* <Link
        href="/recover"
        className="w-fit text-sm text-indigo-800 dark:text-indigo-500"
      >
        Recuperar contraseña
      </Link> */}
            <Button variantStyle="fill" type="submit" className="mt-2">
              Iniciar sesión
            </Button>
          </form>
          <span className="mt-6 flex w-full items-center justify-center gap-2 text-sm">
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

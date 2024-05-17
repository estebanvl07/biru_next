"use client";
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

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginInput),
  });
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
  );
};

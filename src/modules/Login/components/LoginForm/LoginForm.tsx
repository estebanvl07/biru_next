"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

import { Button, Input, InputPassword } from "~/modules/components";
import { CALLBACK_SIGN_IN_URL } from "~/lib/constants/config";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { loginInput, type LoginInputType } from "~/modules/Login/resolver";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = async (form: LoginInputType) => {
    //   event.preventDefault();
    //   const response = await signIn("credentials", {
    //     email,
    //     password,
    //     callbackUrl: CALLBACK_SIGN_IN_URL,
    //     redirect: false,
    //   });
    //   if (response?.ok) {
    //     void router.replace("/account");
    //   }
    //   console.log(response);
  };

  return (
    <form
      className="mt-4 flex w-full flex-col gap-2"
      // action={signin}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="email"
        label="Correo"
        placeholder="JhonDoe@mail.com"
        autoComplete="email"
        iconPath="ic:outline-email"
        required
        register={register("email")}
      />
      <InputPassword
        name="password"
        label="Contraseña"
        placeholder="••••••••"
        autoComplete="current-password"
        register={register("password")}
        required
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

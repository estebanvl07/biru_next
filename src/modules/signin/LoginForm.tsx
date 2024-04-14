"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

import { Button, Input } from "~/modules/components";
import { CALLBACK_SIGNIN_URL } from "~/lib/constants/config";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useAppDispatch();
  // const { handleSignin } = useOnAuth();
  // const myAlert = useAlert();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: CALLBACK_SIGNIN_URL,
      redirect: false,
    });
  };

  return (
    <form
      className="mb-4 mt-8 flex w-full flex-col gap-2"
      // action={signin}
      onSubmit={handleSubmit}
    >
      <Input
        name="email"
        label="Correo"
        placeholder="JhonDoe@mail.com"
        autoComplete="email"
        iconPath="ic:outline-email"
        onChange={(e) => setEmail(e.target.value)}
        containerClassName="w-full"
      />
      <Input
        name="password"
        label="Contraseña"
        placeholder="••••••••"
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        iconPath={showPassword ? "majesticons:eye-line" : "mdi:eye-off-outline"}
        eventIcon={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
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

export default LoginForm;

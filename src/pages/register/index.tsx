import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Button, SignInOptions } from "~/modules/components";

import { createUser } from "~/modules/signin/createUser.schema";
import SuccesCreated from "~/modules/signin/SuccessAccountCreated";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import Link from "next/link";
import { BasicLayout } from "~/modules/layouts/templates/Landing";
import { signIn } from "next-auth/react";
import { CALLBACK_SIGNIN_URL } from "~/lib/constants/config";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);

  const user = api.users.create.useMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUser),
  });

  const onSubmit = async (payload: any) => {
    const response = await signIn("credentials", {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      callbackUrl: CALLBACK_SIGNIN_URL,
      redirect: false,
    });

    if (response?.status === 200) {
      setSuccessCreate(true);
    }
  };

  return (
    <BasicLayout>
      {successCreate ? (
        <SuccesCreated />
      ) : (
        <div className="flex h-full w-full justify-center py-6">
          <section className="relative flex h-full w-full max-w-[25rem] flex-col items-center justify-center gap-2">
            <h1 className="mb-1 text-pretty text-center text-2xl font-bold tracking-tight  text-primary dark:text-indigo-300">
              ¡Crear nueva cuenta!
            </h1>
            <span className="text-pretty text-center text-sm text-slate-400">
              Estas a un paso de ser parte del equipo de Biru
            </span>
            <section className="mt-2 flex w-full flex-col items-center justify-center gap-2">
              <div className="flex w-full gap-2">
                <SignInOptions title="" />
              </div>
            </section>
            <form
              className="mt-4 flex w-full flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                iconPath="basil:user-outline"
                label="Usuario"
                {...register("name")}
                placeholder="Jhon Doe"
                containerClassName="w-full"
                required
                error={errors.name?.message as string}
              />
              <Input
                iconPath="ic:outline-email"
                label="Correo"
                {...register("email")}
                type="email"
                placeholder="JhonDoe@mail.com"
                containerClassName="w-full"
                required
                error={errors.email?.message as string}
              />
              <Input
                iconPath={
                  showPassword ? "majesticons:eye-line" : "mdi:eye-off-outline"
                }
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                {...register("password")}
                placeholder="••••••••"
                eventIcon={() => setShowPassword(!showPassword)}
                required
                error={errors.password?.message as string}
              />

              <Button
                variantStyle="fill"
                className="mt-2"
                // disabled={}
                type="submit"
              >
                Registrarme
              </Button>
            </form>
            <span className="mt-6 flex w-full items-center justify-center gap-2 text-sm">
              ¿Ya tienes cuenta?,
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:font-semibold dark:text-indigo-500"
              >
                Iniciar sesión
              </Link>
            </span>
          </section>
        </div>
      )}
    </BasicLayout>
  );
};

export default Register;

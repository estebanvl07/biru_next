import Link from "next/link";
import { SignInOptions } from "~/modules/components";
import {
  SuccessfullyCreated,
  RegisterForm,
  type RegisterFormProps,
} from "~/modules/Register/components";
import { BasicLayout } from "~/modules/Layouts";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { api } from "~/utils/api";
import { toast } from "sonner";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Register = () => {
  const { mutateAsync: registerUser, isSuccess } =
    api.users.register.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmitHandler: RegisterFormProps["onSubmit"] = async (data) => {
    try {
      await registerUser(data);
    } catch {}
  };

  return (
    <BasicLayout
      title="Regístrate en Biru"
      description="Regístrate ahora en biru, se parte de nuestro equipo y empieza a organizar tu vida financiera"
    >
      {isSuccess ? (
        <SuccessfullyCreated />
      ) : (
        <div className="my-auto flex h-full w-full justify-center px-4 py-6 pt-20">
          <section className="relative flex h-full w-full max-w-[25rem] flex-col items-center justify-center gap-2">
            <h1 className="text-primary dark:text-white mb-1 text-pretty text-center text-2xl font-bold  tracking-tight">
              ¡Crear nueva cuenta!
            </h1>
            <span className="text-pretty text-center text-sm text-slate-400">
              Estás a un paso de ser parte de nuestro equipo, únete ahora.
            </span>
            <SignInOptions />
            <RegisterForm onSubmit={onSubmitHandler} />
            <p className="mt-6 flex w-full items-center justify-center gap-2 text-sm">
              ¿Ya tienes cuenta?,
              <Link
                href="/login"
                className="font-medium text-primary hover:font-semibold"
              >
                Iniciar sesión
              </Link>
            </p>
          </section>
        </div>
      )}
    </BasicLayout>
  );
};

export default withAuthRedirect(Register);

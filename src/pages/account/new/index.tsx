"use client";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Select } from "~/modules/components";
import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
// import * as yup from "yup";

// const shcema = yup
//   .object({
//     name: yup
//       .string()
//       .required("El nombre es requerido")
//       .min(2, "Debe tener minimo 2 caracteres"),
//     type: yup.string(),
//     balance: yup.number().required(),
//     reference: yup.string().max(25, "Máximo 60 caracteres"),
//   })
//   .required();

const optionsTypeAccount = [
  {
    name: "Efectivo",
    value: 1,
  },
  {
    name: "Bancaria",
    value: 2,
  },
  {
    name: "Credito",
    value: 3,
  },
];

const CreateAccount = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  const router = useRouter();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onsubmit = (data: any) => {
    try {
      console.log(data);
      return;
    } catch (error) {}
  };

  return (
    <div className="min-h-calc-48 md:min-h-calc-64 flex w-full items-center justify-center">
      <Card className="m-auto flex w-full max-w-[40rem] flex-col items-center justify-center border-none !bg-transparent !p-0 md:border md:!bg-white md:!p-6 dark:!bg-transparent md:dark:!bg-slate-900">
        <form
          className="flex w-full flex-col gap-2 pt-6 md:pt-0"
          onSubmit={handleSubmit(onsubmit)}
        >
          <header className="mb-2 flex w-full items-center justify-between">
            <h2>Crear nueva cuenta</h2>
            <Button
              className="flex items-center gap-2 !px-0 !py-0"
              variantStyle="empty"
              onClick={() => router.back()}
            >
              <Icon icon="ph:arrow-left-light" width={16} />
              Volver
            </Button>
          </header>
          <Input
            required
            iconPath="fluent:text-description-24-filled"
            placeholder='"Efectivo", "Ventas", "Inversiones"'
            label="Nombre"
            className="w-full"
            {...register("name")}
            error={errors.name?.message as string}
          />
          <Input
            required
            iconPath="quill:creditcard"
            placeholder="Número de cuenta"
            label="Referencia"
            className="w-full"
            {...register("reference")}
            error={errors.reference?.message as string}
          />
          <Select
            required
            iconPath="game-icons:cash"
            options={optionsTypeAccount}
            changeOption={(option) => setValue("type", String(option.value))}
            name="type"
            label="Tipo de cuenta"
            placeholder="Seleccione el tipo de cuenta"
            error={errors.type?.message as any}
          />
          <Input
            title="Si no agregas un balance el por defeco será 0"
            iconPath="clarity:balance-line"
            placeholder="Balance Inicial"
            type="number"
            label="Agrega un balance por defecto"
            className="w-full"
            {...register("balance")}
            error={errors.balance?.message as any}
          />
          <div className="flex w-full flex-col gap-2 pt-3 md:flex-row">
            <Button className="w-full py-1 text-sm" type="submit">
              {hasEdit ? "Actualizar cuenta" : "Crear cuenta"}
            </Button>
            {/* <Button
            className="w-full py-1 text-sm"
            variantStyle="outline"
            // onClick={() => navigate(-1)}
          >
            Cancelar
          </Button> */}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateAccount;

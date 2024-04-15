"use client";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Select } from "~/modules/components";
import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { InputNumber } from "primereact/inputnumber";
import { api } from "~/utils/api";
import WhitoutSideBar from "~/modules/layouts/templates/dashbaord/whitout-sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateUserAccount,
  createUserAccount,
} from "~/modules/account/schema";
import { UserAccount } from "@prisma/client";
// import * as yup from "yup";

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

  const userAccount = api.userAccount.create.useMutation();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  // useForm<CreateUserAccount>({
  //   resolver: zodResolver(createUserAccount),
  // });

  const onsubmit = (data: any) => {
    console.log(data);
    return userAccount?.mutateAsync(
      { ...data, balance: Number(data.balance) },
      {
        onError(error, variables, context) {
          console.log({ error, variables, context });
        },
      },
    );
  };

  return (
    <WhitoutSideBar>
      <div className="flex min-h-calc-48 w-full items-center justify-center md:min-h-calc-64">
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
              changeOption={(option) => setValue("type", Number(option.value))}
              label="Tipo de cuenta"
              placeholder="Seleccione el tipo de cuenta"
              {...register("type")}
              error={errors.type?.message as any}
            />

            <Input
              title="Si no agregas un balance el por defeco será 0"
              iconPath="clarity:balance-line"
              label="Balance Inicial"
              type="number"
              placeholder="Agrega un balance por defecto"
              className="w-full"
              onChange={(e) => setValue("balance", Number(e.target.value))}
              // {...register("balance")}
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
    </WhitoutSideBar>
  );
};

export default CreateAccount;

import { useForm } from "react-hook-form";
// import { Button, Card, Input, Select } from "~/modules/components";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "~/utils/api";
import WhitoutSideBar from "~/modules/layouts/templates/dashbaord/whitout-sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateUserAccount,
  createUserAccount,
} from "~/modules/Account/schema";
import { UserAccount } from "@prisma/client";
import { Button } from "~/modules/components";
import { useEffect } from "react";
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

  const onsubmit = (data: any) => {
    return userAccount?.mutateAsync(
      { ...data, balance: Number(data.balance), type: Number(data.type) },
      {
        onError(error, variables, context) {
          console.log({ error, variables, context });
        },
        onSuccess() {
          router.push("/account");
        },
      },
    );
  };

  return (
    <WhitoutSideBar title="Crear Cuenta">
      <div className="mt-4 flex w-full items-center justify-center">
        <form
          className="flex w-full  max-w-[32rem] flex-col items-center justify-center gap-2 pt-6 md:pt-0"
          onSubmit={handleSubmit(onsubmit)}
        >
          <h2>Inscribir cuenta</h2>
          <p className="mb-2 text-center md:max-w-[80%]">
            Inscribe las cuentas que tengas disponibles, y lleva más ordenado
            tus ingresos
          </p>
          <Input
            required
            isRequired
            startContent={
              <Icon
                icon="fluent:text-description-24-filled"
                width={18}
                className="dark:text-slate-200"
              />
            }
            placeholder='"Efectivo", "Ventas", "Inversiones"'
            label="Nombre"
            className="w-full"
            {...register("name")}
            errorMessage={errors.name?.message as string}
          />
          <Input
            startContent={
              <Icon
                icon="quill:creditcard"
                width={18}
                className="dark:text-slate-200"
              />
            }
            placeholder="Número de cuenta"
            label="Referencia"
            className="w-full"
            {...register("reference")}
            errorMessage={errors.reference?.message as string}
          />
          <Select
            required
            isRequired
            startContent={
              <Icon
                icon="game-icons:cash"
                width={18}
                className="dark:text-slate-200"
              />
            }
            items={optionsTypeAccount}
            // changeOption={(option) => setValue("type", Number(option.value))}
            label="Tipo de cuenta"
            variant="flat"
            placeholder="Seleccione el tipo de cuenta"
            {...register("type")}
            errorMessage={errors.type?.message as any}
          >
            {optionsTypeAccount.map((opt) => (
              <SelectItem
                key={opt.value}
                color="primary"
                className="font-montserrat"
                value={opt.value}
              >
                {opt.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            title="Si no agregas un balance el por defeco será 0"
            startContent={
              <Icon
                icon="clarity:balance-line"
                width={18}
                className="dark:text-slate-200"
              />
            }
            label="Balance Inicial"
            type="number"
            placeholder="Agrega un balance por defecto"
            className="w-full"
            onChange={(e) => setValue("balance", Number(e.target.value))}
            // {...register("balance")}
            errorMessage={errors.balance?.message as any}
          />
          <div className="flex w-full  flex-col gap-2 pt-3 md:flex-row">
            <Button className="w-full" type="submit">
              {hasEdit ? "Actualizar cuenta" : "Crear cuenta"}
            </Button>
            <Button
              className="w-full"
              variantStyle="outline"
              onClick={() => router.push("/account")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </WhitoutSideBar>
  );
};

export default CreateAccount;

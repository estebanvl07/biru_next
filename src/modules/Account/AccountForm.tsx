import { useForm } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "~/utils/api";

import { amountFormatter } from "~/utils/formatters";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createUserAccount,
  type CreateUserAccount,
} from "~/modules/Account/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAccount } from "@prisma/client";

export const optionsTypeAccount = [
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

const AccountForm = ({
  hasEdit = false,
  defaultAccount,
}: {
  hasEdit?: boolean;
  defaultAccount?: UserAccount;
}) => {
  const router = useRouter();
  const [balanceVal, setBalanceVal] = useState("");
  const userAccount = api.userAccount.create.useMutation();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm<CreateUserAccount>({
    resolver: zodResolver(createUserAccount),
  });

  const onsubmit = (data: any) => {
    toast.promise(
      userAccount?.mutateAsync(
        { ...data, balance: Number(data.balance), type: Number(data.type) },
        {
          onError(error, variables, context) {
            console.log({ error, variables, context });
          },
          onSuccess() {
            router.push("/account");
          },
        },
      ),
      {
        loading: "Creando Cuenta...",
        success: "La Cuenta se ha creado con éxito.",
        error: "Hubo un error, intente de nuevo",
      },
    );
  };

  useEffect(() => {
    if (defaultAccount) {
      setValue("name", defaultAccount.name);
      setValue("balance", defaultAccount.balance || 0);
      setValue("reference", defaultAccount.reference || "");
      setValue("type", defaultAccount.type);
    } else {
      setValue("balance", 0);
    }
  }, []);

  return (
    <form
      className="mt-6 flex w-full max-w-[32rem] flex-col items-center justify-center gap-2 md:pt-0"
      onSubmit={handleSubmit(onsubmit)}
    >
      <Input
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
      <Select
        isRequired
        startContent={
          <Icon
            icon="game-icons:cash"
            width={18}
            className="dark:text-slate-200"
          />
        }
        items={optionsTypeAccount}
        defaultSelectedKeys={defaultAccount && [defaultAccount.type]}
        label="Tipo de cuenta"
        variant="flat"
        placeholder="Seleccione el tipo de cuenta"
        isInvalid={Boolean(errors.type)}
        errorMessage={errors.type?.message as any}
      >
        {optionsTypeAccount.map((opt) => (
          <SelectItem
            key={opt.value}
            color="primary"
            className="font-montserrat"
            onClick={() => setValue("type", Number(opt.value))}
            value={opt.value}
          >
            {opt.name}
          </SelectItem>
        ))}
      </Select>

      <Input
        startContent={
          <Icon
            icon="quill:creditcard"
            width={18}
            className="dark:text-slate-200"
          />
        }
        placeholder="EJ: 000-000000-00"
        label="Referencia"
        className="w-full"
        isInvalid={Boolean(errors.reference)}
        errorMessage={errors.reference?.message as string}
        {...register("reference")}
      />

      <Input
        title="Si no agregas un balance el por defeco será 0"
        startContent={
          <Icon
            icon="clarity:balance-line"
            width={18}
            className="dark:text-slate-200"
          />
        }
        isDisabled={hasEdit}
        label="Balance Inicial"
        placeholder="Agrega un balance por defecto"
        value={balanceVal}
        onChange={(e) => {
          const { formatted, raw } = amountFormatter(e.target.value);
          setBalanceVal(formatted);
          raw && setValue("balance", raw);
        }}
        className="w-full"
        isInvalid={Boolean(errors.balance)}
        errorMessage={errors.balance?.message as any}
      />
      <div className="flex w-full  flex-col gap-2 pt-3 md:flex-row">
        <Button color="primary" className="w-full" type="submit">
          {hasEdit ? "Actualizar cuenta" : "Crear cuenta"}
        </Button>
        <Button
          className="w-full bg-default-100"
          onClick={() => router.push("/account")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;

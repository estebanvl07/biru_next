import { useForm } from "react-hook-form";
import { useOnActive } from "~/lib/hooks";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Textarea } from "@nextui-org/react";
import { IconSearcher } from "~/modules/category/IconSelector";
import { InputDate } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { createGoal } from "~/modules/Goals/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "~/modules/components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { amountFormatter } from "~/utils/formatters";
import { useState } from "react";

export default function NewGoalPage() {
  const [goalAmount, setGoalAmount] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const router = useRouter();
  const params = useParams();
  const { isActive, onActive, onDisabled } = useOnActive();
  const { mutate: createGoalgMutation } = api.goals.create.useMutation();
  const {
    setValue,
    register,
    getValues,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm<createGoal>({
    resolver: zodResolver(createGoal),
  });

  const alertConfig: any = {
    type: "quest",
    cancel: true,
    confirm: true,
    confirmProps: {
      onClick: () => onSubmit(),
    },
  };

  const { isOpen, onClose, props, onOpen, setProps } = useAlert(alertConfig);

  const icon = watch("icon") || "material-symbols:savings-outline";

  const onSubmit = () => {
    onClose();
    const payload = getValues();
    createGoalgMutation(
      {
        ...payload,
        saved: Number(payload.saved),
        goal: Number(payload.goal),
      },
      {
        onSuccess() {
          setProps({
            ...props,
            type: "success",
            cancel: false,
            confirmProps: {
              onClick: () => {
                router.push(`/account/${params?.acc}/goals`);
              },
            },
          });
          reset();
          onOpen();
        },
        onError() {
          setProps({
            ...props,
            type: "error",
            cancel: false,
          });
          onOpen();
        },
      },
    );
  };

  return (
    <DashboardLayout title="Nueva Meta">
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <form
        className="flex max-w-[32rem] flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setProps(alertConfig);
          onOpen();
        }}
      >
        <Input
          required
          isRequired
          label="Nombre"
          placeholder="Vacaciones, Prestamo, Compras"
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <div className="flex gap-2 ">
          <Input
            isRequired
            label="Monto de meta"
            placeholder="0.00"
            // labelPlacement="outside"
            className="!appearance-none"
            // onValueChange={(val) => setValue("amount", Number(val))}
            value={goalAmount}
            onValueChange={(val) => {
              const { formatted, raw } = amountFormatter(val);
              setValue("goal", Number(raw));
              setGoalAmount(formatted);
            }}
            inputMode="numeric"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">$</span>
              </div>
            }
            isInvalid={Boolean(errors?.goal)}
            errorMessage={errors?.goal?.message}
          />
          <Input
            isRequired
            label="Monto inicial"
            value={initialAmount}
            onValueChange={(val) => {
              const { formatted, raw } = amountFormatter(val);
              setValue("saved", Number(raw));
              setInitialAmount(formatted);
            }}
            placeholder="0.00"
            className="!appearance-none"
            onLoad={() => setValue("saved", 0)}
            inputMode="numeric"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">$</span>
              </div>
            }
            isInvalid={Boolean(errors?.saved)}
            errorMessage={errors?.saved?.message}
          />
        </div>
        <InputDate
          label="Fecha limite"
          placeholder="Seleccionar fecha de meta"
          minValueToday
          changeValue={(date) => setValue("goalDate", date)}
        />
        <Input
          readOnly
          label="Icono"
          onClick={() => onActive()}
          startContent={
            <Icon icon={icon} className="dark:text-slate-200" width={18} />
          }
          placeholder="Gastos de la universidad"
          value={icon}
          {...register("icon")}
          isInvalid={Boolean(errors?.icon)}
          errorMessage={errors.icon?.message}
        />
        <Textarea
          label="Descripción"
          placeholder="-  ¿Para que es esta meta?"
          rows={1}
          {...register("description")}
          isInvalid={Boolean(errors?.description)}
          errorMessage={errors.description?.message}
        />
        <IconSearcher
          selected={(icon) => setValue("icon", icon)}
          onClose={() => onDisabled()}
          isOpen={isActive}
        />
        <div className="mt-2 flex gap-2">
          <Button color="primary" type="submit">
            Crear Meta
          </Button>
          <Button color="primary" className="border-1" variant="bordered">
            Cancelar
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}

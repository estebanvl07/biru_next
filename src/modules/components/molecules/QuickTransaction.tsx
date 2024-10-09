import Link from "next/link";
import { FormEvent, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Button } from "@nextui-org/button";
import { Avatar, Input } from "@nextui-org/react";
import { Card } from "../atoms";

import { ButtonGroup } from "~/modules/components";
import { useParams } from "next/navigation";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { amountFormatter } from "~/utils/formatters";

const QuickTransaction = () => {
  const [entitySelected, setEntitySelected] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [amountValue, setAmountValue] = useState<string>("");
  const [type, setType] = useState<number>(1);

  const params = useParams();
  const { entities } = useEntity();

  const { mutateAsync: createTransactionMutation } =
    api.transaction.create.useMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      createTransactionMutation(
        {
          transferType: 1,
          amount: amount ?? 0,
          type: type ?? 1,
          accountId: Number(params?.acc),
          entityId: entitySelected,
          date: new Date(),
        },
        {
          onSuccess() {
            setAmount(0);
            setAmountValue("");
          },
        },
      ),
      {
        loading: "Creando Transacción...",
        success: "La transacción se ha creado con éxito.",
        error: "Hubo un error, intente de nuevo",
      },
    );
    return;
  };

  return (
    <Card className="flex h-full w-full flex-col">
      <h3>Transferencia Rápida</h3>
      <nav className="scrollbar-customize flex w-full gap-x-2 overflow-auto py-4">
        <div className="flex flex-col items-center justify-center">
          <Button
            as={Link}
            href={`/account/${params?.acc}/entities/new`}
            isIconOnly
            size="lg"
            className="!h-12 !w-12"
            radius="full"
          >
            <Icon icon="ph:plus" width={18} />
          </Button>
          <span className="mt-0.5 w-12 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs">
            Crear
          </span>
        </div>
        {entities.map(({ name, avatar, id }) => {
          return (
            // <Link
            //   key={id}
            //   href={`/account/${params?.acc}/transactions/new?entity=${id}`}
            // >
            <div key={id} className="flex flex-col items-center justify-center">
              <Avatar
                isBordered={entitySelected === id}
                name={name}
                color="primary"
                onClick={() =>
                  setEntitySelected((prev) => (prev === id ? undefined : id))
                }
                classNames={{
                  base: "cursor-pointer w-12 h-12 ring-offset-[3px] ring-offset-default-200 transition-all",
                  fallback: "border border-red-600",
                }}
                src={avatar ?? undefined}
                aria-label={`${name} avatar`}
              />
              <span className="mt-0.5 w-12 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs">
                {name}
              </span>
            </div>
            // </Link>
          );
        })}
      </nav>
      <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
        <Input
          label="Monto"
          classNames={{
            inputWrapper: "border dark:border-white/5",
          }}
          placeholder="Valor a enviar"
          value={amountValue}
          onValueChange={(val) => {
            const { formatted, raw } = amountFormatter(val);
            setAmount(raw ?? 0);
            setAmountValue(formatted);
          }}
          endContent={
            <ButtonGroup
              containerClassName="w-full"
              buttonClass="text-xs !py-1"
              defaultSelected={1}
              options={[
                {
                  id: 1,
                  title: "Ingreso",
                  label: "",
                  icon: "ph:trend-up",
                  onClick: () => {
                    setType(1);
                  },
                  colorSelected:
                    "!bg-green-500 border border-green-500 text-white",
                },
                {
                  id: 2,
                  icon: "ph:trend-down",
                  label: "",
                  title: "Egreso",
                  onClick: () => {
                    setType(2);
                  },
                  colorSelected: "!bg-red-500 border border-red-500 text-white",
                },
              ]}
            />
          }
        />
        <Button color="primary" type="submit" isDisabled={!Boolean(amount)}>
          Crear Transacción
        </Button>
      </form>
    </Card>
  );
};

export default QuickTransaction;

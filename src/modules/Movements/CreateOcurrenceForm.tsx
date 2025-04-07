import { Button } from "@heroui/button";
import React, { useEffect, useState } from "react";
import { MovementsIncludes } from "~/types/movements";
import { Accordion, AccordionItem, Chip, Input } from "@heroui/react";
import { amountFormatter } from "~/utils/formatters";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { capitalize } from "lodash";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { InputSelectAccount } from "../components";
import { useCurrentAccount } from "../Account/hooks";
import { useMovements } from "./hooks/useMovements";
import { useExpensesCurrentMonth } from "../Budget/hooks/useBudget";

interface CreateOcurrenceFormProps {
  movement: MovementsIncludes;
  onSuccess?: () => void;
}

const CreateOcurrenceForm = ({
  movement,
  onSuccess,
}: CreateOcurrenceFormProps) => {
  const [amount, setAmount] = useState("");
  const [amountValue, setAmountValue] = useState<number>(0);
  const [accountSelected, setAccountSelected] = useState<number>(0);

  const router = useRouter();
  const params = useParams<{ bookId: string }>();
  const { account } = useCurrentAccount();
  const { invalidateMovements } = useMovements();
  const { invalidateExpenses } = useExpensesCurrentMonth();

  const { mutateAsync: MakeMovementMutation } =
    api.movements.makeMovement.useMutation({
      onSuccess: async () => {
        await invalidateExpenses({ hasRefetch: true });
        onSuccess?.();
        invalidateMovements();
      },
    });

  const { mutateAsync: MakeTransactionMutation } =
    api.transaction.makeTransaction.useMutation({
      onSuccess: async () => {
        await invalidateExpenses({ hasRefetch: true });
        onSuccess?.();
        invalidateMovements();
      },
    });

  const onSubmit = () => {
    if (movement.transferType === "transaction") {
      toast("Está seguro de realizar esta acción", {
        action: {
          label: "Crear",
          onClick: () => {
            toast.promise(
              MakeTransactionMutation({
                bookId: params?.bookId,
                id: movement.id,
              }),
              {
                loading: "Creando Transacción...",
                success: "La transacción se ha creado con éxito.",
                error: "Hubo un error, intente de nuevo",
              },
            );
          },
        },
      });

      return;
    }
    toast("Está seguro de realizar esta acción", {
      action: {
        label: "Crear",
        onClick: () => {
          toast.promise(
            MakeMovementMutation({
              accountId: accountSelected,
              amount: amountValue,
              bookId: params?.bookId,
              id: movement.id,
            }),
            {
              loading: "Creando Movimiento...",
              success: "El movimiento se ha creado con éxito.",
              error: "Hubo un error, intente de nuevo",
            },
          );
        },
      },
    });
  };

  const defaultAccountKey = movement?.accountId
    ? [`${movement.accountId}`]
    : account
      ? [`${account.id}`]
      : undefined;

  useEffect(() => {
    if (movement) {
      setAmount(amountFormatter(String(movement.amount)).formatted);
      setAmountValue(movement.amount);
    }
    if (!movement) {
      router.back();
    }
  }, [movement]);

  useEffect(() => {
    if (account) {
      setAccountSelected(account.id);
    }
  }, [account]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex max-w-[36rem] flex-col gap-2"
    >
      <Input
        label="Monto"
        placeholder="0.00"
        classNames={{
          base: "px-2",
        }}
        value={amount}
        startContent={
          <div className="pointer-events-none flex items-center text-default-400">
            <span className="text-small">$</span>
          </div>
        }
        onValueChange={(val) => {
          const { formatted, raw } = amountFormatter(val);
          setAmount(formatted);
          raw && setAmountValue(raw);
        }}
      />
      <div className="px-2">
        <InputSelectAccount
          isRequired
          defaultSelected={defaultAccountKey}
          onChange={() => setAccountSelected(account?.id)}
        />
      </div>
      <Accordion
        defaultExpandedKeys={["1"]}
        variant="splitted"
        selectionMode="multiple"
      >
        <AccordionItem
          key="1"
          title="Ocurrencia"
          subtitle="Datos de Ocurrencia"
          classNames={{
            title: "font-medium",
          }}
          className="border-1 !shadow-none dark:border-white/5 dark:!bg-default-200"
        >
          <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:justify-between">
            <li>
              <span>Tipo:</span>
              <div>
                {movement?.type === 1 ? (
                  <Chip variant="flat" color="success" size="sm">
                    <span className="flex flex-row items-center gap-2 font-semibold">
                      <Icon icon="iconamoon:arrow-top-right-1" width={16} />{" "}
                      Ingreso
                    </span>
                  </Chip>
                ) : (
                  <Chip variant="flat" color="danger" size="sm">
                    <span className="flex items-center gap-2 font-semibold">
                      <Icon icon="iconamoon:arrow-bottom-left-1" width={16} />
                      Egreso
                    </span>
                  </Chip>
                )}
              </div>
            </li>

            <li>
              <span>Monto:</span>
              <p>$ {amount.toLocaleString()}</p>
            </li>
            <li>
              <span>Categoría:</span>
              <div>
                {movement.category?.name ? (
                  <Chip variant="flat" color="default" size="sm">
                    <span className="flex flex-row items-center gap-2 font-semibold">
                      <Icon icon={movement.category?.icon ?? ""} width={16} />{" "}
                      {movement.category?.name}
                    </span>
                  </Chip>
                ) : (
                  "Ninguna"
                )}
              </div>
            </li>
            <li>
              <span>Fecha de transacción:</span>
              <p>{capitalize(format(new Date(), DATE_FORMAT_TRANS))}</p>
            </li>
            <li>
              <span>Próximo ocurrencia:</span>
              <p>{format(movement.next_ocurrence, DATE_FORMAT_TRANS)}</p>
            </li>
            <li>
              <span>Última ocurrencia:</span>
              <p>
                {movement.last_ocurrence
                  ? format(movement.last_ocurrence, DATE_FORMAT_TRANS)
                  : "Sin ocurrencia"}
              </p>
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="2"
          title="Destinatario"
          hidden={movement.type === 1}
          subtitle="Datos del destinatario"
          classNames={{
            title: "font-medium",
          }}
          className="border-1 !shadow-none dark:border-white/5 dark:!bg-default-200"
        >
          <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:justify-between">
            <li>
              <span>Destinatario:</span>
              <p>{movement.entity?.name || "Ninguno"}</p>
            </li>
            <li>
              <span>Número de Referencia:</span>
              <p>{movement.entity?.reference || "Ninguno"}</p>
            </li>
            <li>
              <span>Descripción:</span>
              <p>{movement.entity?.description || "Sin descripción"}</p>
            </li>
          </ul>
        </AccordionItem>
        <AccordionItem
          key="3"
          title="Descripción"
          classNames={{
            title: "font-medium",
          }}
          subtitle="Descripción de transacción"
          className="border-1 !shadow-none dark:border-white/5 dark:!bg-default-200"
        >
          <p>{movement.description || "Sin descripción"}</p>
        </AccordionItem>
      </Accordion>
      <div className="mt-4 flex gap-2 px-2">
        <Button color="primary" type="submit">
          Crear Ocurrencia
        </Button>
        <Button onPress={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
};

export default CreateOcurrenceForm;

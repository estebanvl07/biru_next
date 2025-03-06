import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { MovementsIncludes } from "~/types/movements";
import { Accordion, AccordionItem, Chip, Input } from "@nextui-org/react";
import { amountFormatter } from "~/utils/formatters";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { capitalize } from "lodash";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

type OcurrenceParams = {
  acc: string;
  id: string;
  movement: string;
};

const NewOcurrencePage = ({ data }: { data: string }) => {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const movement: MovementsIncludes = data ? JSON.parse(data) : null;

  useEffect(() => {
    if (movement) {
      setAmount(amountFormatter(String(movement.amount)).formatted);
    }
  }, [movement]);

  if (!movement) {
    router.back();
  }

  return (
    <DashboardLayout title="Nueva Ocurrencia">
      <form action="" className="flex max-w-[36rem] flex-col gap-2">
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
            // setValue("amount", raw ?? 0);
            setAmount(formatted);
          }}
        />
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
                <p>
                  {movement.type === 1 ? (
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
                </p>
              </li>

              <li>
                <span>Monto:</span>
                <p>$ {amount.toLocaleString()}</p>
              </li>
              <li>
                <span>Categoría:</span>
                <p>
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
                </p>
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
          <Button color="primary">Crear Ocurrencia</Button>
          <Button onClick={() => router.back()}>Cancelar</Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const movement = await helper.movements.getMovementById.fetch(Number(id));

  return {
    props:
      {
        data: JSON.stringify(movement),
      },
  };
};

export default NewOcurrencePage;

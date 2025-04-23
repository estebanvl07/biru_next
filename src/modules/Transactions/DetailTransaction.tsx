import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { User } from "@heroui/user";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Card } from "~/modules/components";

import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { GetServerSideProps } from "next";
import useShowForm from "~/lib/hooks/useShowForm";
import EditTransaction from "~/modules/Transactions/EditTransaction";
import { GoalsIncludes } from "~/types/goal/goal.types";
import NotFound from "~/modules/components/404";
import { es } from "date-fns/locale";
import { ArrowDownLeft, ArrowUpRight, Ellipsis } from "lucide-react";
import { useState } from "react";
import CreateNote from "./components/CreateNote";
import { TransactionNotes } from "@prisma/client";

interface DetailTransactionProps {
  transactionData: TransactionIncludes;
}

const DetailTransaction = ({ transactionData }: DetailTransactionProps) => {
  const [notes, setNotes] = useState<TransactionNotes[]>(
    transactionData.notes || [],
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    id,
    amount,
    date,
    recipient,
    reference,
    state,
    description,
    createdAt,
    transferType,
    updatedAt,
    type,
    category,
  } = transactionData;

  return (
    <>
      <div className="grid grid-cols-3 rounded-xl border-divider bg-white md:border md:shadow-sm dark:bg-default-100">
        <section className="col-span-3 md:col-span-2 [&>div]:px-2 [&>div]:py-6 md:[&>div]:px-8">
          <div className="flex flex-col items-start justify-between gap-2 border-b border-divider lg:flex-row">
            <aside>
              <h4 className="mb-2 text-base font-medium">
                Monto de Transacción
              </h4>
              <div className="flex items-end gap-2">
                <span className="-translate-y-0.5 text-2xl">$</span>
                <span className="text-5xl font-medium">
                  {amount.toLocaleString()}
                </span>
                <Chip variant="flat" color={type === 1 ? "success" : "danger"}>
                  {type === 1 ? (
                    <ArrowUpRight width={18} />
                  ) : (
                    <ArrowDownLeft width={18} />
                  )}
                </Chip>
              </div>
            </aside>
            <aside className="flex h-full flex-row items-center gap-2 lg:flex-col lg:items-start">
              <h4 className="text-base font-medium lg:mb-3">
                Id de Transacción : #{id}
              </h4>
              <div className="flex-grow items-center justify-center">
                <Chip
                  variant="dot"
                  className="border border-divider"
                  color={
                    state === 2 ? "danger" : state === 1 ? "success" : "warning"
                  }
                >
                  {state === 2
                    ? "Cancelado"
                    : state === 1
                      ? "Confirmado"
                      : "Pendiente"}
                </Chip>
              </div>
            </aside>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-b xl:flex-row xl:gap-10">
            <div className="flex-grow">
              <h4 className="mb-2 text-base font-medium">
                Información de Transacción
              </h4>
              <ul className="flex w-full flex-col gap-1.5 [&>li>p]:font-semibold [&>li>span]:whitespace-nowrap [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:gap-2">
                <li>
                  <span>Numero de transacción:</span>
                  <p>#{id}</p>
                </li>

                <li>
                  <span>Tipo:</span>
                  <div>
                    {transferType === 1 && type === 1 ? (
                      <Chip variant="flat" color="success" size="sm">
                        <span className="flex flex-row items-center gap-2 font-semibold">
                          <Icon icon="iconamoon:arrow-top-right-1" width={16} />{" "}
                          Ingreso
                        </span>
                      </Chip>
                    ) : transferType === 1 && type === 2 ? (
                      <Chip variant="flat" color="danger" size="sm">
                        <span className="flex items-center gap-2 font-semibold">
                          <Icon
                            icon="iconamoon:arrow-bottom-left-1"
                            width={16}
                          />
                          Egreso
                        </span>
                      </Chip>
                    ) : (
                      <Chip variant="flat" color="warning" size="sm">
                        <span className="flex items-center gap-2 font-semibold">
                          <Icon icon="ph:target" width={16} />
                          Meta
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
                    {category?.name ? (
                      <Chip variant="flat" color="default" size="sm">
                        <span className="flex flex-row items-center gap-2 font-semibold">
                          <Icon icon={category.icon ?? ""} width={16} />{" "}
                          {category.name}
                        </span>
                      </Chip>
                    ) : (
                      <span className="font-semibold">N/A</span>
                    )}
                  </div>
                </li>

                <li>
                  <span>Fecha de transacción:</span>
                  <p>
                    {capitalize(format(date ?? createdAt, DATE_FORMAT_TRANS))}
                  </p>
                </li>

                <li>
                  <span>Ultima actualización:</span>
                  <p>{format(updatedAt, DATE_FORMAT_TRANS)}</p>
                </li>

                <li>
                  <span>Fecha de creación:</span>
                  <p>{format(createdAt, DATE_FORMAT_TRANS)}</p>
                </li>
              </ul>
            </div>
            <div className="flex-grow">
              <h4 className="mb-2 text-base font-medium">
                Información de Entidad
              </h4>
              <ul className="flex w-full flex-col gap-1.5 [&>li>p]:font-semibold [&>li>span]:whitespace-nowrap [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:gap-2">
                <li>
                  <span>Destinatario:</span>
                  <p>{recipient || "N/A"}</p>
                </li>

                <li>
                  <span>Número de Referencia:</span>
                  <p>{reference || "N/A"}</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-base font-medium">
              Descripción de Transacción
            </h4>

            <p
              className={clsx("my-2", {
                "text-foreground-600 dark:text-foreground-200": !description,
              })}
            >
              {description || "Esta transacción no tiene descripción"}
            </p>
          </div>
        </section>
        <aside className="col-span-3 max-h-full border-t border-divider px-2 py-6 md:col-span-1 md:border-l md:border-t-0 md:px-8">
          <h4 className="mb-2 text-base font-medium">Notas de Transacción</h4>
          <div className="max-h-[32rem] overflow-y-auto pr-5">
            {notes && (
              <ul className="ml-5 mt-4 flex list-disc flex-col gap-2">
                {notes?.map(({ note, id, createdAt }) => (
                  <li key={id}>
                    <p>{note}</p>
                    <span className="text-foreground-600 dark:text-foreground-200">
                      {format(createdAt, DATE_FORMAT_TRANS)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {(!notes || notes.length === 0) && (
            <div className="flex h-full w-full flex-col items-center justify-center py-6 md:py-0">
              <h3>Aún tienes notas</h3>
              <p>Crea notas para esta transacción</p>
            </div>
          )}
        </aside>
      </div>
      <CreateNote
        transaction={transactionData}
        onPushNote={(note) => setNotes((prev) => [...prev, note])}
      />
      {transactionData && (
        <EditTransaction
          transaction={transactionData}
          isOpen={isOpen}
          onClose={onClose}
          options={{
            transferType:
              transactionData.transferType === 1 ? "transfer" : "goals",
            defaultGoal:
              transactionData.transferType === 2
                ? (transactionData.goal as GoalsIncludes)
                : undefined,
          }}
        />
      )}
    </>
  );
};

export const ActivityContent = ({
  transactionData,
}: DetailTransactionProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* TODO: download transaction detail */}
      {/* <Button color="primary">Descargar</Button> */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly className="border border-divider">
            <Ellipsis />
          </Button>
        </DropdownTrigger>
        <DropdownMenu color="primary" className="font-montserrat">
          <DropdownItem key="edit">Editar Transacción</DropdownItem>
          <DropdownItem key="delete">Eliminar Transacción</DropdownItem>
          <DropdownItem key="download">Descargar Detalle</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DetailTransaction;

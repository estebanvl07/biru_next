import { Accordion, AccordionItem } from "@heroui/accordion";
import { useRouter } from "next/router";
import React from "react";
import { TemplatesIncludes } from "~/types/templates/templates";
import NotFound from "../components/404";
import DashboardLayout from "../Layouts/Dashboard";
import { Button, Chip, User } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { capitalize } from "lodash";
import { format } from "date-fns";
import { DASHBOARD_MAIN_PATH, DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { es } from "date-fns/locale";

const DetailTemplate = ({ template }: { template: TemplatesIncludes }) => {
  const router = useRouter();
  const query = router.query;

  const {
    id,
    amount,
    recipient,
    reference,
    description,
    createdAt,
    updatedAt,
    type,
    category,
  } = template;

  const typeIcon =
    type === 1
      ? "iconamoon:arrow-bottom-left-1"
      : "iconamoon:arrow-top-right-1";

  return (
    <div className="max-w-[36rem]">
      <Accordion
        defaultExpandedKeys={["1", "2"]}
        variant="light"
        selectionMode="multiple"
      >
        <AccordionItem
          key="1"
          title="Plantilla"
          subtitle="Datos de plantilla"
          classNames={{
            title: "font-medium",
          }}
        >
          <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:justify-between">
            <li>
              <span>Numero de transacción:</span>
              <p>#{id}</p>
            </li>
            <li>
              <span>Nombre:</span>
              <p>{template.name}</p>
            </li>
            <li>
              <span>Monto:</span>
              <p>{amount ? `$ ${amount.toLocaleString()}` : "No Definido"}</p>
            </li>

            <li>
              <span>Tipo:</span>
              <div>
                <Chip
                  variant="flat"
                  color={type === 1 ? "success" : "danger"}
                  size="sm"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Icon icon={typeIcon} width={16} />
                    {type === 1 ? "Ingreso" : "Egreso"}
                  </span>
                </Chip>
              </div>
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
                  "N/A"
                )}
              </div>
            </li>

            <li>
              <span>Ultima actualización:</span>
              <p className="capitalize">
                {capitalize(
                  format(updatedAt, DATE_FORMAT_TRANS, { locale: es }),
                )}
              </p>
            </li>

            <li>
              <span>Fecha de creación:</span>
              <p className="capitalize">
                {capitalize(
                  format(createdAt, DATE_FORMAT_TRANS, { locale: es }),
                )}
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
        >
          <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:justify-between">
            <li>
              <span>Destinatario:</span>
              <p>{recipient || "Ninguno"}</p>
            </li>

            <li>
              <span>Número de Referencia:</span>
              <p>{reference || "Ninguno"}</p>
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
        >
          <p>{description || "Sin descripción"}</p>
        </AccordionItem>
      </Accordion>
      <Button
        color="primary"
        onPress={() => {
          router.push(
            `${DASHBOARD_MAIN_PATH}/${query.bookId}/transactions/templates/${id}/edit`,
          );
        }}
        className="mt-2 w-full"
      >
        Editar Plantilla
      </Button>
    </div>
  );
};

export default DetailTemplate;

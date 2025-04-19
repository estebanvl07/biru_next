import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import React from "react";
import { useParams } from "next/navigation";
import { format, isSameMonth } from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MovementsIncludes } from "~/types/movements";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { es } from "date-fns/locale";
import Link from "next/link";

const EventSummaryCard = (movement: MovementsIncludes) => {
  const params = useParams<{ bookId: string }>();
  const { isPaid } = movement;

  const basePath = `${DASHBOARD_MAIN_PATH}/${params?.bookId}`;

  const href = {
    movement: `${basePath}/movements/new/ocurrence/${movement.id}`,
    transaction: `${basePath}/transactions/${movement.id}/make`,
  };

  return (
    <>
      <div className="mb-4 flex gap-x-2">
        {movement?.category?.icon && (
          <Icon icon={movement.category.icon} width={24} />
        )}
        <aside>
          <h2 className="mb-1 text-lg font-semibold leading-6">
            {movement.name}
          </h2>
          <div className="flex items-center gap-x-2">
            <p className="text-sm text-foreground-600">
              ${movement.amount.toLocaleString()}
            </p>
            {isPaid && (
              <Chip className="border border-divider" size="sm" color="default">
                Pagado
              </Chip>
            )}
          </div>
        </aside>
      </div>
      <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-col [&>li]:items-start [&>li]:justify-between [&>li]:gap-x-4">
        <li>
          <span>Descripción:</span>
          <p>{movement.description || "Ninguna"}</p>
        </li>

        <li>
          <span>Fecha de pago:</span>
          <p>
            {format(movement.next_ocurrence, "PPP", { locale: es }) ||
              "Ninguno"}
          </p>
        </li>
        <li>
          <span>Destinatario:</span>
          <p>{movement.entity?.name || "Ninguno"}</p>
        </li>
        <li>
          <span>Referencia:</span>
          <p>{movement.entity?.reference || "Ninguno"}</p>
        </li>
      </ul>
      <div className="mb-2">
        <Button
          as={Link}
          href={href[movement.transferType as keyof typeof href]}
          color="primary"
          isDisabled={isPaid || false}
          fullWidth
        >
          Realizar Movimiento
        </Button>
      </div>
    </>
  );
};

export default EventSummaryCard;

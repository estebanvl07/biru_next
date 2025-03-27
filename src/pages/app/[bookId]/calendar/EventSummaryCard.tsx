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
  const { last_ocurrence } = movement;
  const isPay =
    last_ocurrence && isSameMonth(new Date(last_ocurrence), new Date());

  return (
    <Card className="px-3 py-2 dark:bg-slate-800">
      <CardHeader className="flex items-center justify-between">
        <aside>
          <h2 className="max-w-40">{movement.name}</h2>
          <p className="text-sm text-foreground-600">
            ${movement.amount.toLocaleString()}
          </p>
        </aside>
        {isPay ? (
          <Chip
            className="border border-divider"
            size="sm"
            color="default"
            variant="dot"
          >
            Pagado
          </Chip>
        ) : (
          <>
            {movement?.category?.icon && (
              <Icon icon={movement.category.icon} width={24} />
            )}
          </>
        )}
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-2 [&>li>p]:max-w-40 [&>li>p]:text-end [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-start [&>li]:justify-between [&>li]:gap-x-4">
          <li>
            <span>Descripción:</span>
            <p>{movement.description || "Ninguna"}</p>
          </li>

          <li>
            <span>Plazo de pago:</span>
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
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/movements/new/ocurrence/${movement.id}`}
          color="primary"
          isDisabled={isPay || false}
          fullWidth
        >
          Realizar Movimiento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventSummaryCard;

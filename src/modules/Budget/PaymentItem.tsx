import {
  Checkbox,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { differenceInDays, isSameMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { MovementsIncludes } from "~/types/movements";
import CreateOcurrenceForm from "../Movements/CreateOcurrenceForm";

const PaymentItem = (payment: MovementsIncludes) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const isPay = payment.last_ocurrence
    ? isSameMonth(new Date(payment.last_ocurrence), new Date())
    : false;

  const [checked, setChecked] = useState(isPay);

  const getBadgeVariant = (daysRemaining: number) => {
    if (daysRemaining <= 3) return "danger";
    if (daysRemaining <= 7) return "warning";
    return "default";
  };

  const getBadgeText = (daysRemaining: number) => {
    if (daysRemaining === 0) return "Hoy";
    if (daysRemaining === 1) return "Mañana";
    return `${daysRemaining} días`;
  };

  // validate if movement is this week
  const isThisWeek = isPay
    ? differenceInDays(new Date(payment.last_ocurrence!), new Date()) >= 7
    : differenceInDays(new Date(payment.next_ocurrence), new Date()) >= 7;

  const daysRemaining = differenceInDays(
    new Date(payment.next_ocurrence),
    new Date(),
  );

  const badgeColor = getBadgeVariant(daysRemaining);
  const badgeText = getBadgeText(daysRemaining);

  if (isThisWeek) {
    return null;
  }

  useEffect(() => {
    if (!isPay && checked) {
      toast("¿Deseas realizar este movimiento?", {
        action: {
          label: "Crear",
          onClick: () => {
            onOpen();
          },
        },
      });
    }
  }, [checked]);

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent className="font-montserrat">
          <DrawerHeader className="flex flex-col">
            <h2>Realizar Movimiento</h2>
            <p className="text-sm font-normal">
              Registra una nueva transacción del este movimiento
            </p>
          </DrawerHeader>
          <DrawerBody>
            <CreateOcurrenceForm
              onSuccess={() => onClose()}
              movement={payment}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div
        key={payment.id}
        className="flex items-center justify-between space-y-0 border-b border-divider pb-2"
      >
        <div className="space-y-1">
          <div className="flex items-center">
            <Checkbox
              classNames={{
                wrapper: "border border-divider",
              }}
              defaultChecked={checked}
              isDisabled={isPay}
              onChange={(e) => setChecked(e.target.checked)}
              id={`payment-${payment.id}`}
            >
              <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {payment.name}{" "}
                {payment.description && (
                  <span className="text-xs text-foreground-600">
                    ({payment.description})
                  </span>
                )}
              </p>
            </Checkbox>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Icon icon="mynaui:calendar" width={18} />
            <span>
              {new Date(payment.next_ocurrence).toLocaleDateString("es", {
                day: "numeric",
                month: "short",
              })}
            </span>
            <Chip
              size="sm"
              color={badgeColor}
              className="ml-1 px-1 py-0 text-[10px]"
            >
              {badgeText}
            </Chip>
          </div>
        </div>
        <div className="text-sm font-medium">
          ${payment.amount.toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default PaymentItem;

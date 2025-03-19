import { Badge } from "@heroui/badge";
import { Button, Checkbox, Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const upcomingPayments = [
  {
    id: "2",
    description: "Mercado Semanal",
    amount: 200000,
    dueDate: "2025-03-10",
    category: "Alimentación",
    isPaid: false,
    daysRemaining: 3,
  },
  {
    id: "3",
    description: "Netflix",
    amount: 45000,
    dueDate: "2025-03-15",
    category: "Entretenimiento",
    isPaid: false,
    daysRemaining: 8,
  },
  {
    id: "4",
    description: "Electricidad",
    amount: 120000,
    dueDate: "2025-03-20",
    category: "Servicios",
    isPaid: false,
    daysRemaining: 7,
  },
];

const UpcomingPayments = () => {
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

  return (
    <div className="space-y-4">
      {upcomingPayments.map((payment) => {
        const badgeColor = getBadgeVariant(payment.daysRemaining);
        const badgeText = getBadgeText(payment.daysRemaining);

        return (
          <div
            key={payment.id}
            className="flex items-center justify-between space-y-0 border-b border-divider pb-2"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  classNames={{
                    wrapper: "border border-divider",
                  }}
                  id={`payment-${payment.id}`}
                />
                <label
                  htmlFor={`payment-${payment.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {payment.description}
                </label>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <Icon icon="mynaui:calendar" width={18} />
                <span>
                  {new Date(payment.dueDate).toLocaleDateString("es", {
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
        );
      })}

      <div className="pt-2">
        <Button variant="ghost" size="sm" className="w-full">
          Marcar como pagados
        </Button>
      </div>
    </div>
  );
};

export default UpcomingPayments;

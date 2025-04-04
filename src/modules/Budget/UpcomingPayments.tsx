import { Button } from "@heroui/react";
import React from "react";
import { useExpensesCurrentMonth } from "./hooks/useBudget";
import PaymentItem from "./PaymentItem";

const UpcomingPayments = () => {
  const { expenses } = useExpensesCurrentMonth();

  return (
    <div className="space-y-4">
      {expenses?.map((payment) => <PaymentItem {...payment} />)}

      <div className="pt-2">
        <Button variant="ghost" size="sm" className="w-full">
          Marcar como pagados
        </Button>
      </div>
    </div>
  );
};

export default UpcomingPayments;

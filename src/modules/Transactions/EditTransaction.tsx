import React from "react";
import TransactionForm from "./TransactionForm";
import { TransactionIncludes } from "~/types/transactions";
import Dialog from "../components/molecules/Dialog.component";
import { GoalsIncludes } from "~/types/goal/goal.types";
import CustomDrawer from "../components/molecules/CustomDrawer";

type FormSetting = {
  transferType?: "transfer" | "goals";
  defaultGoal?: GoalsIncludes;
};

interface EditTransactionProps {
  transaction: TransactionIncludes;
  isOpen: boolean;
  onClose: () => void;
  options?: FormSetting;
}

const EditTransaction = ({
  transaction,
  isOpen,
  onClose,
  options,
}: EditTransactionProps) => {
  return (
    <CustomDrawer
      title={`Editar Transacción (${transaction.transferType === 1 ? "Movimiento" : "Meta"})`}
      subtitle="Actualiza los detalles de tus ingresos o gastos"
      isOpen={isOpen}
      onClose={onClose}
    >
      <TransactionForm
        mode="edit"
        type={transaction.transferType === 1 ? "transfer" : "goal"}
        transactionDefault={transaction}
        defaultGoal={options?.defaultGoal}
        onSuccess={onClose}
      />
    </CustomDrawer>
  );
};

export default EditTransaction;

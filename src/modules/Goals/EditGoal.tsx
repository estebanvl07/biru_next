import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import { EditDialogFormProps } from "~/types/root.types";
import { GoalsIncludes } from "~/types/goal/goal.types";
import GoalForm from "./GoalForm";

const EditGoal = ({
  data,
  isOpen,
  onClose,
  onSuccess,
}: EditDialogFormProps<GoalsIncludes>) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Meta"
      subtitle="Actualiza tus metas para un mejor seguimiento"
    >
      <GoalForm
        hasEdit
        goalDefault={data}
        onSuccess={() => {
          onSuccess && onSuccess();
          onClose();
        }}
      />
    </Dialog>
  );
};

export default EditGoal;

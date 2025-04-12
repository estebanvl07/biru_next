import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import { EditDialogFormProps } from "~/types/root.types";
import { GoalsIncludes } from "~/types/goal/goal.types";
import GoalForm from "./GoalForm";
import CustomDrawer from "../components/molecules/CustomDrawer";

const EditGoal = ({
  data,
  isOpen,
  onClose,
  onSuccess,
}: EditDialogFormProps<GoalsIncludes>) => {
  return (
    <CustomDrawer
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
    </CustomDrawer>
  );
};

export default EditGoal;

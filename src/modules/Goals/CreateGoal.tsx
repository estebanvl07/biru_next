import React from "react";
import Dialog from "../components/molecules/Dialog.component";
import GoalForm from "./GoalForm";

interface CreateGoalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGoal = ({ isOpen, onClose }: CreateGoalProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Meta"
      subtitle="Crea y gestiona tus metas de pago para un mejor control"
    >
      <GoalForm onSuccess={onClose} />
    </Dialog>
  );
};

export default CreateGoal;

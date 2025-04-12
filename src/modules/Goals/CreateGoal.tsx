import React from "react";
import GoalForm from "./GoalForm";
import CustomDrawer from "../components/molecules/CustomDrawer";
import { useResize } from "~/lib/hooks/useResize";

interface CreateGoalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGoal = ({ isOpen, onClose }: CreateGoalProps) => {
  const { isMobile } = useResize();

  return (
    <CustomDrawer
      isOpen={isOpen}
      size={isMobile ? "full" : "md"}
      onClose={onClose}
      title="Crear Meta"
      subtitle="Crea y gestiona tus metas de pago para un mejor control"
    >
      <GoalForm onSuccess={onClose} />
    </CustomDrawer>
  );
};

export default CreateGoal;

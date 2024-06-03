import DashboardLayout from "~/modules/layouts/Dashboard";
import GoalForm from "~/modules/Goals/GoalForm";

export default function NewGoalPage() {
  return (
    <DashboardLayout title="Editar Meta" headDescription="Actualizar una meta">
      <GoalForm />
    </DashboardLayout>
  );
}

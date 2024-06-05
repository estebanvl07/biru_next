import DashboardLayout from "~/modules/Layouts/Dashboard";
import EntityForm from "~/modules/Entities/EntityForm";

const NewEntityPage = () => {
  return (
    <DashboardLayout title="Crear Entidad" headDescription="Crea una entidad">
      <EntityForm />
    </DashboardLayout>
  );
};

export default NewEntityPage;

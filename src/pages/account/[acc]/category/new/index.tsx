import React from "react";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import CreateCategoryForm from "~/modules/Category/CreateCategoryForm";

const NewCategory = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  return (
    <DashboardLayout title="Crear Categoría">
      <CreateCategoryForm hasEdit={hasEdit} />
    </DashboardLayout>
  );
};

export default NewCategory;

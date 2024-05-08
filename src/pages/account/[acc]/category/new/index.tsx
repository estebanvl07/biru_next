import React from "react";

import DashboardLayout from "~/modules/layouts/Dashboard";
import CreateCategoryForm from "~/modules/category/CreateCategoryForm";

const NewCategory = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  return (
    <DashboardLayout title="Crear Categoría">
      <CreateCategoryForm hasEdit={hasEdit} />
    </DashboardLayout>
  );
};

export default NewCategory;

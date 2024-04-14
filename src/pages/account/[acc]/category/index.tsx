import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { api } from "~/utils/api";

const CategoryPage = () => {
  const pathname = usePathname();
  const params = useParams();
  // const categories = await api.category.getAll.query();
  return (
    <DashboardLayout>
      <Link
        href={{
          pathname: "/account/[acc]/category/new",
          query: { acc: params?.acc },
        }}
      >
        Crear categoría
      </Link>
      {/* {categories.map((cat) => (
        <div key={cat.id}>{JSON.stringify(cat)}</div>
      ))} */}
    </DashboardLayout>
  );
};

export default CategoryPage;

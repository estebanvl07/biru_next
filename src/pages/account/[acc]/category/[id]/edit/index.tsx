import { GetServerSideProps } from "next";

import CreateCategoryForm from "~/modules/category/CreateCategoryForm";
import DashboardLayout from "~/modules/layouts/Dashboard";

import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

import type { CategoryIncludes } from "~/types/category/category.types";

const UpdateCategoryPage = ({ category }: { category: CategoryIncludes }) => {
  return (
    <DashboardLayout
      title="Editar Categoría"
      headDescription="Editar categoría"
    >
      <CreateCategoryForm hasEdit categoryDefault={category} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);

  const [category] = await helper.category.getCategoryById.fetch(Number(id));

  const data = {
    ...category,
    createdAt: category?.createdAt.toISOString(),
    updatedAt: category?.updatedAt.toISOString(),
    transactions: category?.transactions
      ? formatDatesOfTransactions(category.transactions as any)
      : null,
  };

  return {
    props: {
      category: data,
    },
  };
};

export default UpdateCategoryPage;

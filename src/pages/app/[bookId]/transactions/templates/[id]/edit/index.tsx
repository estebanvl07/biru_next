import React from "react";
import { GetServerSideProps } from "next";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

import NotFound from "~/modules/components/404";
import TemplateForm from "~/modules/Templates/TemplateForm";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { TemplatesIncludes } from "~/types/templates/templates";

const EditTemplate = ({ data }: { data: string }) => {
  const template = JSON.parse(data) as TemplatesIncludes;

  return (
    <DashboardLayout
      title="Editar Plantilla"
      headDescription="editar plantilla"
    >
      {template ? <TemplateForm data={template} hasEdit /> : <NotFound />}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const data = await helper.templates.getTemplateById.fetch({
    id: Number(id),
    bookId: String(bookId),
  });

  return {
    props: {
      data: JSON.stringify(data),
    },
  };
};

export default EditTemplate;

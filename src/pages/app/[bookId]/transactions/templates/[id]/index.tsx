import { GetServerSideProps } from "next";
import React from "react";
import NotFound from "~/modules/components/404";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import DetailTemplate from "~/modules/Templates/DetailTemplate";
import { TemplatesIncludes } from "~/types/templates/templates";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

const DetailPage = ({ data }: { data: string }) => {
  const template = JSON.parse(data) as TemplatesIncludes;

  return (
    <DashboardLayout
      title="Detalle de Plantilla"
      headDescription="detalle de plantilla"
    >
      {template ? <DetailTemplate template={template} /> : <NotFound />}
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

export default DetailPage;

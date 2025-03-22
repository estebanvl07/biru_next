import { GetServerSideProps } from "next";
import React from "react";
import EntityForm from "~/modules/Entities/EntityForm";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { EntityIncludes } from "~/types/entities/entity.types";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";

const UpdateEntityPage = ({ entity }: { entity: EntityIncludes }) => {
  return (
    <DashboardLayout>
      <EntityForm hasEdit entityDefault={entity} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [entity] = await helper.entity.getEntityById.fetch({ id: Number(id) });

  const transactionSerialize = formatDatesOfTransactions(entity?.transactions as any)

  const entityData = {
    ...entity,
    createdAt: entity?.createdAt.toISOString(),
    updateAt: entity?.updateAt.toISOString(),
    transactions: transactionSerialize,
  };

  return {
    props: {
      entity: entityData,
    },
  };
};

export default UpdateEntityPage;

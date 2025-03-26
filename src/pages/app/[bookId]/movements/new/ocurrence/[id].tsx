import React, { useEffect, useState } from "react";
import { MovementsIncludes } from "~/types/movements";
import { amountFormatter } from "~/utils/formatters";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import CreateOcurrenceForm from "~/modules/Movements/CreateOcurrenceForm";

const NewOcurrencePage = ({ data }: { data: string }) => {
  const router = useRouter();
  const movement: MovementsIncludes = data ? JSON.parse(data) : null;

  if (!movement) {
    router.back();
  }

  return (
    <DashboardLayout title="Nueva Ocurrencia">
      <CreateOcurrenceForm {...movement} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const movement = await helper.movements.getMovementById.fetch({
    bookId: String(bookId!),
    id: Number(id),
  });

  return {
    props: {
      data: JSON.stringify(movement),
    },
  };
};

export default NewOcurrencePage;

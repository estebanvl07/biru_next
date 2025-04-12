import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import CreateMovementsForm from "~/modules/Movements/CreateMovementsForm";
import { MovementsIncludes } from "~/types/movements";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const movement = await helper.movements.getMovementById.fetch({
    id: Number(id),
    bookId: bookId! as string,
  });

  return {
    props: {
      data: JSON.stringify(movement),
    },
  };
};

const EditMovement = ({ data }: { data: string }) => {
  const movement = JSON.parse(data) as MovementsIncludes;
  const router = useRouter();
  if (!movement) {
    router.back();
  }

  return (
    <DashboardLayout title="Editar Movimiento">
      <CreateMovementsForm defaultMovement={movement} mode="edit" />
    </DashboardLayout>
  );
};

export default EditMovement;

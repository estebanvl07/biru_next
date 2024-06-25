import { GetServerSideProps } from "next";
import React from "react";
import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { GoalsIncludes } from "~/types/goal/goal.types";
import GoalForm from "~/modules/Goals/GoalForm";

const UpdateEntityPage = ({ goal }: { goal: GoalsIncludes }) => {
  return (
    <DashboardLayout title="Editar Meta" headDescription="Edición de meta">
      <GoalForm hasEdit goalDefault={goal} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const [goal] = await helper.goals.getGoalById.fetch({ id: Number(id) });

  const goalData = {
    ...goal,
    goalDate: goal?.goalDate ? goal?.goalDate.toISOString() : null,
    createdAt: goal?.createdAt.toISOString(),
    updatedAt: goal?.updatedAt.toISOString(),
    transactions: goal?.transactions
      ? formatDatesOfTransactions(goal.transactions as any)
      : null,
  };

  return {
    props: {
      goal: goalData,
    },
  };
};

export default UpdateEntityPage;

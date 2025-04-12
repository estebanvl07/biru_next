import { GetServerSideProps } from "next";
import React from "react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { GoalsIncludes } from "~/types/goal/goal.types";
import GoalForm from "~/modules/Goals/GoalForm";
import { formatDatesOfGoals } from "~/lib/resource/formatDatesOfGoals";

export default function UpdateEntityPage({ goal }: { goal: GoalsIncludes }) {
  return (
    <DashboardLayout title="Editar Meta" headDescription="Edición de meta">
      <GoalForm hasEdit goalDefault={goal} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const goals = await helper.goals.getGoalById.fetch({
    id: Number(id),
    bookId: String(ctx.params?.bookId),
  });

  const [goalData] = formatDatesOfGoals(goals as any);

  return {
    props: {
      goalData,
    },
  };
};

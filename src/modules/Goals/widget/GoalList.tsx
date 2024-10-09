import Link from "next/link";
import React from "react";

import { useParams } from "next/navigation";
import { useGoals } from "../hook/goal.hook";

import { Card, Empty } from "~/modules/components";
import { Avatar, Progress } from "@nextui-org/react";

import { getPercent } from "~/lib/helpers";

interface GoalListProps {
  maxOptions?: number;
}

const GoalList = ({ maxOptions = 3 }: GoalListProps) => {
  const { goals } = useGoals();
  const params = useParams<{ acc: string; id: string }>();

  return (
    <Card className="flex h-full w-full flex-col">
      <header className="flex items-center justify-between gap-4">
        <aside>
          <h4 className="text-lg font-medium">Metas</h4>
          <p>Listado de tus metas</p>
        </aside>
        <Link
          href={{
            pathname: "goals",
            query: {
              acc: params?.acc,
            },
          }}
          className="whitespace-nowrap text-default-600"
        >
          Ver todo
        </Link>
      </header>
      <ul className="mb-2 mt-4 flex h-full w-full flex-col justify-center gap-4">
        {goals.length === 0 && <Empty />}
        {goals.map((goal, index) => {
          if (index + 1 > maxOptions) return;
          return (
            <Link
              key={goal.id}
              className="flex w-full items-center gap-4"
              href={`/account/${params?.acc}/goals/${goal.id}`}
            >
              <Avatar name={goal.name} color="primary" />
              <div className="flex flex-grow flex-col items-start justify-center">
                <div className="flex w-full items-center justify-between">
                  <p className="text-xs">{goal.name}</p>
                  <span className="text-enter whitespace-nowrap font-medium">
                    {getPercent(goal.saved, goal.goal)}
                  </span>
                </div>
                <Progress
                  size="sm"
                  color="primary"
                  aria-label={`saving card - ${goal.name}`}
                  value={goal.saved}
                  maxValue={goal.goal}
                  classNames={{
                    indicator: "dark:bg-indigo-400",
                  }}
                  className="my-1 rounded-full border bg-gray-200 dark:border-none dark:bg-slate-700"
                />
              </div>
            </Link>
          );
        })}
      </ul>
    </Card>
  );
};

export default GoalList;

import React, { useCallback, useState } from "react";
import { Table } from "~/modules/components";
import { useGoals } from "../../hook/goal.hook";
import { columns } from "./table";
import { useParams } from "next/navigation";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Chip, Progress } from "@heroui/react";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Actions from "~/modules/components/molecules/Table/Actions";
import { useRouter } from "next/router";
import { getPercent } from "~/lib/helpers";
import Dialog from "~/modules/components/molecules/Dialog.component";
import GoalForm from "../../GoalForm";
import CreateGoal from "../../CreateGoal";
import useShowForm from "~/lib/hooks/useShowForm";
import EditGoal from "../../EditGoal";

const TableGoals = () => {
  const [showSheetCreate, setShowSheetCreate] = useState(false);
  const [showSheetEdit, setShowSheetEdit] = useState(false);
  const [goalSelected, setGoalSelected] = useState<GoalsIncludes>();

  const {
    data,
    onChageData,
    showCreate,
    showEdit,
    onShowCreate,
    onShowEdit,
    onCloseEdit,
    onCloseCreate,
  } = useShowForm<GoalsIncludes>({});

  const { goals, isLoading } = useGoals();
  const params = useParams();
  const router = useRouter();

  const renderCell = useCallback(
    (goal: GoalsIncludes, columnKey: React.Key) => {
      const cellValue = goal[columnKey as keyof GoalsIncludes];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <div className="flex !h-10 !min-w-10 items-center justify-center whitespace-nowrap rounded-full bg-primary text-xl text-white">
                {goal.entityId !== null ? (
                  <Avatar
                    // src={
                    //   goal.entity?.avatar
                    //     ? (goal.entity.avatar as string)
                    //     : undefined
                    // }
                    color="primary"
                    name={goal.name}
                  />
                ) : (
                  <Icon icon={goal.icon ?? "ph:target"} />
                )}
              </div>
              <aside>
                <h4 className="whitespace-nowrap font-semibold">{goal.name}</h4>
                <p className="!text-xs">{goal.entity?.name ?? "Sin entidad"}</p>
              </aside>
            </div>
          );
        case "goal":
          return (
            <span className="font-medium">$ {goal.goal.toLocaleString()}</span>
          );
        case "saved":
          return (
            <span className="font-medium">$ {goal.saved.toLocaleString()}</span>
          );
        case "prog":
          return (
            <div className="flex flex-col items-start justify-center">
              <span className="text-enter whitespace-nowrap font-medium">
                {getPercent(goal.saved, goal.goal)}
              </span>
              <Progress
                size="sm"
                color="primary"
                aria-label={`saving card - ${goal.name}`}
                value={goal.saved}
                maxValue={goal.goal}
                classNames={{
                  indicator: "dark:bg-white",
                }}
                className="my-1 rounded-full border bg-gray-200 dark:border-none dark:bg-white/30"
              />
            </div>
          );
        case "type":
          return (
            <Chip
              size="lg"
              variant="flat"
              color={goal.type === 1 ? "success" : "danger"}
            >
              <Icon
                icon={
                  goal.type === 1
                    ? "iconamoon:arrow-bottom-left-1"
                    : "iconamoon:arrow-top-right-1"
                }
              />
            </Chip>
          );
        case "goalDate":
          return (
            <span>
              {goal.goalDate ? (
                <>{capitalize(format(goal.goalDate, "PP", { locale: es }))}</>
              ) : (
                "N/A"
              )}
            </span>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/goals/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(goal.id),
                  },
                })
              }
              onClickEdit={() => {
                onChageData(goal);
                onShowEdit();
              }}
              hasDelete={false}
            />
          );
        default:
          return cellValue;
      }
    },
    [goals],
  );

  return (
    <>
      <Table
        headerConfig={{
          newButtonText: "Crear Meta",
          hasNew: true,
          onNew: () => {
            onShowCreate();
          },
        }}
        columns={columns}
        data={goals}
        isLoading={isLoading}
        renderCell={renderCell}
      />
      <CreateGoal isOpen={showCreate} onClose={onCloseCreate} />
      {data && <EditGoal data={data} isOpen={showEdit} onClose={onCloseEdit} />}
    </>
  );
};

export default TableGoals;

import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useResize } from "~/lib/hooks/useResize";
import { useGoals } from "~/modules/Goals/hook/goal.hook";

import { Tab, Tabs } from "@heroui/react";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Empty } from "~/modules/components";
import { Transaction } from "@prisma/client";
import Dialog from "../components/molecules/Dialog.component";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { CategoryIncludes } from "~/types/category/category.types";
import { EntityIncludes } from "~/types/entities/entity.types";

export type FormSetting = {
  transferType?: "transfer" | "goal";
  defaultGoal?: GoalsIncludes;
  defaultCategory?: CategoryIncludes;
  defaultEntity?: EntityIncludes;
  defaultType?: 1 | 2;
  onlyForm?: boolean;
};

interface CreateTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  options?: FormSetting;
  onSuccess?: VoidFunction;
}

const CreateTransaction = ({
  isOpen,
  onClose,
  options = { transferType: "transfer", onlyForm: false },
  onSuccess,
}: CreateTransactionProps) => {
  const params = useParams();
  const { isMobile } = useResize();
  const { goals, isLoading: goalIsLoading } = useGoals();

  return (
    <Dialog
      title="Crear Transacción"
      subtitle="Añade transacciones para mantener tus finanzas al día"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        content: "h-[98vh]",
      }}
    >
      {options.onlyForm ? (
        <TransactionForm
          mode="edit"
          defType={options.defaultType}
          type={options.transferType ?? "transfer"}
          defaultGoal={options.defaultGoal}
          onSuccess={onSuccess}
        />
      ) : (
        <Tabs
          color="primary"
          defaultSelectedKey={options.transferType || "transfer"}
          aria-label="Forms transaction tabs"
          radius="full"
          variant={isMobile ? "underlined" : undefined}
          className={isMobile ? "w-full" : "w-fit"}
          classNames={
            isMobile
              ? {
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-primary dark:bg-slate-200",
                  tab: "w-full px-0 h-12",
                  tabContent:
                    "group-data-[selected=true]:text-primary group-data-[selected=true]:dark:text-slate-300",
                }
              : undefined
          }
        >
          <Tab
            key="transfer"
            className="w-full"
            title={
              <div className="flex items-center space-x-2 px-2">
                <Icon icon="bx:transfer" width={20} />
                <span>Transferencia</span>
              </div>
            }
          >
            <TransactionForm
              defaultGoal={options.defaultGoal}
              defCategory={options.defaultCategory}
              defEntity={options.defaultEntity}
              type="transfer"
              onSuccess={onClose}
            />
          </Tab>
          <Tab
            className="w-full"
            key="goals"
            title={
              <div className="flex items-center space-x-2 px-2">
                <Icon icon="ph:target" width={20} />
                <span>Meta</span>
              </div>
            }
          >
            {!goalIsLoading && goals.length === 0 ? (
              <Card className="w-[32rem] py-8">
                <Empty
                  description="No tienes metas creadas"
                  buttonText="Crear Meta"
                  href={`/account/${params?.acc}/goals/new`}
                />
              </Card>
            ) : (
              <TransactionForm
                defaultGoal={options.defaultGoal}
                defCategory={options.defaultCategory}
                defEntity={options.defaultEntity}
                type="goal"
                onSuccess={onClose}
              />
            )}
          </Tab>
        </Tabs>
      )}
    </Dialog>
  );
};

export default CreateTransaction;

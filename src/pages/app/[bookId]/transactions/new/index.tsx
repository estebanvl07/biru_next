import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useResize } from "~/lib/hooks/useResize";
import { useGoals } from "~/modules/Goals/hook/goal.hook";

import { Tab, Tabs } from "@heroui/react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Empty } from "~/modules/components";

const NewTransactionPage = () => {
  const params = useParams();
  const router = useRouter();
  const query = router.query;

  const { isMobile } = useResize();
  const { goals, isLoading: goalIsLoading } = useGoals();

  return (
    <DashboardLayout
      title="Crear Transacción"
      headDescription="Crea una nueva transacción"
    >
      <Tabs
        color="primary"
        defaultSelectedKey={(query.transferType as string) || "transfer"}
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
                  "group-data-[selected=true]:text-primary  group-data-[selected=true]:dark:text-slate-300",
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
            // defaultGoal={options.defaultGoal}
            // defCategory={options.defaultCategory}
            // defEntity={options.defaultEntity}
            type="transfer"
            onSuccess={() => router.back()}
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
              // defaultGoal={options.defaultGoal}
              // defCategory={options.defaultCategory}
              // defEntity={options.defaultEntity}
              type="goal"
              onSuccess={() => router.back()}
            />
          )}
        </Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default NewTransactionPage;

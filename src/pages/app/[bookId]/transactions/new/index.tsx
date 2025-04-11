import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useResize } from "~/lib/hooks/useResize";
import { useGoals } from "~/modules/Goals/hook/goal.hook";

import { CardBody, Tab, Tabs, Card } from "@heroui/react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Empty } from "~/modules/components";

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
        variant={"underlined"}
        className={isMobile ? "w-full" : "w-fit"}
        classNames={{
          tab: "px-0 pt-0",
          cursor: "w-[90%]",
          tabList: "gap-x-4 pt-0",
        }}
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
          <TransactionForm type="transfer" onSuccess={() => router.back()} />
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
            <Card className="max-w-[36rem] p-4 shadow-sm">
              <Empty
                description="No tienes metas creadas"
                buttonText="Crear Meta"
                href={`/account/${params?.acc}/goals/new`}
              />
            </Card>
          ) : (
            <TransactionForm type="goal" onSuccess={() => router.back()} />
          )}
        </Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default NewTransactionPage;

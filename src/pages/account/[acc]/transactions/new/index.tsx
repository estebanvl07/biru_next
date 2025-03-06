import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useResize } from "~/lib/hooks/useResize";
import { useGoals } from "~/modules/Goals/hook/goal.hook";

import { Tab, Tabs } from "@nextui-org/react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import TransactionForm from "~/modules/Transactions/TransactionForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Empty } from "~/modules/components";

const NewTransactionPage = () => {
  const params = useParams();
  const { query } = useRouter();
  const { isMobile } = useResize();
  const { goals, isLoading: goalIsLoading } = useGoals();

  return (
    <DashboardLayout
      title="Crear Transacción"
      headDescription="Crea una nueva transacción"
    >
      <TransactionForm type="goal" />
    </DashboardLayout>
  );
};

export default NewTransactionPage;

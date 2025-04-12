import { useParams } from "next/navigation";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Button, Tabs, Tab, Link } from "@heroui/react";

import { useResize } from "~/lib/hooks/useResize";
import MobileTransactionPage from "~/modules/Transactions/MobileTransactionPage";
import { useTransactions } from "~/modules/Transactions/hook";

import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import AdvancedSearch from "~/modules/Transactions/AdvancedSearch";
import TransactionsTable from "~/modules/Transactions/TransactionsTable";
import { PlusIcon } from "lucide-react";

const TransactionPage = () => {
  const params = useParams<{ bookId: string }>();

  const { transactions, isLoading } = useTransactions({});
  const { isMobile } = useResize();

  return (
    <DashboardLayout
      title="Transacciones"
      headDescription="Listado de tu historial de transacciones"
      activityContent={
        <>
          <Button
            color="primary"
            as={Link}
            href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/new`}
          >
            {" "}
            <PlusIcon /> Crear Transacción
          </Button>
        </>
      }
    >
      <Tabs
        variant="underlined"
        color="primary"
        fullWidth={isMobile}
        classNames={{
          tab: "px-0 pt-0",
          cursor: "w-[90%]",
          tabList: "gap-x-4 pt-0",
        }}
      >
        <Tab title="Ultimas 50" key="all">
          {!isMobile ? (
            <TransactionsTable
              transactions={transactions}
              isLoading={isLoading}
            />
          ) : (
            <MobileTransactionPage
              transactions={transactions}
              isLoading={isLoading}
            />
          )}
        </Tab>
        <Tab title="Busqueda Avanzada" key="advanced">
          <AdvancedSearch />
        </Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default TransactionPage;

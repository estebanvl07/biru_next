import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";
import { Button, Card } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";

const TransactionPage = () => {
  // const { query } = useRouter();

  return (
    <DashboardLayout title="Transacciones">
      <Card className="mx-auto max-w-[65rem] flex-col px-8 py-6">
        <header className="flex items-center justify-between">
          <h2>Transacciones</h2>
          <nav className="flex items-center gap-2">
            <Link href="/transactions/new">
              <Button variantStyle="outline">Nuevo Transacción</Button>
            </Link>
          </nav>
        </header>
      </Card>
    </DashboardLayout>
  );
};

export default TransactionPage;

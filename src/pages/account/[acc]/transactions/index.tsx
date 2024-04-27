import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";
import { Button, Card } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { Table } from "~/modules/components";

import { users, columns } from "./data";

const TransactionPage = () => {
  return (
    <DashboardLayout title="Transacciones">
      <div className="mt-4">
        <Table
          headerConfig={{
            title: "",
            keySearch: ["title"],
          }}
          columns={columns}
          data={users}
        />
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;

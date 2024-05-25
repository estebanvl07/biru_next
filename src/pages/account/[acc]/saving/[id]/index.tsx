import type { GetServerSideProps } from "next";
import { Progress } from "@nextui-org/progress";
import { format } from "date-fns";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import SavingCard from "~/modules/Saving/SavingCard";
import { columns } from "~/modules/Saving/table";
import { Table } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { api } from "~/utils/api";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { Savings } from "@prisma/client";

const convertDatesToISOString = (obj: any) => {
  for (const key in obj) {
    if (obj[key] instanceof Date) {
      obj[key] = obj[key].toISOString();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      convertDatesToISOString(obj[key]);
    }
  }
};

const DetailSavingPage = ({ saving }: { saving: Savings }) => {
  console.log(saving);

  return (
    <DashboardLayout>
      <div className="flex w-full gap-6">
        <div className="w-80 rounded-xl bg-default-50 px-6 py-4 dark:bg-default-200">
          <h3>{saving?.name}</h3>
          {/* <span>{format(saving?.goalDate!, "PPP")}</span> */}
          <p className="my-4">{saving?.description ?? "Sin descripción"}</p>
        </div>
        <aside className="flex-grow">
          <Table
            columns={columns}
            data={[]}
            headerConfig={{
              keySearch: ["name"],
            }}
          />
        </aside>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, acc } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const saving = await helper.saving.getSavingById.fetch({ id: Number(id) });

  //   if (!Boolean(saving[0])) {
  //     redirect(`/account/${acc}/main`);
  //     return {
  //       props: {
  //         notFound: true,
  //       },
  //     };
  //   }

  convertDatesToISOString(saving);

  return {
    props: saving[0] ?? {},
  };
};

export default DetailSavingPage;

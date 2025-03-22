import React from "react";
import AccountForm from "~/modules/Account/AccountForm";
import { GetServerSideProps } from "next";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { UserAccount } from "@prisma/client";
import WhitoutSideBar from "~/modules/Layouts/templates/dashbaord/OverviewLayout";

const EditAccountPage = ({ defaultAccount }: { defaultAccount: string }) => {
  const data = JSON.parse(defaultAccount) as UserAccount;
  return (
    <WhitoutSideBar title="Editar Cuenta" hasFilter={false}>
      <section className="m-auto mt-4 flex w-full max-w-[32rem] flex-col ">
        <AccountForm hasEdit defaultAccount={data} />
      </section>
    </WhitoutSideBar>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { acc } = ctx.params!;
  const helper = await createServerSideCaller(ctx);

  const response = await helper.userAccount.getOne.fetch({ id: Number(acc) });
  const data = JSON.stringify(response);

  return {
    props: {
      defaultAccount: data,
    },
  };
};

export default EditAccountPage;

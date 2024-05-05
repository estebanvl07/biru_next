import type { ActivationProps } from "~/modules/Activation";
import type { GetServerSideProps } from "next";
import { activateUser } from "~/server/api/services/users.services";
import { db } from "~/server/db";

export const getServerSideProps: GetServerSideProps<ActivationProps> = async ({
  params,
}) => {
  const code = params?.code as string;
  const userOrError = await activateUser(db, code).catch(
    (error: Error) => error,
  );
  const valid = !(userOrError instanceof Error);

  if (!valid) {
    return {
      redirect: {
        destination: "/activation/status/error",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/activation/status/success",
      permanent: false,
    },
  };
};

const Activation = () => {
  return null;
};

export default Activation;

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  ActivationResult,
  type ActivationStatusProps,
} from "~/modules/Activation";

const options: ActivationStatusProps["status"][] = ["success", "error"];

export const getServerSideProps: GetServerSideProps<
  ActivationStatusProps
> = async ({ params }) => {
  const status = params?.status as ActivationStatusProps["status"];

  if (!status || !options.includes(status)) {
    return { notFound: true };
  }

  return { props: { status } };
};

const ActivationStatus = ({
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ActivationResult status={status} />;
};

export default ActivationStatus;
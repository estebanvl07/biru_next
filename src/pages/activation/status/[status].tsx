import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  ActivationResult,
  type ActivationStatusProps,
} from "~/modules/Activation";

const options: ActivationStatusProps["status"][] = ["success", "error"];

export async function getStaticPaths() {
  return { paths: options, fallback: false };
}

export const getServerSideProps: GetServerSideProps<
  ActivationStatusProps
> = async ({ params }) => {
  const status = params?.status as ActivationStatusProps["status"];

  if (!status) {
    return { notFound: true, props: {} };
  }

  if (!options.includes(status)) {
    return { notFound: true, props: {} };
  }

  return { props: { status } };
};

const ActivationStatus = ({
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ActivationResult status={status} />;
};

export default ActivationStatus;

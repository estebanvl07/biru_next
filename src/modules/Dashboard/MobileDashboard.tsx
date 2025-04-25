import { useParams } from "next/navigation";
import Link from "next/link";

import { LastTransactions } from "~/modules/Common";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Skeleton } from "@heroui/react";
import MobileFilter from "../Layouts/templates/dashbaord/Header/MobileFilter";

import { motion } from "framer-motion";
import { useCurrentAccount } from "../Account/hooks";
import { onlyScale } from "../animations";

const MobileDashboard = () => {
  const params = useParams();
  const { account, isLoading } = useCurrentAccount();

  return (
    <div className="z-0 flex flex-col gap-2">
      <section className="z-20 flex flex-col items-center justify-center py-8">
        <span className="text-lg">Balance actual</span>
        <motion.h2
          {...onlyScale}
          className="mb-2 flex w-fit items-center text-5xl font-bold"
        >
          {isLoading ? (
            <Skeleton className="h-10 w-32 rounded-xl" />
          ) : (
            <>
              <span className="mr-1 text-xl opacity-80">$</span>
              {account?.balance?.toLocaleString()}
            </>
          )}
        </motion.h2>
        <article className="flex gap-2">
          <Chip color="success" className="text-white">
            74.8
          </Chip>
          <MobileFilter />
        </article>
        <motion.nav
          initial={{
            x: -300,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="my-6 flex items-center gap-8"
        >
          <Link
            href={`/account/${params?.acc}/transactions/new?type=1`}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-1 grid h-12 w-12 place-items-center rounded-full bg-default-100">
              <Icon icon="iconamoon:arrow-top-right-1-light" width={24} />
            </div>
            <span>Ingreso</span>
          </Link>
          <Link
            href={`/account/${params?.acc}/transactions/new`}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-1 grid h-12 w-12 place-items-center rounded-full bg-default-100">
              <Icon icon="bx:transfer" width={24} />
            </div>
            <span>Nuevo</span>
          </Link>
          <Link
            href={`/account/${params?.acc}/transactions/new?type=2`}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-1 grid h-12 w-12 place-items-center rounded-full bg-default-100">
              <Icon icon="iconamoon:arrow-bottom-left-1-light" width={24} />
            </div>
            <span>Egreso</span>
          </Link>
        </motion.nav>
      </section>
      <LastTransactions transactionsMaxLength={10} />
    </div>
  );
};

export default MobileDashboard;

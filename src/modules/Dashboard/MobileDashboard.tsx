import React from "react";
import { useCurrentAccount } from "../Account/hooks";
import { CardBalanceAccount, DetailAmounts, LastTransactions } from "../common";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreationMenu from "../layouts/templates/dashbaord/Header/CreationMenu/CreationMenu";
import { useSession } from "next-auth/react";
import { Chip, Skeleton } from "@nextui-org/react";
import SendsToEntities from "../components/molecules/SendsToEntities";
import { motion } from "framer-motion";
import { onlyScale } from "../animations";

const MobileDashboard = () => {
  const params = useParams();
  const { account, isLoading } = useCurrentAccount();

  return (
    <div className="z-0 flex flex-col gap-2">
      <section className="z-20 flex flex-col items-center justify-center  pt-4">
        <span className="text-lg">Balance actual</span>
        <div className="flex items-center gap-2">
          <motion.h2
            {...onlyScale}
            className="mb-2 flex w-fit text-5xl font-bold"
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
        </div>
        <article className="flex gap-2">
          <Chip color="success" className="text-white">
            74.8
          </Chip>
          <label className="flex items-center gap-2 text-small text-default-500">
            <select
              className="rounded-md bg-default-100 p-1 text-small text-default-500 outline-none"
              // onChange={onRowsPerPageChange}
            >
              <option value="5">Mes</option>
              <option value="10">6 Meses</option>
              <option value="15">1 Año</option>
            </select>
          </label>
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

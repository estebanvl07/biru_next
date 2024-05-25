import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Skeleton } from "@nextui-org/react";
import DashboardLayout from "~/modules/layouts/Dashboard";

import { useSearch } from "~/lib/hooks";
import { Savings } from "@prisma/client";
import { groupedAnimation } from "~/modules/animations";
import { useRouter } from "next/router";
import { useSavings } from "~/modules/Saving/hook/saving.hook";
import SavingCard from "~/modules/Saving/SavingCard";
import { LoaderSkeleton } from "~/modules/Loaders";

export default function SavingPage() {
  const params = useParams();
  const router = useRouter();
  const [totalSavings, setTotalSavings] = useState(0);
  const { savings, isLoading } = useSavings();
  const { newList, onSearch } = useSearch<Savings>({
    data: savings ?? [],
    keys: ["name", "saved"],
  });

  useEffect(() => {
    if (!savings) return;
    const value = savings.reduce((acc, item) => acc + item.saved, 0);
    setTotalSavings(value);
  }, [savings]);

  return (
    <DashboardLayout title="Ahorros">
      <header className="mb-2 flex items-center justify-between gap-2">
        <aside>
          <span>Total ahorrado</span>
          {isLoading ? (
            <Skeleton className="h-6 w-16 rounded-xl" />
          ) : (
            <h2 className="text-nowrap">$ {totalSavings.toLocaleString()}</h2>
          )}
        </aside>
        <nav className="my-2 flex gap-2">
          <Button
            as={Link}
            variant="bordered"
            href={`/account/${params?.acc}/saving/new`}
            color="primary"
            className="flex gap-1 border-1"
          >
            <Icon icon="ph:plus" width={16} />
            Crear Meta
          </Button>
        </nav>
      </header>
      <section className="mb-4 flex flex-col-reverse items-center gap-2 sm:flex-row">
        <Input
          placeholder="Buscar"
          className="w-full sm:max-w-[40%]"
          onChange={(e) => onSearch(e.target.value)}
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
        />
      </section>

      {isLoading ? (
        <LoaderSkeleton skeletonType="Saving" />
      ) : (
        <motion.section
          variants={groupedAnimation.container}
          className="mt-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap"
          initial="hidden"
          animate="visible"
        >
          {newList?.map((props) => (
            <SavingCard key={props.id} saving={props} />
          ))}
        </motion.section>
      )}
    </DashboardLayout>
  );
}

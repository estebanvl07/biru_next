import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import { Progress } from "@nextui-org/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

import { groupedAnimation } from "../animations";
import { capitalize } from "../components/molecules/Table/utils";

import type { Savings } from "@prisma/client";

const SavingCard = ({ saving }: { saving: Savings }) => {
  const { id, name, saved, target, icon } = saving;
  const router = useRouter();
  const params = useParams();

  return (
    <motion.article
      whileHover={{
        scale: 1.04,
      }}
      variants={{
        ...groupedAnimation.item,
      }}
      onClick={() => router.push(`/account/${params?.acc}/saving/${id}`)}
      className="col-span-2 rounded-xl border bg-default-50 transition-all duration-300 sm:col-span-1 md:w-80 dark:border-white/10 dark:bg-default-200 dark:shadow-md"
    >
      <div className=" flex flex-col px-6 py-4">
        <header className="flex items-center justify-between">
          <h3 className="text-base">{capitalize(name)}</h3>
          {icon && (
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-200  dark:bg-slate-800">
              <Icon icon={icon} width={24} />
            </div>
          )}
        </header>
        <main className="mt-4 flex justify-between gap-16">
          <aside>
            <p>Monto actual</p>
            <h4 className="font-semibold">$ {saved.toLocaleString()}</h4>
          </aside>
          <aside>
            <p>Meta</p>
            <h4 className="font-semibold text-primary">
              $ {target.toLocaleString()}
            </h4>
          </aside>
        </main>
        <Progress
          size="sm"
          color="primary"
          aria-label={`saving card - ${name}`}
          value={saved}
          maxValue={target}
          className="mb-2 mt-3 w-full rounded-full border bg-gray-200 dark:border-none dark:bg-slate-700"
        />
      </div>
    </motion.article>
  );
};

export default SavingCard;

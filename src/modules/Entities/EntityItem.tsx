import { FC } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

import Link from "next/link";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { format } from "date-fns";
import { Avatar, Chip } from "@nextui-org/react";

import { Entities } from "@prisma/client";

interface EntityItemProps {
  entity: Entities;
  index: number;
}

const EntityItem: FC<EntityItemProps> = ({ entity, index }) => {
  const params = useParams();
  const { avatar, createdAt, id, name, type } = entity;

  return (
    <li
      className={clsx(
        "flex flex-col px-1 hover:bg-slate-100 dark:hover:bg-slate-800/40",
      )}
    >
      <Link
        href={`/account/${params?.acc}/entities/${id}`}
        className={clsx(
          "flex cursor-pointer items-center justify-between border-gray-400/60 px-2 py-3 transition-all duration-300 dark:border-white/10",
        )}
        title={name}
      >
        <div className="flex items-center gap-3">
          <Avatar src={avatar ?? undefined} name={name} color="primary" />
          <div className="flex flex-col">
            <p className="mb-1 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
              {name}
            </p>
            <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
              {`${format(createdAt, DATE_FORMAT_TRANS)}`}
            </span>
          </div>
        </div>
        <Chip variant="flat" color={type === 1 ? "success" : "danger"}>
          {type === 1 ? "Ingreso" : "Egreso"}
        </Chip>
      </Link>
    </li>
  );
};

export default EntityItem;

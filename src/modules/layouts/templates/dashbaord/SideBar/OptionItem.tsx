import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const OptionItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <li
      className={clsx(
        "flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all hover:pl-6",
        {
          "text-medium bg-indigo-100 font-semibold dark:bg-indigo-900/40 dark:font-normal dark:text-white":
            pathname === item.href,
        },
      )}
    >
      <Link
        href={`/account/${params?.acc}${item.href}`}
        className="flex items-center gap-2"
      >
        <Icon
          icon={item.icon}
          width={20}
          className={clsx({
            "text-indigo-600 dark:text-indigo-200": pathname === item.href,
          })}
        />
        {item.name}
      </Link>
    </li>
  );
};

export default OptionItem;

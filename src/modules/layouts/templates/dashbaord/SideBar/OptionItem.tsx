import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { Skeleton } from "@nextui-org/skeleton";

const OptionItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const { account, isLoading } = useCurrentAccount();
  return (
    <>
      {isLoading ? (
        <Skeleton className=" my-1 h-7 w-full rounded-lg" />
      ) : (
        <li
          className={clsx(
            "flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all hover:pl-6",
            {
              "bg-indigo-100 font-semibold text-primary dark:bg-indigo-900/40 dark:font-normal dark:text-white":
                pathname?.includes(item.href),
            },
          )}
        >
          <Link
            href={
              item.cleanPath ? item.href : `/account/${account?.id}${item.href}`
            }
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
      )}
    </>
  );
};

export default OptionItem;

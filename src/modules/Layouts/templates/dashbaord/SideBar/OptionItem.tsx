import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { Skeleton } from "@heroui/skeleton";
import { motion } from "framer-motion";
import { Tooltip } from "@heroui/react";

const OptionItem = ({
  item,
  isExpanded,
}: {
  item: any;
  isExpanded: boolean;
}) => {
  const pathname = usePathname();
  const { isLoading } = useCurrentAccount();
  return (
    <>
      {isLoading ? (
        <>
          {isExpanded ? (
            <Skeleton className="my-1 h-7 w-full rounded-lg" />
          ) : (
            <Skeleton className="mx-auto my-1 h-8 w-8 rounded-lg" />
          )}
        </>
      ) : (
        <li
          className={clsx(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all hover:bg-default-200",
            {
              "bg-default-300 font-semibold text-primary  dark:bg-default-300/40 dark:font-normal dark:text-white":
                pathname?.includes(item.href),
              "mx-auto w-fit hover:scale-105": !isExpanded,
              "w-full hover:pl-6": isExpanded,
            },
          )}
        >
          {isExpanded ? (
            <RedirectionLink item={item} isExpanded={isExpanded} />
          ) : (
            <Tooltip content="fegregerg">
              <RedirectionLink item={item} isExpanded={isExpanded} />
            </Tooltip>
          )}
        </li>
      )}
    </>
  );
};

const RedirectionLink = ({
  item,
  isExpanded,
}: {
  item: any;
  isExpanded: boolean;
}) => {
  const pathname = usePathname();
  const { account } = useCurrentAccount();
  return (
    <Link
      href={item.cleanPath ? item.href : `/account/${account?.id}${item.href}`}
      className="z-0 flex items-center gap-2"
      title={item.name}
    >
      <Icon
        icon={item.icon}
        width={20}
        className={clsx("text-black dark:text-white", {
          "!text-indigo-600 dark:!text-indigo-200": pathname === item.href,
        })}
      />
      {isExpanded && (
        <motion.p
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.2,
            delay: 0.1,
          }}
          className="text-black dark:text-white"
        >
          {item.name}
        </motion.p>
      )}
    </Link>
  );
};

export default OptionItem;

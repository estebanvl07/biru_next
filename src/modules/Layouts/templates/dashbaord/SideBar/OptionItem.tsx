import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { Skeleton } from "@heroui/skeleton";
import { useCurrentBook } from "~/modules/Books/hooks/useBooks.hook";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";

type OptionsProps = {
  id: number;
  name: string;
  icon: string;
  href: string;
};

const OptionItem = ({
  item,
  isExpanded,
}: {
  item: OptionsProps;
  isExpanded: boolean;
}) => {
  const pathname = usePathname();
  const params = useParams<{ bookId: string }>();
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
            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-default-200/30",
            {
              "bg-default-200 font-semibold text-primary dark:bg-default-300/40 dark:font-normal dark:text-white":
                pathname ===
                `${DASHBOARD_MAIN_PATH}/${params?.bookId}${item.href === "/" ? "" : item.href}`,
              "mx-auto w-fit hover:scale-105": !isExpanded,
              "w-full hover:pl-6": isExpanded,
            },
          )}
        >
          <RedirectionLink item={item} isExpanded={isExpanded} />
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
  const { book } = useCurrentBook();
  if (!book?.id) return null;

  return (
    <Link
      href={{
        pathname: item.cleanPath
          ? item.href
          : `${DASHBOARD_MAIN_PATH}/[bookId]${item.href}`,
        query: !item.cleanPath ? { bookId: book.id } : undefined,
      }}
      className="z-0 flex items-center gap-2"
      title={item.name}
    >
      <Icon icon={item.icon} width={isExpanded ? 18 : 20} />
      {isExpanded && <p>{item.name}</p>}
    </Link>
  );
};

export default OptionItem;

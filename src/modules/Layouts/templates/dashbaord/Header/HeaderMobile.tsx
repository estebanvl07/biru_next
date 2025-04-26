import { usePathname, useParams } from "next/navigation";

import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";
import { Avatar, Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import ButtonMenu from "./ButtonMenu";
import Link from "next/link";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import NotificationMenu from "~/modules/components/molecules/Notifications/NotificationMenu";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { useCurrentBook } from "~/modules/Books/hooks/useBooks.hook";

const HeaderMobile = ({ title = "Dashboard" }: { title?: string }) => {
  const pathname = usePathname();
  const params = useParams();
  const { data } = useSession();
  const { book } = useCurrentBook();

  return (
    <header className="z-10 flex w-full items-center justify-between px-content py-3 md:hidden">
      <aside className="flex items-center gap-3">
        {pathname === `${DASHBOARD_MAIN_PATH}/${params?.bookId}` ? (
          <aside className="flex items-center gap-1">
            <Avatar
              aria-label="User logged"
              classNames={{
                name: "text-primary-foreground",
              }}
              radius="md"
              color={"primary"}
              src={data?.user.image || undefined}
              name={data?.user.name || ""}
              as={Link}
              href={`/account/${params?.acc}/setting`}
            />
            <Button
              variant="bordered"
              className="flex h-fit items-center justify-between gap-2 border-none px-2 py-3 text-start"
            >
              <div className="mr-4">
                <p className="text-sm !leading-[14px]">Libro:</p>
                <p className="text-base font-semibold leading-3">
                  {book?.name || ""}
                </p>
              </div>
              <ChevronsUpDown width={20} />
            </Button>
            {/* <p>
              
              <span className="text-base font-semibold">
                {data?.user.name?.split(" ").slice(0, 2).join(" ")}
              </span>
              <br />
              <span className="w-8 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                @{data?.user.email?.split("@").at(0)}
              </span>
            </p> */}
          </aside>
        ) : (
          <>
            <NavigationBack />
            <h1 className="ml-4 text-xl font-medium text-primary dark:text-slate-200">
              {title}
            </h1>
          </>
        )}
      </aside>
      <div className="flex items-center gap-x-2">
        <NotificationMenu />
        <ButtonMenu />
      </div>
    </header>
  );
};

export default HeaderMobile;

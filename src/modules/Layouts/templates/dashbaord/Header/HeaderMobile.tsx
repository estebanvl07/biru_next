import { usePathname, useParams } from "next/navigation";

import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";
import { Avatar } from "@heroui/react";
import { useSession } from "next-auth/react";
import ButtonMenu from "./ButtonMenu";
import Link from "next/link";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";

const HeaderMobile = ({ title = "Dashboard" }: { title?: string }) => {
  const pathname = usePathname();
  const params = useParams();
  const { data } = useSession();
  const { account } = useCurrentAccount();

  return (
    <header className="z-10 flex w-full items-center justify-between px-content py-3 md:hidden">
      <aside className="flex items-center gap-3">
        {pathname === `${DASHBOARD_MAIN_PATH}/${params?.bookId}` ? (
          <aside className="flex items-center gap-3">
            <Avatar
              aria-label="User logged"
              classNames={{
                name: "text-primary-foreground",
              }}
              color={"primary"}
              src={data?.user.image || undefined}
              name={data?.user.name || ""}
              as={Link}
              href={`/account/${params?.acc}/setting`}
            />
            <p>
              Bienvenido, <br />
              <span className="text-base font-semibold">
                {data?.user.name?.split(" ").slice(0, 2).join(" ")}
              </span>
            </p>
          </aside>
        ) : (
          <>
            <NavigationBack />
            <div className="flex flex-col items-start justify-center">
              <h1 className=" text-2xl font-semibold text-primary dark:text-slate-200">
                {title}
              </h1>
            </div>
          </>
        )}
      </aside>
      <ButtonMenu />
    </header>
  );
};

export default HeaderMobile;

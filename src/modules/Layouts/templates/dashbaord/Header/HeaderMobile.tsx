import { usePathname, useParams } from "next/navigation";

import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import ButtonMenu from "./ButtonMenu";
import Link from "next/link";

const HeaderMobile = ({ title = "Dashboard" }: { title?: string }) => {
  const pathname = usePathname();
  const params = useParams()
  const { data } = useSession();
  const { account } = useCurrentAccount();

  return (
    <header className="px-content z-10 flex w-full items-center justify-between mb-6 py-2">
      <aside className="flex items-center gap-3">
        {pathname?.includes("main") || pathname === "/account" ? (
          <aside className="flex items-center gap-3">
            <Avatar
              isBordered
              aria-label="User logged"
              color={Boolean(data?.user.image) ? "default" : "primary"}
              src={data?.user.image ?? undefined}
              name={data?.user.name ?? ""}
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
              {account?.name && (
                <span className="text-xs text-gray-600 dark:text-slate-200">
                  {account?.name}
                </span>
              )}
              <h1 className="text-xl font-semibold text-primary md:text-2xl dark:text-slate-200">
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

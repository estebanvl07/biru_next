import clsx from "clsx";

import Nav from "./Nav";
import { useParams, usePathname } from "next/navigation";
import { api } from "~/utils/api";
import NavigationBack from "./NavigationBack";

const HeaderApp = ({ title }: { title?: string }) => {
  const params = useParams();
  const pathname = usePathname();
  const { data: account, isLoading } = api.userAccount.getOne.useQuery({
    id: Number(params?.acc),
  });
  console.log(pathname);
  return (
    <header className="z-10 mb-2 flex w-full items-center justify-between bg-white md:h-16 dark:border-white/10 dark:bg-slate-950">
      <section className="flex w-full flex-grow items-center justify-between">
        <section className="flex items-center gap-3">
          {!pathname.includes("main") && <NavigationBack />}
          <div
            className={clsx("flex flex-col items-start justify-center", {
              // "!pl-7": location.pathname === "/home",
            })}
          >
            <h1
              className={clsx(
                "text-start text-2xl font-semibold text-primary dark:text-white",
              )}
            >
              {title ?? "Dashboard"}
            </h1>
            <span className="text-gray-600 dark:text-slate-200">
              {account?.name}
            </span>
          </div>
        </section>
        <Nav />
      </section>
    </header>
  );
};

export default HeaderApp;

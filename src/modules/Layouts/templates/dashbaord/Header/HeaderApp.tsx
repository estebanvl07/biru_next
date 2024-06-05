import { usePathname } from "next/navigation";

import Nav from "./Nav";
import NavigationBack from "./NavigationBack";

import { useCurrentAccount } from "~/modules/Account/hooks";

const HeaderApp = ({
  title = "Dashboard",
  hasFilter,
}: {
  hasFilter?: boolean;
  title?: string;
}) => {
  const pathname = usePathname();
  const { account } = useCurrentAccount();

  return (
    <header className="z-10 mb-2 flex w-full items-center justify-between md:h-16">
      <aside className="flex items-center gap-3">
        {!pathname?.includes("main") && <NavigationBack />}
        <div className="flex flex-col items-start justify-center">
          <span className="text-gray-600 dark:text-slate-200">
            {account?.name}
          </span>
          <h1 className="text-start text-xl font-semibold text-primary lg:text-2xl dark:text-slate-200">
            {title}
          </h1>
        </div>
      </aside>
      <Nav hasFilter={hasFilter} />
    </header>
  );
};

export default HeaderApp;

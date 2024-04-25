import { HeaderApp, SideBar } from "./templates/dashbaord";

const DashboardLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="flex dark:bg-slate-950">
      <SideBar />
      <section className="z-0 h-full w-full flex-grow py-3 md:pl-60">
        <div className="px-8">
          <HeaderApp title={title} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;

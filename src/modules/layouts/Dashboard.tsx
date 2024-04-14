import WhitoutSideBar from "./templates/dashbaord/whitout-sidebar";
import LayoutWitheSidebar from "./templates/dashbaord/white-sidebar";
import { SideBar } from "./templates/dashbaord";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WhitoutSideBar>
      <div className="flex">
        <SideBar />
        <section className="h-full w-full flex-grow p-4 md:pl-64">
          {children}
        </section>
      </div>
    </WhitoutSideBar>
  );
};

export default DashboardLayout;

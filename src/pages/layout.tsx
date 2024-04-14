import React, { FC } from "react";
import { HeaderApp, SideBar } from "../../modules/layouts/templates/dashbaord";

interface DashboardProps {
  children: React.ReactNode;
}

const MainLayout: FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-100 dark:bg-slate-950">
      <HeaderApp />
      <main className="min-h-calc-48 md:min-h-calc-64 w-full flex-grow md:mt-16">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
